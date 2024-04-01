// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.20;

import "./DPLR.sol";
import "./ADRSB.sol";

contract WYK {
    address public adrsb;
    ADRSB public ADRSB_;
    DPLR public DPLR_;
    address public WETH_;

    constructor(address _a) {
        ADRSB_ = ADRSB(_a);
        DPLR_ = DPLR(ADRSB_.gAdrs("dplr"));
        WETH_ = payable(ADRSB_.gAdrs("weth"));
    }
}
