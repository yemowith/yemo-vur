// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { YemoVault } from "./YemoVault.sol";
import { Proxy } from "../../Core/Common/Proxies/Proxy.sol";

contract VaultFactory {
    event VaultCreated(
        address indexed vaultAddress,
        address indexed creator,
        address indexed proxyAddress
    );
    // This function uses create2 for deterministic address generation
    function createVault(bytes32 salt) public returns (address, address) {
        // Define bytecode of the contract to be deployed
        // Assuming YemoVault bytecode is available or can be generated
        bytes memory bytecode = type(YemoVault).creationCode;

        address vaultAddress;

        // Using create2 for deploying the contract with a deterministic address
        assembly {
            vaultAddress := create2(
                0,
                add(bytecode, 0x20),
                mload(bytecode),
                salt
            )
        }

        require(vaultAddress != address(0), "Failed to create the vault");

        // Deploy a new Proxy contract for the created vault
        Proxy proxy = new Proxy(vaultAddress);

        emit VaultCreated(vaultAddress, msg.sender, address(proxy));

        return (vaultAddress, address(proxy));
    }
}
