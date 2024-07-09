// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "./TokenProxy.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract WrappedTokenFactory is Ownable {
    address public implementation;

    event TokenCreated(address indexed tokenAddress);

    constructor(address _implementation) Ownable(payable(msg.sender)) {
        implementation = _implementation;
    }

    function createWrappedToken(
        string memory _name,
        string memory _symbol,
        IERC20 _underlying
    ) external onlyOwner returns (address) {
        TokenProxy proxy = new TokenProxy();
        proxy.setImplementation(implementation);

        (bool success, ) = address(proxy).call(
            abi.encodeWithSignature(
                "initialize(string,string,address)",
                _name,
                _symbol,
                address(_underlying)
            )
        );

        require(success, "Initialization failed");

        emit TokenCreated(address(proxy));
        return address(proxy);
    }

    function setImplementation(address _newImplementation) external onlyOwner {
        implementation = _newImplementation;
    }
}
