// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "./SessionManagerTest.sol";
import "./VaultTest.sol";
import "./MockERC20.sol";

contract TestContractTest {
    SessionManagerTest public sessionManager;
    VaultTest public vault;
    MockERC20 public token;

    constructor() {
        // Deploy MockERC20 token
        token = new MockERC20("Mock Token", "MTK", 1000000);
        // Deploy SessionManagerTest
        sessionManager = new SessionManagerTest();
        // Deploy VaultTest
        vault = new VaultTest(address(token));
    }

    function runTests(
        address user1,
        address user2,
        uint256 sessionDuration,
        uint256 depositAmount1,
        uint256 withdrawAmount1,
        uint256 depositAmount2,
        uint256 withdrawAmount2
    ) external {
        // Start session for user1
        sessionManager.startSession(sessionDuration);
        // Encode deposit function data for user1
        bytes memory depositData1 = abi.encodeWithSelector(vault.deposit.selector, depositAmount1);
        // Execute deposit transaction in session for user1
        sessionManager.executeTransaction(address(vault), depositData1);

        // Encode withdraw function data for user1
        bytes memory withdrawData1 = abi.encodeWithSelector(vault.withdraw.selector, withdrawAmount1);
        // Execute withdraw transaction in session for user1
        sessionManager.executeTransaction(address(vault), withdrawData1);

        // End session for user1
        sessionManager.endSession();

        // Start session for user2
        sessionManager.startSession(sessionDuration);
        // Encode deposit function data for user2
        bytes memory depositData2 = abi.encodeWithSelector(vault.deposit.selector, depositAmount2);
        // Execute deposit transaction in session for user2
        sessionManager.executeTransaction(address(vault), depositData2);

        // Encode withdraw function data for user2
        bytes memory withdrawData2 = abi.encodeWithSelector(vault.withdraw.selector, withdrawAmount2);
        // Execute withdraw transaction in session for user2
        sessionManager.executeTransaction(address(vault), withdrawData2);

        // End session for user2
        sessionManager.endSession();
    }
}
