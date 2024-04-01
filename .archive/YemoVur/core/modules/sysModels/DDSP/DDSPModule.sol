// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../../BaseModule.sol";
import "./DDSP.sol";

contract DDSPModule is BaseModule, DDSPF {
    string private _code;
    string private _name;
    string private _groupName = "SYS";
    bool private _isInternal;

    constructor() BaseModule(_code, _name, _isInternal) {}
}
