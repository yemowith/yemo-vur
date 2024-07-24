// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "./Managers/AccountManager/AccountManager.sol";
import "./Managers/RelayerManager/RelayerManager.sol";

contract YKitWalletFactory {
    address public accountManager;
    address public relayerManager;

    event AccountManagerDeployed(address indexed accountManager);
    event RelayerManagerDeployed(address indexed relayerManager);

    constructor() {}

    function deployAccountManager() external returns (address) {
        AccountManager newAccountManager = new AccountManager();
        accountManager = address(newAccountManager);
        emit AccountManagerDeployed(accountManager);
        return accountManager;
    }

    function deployRelayerManager(
        address _accountManager
    ) external returns (address) {
        require(
            accountManager != address(0),
            "AccountManager must be deployed first"
        );
        RelayerManager newRelayerManager = new RelayerManager(_accountManager);
        relayerManager = address(newRelayerManager);
        emit RelayerManagerDeployed(relayerManager);
        return relayerManager;
    }
}
