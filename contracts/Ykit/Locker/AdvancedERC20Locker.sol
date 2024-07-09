// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AdvancedERC20Locker is Ownable {
    struct Lock {
        uint256 amount;
        uint256 unlockTime;
    }

    IERC20 public token;
    mapping(address => Lock) public locks;
    address public feeRecipient;
    uint256 public penaltyFee; // Penalty fee in percentage (e.g., 5 for 5%)

    event Locked(address indexed user, uint256 amount, uint256 unlockTime);
    event Unlocked(address indexed user, uint256 amount);
    event EmergencyUnlocked(
        address indexed user,
        uint256 amount,
        uint256 penalty
    );
    event FeeRecipientChanged(address indexed newRecipient);
    event PenaltyFeeChanged(uint256 newPenaltyFee);

    modifier onlyLocked(address user) {
        require(locks[user].amount > 0, "No tokens locked");
        _;
    }

    modifier notLocked(address user) {
        require(locks[user].amount == 0, "Tokens already locked");
        _;
    }

    constructor(
        address _token,
        address _feeRecipient,
        uint256 _penaltyFee
    ) Ownable(msg.sender) {
        require(_token != address(0), "Invalid token address");
        require(_feeRecipient != address(0), "Invalid fee recipient address");
        require(_penaltyFee <= 100, "Penalty fee must be between 0 and 100");

        token = IERC20(_token);
        feeRecipient = _feeRecipient;
        penaltyFee = _penaltyFee;
    }

    function lockTokens(
        uint256 amount,
        uint256 lockTime
    ) external notLocked(msg.sender) {
        require(amount > 0, "Amount must be greater than 0");
        require(lockTime > 0, "Lock time must be greater than 0");
        require(
            token.transferFrom(msg.sender, address(this), amount),
            "Token transfer failed"
        );

        locks[msg.sender] = Lock({
            amount: amount,
            unlockTime: block.timestamp + lockTime
        });

        emit Locked(msg.sender, amount, locks[msg.sender].unlockTime);
    }

    function unlockTokens() external onlyLocked(msg.sender) {
        require(
            block.timestamp >= locks[msg.sender].unlockTime,
            "Lock period not yet expired"
        );

        uint256 amount = locks[msg.sender].amount;
        locks[msg.sender].amount = 0;
        locks[msg.sender].unlockTime = 0;

        require(token.transfer(msg.sender, amount), "Token transfer failed");

        emit Unlocked(msg.sender, amount);
    }

    function extendLock(
        uint256 additionalTime
    ) external onlyLocked(msg.sender) {
        require(additionalTime > 0, "Additional time must be greater than 0");

        locks[msg.sender].unlockTime += additionalTime;

        emit Locked(
            msg.sender,
            locks[msg.sender].amount,
            locks[msg.sender].unlockTime
        );
    }

    function emergencyUnlock(address user) external onlyOwner onlyLocked(user) {
        uint256 amount = locks[user].amount;
        uint256 penalty = (amount * penaltyFee) / 100;
        uint256 amountAfterPenalty = amount - penalty;

        locks[user].amount = 0;
        locks[user].unlockTime = 0;

        require(
            token.transfer(user, amountAfterPenalty),
            "Token transfer failed"
        );
        require(
            token.transfer(feeRecipient, penalty),
            "Penalty transfer failed"
        );

        emit EmergencyUnlocked(user, amountAfterPenalty, penalty);
    }

    function getLockInfo(
        address user
    ) external view returns (uint256 amount, uint256 unlockTime) {
        Lock storage lock = locks[user];
        return (lock.amount, lock.unlockTime);
    }

    function changeFeeRecipient(address newRecipient) external onlyOwner {
        require(newRecipient != address(0), "Invalid fee recipient address");
        feeRecipient = newRecipient;
        emit FeeRecipientChanged(newRecipient);
    }

    function changePenaltyFee(uint256 newPenaltyFee) external onlyOwner {
        require(newPenaltyFee <= 100, "Penalty fee must be between 0 and 100");
        penaltyFee = newPenaltyFee;
        emit PenaltyFeeChanged(newPenaltyFee);
    }

    function batchLockTokens(
        address[] calldata users,
        uint256[] calldata amounts,
        uint256 lockTime
    ) external onlyOwner {
        require(
            users.length == amounts.length,
            "Users and amounts length mismatch"
        );
        require(lockTime > 0, "Lock time must be greater than 0");

        for (uint256 i = 0; i < users.length; i++) {
            address user = users[i];
            uint256 amount = amounts[i];

            require(amount > 0, "Amount must be greater than 0");
            require(
                token.transferFrom(msg.sender, address(this), amount),
                "Token transfer failed"
            );

            locks[user] = Lock({
                amount: amount,
                unlockTime: block.timestamp + lockTime
            });

            emit Locked(user, amount, locks[user].unlockTime);
        }
    }

    function batchUnlockTokens(address[] calldata users) external onlyOwner {
        for (uint256 i = 0; i < users.length; i++) {
            address user = users[i];
            require(locks[user].amount > 0, "No tokens locked for user");
            require(
                block.timestamp >= locks[user].unlockTime,
                "Lock period not yet expired"
            );

            uint256 amount = locks[user].amount;
            locks[user].amount = 0;
            locks[user].unlockTime = 0;

            require(token.transfer(user, amount), "Token transfer failed");

            emit Unlocked(user, amount);
        }
    }

    function autoUnlock(address user) external {
        require(
            block.timestamp >= locks[user].unlockTime,
            "Lock period not yet expired"
        );
        unlockTokensForUser(user);
    }

    function unlockTokensForUser(address user) internal {
        require(
            block.timestamp >= locks[user].unlockTime,
            "Lock period not yet expired"
        );

        uint256 amount = locks[user].amount;
        locks[user].amount = 0;
        locks[user].unlockTime = 0;

        require(token.transfer(user, amount), "Token transfer failed");

        emit Unlocked(user, amount);
    }
}
