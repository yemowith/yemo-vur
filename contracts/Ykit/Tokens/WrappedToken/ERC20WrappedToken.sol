// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";

contract ERC20WrappedToken is ERC20, Ownable, Initializable {
    IERC20 public underlying;

    string private _wrapname;
    string private _wrapsymbol;
    uint8 private _wrapdecimals;

    event Wrap(address indexed user, uint256 amount);
    event Unwrap(address indexed user, uint256 amount);

    function name() public view override returns (string memory) {
        return _wrapname;
    }

    function symbol() public view override returns (string memory) {
        return _wrapsymbol;
    }

    function decimals() public view override returns (uint8) {
        return _wrapdecimals;
    }

    constructor() ERC20("", "") Ownable(payable(msg.sender)) {}

    function initialize(
        string memory _name,
        string memory _symbol,
        uint8 _decimals,
        IERC20 _underlying
    ) external initializer {
        _wrapname = _name;
        _wrapsymbol = _symbol;
        _wrapdecimals = _decimals;
        underlying = _underlying;
    }

    function wrap(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        uint256 allowance = underlying.allowance(msg.sender, address(this));
        require(allowance >= amount, "Check the token allowance");

        require(
            underlying.transferFrom(msg.sender, address(this), amount),
            "Transfer failed"
        );

        _mint(msg.sender, amount);
        emit Wrap(msg.sender, amount);
    }

    function unwrap(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        require(
            balanceOf(msg.sender) >= amount,
            "Insufficient wrapped token balance"
        );

        _burn(msg.sender, amount);
        require(underlying.transfer(msg.sender, amount), "Transfer failed");

        emit Unwrap(msg.sender, amount);
    }
}
