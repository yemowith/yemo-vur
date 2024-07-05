// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.20;

import "../Helper/Ownable.sol";

interface IYStorage {
    function setData(string memory key, string memory value) external;
    function getData(string memory key) external view returns (string memory);
}

contract YStorage is Ownable {
    mapping(string => bytes) private dataStorage;

    constructor() {
        owner = msg.sender;
    }

    function _setData(
        string memory key,
        bytes memory value
    ) internal onlyOwner {
        dataStorage[key] = value;
    }

    function _getData(string memory key) internal view returns (bytes memory) {
        return dataStorage[key];
    }

    function getData(string memory key) external view returns (bytes memory) {
        return _getData(key);
    }

    function setData(string memory key, bytes memory value) external onlyOwner {
        _setData(key, value);
    }
}
