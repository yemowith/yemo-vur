// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.20;

import "./Helpers/EEMT.sol";
import "./Helpers/ADRSB.sol";
import "./Helpers/STG.sol";
import "./Helpers/DPLR.sol";
import "./Helpers/DDSP.sol";
import "./Helpers/PY.sol";
import "./Helpers/Onlntd.sol";

import "./Modules/vat/VATModule.sol";

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

    function getEEMT() external view returns (address);
    function getDPLR() external view returns (address);
    function getSTG() external view returns (address);
    function getDSSPF() external view returns (address);
    function getADRSB() external view returns (address);
    function getWETH() external view returns (address);
}

contract YemoKit is Onl {
    address public eemt; // events
    address public dplr; // deployer
    address public dsspf; // DSSProxy factory Contract (factory) // IDSSP
    address public stg; // EEMT
    address public adrsb; // Address book
    address public weth; // WETH address

    mapping(address => address) public pys;

    address public vatModule;
    VATModule public vat;

    constructor(address _owner) {
        owner = _owner;
    }

    function getWETH() external view returns (address) {
        return weth;
    }

    function getEEMT() external view returns (address) {
        return eemt;
    }

    function getDSSPF() external view returns (address) {
        return dsspf;
    }

    function getDPLR() external view returns (address) {
        return dplr;
    }

    function getSTG() external view returns (address) {
        return stg;
    }

    function getADRSB() external view returns (address) {
        return adrsb;
    }

    function init(address _weth) external returns (bool) {
        weth = _weth;
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
        return IDPLR(dplr).getLastAddress();
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
        address addr = address(IDPLR(dplr).deploy(_bytecode, _salt));
        IEEMT(eemt).emitEvent("DP", "Yemo deployed");
        return addr;
    }

    function _addPY(address _py) internal onlyInited {
        pys[_py] = address(0);
    }

    function _newVAT() internal onlyInited {
        vatModule = address(new VATModule(this));
        vat = VATModule(vatModule);
    }

    function _init() internal {
        require(address(eemt) == address(0), "Already inited");
        eemt = address(new EEMT(owner));
        dplr = address(new DPLR());

        dsspf = address(new DDSPF());
        stg = address(new STG(owner));
        adrsb = address(new ADRSB(owner));

        vat = address(new VATModule(this));
        intd = true;
    }
}
