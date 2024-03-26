// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "./imprt.sol";

contract YV is WYK {
    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    constructor(address _owner, address _a) WYK(_a) {
        owner = _owner;
    }
}
