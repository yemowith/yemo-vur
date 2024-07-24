// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

contract AccountExecutor {
    address public owner;

    event Executed(address indexed target, uint256 value, bytes data);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function changeOwner(address newOwner) external onlyOwner {
        owner = newOwner;
    }

    function execute(
        address target,
        uint256 value,
        bytes calldata data
    ) external onlyOwner returns (bool, bytes memory) {
        (bool success, bytes memory result) = target.call{value: value}(data);
        require(success, "Execution failed");
        emit Executed(target, value, data);
        return (success, result);
    }

    function executeStatic(
        address target,
        bytes calldata data
    ) external view onlyOwner returns (bool, bytes memory) {
        (bool success, bytes memory result) = target.staticcall(data);
        require(success, "Static execution failed");

        return (success, result);
    }
}
