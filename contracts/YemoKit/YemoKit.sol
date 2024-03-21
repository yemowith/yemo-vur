// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.20;

import "./Helpers/EEMT.sol";
import "./Helpers/ADRSB.sol";
import "./Helpers/STG.sol";
import "./Helpers/DPLR.sol";
import "./Helpers/DDSP.sol";
import "./Helpers/PY.sol";
import "./Helpers/Onlntd.sol";

interface IYemoKit {
    function init() external returns (bool);
    function dply(
        bytes memory _bytecode,
        string memory _salt
    ) external payable returns (address);
    function exe(
        address _target,
        bytes memory _data
    ) external payable returns (bytes memory response);
    function evt(
        string calldata sub,
        string calldata data
    ) external returns (bool);
    function dplyPY(address _owner) external returns (address);

    function addCBTCD(bytes32 _key, bytes memory _data) external returns (bool);
}

contract YemoKit is Onl {
    address public eemt; // events
    address public dplr; // deployer
    address public dsspf; // DSSProxy factory Contract (factory) // IDSSP
    address public stg; // EEMT
    address public adrsb; // Address book

    mapping(address => address) public pys;

    constructor(address _owner) {
        owner = _owner;
    }

    function init() external returns (bool) {
        _init();
        return true;
    }

    function dply(
        bytes memory _bytecode,
        string memory _salt
    ) external payable onlyInited returns (address) {
        return _dply(_bytecode, _salt);
    }

    function exe(
        address _target,
        bytes memory _data
    ) external payable returns (bytes memory response) {
        bytes memory tempResponse = IDDSP(dsspf).execute{value: msg.value}(
            _target,
            _data
        );
        IEEMT(eemt).emitEvent("DP", "Yemo deployed");

        return tempResponse;
    }

    function evt(
        string calldata sub,
        string calldata data
    ) external onlyInited returns (bool) {
        IEEMT(eemt).emitEvent(sub, data);
        return true;
    }

    function dplyPY(address _owner) external onlyInited returns (address) {
        bytes memory bytecode = abi.encodePacked(
            type(PY).creationCode,
            abi.encode(_owner)
        );
        address py = _dply(bytecode, "PY");
        _addPY(py);
        return py;
    }

    function addCBTCD(
        bytes32 _key,
        bytes memory _data
    ) external onlyInited returns (bool) {
        ISTG(stg).storeData(_key, _data);
        return true;
    }

    function _dply(
        bytes memory _bytecode,
        string memory _salt
    ) internal onlyInited returns (address) {
        address addr = IDPLR(dplr).deploy(_bytecode, _salt);
        IEEMT(eemt).emitEvent("DP", "Yemo deployed");
        return addr;
    }

    function _addPY(address _py) internal onlyInited {
        pys[_py] = address(0);
    }

    function _init() internal {
        require(address(eemt) == address(0), "Already inited");
        eemt = address(new EEMT(owner));
        dplr = address(new DPLR());
        dsspf = address(new DDSPF());
        stg = address(new STG(owner));
        adrsb = address(new ADRSB(owner));
        intd = true;
    }

    function kill() external onlyInited {
        require(msg.sender == owner, "Only owner can kill");
        selfdestruct(payable(owner));
    }
}
