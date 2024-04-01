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

interface IADRSB {
    function adrs(string memory _key, address _adrs) external returns (bool);
    function gAdrs(string memory _key) external view returns (address);
}

contract ADRSB is Onl {
    mapping(string => address) public dataStore;

    function _storeData(
        string memory _key,
        address _adrs
    ) internal returns (bool) {
        dataStore[_key] = _adrs;
    }

    function gAdrs(string memory _key) external view returns (address) {
        return dataStore[_key];
    }

    function adrs(string memory _key, address _adrs) external returns (bool) {
        _storeData(_key, _adrs);
        return true;
    }
}
