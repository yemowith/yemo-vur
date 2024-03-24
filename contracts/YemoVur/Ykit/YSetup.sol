// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.20;

import "./DPLR.sol";
import "./DDSP.sol";
import "./EEMT.sol";

contract YSetup {
    string public _p = "Ymn";
    address public _dplr;

    address public dplr;
    address public ddsp;
    address public eemt;

    bool private done = false;

    constructor() {
        _dplr = address(new DPLR());
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

    function stp() external returns (bool) {
        _makeDPLR();
        _makeDDSP();
        _makeEEMT();
        done = true;
        return (true);
    }

    function gA() external view returns (address, address, address) {
        require(done, "First call setup");
        return (dplr, ddsp, eemt);
    }
}
