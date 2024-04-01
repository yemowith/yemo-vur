// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./Ykit/ADRSB.sol";
import "./Ykit/DPLR.sol";

contract WYK {
    address public adrsb;
    ADRSB public ADRSB_;
    DPLR public DPLR_;

    constructor(address _a) {
        ADRSB_ = ADRSB(_a);
        DPLR_ = DPLR(ADRSB_.gAdrs("dplr"));
    }
}
