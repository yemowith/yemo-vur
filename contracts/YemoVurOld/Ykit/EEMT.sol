// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.20;

interface IEEMT {
    // Event definition
    event EventLog(address indexed from, string sub, uint256 time, string data);

    // Function to emit an event
    function emitEvent(
        string memory sub,
        string memory data
    ) external returns (bool);

    // Function to receive event requests
    function receiveEventRequest(
        string memory sub,
        string memory data
    ) external returns (bool);
}

contract EEMT is IEEMT {
    function emitEvent(
        string memory sub,
        string memory data
    ) public override returns (bool) {
        // require(allowedSenders[msg.sender], "Sender not allowed");
        uint256 currentTime = block.timestamp;
        emit EventLog(msg.sender, sub, currentTime, data);
        return true;
    }
    function receiveEventRequest(
        string memory sub,
        string memory data
    ) external override returns (bool) {
        return emitEvent(sub, data);
    }
}
