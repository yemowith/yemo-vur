// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./import.sol";

contract N12 {
    N12Wlt public wallet;
    N12Factory public factory;
    AccountManager public accountManager;
    SessionManager public sessionManager;
    ETHLocker public ethLocker;
    ERC20Locker public erc20Locker;

    constructor() {}

    bool public initialized;

    function init() public {
        require(!initialized, "Already initialized");
        accountManager = new AccountManager();
        wallet = new N12Wlt();
        sessionManager = new SessionManager();
        ethLocker = new ETHLocker();
        factory = new N12Factory();
        initialized = true;
    }
}
