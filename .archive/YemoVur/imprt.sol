// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.20;

import "./tools/DPLR.sol";
import "./tools/DDSP.sol";
import "./tools/EEMT.sol";
import "./tools/ADRSB.sol";
import "./tools/LNDRF.sol";
import "./tools/LNDC.sol";
import "./tools/MDLR.sol";
import "./tools/ADRSB.sol";

contract WYK {
    address public adrsb;
    ADRSB public ADRSB_;
    DPLR public DPLR_;
    DDSP public DDSP_;
    LNDRF public LNDRF_;
    LNDC public LNDC_;
    MDLR public MDLR_;

    address public WETH_;

    constructor(address _a) {
        ADRSB_ = ADRSB(_a);
        DPLR_ = DPLR(ADRSB_.gAdrs("dplr"));
        DDSP_ = DDSP(payable(ADRSB_.gAdrs("ddsp")));
        LNDRF_ = LNDRF(ADRSB_.gAdrs("lndrf"));
        LNDC_ = LNDC(payable(ADRSB_.gAdrs("lndc")));
        MDLR_ = MDLR(ADRSB_.gAdrs("mdlr"));
        WETH_ = ADRSB_.gAdrs("weth");
    }

    function adrsOf(string memory key) public view returns (address) {
        return ADRSB_.gAdrs(key);
    }
}
