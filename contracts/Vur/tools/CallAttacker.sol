// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "./MultiCallBuilder.sol";
import "./Able.sol";

contract CallAttacker is Pausable, Lockable {
    MultiCallBuilder public multiCallBuilder;

    struct Call {
        address target;
        bytes callData;
    }
    constructor(address _multiCallBuilder) {
        multiCallBuilder = MultiCallBuilder(_multiCallBuilder);
    }

    function attack(
        Call[] memory calls
    ) external onlOwnr whenNotPaused whenNotLocked {
        for (uint256 i = 0; i < calls.length; i++) {
            //  multiCallBuilder.multiCall(calls[i]);
        }
    }

    function encodeAttack(
        address target,
        bytes memory data
    ) public pure returns (MultiCallBuilder.Call memory) {
        return MultiCallBuilder.Call({target: target, callData: data});
    }
}
