// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "./TestModuleSessionManager.sol";

contract TestModule is TestModuleSessionManager {
    address public owner;

    event Executed(address indexed target, uint indexed value, bytes data);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function execute(
        address target,
        uint256 value,
        bytes calldata data
    ) external onlyOwner returns (bytes memory) {
        (bool success, bytes memory result) = target.call{value: value}(data);
        require(success, "Transaction failed");
        emit Executed(target, value, data);
        return result;
    }
}
