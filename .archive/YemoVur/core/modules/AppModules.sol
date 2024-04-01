// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ModuleRegistry} from "./ModuleRegistry.sol";
import {DDSPModule} from "./sysModels/DDSP/DDSPModule.sol";

contract AppModules {
    ModuleRegistry private _moduleRegistry;
    DDSPModule private _DDSPModule;

    constructor() {
        _moduleRegistry = new ModuleRegistry();
    }

    function init() public {}
}
