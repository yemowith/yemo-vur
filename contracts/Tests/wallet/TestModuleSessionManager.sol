// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

contract TestModuleSessionManager {
    address public sessionUser;
    uint256 public sessionExpiry;

    event SessionStarted(address indexed user, uint256 duration);
    event SessionEnded(address indexed user);

    modifier onlySessionUser() {
        require(msg.sender == sessionUser, "Not session user");
        _;
    }

    modifier sessionActive() {
        require(block.timestamp < sessionExpiry, "Session expired");
        _;
    }

    function startSession(uint256 duration) external {
        sessionUser = msg.sender;
        sessionExpiry = block.timestamp + duration;
        emit SessionStarted(msg.sender, duration);
    }

    function endSession() external onlySessionUser {
        sessionUser = address(0);
        sessionExpiry = 0;
        emit SessionEnded(msg.sender);
    }

    function executeTransaction(
        address target,
        bytes calldata data
    ) external onlySessionUser sessionActive returns (bytes memory) {
        (bool success, bytes memory result) = target.call(data);
        require(success, "Transaction failed");
        return result;
    }
}
