// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract ETHLocker is Ownable {
    struct Lock {
        uint256 amount;
        uint256 unlockTime;
    }

    mapping(address => Lock) public locks;

    event Locked(address indexed user, uint256 amount, uint256 unlockTime);
    event Unlocked(address indexed user, uint256 amount);
    event EmergencyUnlock(address indexed user, uint256 amount);

    modifier onlyLocked(address user) {
        require(locks[user].amount > 0, "No ETH locked");
        _;
    }

    modifier notLocked(address user) {
        require(locks[user].amount == 0, "ETH already locked");
        _;
    }

    constructor() Ownable(msg.sender) {}

    function lockETH(uint256 lockTime) external payable notLocked(msg.sender) {
        require(msg.value > 0, "Amount must be greater than 0");
        require(lockTime > 0, "Lock time must be greater than 0");

        locks[msg.sender] = Lock({
            amount: msg.value,
            unlockTime: block.timestamp + lockTime
        });

        emit Locked(msg.sender, msg.value, locks[msg.sender].unlockTime);
    }

    function unlockETH() external onlyLocked(msg.sender) {
        require(
            block.timestamp >= locks[msg.sender].unlockTime,
            "Lock period not yet expired"
        );

        uint256 amount = locks[msg.sender].amount;
        locks[msg.sender].amount = 0;
        locks[msg.sender].unlockTime = 0;

        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "ETH transfer failed");

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

        (bool success, ) = user.call{value: amount}("");
        require(success, "ETH transfer failed");

        emit EmergencyUnlock(user, amount);
    }

    function getLockInfo(
        address user
    ) external view returns (uint256 amount, uint256 unlockTime) {
        Lock storage lock = locks[user];
        return (lock.amount, lock.unlockTime);
    }

    // Fallback function to accept ETH
    receive() external payable {}
}
