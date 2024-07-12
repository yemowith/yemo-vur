// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

contract MockContract {
    event FunctionCalled(address sender, uint256 value);

    function mockFunction(uint256 value) public {
        emit FunctionCalled(msg.sender, value);
    }
}
