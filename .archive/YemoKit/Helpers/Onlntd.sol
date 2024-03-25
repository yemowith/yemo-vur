// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.20;

abstract contract Onlntd {
    bool public intd = false;

    modifier onlyInited() {
        require(intd, "Not inited");
        _;
    }
}

abstract contract OnlOwnr {
    address public owner;

    modifier onlyOwnr() {
        require(msg.sender == owner, "Not owner");
        _;
    }
}

abstract contract Onl is Onlntd, OnlOwnr {}
