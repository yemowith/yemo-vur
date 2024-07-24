// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

// YESpace contract
contract YESpace is Ownable {
    // Storage for data and addresses
    mapping(string => bytes) private dataStorage;
    mapping(string => address) private addressStore;
    // Salt for encoding/decoding
    bytes32 private _salt;

    event ContractDeployed(address deployedContract);
    event AddressStored(string key, address storedAddress);

    constructor() Ownable(msg.sender) {
        _salt = keccak256(abi.encodePacked(block.timestamp, msg.sender));
    }

    // Change the salt value
    function changeSalt(bytes32 newSalt) external onlyOwner {
        _salt = newSalt;
    }

    // Retrieve the salt value
    function getSalt() external view returns (bytes32) {
        return _salt;
    }

    // Save data with a given key
    function setData(string memory key, bytes memory value) external onlyOwner {
        dataStorage[key] = value;
    }

    // Retrieve data by key
    function getData(string memory key) external view returns (bytes memory) {
        return dataStorage[key];
    }

    // Save address with a given key
    function setAddress(string memory key, address addr) external onlyOwner {
        addressStore[key] = addr;
        emit AddressStored(key, addr);
    }

    // Retrieve address by key
    function getAddress(string memory key) external view returns (address) {
        return addressStore[key];
    }

    // Internal function to encode data
    function _encode(bytes memory data) internal view returns (bytes memory) {
        require(data.length > 0, "Data cannot be empty");
        return abi.encodePacked(data, _salt);
    }

    // External function to encode data
    function encode(bytes memory data) external view returns (bytes memory) {
        return _encode(data);
    }

    // Internal function to decode data
    function _decode(
        bytes memory encodedData
    ) internal view returns (bytes memory) {
        require(encodedData.length > 32, "Encoded data is too short");

        bytes32 extractedSalt;
        assembly {
            extractedSalt := mload(
                add(encodedData, sub(mload(encodedData), 31))
            )
        }

        require(extractedSalt == _salt, "Invalid encoding parameters");

        bytes memory decodedData = new bytes(encodedData.length - 32);
        for (uint256 i = 0; i < decodedData.length; i++) {
            decodedData[i] = encodedData[i];
        }
        return decodedData;
    }

    // External function to decode data
    function decode(
        bytes memory encodedData
    ) external view returns (bytes memory) {
        return _decode(encodedData);
    }

    // Internal function to deploy a contract
    function _deploy(bytes memory bytecode) internal returns (address) {
        address addr;
        bytes32 salt = keccak256(abi.encodePacked(_salt, block.timestamp));
        assembly {
            addr := create2(
                callvalue(), // wei sent with current call
                add(bytecode, 0x20), // Actual code starts after skipping the first 32 bytes
                mload(bytecode), // Load the size of code contained in the first 32 bytes
                salt // Salt from function arguments
            )
            if iszero(extcodesize(addr)) {
                revert(0, 0)
            }
        }
        emit ContractDeployed(addr);
        return address(addr);
    }

    // External function to deploy a contract
    function deploy(
        bytes memory bytecode
    ) external onlyOwner returns (address) {
        return _deploy(bytecode);
    }

    // Internal function to deploy a contract with custom salt and optional constructor parameters
    function _deployWithSalt(
        bytes memory bytecode,
        bytes32 customSalt,
        bytes memory constructorParams
    ) internal returns (address) {
        address addr;
        bytes memory bytecodeWithParams = abi.encodePacked(
            bytecode,
            constructorParams
        );
        bytes32 salt = keccak256(abi.encodePacked(_salt, customSalt));
        assembly {
            addr := create2(
                callvalue(), // wei sent with current call
                add(bytecodeWithParams, 0x20), // Actual code starts after skipping the first 32 bytes
                mload(bytecodeWithParams), // Load the size of code contained in the first 32 bytes
                salt // Custom salt from function arguments
            )
            if iszero(extcodesize(addr)) {
                revert(0, 0)
            }
        }
        emit ContractDeployed(addr);
        return address(addr);
    }

    // External function to deploy a contract with custom salt and optional constructor parameters
    function deployWithSalt(
        bytes memory bytecode,
        bytes32 customSalt,
        bytes memory constructorParams
    ) external onlyOwner returns (address) {
        return _deployWithSalt(bytecode, customSalt, constructorParams);
    }

    // Execute a function call on a target contract
    function execute(
        address target,
        bytes memory data
    ) external onlyOwner returns (bytes memory) {
        (bool success, bytes memory result) = target.call(data);
        require(success, "Execution failed");
        return result;
    }

    // Execute multiple function calls on target contracts
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
            (bool success, bytes memory result) = targets[i].call(data[i]);
            require(success, "Execution failed");
            results[i] = result;
        }
        return results;
    }

    // Execute a static function call on a target contract
    function executeStatic(
        address target,
        bytes memory data
    ) external view onlyOwner returns (bytes memory) {
        (bool success, bytes memory result) = target.staticcall(data);
        require(success, "Static call failed");
        return result;
    }

    // Struct for Call data
    struct Call {
        address target;
        bytes callData;
    }

    // Aggregate multiple calls
    function aggregate(
        Call[] calldata calls
    )
        public
        onlyOwner
        returns (uint256 blockNumber, bytes[] memory returnData)
    {
        blockNumber = block.number;
        returnData = new bytes[](calls.length);
        for (uint256 i = 0; i < calls.length; i++) {
            (bool success, bytes memory ret) = calls[i].target.call(
                calls[i].callData
            );
            require(success);
            returnData[i] = ret;
        }
    }

    // Struct for Call3 data
    struct Call3 {
        address target;
        bool allowFailure;
        bytes callData;
    }

    // Struct for Result data
    struct Result {
        bool success;
        bytes returnData;
    }

    // Aggregate multiple calls with failure handling
    function aggregate3(
        Call3[] calldata calls
    ) public payable onlyOwner returns (Result[] memory returnData) {
        uint256 length = calls.length;
        returnData = new Result[](length);
        Call3 calldata calli;
        for (uint256 i = 0; i < length; ) {
            Result memory result = returnData[i];
            calli = calls[i];
            (result.success, result.returnData) = calli.target.call(
                calli.callData
            );
            assembly {
                // Revert if the call fails and failure is not allowed
                // `allowFailure := calldataload(add(calli, 0x20))` and `success := mload(result)`
                if iszero(or(calldataload(add(calli, 0x20)), mload(result))) {
                    // set "Error(string)" signature: bytes32(bytes4(keccak256("Error(string)")))
                    mstore(
                        0x00,
                        0x08c379a000000000000000000000000000000000000000000000000000000000
                    )
                    // set data offset
                    mstore(
                        0x04,
                        0x0000000000000000000000000000000000000000000000000000000000000020
                    )
                    // set length of revert string
                    mstore(
                        0x24,
                        0x0000000000000000000000000000000000000000000000000000000000000017
                    )
                    // set revert string: bytes32(abi.encodePacked("Multicall3: call failed"))
                    mstore(
                        0x44,
                        0x4d756c746963616c6c333a2063616c6c206661696c6564000000000000000000
                    )
                    revert(0x00, 0x64)
                }
            }
            unchecked {
                ++i;
            }
        }
    }
}
