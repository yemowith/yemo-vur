// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;


interface IEventEmitter {
    function emitEvent(string calldata sub, string calldata data) external;
}

contract TestEventSender {
    IEventEmitter public eventEmitter;

    constructor(address _eventEmitterAddress) {
        eventEmitter = IEventEmitter(_eventEmitterAddress);
    }

    function sendTestEvent(string calldata sub, string calldata data) public  returns (bool){
         eventEmitter.emitEvent(sub, data);
            return true;
    }
}