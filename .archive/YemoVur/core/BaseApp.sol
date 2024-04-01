// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ModuleRegistry} from "./imprt.sol";

contract BaseApp {
    ModuleRegistry private _moduleRegistry;

    constructor(address moduleRegistryAddress) {
        _moduleRegistry = ModuleRegistry(moduleRegistryAddress);
    }

    function init() public {}
}
