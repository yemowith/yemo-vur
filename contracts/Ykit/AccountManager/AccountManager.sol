// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./AccountExecutor.sol";
import "./AccountProxy.sol";

contract AccountManager is Ownable {
    mapping(address => address) public accounts;
    mapping(address => bool) public whitelist;

    event AccountCreated(address indexed owner, address account);
    event AccountWhitelisted(address indexed account);
    event AccountRemovedFromWhitelist(address indexed account);

    constructor() Ownable(payable(msg.sender)) {}

    function createAccount() external {
        require(accounts[msg.sender] == address(0), "Account already exists");

        AccountProxy proxy = new AccountProxy();
        AccountExecutor executor = new AccountExecutor();

        proxy.setImplementation(address(executor));
        //proxy.transferOwnership(msg.sender); // Ownership transfer to the user

        accounts[msg.sender] = address(proxy);

        emit AccountCreated(msg.sender, address(proxy));
    }

    function addToWhitelist(address account) external onlyOwner {
        whitelist[account] = true;
        emit AccountWhitelisted(account);
    }

    function removeFromWhitelist(address account) external onlyOwner {
        whitelist[account] = false;
        emit AccountRemovedFromWhitelist(account);
    }

    function executeByAccount(
        address account,
        address target,
        uint256 value,
        bytes calldata data
    ) external onlyWhitelisted(account) returns (bytes memory) {
        address proxy = accounts[account];
        require(proxy != address(0), "Account does not exist");

        bool success;
        bytes memory result;
        bytes memory callData = abi.encodeWithSignature(
            "execute(address,uint256,bytes)",
            target,
            value,
            data
        );

        assembly {
            let dataLength := mload(callData)
            let dataPtr := add(callData, 0x20)

            success := call(gas(), proxy, 0, dataPtr, dataLength, 0, 0)

            let size := returndatasize()
            result := mload(0x40)
            mstore(0x40, add(result, and(add(size, 0x20), not(0x1f))))
            mstore(result, size)
            returndatacopy(add(result, 0x20), 0, size)
        }

        /*
        (bool success, bytes memory result) = AccountProxy(payable(proxy))
            .execute(target, data);
            */

        require(success, "Transaction failed");
        return result;
    }

    function executeStaticByAccount(
        address account,
        address target,
        bytes calldata data
    ) external view onlyWhitelisted(account) returns (bytes memory) {
        address proxy = accounts[account];
        require(proxy != address(0), "Account does not exist");

        bool success;
        bytes memory result;
        bytes memory callData = abi.encodeWithSignature(
            "executeStatic(address,bytes)",
            target,
            data
        );

        assembly {
            let dataLength := mload(callData)
            let dataPtr := add(callData, 0x20)

            success := staticcall(gas(), proxy, dataPtr, dataLength, 0, 0)

            let size := returndatasize()
            result := mload(0x40)
            mstore(0x40, add(result, and(add(size, 0x20), not(0x1f))))
            mstore(result, size)
            returndatacopy(add(result, 0x20), 0, size)
        }

        /*
        // prettier-ignore
        (bool success, bytes memory result) = AccountProxy(payable(proxy)).executeStatic(
            target,
            data
        );
         */

        require(success, "Static call failed");
        return result;
    }

    modifier onlyWhitelisted(address account) {
        require(whitelist[account], "Account not whitelisted");
        _;
    }
}
