// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./Ykit/ADRSB.sol";
import "./Ykit/DPLR.sol";
import "./Ykit/DDSP.sol";

contract WYK {
    address public adrsb;
    ADRSB public ADRSB_;
    DPLR public DPLR_;
    DDSP public DDSP_;

    constructor(address _a) {
        ADRSB_ = ADRSB(_a);
        DPLR_ = DPLR(ADRSB_.gAdrs("dplr"));
        DDSP_ = DDSP(payable(ADRSB_.gAdrs("ddsp")));
    }
}
