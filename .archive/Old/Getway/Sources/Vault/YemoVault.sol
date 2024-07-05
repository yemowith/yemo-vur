// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {BaseVault} from './Common/BaseVault.sol'; // MngdC kontratının yolu doğru olmalıdır.

contract YemoVault is BaseVault {
    constructor() public BaseVault() {}
}
