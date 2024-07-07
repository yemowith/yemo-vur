// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC20Locker is Ownable {
    struct Lock {
        uint256 amount;
        uint256 unlockTime;
    }

    IERC20 public token;
    mapping(address => Lock) public locks;

    event Locked(address indexed user, uint256 amount, uint256 unlockTime);
    event Unlocked(address indexed user, uint256 amount);
    event EmergencyUnlock(address indexed user, uint256 amount);

    modifier onlyLocked(address user) {
        require(locks[user].amount > 0, "No tokens locked");
        _;
    }

    modifier notLocked(address user) {
        require(locks[user].amount == 0, "Tokens already locked");
        _;
    }

    constructor(address _token) Ownable(msg.sender) {
        require(_token != address(0), "Invalid token address");
        token = IERC20(_token);
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
        locks[user].amount = 0;
        locks[user].unlockTime = 0;

        require(token.transfer(user, amount), "Token transfer failed");

        emit EmergencyUnlock(user, amount);
    }

    function getLockInfo(
        address user
    ) external view returns (uint256 amount, uint256 unlockTime) {
        Lock storage lock = locks[user];
        return (lock.amount, lock.unlockTime);
    }
}
