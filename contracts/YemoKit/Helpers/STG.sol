// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "./Onlntd.sol";

interface ISTG {
    struct STGD {
        bytes data;
        bytes32 group;
        uint vrs;
    }

    event DataStored(bytes32 indexed key, bytes32 group);

    function storeData(
        bytes32 _key,
        bytes memory _data
    ) external returns (bool);

    function retrieveData(bytes32 key) external view returns (STGD memory);
}

contract STG is Onlntd {
    address public owner;
    mapping(bytes32 => bytes) public dataStore;
    constructor(address _owner) {
        owner = _owner;
    }

    // Veri ekleme
    function _storeData(
        bytes32 _key,
        bytes memory _data
    ) internal returns (bool) {
        dataStore[_key] = _data;
    }

    // Veri çıkarma
    function _removeData(bytes32 _key) internal returns (bool) {
        require(dataStore[_key].length > 0, "Data not found");
        delete dataStore[_key];
    }

    function storeData(
        bytes32 _key,
        bytes memory _data
    ) external onlyInited returns (bool) {
        _storeData(_key, _data);
        return true;
    }
}
