// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

/**
 * @title Deployer
 * @dev This contract uses CREATE2 for deploying contracts, allowing for predictable address computation.
 * It provides detailed events for tracking deployments.
 */
contract Deployer {
    // Event that is emitted after a contract is successfully deployed using CREATE2.
    event ContractDeployed(
        address indexed deployer,
        address indexed contractAddress,
        bytes32 salt
    );

    /**
     * @dev Computes the address for a contract to be deployed via CREATE2, without actually deploying it.
     * @param _bytecode The bytecode of the contract to be deployed.
     * @param _salt A bytes32 salt value used to compute the address.
     * @return computedAddress The precomputed address of the contract if deployed with the provided bytecode and salt.
     */
    function deploy(
        bytes memory _bytecode,
        bytes32 _salt
    ) public view returns (address) {
        return _computeAddress(_bytecode, _salt);
    }

    /**
     * @dev Computes the address for a contract to be deployed via CREATE2.
     * @param _bytecode The bytecode of the contract to be deployed.
     * @param _salt A bytes32 salt value used to compute the address.
     * @return computedAddress The precomputed address of the contract if deployed with the provided bytecode and salt.
     */
    function _computeAddress(
        bytes memory _bytecode,
        bytes32 _salt
    ) public view returns (address) {
        bytes32 hash = keccak256(
            abi.encodePacked(
                bytes1(0xff),
                address(this),
                _salt,
                keccak256(_bytecode)
            )
        );

        return address(uint160(uint256(hash)));
    }

    /**
     * @dev Private function that actually deploys a contract using CREATE2.
     * @param _bytecode The bytecode of the contract to be deployed.
     * @param _salt A bytes32 salt value used to create a deterministic address.
     * @return contractAddress The address of the deployed contract.
     */
    function _deploy(
        bytes memory _bytecode,
        bytes32 _salt
    ) private returns (address) {
        address contractAddress;

        // Ensures that the bytecode is not empty
        require(_bytecode.length != 0, 'Bytecode length is zero');

        // Inline assembly is used to access the CREATE2 opcode directly.
        assembly {
            contractAddress := create2(
                0,
                add(_bytecode, 0x20),
                mload(_bytecode),
                _salt
            )
        }

        // Ensure that the contract was successfully deployed.
        require(contractAddress != address(0), 'Failed to deploy contract');

        // Emitting an event with the deployer address, contract address, and the salt used.
        emit ContractDeployed(msg.sender, contractAddress, _salt);

        return contractAddress;
    }

    /**
     * @dev Public function to initiate the deployment of a contract.
     * @param _bytecode The bytecode of the contract to be deployed.
     * @param _salt A bytes32 salt value used to create a deterministic address.
     * @return contractAddress The address of the deployed contract.
     */
    function initiateDeployment(
        bytes memory _bytecode,
        bytes32 _salt
    ) public returns (address) {
        return _deploy(_bytecode, _salt);
    }
}
