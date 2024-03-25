// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "../helpers/BaseMoldule.sol";

contract Swapper is BaseMoldule {
    uint256 public executeCount;

    constructor(address _owner) {
        owner = _owner;
        executeCount = 0;
    }

    function execute() external {
        executeCount += 1; // Her execute çağrısında executeCount'u artır
    }

    // Bu fonksiyon, kontrat sahibinin executeCount'u sıfırlamasına izin verir.
    function resetExecuteCount() external {
        require(
            msg.sender == owner,
            "Only the owner can reset the execute count."
        );
        executeCount = 0;
    }
}
