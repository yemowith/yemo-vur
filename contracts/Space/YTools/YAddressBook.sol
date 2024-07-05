// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.20;

import "../Helper/Ownable.sol";

interface IYAddressBook {
    function setAddress(
        string memory _key,
        address _address
    ) external returns (bool);
    function getAddress(string memory _key) external view returns (address);
}

contract YAddressBook is Ownable {
    mapping(string => address) public addressStore;

    constructor() {
        owner = msg.sender;
    }

    function _storeAddress(
        string memory _key,
        address _address
    ) internal returns (bool) {
        addressStore[_key] = _address;
        return true;
    }

    function getAddress(string memory _key) external view returns (address) {
        return addressStore[_key];
    }

    function setAddress(
        string memory _key,
        address _address
    ) external onlyOwner returns (bool) {
        _storeAddress(_key, _address);
        return true;
    }
}
