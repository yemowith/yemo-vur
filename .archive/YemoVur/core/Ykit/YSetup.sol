// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.20;

import "./imprt.sol";

contract YSetup {
    address public owner;
    string public _p = "Ymn";
    address public _dplr;

    address public adrsb;
    address public dplr;
    address public ddsp;

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

    function stp() external returns (bool) {
        _makeADRSB();
        _makeDPLR();
        _makeDDSP();

        IADRSB(adrsb).adrs("adrsb", adrsb);
        IADRSB(adrsb).adrs("dplr", dplr);
        IADRSB(adrsb).adrs("ddsp", ddsp);

        done = true;
        return (true);
    }

    function addAddress(string memory _key, address _adrs) public {
        IADRSB(adrsb).adrs(_key, _adrs);
    }

    function gA() external view returns (address, address, address) {
        require(done, "First call setup");
        return (adrsb, dplr, ddsp);
    }
}
