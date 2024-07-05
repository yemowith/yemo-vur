// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { Ownable, Initializable, AdminAble, Pausable, Lockable } from "../../Helpers/abilities.sol";

contract BaseAccount is Ownable, Pausable, AdminAble, Lockable {
    address private getwayAddress;

    constructor(address _getwayAddress) {
        require(_getwayAddress != address(0), "Getway address cannot be zero.");
        getwayAddress = _getwayAddress;
    }
}
