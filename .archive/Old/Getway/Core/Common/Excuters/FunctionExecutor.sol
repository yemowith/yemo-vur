// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract FunctionExecutor {
    function prepareFunctionCall(
        address _target,
        string memory _functionSignature,
        bytes memory _params
    ) public pure reiturns (bytes memory) {
        // Encoding the function signature
        bytes4 functionSelector = bytes4(keccak256(bytes(_functionSignature)));

        // Preparing the full payload: selector followed by parameters
        return abi.encodePacked(functionSelector, _params);
    }

    function executeCall(address _target, bytes memory _data) public payable {
        // External call to the target address using the provided data
        (bool success, bytes memory returnData) = _target.call{
            value: msg.value
        }(_data);
        require(success, "Function call failed");
    }
}
