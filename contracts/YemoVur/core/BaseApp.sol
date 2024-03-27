// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ModuleRegistry} from "./imprt.sol";

contract BaseApp {
    ModuleRegistry private _moduleRegistry;

    constructor(address moduleRegistryAddress) {
        _moduleRegistry = ModuleRegistry(moduleRegistryAddress);
    }

    function init() public {
        // Örnek olarak, iki modül ekleyelim
        _moduleRegistry.addModule(
            "module1",
            "Module 1",
            "Group 1",
            true,
            address(this)
        );
        _moduleRegistry.addModule(
            "module2",
            "Module 2",
            "Group 2",
            false,
            address(this)
        );
    }
}
