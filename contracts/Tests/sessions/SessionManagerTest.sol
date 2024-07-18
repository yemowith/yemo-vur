// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

contract SessionManagerTest {
    struct Session {
        address user;
        uint256 expires;
    }

    mapping(address => Session) public sessions;

    event SessionStarted(address indexed user, uint256 duration);
    event SessionEnded(address indexed user);

    modifier onlySessionUser(address _user) {
        require(sessions[_user].user == msg.sender, "Not authorized");
        require(sessions[_user].expires > block.timestamp, "Session expired");
        _;
    }

    function startSession(uint256 duration) external {
        sessions[msg.sender] = Session(msg.sender, block.timestamp + duration);
        emit SessionStarted(msg.sender, duration);
    }

    function endSession() external {
        delete sessions[msg.sender];
        emit SessionEnded(msg.sender);
    }

    function executeTransaction(
        address target,
        bytes memory data
    ) external onlySessionUser(msg.sender) {
        (bool success, ) = target.call(data);
        require(success, "Transaction failed");
    }
}
