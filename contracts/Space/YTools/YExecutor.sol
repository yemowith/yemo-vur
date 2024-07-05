// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../Helper/Ownable.sol";

interface IYExecutor {
    function execute(
        address target,
        bytes memory data
    ) external returns (bytes memory);
    function multiExecute(
        address[] memory targets,
        bytes[] memory data
    ) external returns (bytes[] memory);
    function call(
        address target,
        bytes memory data
    ) external returns (bytes memory);
    function callStatic(
        address target,
        bytes memory data
    ) external view returns (bytes memory);
}

contract YExecutor is Ownable {
    constructor() {
        owner = msg.sender;
    }

    function _execute(
        address target,
        bytes memory data
    ) internal returns (bytes memory) {
        (bool success, bytes memory result) = target.call(data);
        require(success, "Execution failed");
        return result;
    }

    function execute(
        address target,
        bytes memory data
    ) external onlyOwner returns (bytes memory) {
        return _execute(target, data);
    }

    function multiExecute(
        address[] memory targets,
        bytes[] memory data
    ) external onlyOwner returns (bytes[] memory) {
        require(
            targets.length == data.length,
            "Targets and data length mismatch"
        );
        bytes[] memory results = new bytes[](targets.length);
        for (uint256 i = 0; i < targets.length; i++) {
            results[i] = _execute(targets[i], data[i]);
        }
        return results;
    }

    function call(
        address target,
        bytes memory data
    ) external onlyOwner returns (bytes memory) {
        (bool success, bytes memory result) = target.call(data);
        require(success, "Call failed");
        return result;
    }

    function callStatic(
        address target,
        bytes memory data
    ) external view onlyOwner returns (bytes memory) {
        (bool success, bytes memory result) = target.staticcall(data);
        require(success, "Static call failed");
        return result;
    }

    function getEncodedData(
        string memory signature,
        bytes memory params
    ) external pure returns (bytes memory) {
        return abi.encodeWithSignature(signature, params);
    }

    function getEncodedData(
        address target,
        string memory signature,
        bytes memory params
    ) external pure returns (address, bytes memory) {
        return (target, abi.encodeWithSignature(signature, params));
    }
}
