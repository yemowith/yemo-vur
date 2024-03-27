// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Ownable, Initializable, AdminAble, Pausable, IOwnable, IInitializable, IAdminAble, IPausable} from "../abilities.sol";
import {IModuleRegistry} from "./ModuleRegistry.sol";

interface IBaseModule is IAdminAble, IOwnable, IInitializable {
    function getCode() external view returns (string memory);
    function getName() external view returns (string memory);
    function getGroupName() external view returns (string memory);
    function isInternal() external view returns (bool);
    function setGroupName(string memory groupName) external;
    function initialize(address modelRegistery) external;
}

contract BaseModule is AdminAble, Ownable, Initializable {
    string private _code;
    string private _name;
    string private _groupName = "SYS";
    bool private _isInternal;
    address private _modelRegistery;

    constructor(string memory code, string memory name, bool isInternal) {
        _code = code;
        _name = name;
        _isInternal = isInternal;
    }

    function getCode() public view returns (string memory) {
        return _code;
    }

    function getName() public view returns (string memory) {
        return _name;
    }

    function getGroupName() public view returns (string memory) {
        return _groupName;
    }

    function isInternal() public view returns (bool) {
        return _isInternal;
    }

    // groupName'i dışarıdan değiştirebilmek için bir fonksiyon
    function setGroupName(string memory groupName) public {
        _groupName = groupName;
    }

    function _registerSelf() internal {
        IModuleRegistry(_modelRegistery).addModule(
            _code,
            _name,
            _groupName,
            _isInternal,
            address(this)
        );
    }

    function initialize(address modelRegistery) external {
        _modelRegistery = modelRegistery;
        _registerSelf();
    }
}
