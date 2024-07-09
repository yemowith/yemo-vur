// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

interface IYKitProxy {
    function setImplementation(address _implementation) external;
    function changeOwner(address _newOwner) external;
}

contract ContractFactory is Ownable {
    struct ContractInfo {
        bytes bytecode;
        bool exists;
        uint256 index; // Added auto index
    }

    mapping(string => ContractInfo) private contractRegistry;
    string[] private contractNames; // Array to keep track of contract names

    event ContractRegistered(string indexed name, bytes bytecode);
    event ContractDeployed(
        string indexed name,
        address indexed implementationAddress,
        address indexed proxyAddress
    );

    constructor() Ownable(msg.sender) {}

    function registerContract(
        string memory name,
        bytes memory bytecode
    ) external onlyOwner {
        require(
            !contractRegistry[name].exists,
            "Contract with this name already registered"
        );

        contractRegistry[name] = ContractInfo({
            bytecode: bytecode,
            exists: true,
            index: contractNames.length // Set index to the current length of contractNames array
        });

        contractNames.push(name); // Add the contract name to the array

        emit ContractRegistered(name, bytecode);
    }

    function _deployContract(
        string memory name,
        bytes memory constructorArgs
    ) internal onlyOwner returns (address, address) {
        ContractInfo memory contractInfo = contractRegistry[name];
        require(contractInfo.exists, "Contract not registered");

        bytes memory bytecode;
        if (constructorArgs.length > 0) {
            bytecode = abi.encodePacked(contractInfo.bytecode, constructorArgs);
        } else {
            bytecode = contractInfo.bytecode;
        }

        address implementationAddress;
        assembly {
            implementationAddress := create(
                0,
                add(bytecode, 0x20),
                mload(bytecode)
            )
            if iszero(extcodesize(implementationAddress)) {
                revert(0, 0)
            }
        }

        // Deploy proxy contract
        address proxyAddress = address(new YKitProxy());

        // Set the implementation of the proxy to the deployed contract
        IYKitProxy(proxyAddress).setImplementation(implementationAddress);

        emit ContractDeployed(name, implementationAddress, proxyAddress);
        return (implementationAddress, proxyAddress);
    }

    function deployContract(
        string memory name,
        bytes memory constructorArgs
    ) public onlyOwner returns (address, address) {
        return _deployContract(name, constructorArgs);
    }

    function getContractInfo(
        string memory name
    ) external view returns (bytes memory bytecode) {
        ContractInfo memory contractInfo = contractRegistry[name];
        require(contractInfo.exists, "Contract not registered");

        return contractInfo.bytecode;
    }

    function getContractNames() external view returns (string[] memory) {
        return contractNames;
    }
}

contract YKitProxy is Ownable {
    address public implementation;

    event Received(uint indexed value, address indexed sender, bytes data);

    constructor() Ownable(msg.sender) {}

    fallback() external payable {
        address target = implementation;
        require(target != address(0), "Implementation not set");
        assembly {
            calldatacopy(0, 0, calldatasize())
            let result := delegatecall(gas(), target, 0, calldatasize(), 0, 0)
            returndatacopy(0, 0, returndatasize())
            switch result
            case 0 {
                revert(0, returndatasize())
            }
            default {
                return(0, returndatasize())
            }
        }
    }

    receive() external payable {
        emit Received(msg.value, msg.sender, "");
    }

    function setImplementation(address _implementation) external onlyOwner {
        implementation = _implementation;
    }
}
