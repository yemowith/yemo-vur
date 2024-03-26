// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.20;

import "./imprt.sol";

contract setup {
    address public owner;
    string public _p = "Ymn";
    address public _dplr;

    // tools liste start
    address public adrsb;
    address public dplr;
    address public ddsp;
    address public eemt;
    address public lndrf;
    address public lndc;
    address public mdlr;

    // tools liste end

    bool private done = false;

    constructor(address _owner) {
        _dplr = address(new DPLR());
        owner = _owner;
    }

    function _makeADRSB() public returns (address) {
        uint256 _salt = uint256(keccak256(abi.encodePacked(_p)));
        bytes memory _b = abi.encodePacked(
            type(ADRSB).creationCode,
            abi.encode(owner)
        );
        adrsb = IDPLR(_dplr).dpl(_salt, _b);
        return adrsb;
    }

    function _makeDPLR() internal returns (address) {
        uint256 _salt = uint256(keccak256(abi.encodePacked(_p)));
        bytes memory _b = abi.encodePacked(type(DPLR).creationCode);
        dplr = IDPLR(_dplr).dpl(_salt, _b);
        return dplr;
    }

    function _makeDDSP() internal returns (address) {
        uint256 _salt = uint256(keccak256(abi.encodePacked(_p)));
        bytes memory _b = abi.encodePacked(type(DDSPF).creationCode);
        ddsp = IDPLR(_dplr).dpl(_salt, _b);
        return ddsp;
    }

    function _makeEEMT() public returns (address) {
        uint256 _salt = uint256(keccak256(abi.encodePacked(_p)));
        bytes memory _b = abi.encodePacked(type(EEMT).creationCode);
        eemt = IDPLR(_dplr).dpl(_salt, _b);
        return eemt;
    }

    function _makeLNDRF() internal returns (address) {
        uint256 _salt = uint256(keccak256(abi.encodePacked(_p)));
        bytes memory _b = abi.encodePacked(type(LNDRF).creationCode);
        lndrf = IDPLR(_dplr).dpl(_salt, _b);
        return lndrf;
    }

    function _makeLNDC() internal returns (address) {
        uint256 _salt = uint256(keccak256(abi.encodePacked(_p)));
        bytes memory _b = abi.encodePacked(type(LNDC).creationCode);
        lndc = IDPLR(_dplr).dpl(_salt, _b);
        return lndc;
    }

    function _makeMDLR() internal returns (address) {
        uint256 _salt = uint256(keccak256(abi.encodePacked(_p)));
        bytes memory _b = abi.encodePacked(type(MDLR).creationCode);
        mdlr = IDPLR(_dplr).dpl(_salt, _b);
        return mdlr;
    }

    function stp() external returns (bool) {
        _makeADRSB();
        _makeDPLR();
        _makeDDSP();
        _makeEEMT();
        _makeLNDRF();
        _makeLNDC();
        _makeMDLR();

        IADRSB(adrsb).adrs("adrsb", adrsb);
        IADRSB(adrsb).adrs("dplr", dplr);
        IADRSB(adrsb).adrs("ddsp", ddsp);
        IADRSB(adrsb).adrs("eemt", eemt);
        IADRSB(adrsb).adrs("lndrf", lndrf);
        IADRSB(adrsb).adrs("lndc", lndc);
        IADRSB(adrsb).adrs("mdlr", mdlr);

        done = true;
        return (true);
    }

    function addAddress(string memory _key, address _adrs) public {
        IADRSB(adrsb).adrs(_key, _adrs);
    }

    function gA()
        external
        view
        returns (address, address, address, address, address, address, address)
    {
        require(done, "First call setup");
        return (adrsb, dplr, ddsp, eemt, lndrf, lndc, mdlr);
    }
}
