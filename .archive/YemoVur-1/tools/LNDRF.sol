// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "./LNDC.sol";

contract LNDRF {
    struct LenderInfo {
        LNDC lenderContract;
        string name;
        address owner;
    }

    constructor() {}

    LenderInfo[] public lenders;
    mapping(address => uint[]) public ownerToLenders;

    event LenderCreated(
        address indexed owner,
        address lenderAddress,
        string name
    );

    function createLender(string memory name) public {
        LNDC newLender = new LNDC();
        lenders.push(LenderInfo(newLender, name, msg.sender));
        uint index = lenders.length - 1;
        ownerToLenders[msg.sender].push(index);
        emit LenderCreated(msg.sender, address(newLender), name);
    }

    function getLender(
        uint index
    )
        public
        view
        returns (address lenderAddress, string memory name, address owner)
    {
        LenderInfo storage lender = lenders[index];
        return (address(lender.lenderContract), lender.name, lender.owner);
    }

    function getLendersByOwner(
        address owner
    ) public view returns (LenderInfo[] memory) {
        uint[] storage indices = ownerToLenders[owner];
        LenderInfo[] memory result = new LenderInfo[](indices.length);
        for (uint i = 0; i < indices.length; i++) {
            result[i] = lenders[indices[i]];
        }
        return result;
    }

    function transferTokensBetweenLenders(
        address tokenAddress,
        uint senderLenderIndex,
        uint receiverLenderIndex,
        uint256 amount
    ) public {
        require(
            senderLenderIndex < lenders.length,
            "Sender lender does not exist."
        );
        require(
            receiverLenderIndex < lenders.length,
            "Receiver lender does not exist."
        );
        LenderInfo storage senderLender = lenders[senderLenderIndex];
        LenderInfo storage receiverLender = lenders[receiverLenderIndex];

        // Gönderici lender'ın sahibi tarafından çağrıldığından emin olun
        require(
            msg.sender == senderLender.owner,
            "Only the sender lender's owner can initiate the transfer."
        );

        IERC20 token = IERC20(tokenAddress);
        // Token transferi için ERC20 kontratının transferFrom fonksiyonunu kullan
        bool success = token.transferFrom(
            address(senderLender.lenderContract),
            address(receiverLender.lenderContract),
            amount
        );
        require(success, "Token transfer failed.");
    }
}
