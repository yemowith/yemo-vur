// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "./Onlntd.sol";

interface IADRSBA {
    function adrs(bytes32 _key, address _adrs) external returns (bool);
}

contract ADRSBA is Onlntd {
    address public owner;
    mapping(bytes32 => address) public dataStore;
    constructor(address _owner) {
        owner = _owner;
    }

    // Veri ekleme
    function _storeData(bytes32 _key, address _adrs) internal returns (bool) {
        dataStore[_key] = _adrs;
    }

    function adrs(
        bytes32 _key,
        address _adrs
    ) external onlyInited returns (bool) {
        _storeData(_key, _adrs);
        return true;
    }
}
