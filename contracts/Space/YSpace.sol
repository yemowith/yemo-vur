// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.20;

import "./YTools/YAddressBook.sol";
import "./YTools/YEncoder.sol";
import "./YTools/YExecutor.sol";
import "./YTools/YDeployer.sol";
import "./YTools/YStorage.sol";
import "./Helper/Adminable.sol";

interface IYProxy {
    function setImplementation(address _implementation) external;
    function changeOwner(address _newOwner) external;
}

contract YSpace is
    Adminable,
    YAddressBook,
    YEncoder,
    YExecutor,
    YDeployer,
    YStorage
{
    bytes32 private _defaultAdditionalParam;

    constructor() {
        owner = payable(msg.sender);
        superAdmin = msg.sender;
        //  _salt = keccak256(abi.encodePacked(block.timestamp));
        /*
        _defaultAdditionalParam = keccak256(
            abi.encodePacked(block.timestamp, block.number)
        );
        */
    }

    /*
        @dev set the salt
    */
    function changeSalt(bytes32 newSalt) external onlyOwner {
        _salt = newSalt;
    }

    /*
        @dev save a contract code by giving it codes and name it
    */
    function saveContractCode(
        bytes memory code,
        string memory name
    ) external onlyOwner {
        require(code.length > 0, "Code cannot be empty");
        require(bytes(name).length > 0, "Name cannot be empty");
        bytes memory encodedCode = _encode(code, _defaultAdditionalParam);
        _setData(name, encodedCode);
    }

    /*
        @dev deploy a proxy using a saved contract name and set its implementation
    */
    function deployAndSetProxy(
        string memory savedContractName,
        address newOwner
    ) external onlyOwner returns (address) {
        // Retrieve and decode the saved contract code
        bytes memory encodedCode = bytes(_getData(savedContractName));
        require(encodedCode.length > 0, "Saved contract code not found");
        bytes memory decodedCode = _decode(
            encodedCode,
            _defaultAdditionalParam
        );

        // Deploy the contract using the decoded code
        address deployedContract = _deploy(uint256(_salt), decodedCode);

        // Deploy the proxy
        address deployedProxy = _deployProxy(newOwner, savedContractName);

        // Set the implementation of the deployed proxy
        IYProxy(deployedProxy).setImplementation(deployedContract);

        _storeAddress(savedContractName, deployedProxy);

        return deployedProxy;
    }
}
