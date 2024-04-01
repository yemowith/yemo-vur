// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

import {IConnext} from "@connext/interfaces/core/IConnext.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {BaseMoldule} from "../helpers/BaseMoldule.sol";

interface IWETH {
    function deposit() external payable;
    function withdraw(uint256) external;
    function approve(address spender, uint wad) external returns (bool);
    function transfer(address dst, uint wad) external returns (bool);
}

contract BridgerMoldule is BaseMoldule {
    // The connext contract on the origin domain
    IConnext public immutable connext;

    constructor(address _connext) {
        connext = IConnext(_connext);
    }

    function xTransfer(
        address token,
        uint256 amount,
        address recipient,
        uint32 destinationDomain,
        uint256 slippage,
        uint256 relayerFee
    ) external payable {
        IERC20 _token = IERC20(token);

        require(
            _token.allowance(msg.sender, address(this)) >= amount,
            "User must approve amount"
        );

        // User sends funds to this contract
        _token.transferFrom(msg.sender, address(this), amount);

        // This contract approves transfer to Connext
        _token.approve(address(connext), amount);

        connext.xcall{value: relayerFee}(
            destinationDomain, // _destination: Domain ID of the destination chain
            recipient, // _to: address receiving the funds on the destination
            token, // _asset: address of the token contract
            msg.sender, // _delegate: address that can revert or forceLocal on destination
            amount, // _amount: amount of tokens to transfer
            slippage, // _slippage: the maximum amount of slippage the user will accept in BPS (e.g. 30 = 0.3%)
            bytes("") // _callData: empty bytes because we're only sending funds
        );
    }

    function xTransferEth(
        address destinationUnwrapper,
        address weth,
        uint256 amount,
        address recipient,
        uint32 destinationDomain,
        uint256 slippage,
        uint256 relayerFee
    ) external payable {
        // Wrap ETH into WETH to send with the xcall
        IWETH(weth).deposit{value: amount}();

        // This contract approves transfer to Connext
        IWETH(weth).approve(address(connext), amount);

        // Encode the recipient address for calldata
        bytes memory callData = abi.encode(recipient);

        // xcall the Unwrapper contract to unwrap WETH into ETH on destination
        connext.xcall{value: relayerFee}(
            destinationDomain, // _destination: Domain ID of the destination chain
            destinationUnwrapper, // _to: Unwrapper contract
            weth, // _asset: address of the WETH contract
            msg.sender, // _delegate: address that can revert or forceLocal on destination
            amount, // _amount: amount of tokens to transfer
            slippage, // _slippage: the maximum amount of slippage the user will accept in BPS (e.g. 30 = 0.3%)
            callData // _callData: calldata with encoded recipient address
        );
    }
}
