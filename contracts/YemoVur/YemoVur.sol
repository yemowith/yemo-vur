// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.20;

import "@aave/core-v3/contracts/flashloan/base/FlashLoanSimpleReceiverBase.sol";
import "@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol";
import "@aave/core-v3/contracts/dependencies/openzeppelin/contracts/IERC20.sol";

contract PY {
    address public owner;
    address public implementation;

    event Received(uint indexed value, address indexed sender, bytes data);

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    constructor(address _owner) {
        owner = _owner;
    }

    fallback() external payable {
        address target = implementation;
        require(target != address(0), "Implementation not setted");
        assembly {
            calldatacopy(0, 0, calldatasize())
            let result := delegatecall(gas(), target, 0, calldatasize(), 0, 0)
            returndatacopy(0, 0, returndatasize())
            switch result
            case 0 {
                revert(0, returndatasize())
            }
            default {
                return(0, returndatasize())
            }
        }
    }

    receive() external payable {
        emit Received(msg.value, msg.sender, "");
    }

    function setImplementation(address _implementation) external onlyOwner {
        implementation = _implementation;
    }
}

contract BVat {
    // Deposit ERC20 tokens
    function deposit(address token, uint256 amount) external {
        require(
            IERC20(token).allowance(msg.sender, address(this)) >= amount,
            "Allowance not enough"
        );
        IERC20(token).transferFrom(msg.sender, address(this), amount);
    }

    // Withdraw ERC20 tokens
    function withdraw(
        address token,
        uint256 amount,
        address receiver
    ) external {
        require(
            IERC20(token).allowance(msg.sender, address(this)) >= amount,
            "Allowance not enough"
        );
        IERC20(token).transfer(receiver, amount);
    }
}

contract YemoFlash is FlashLoanSimpleReceiverBase {
    constructor(
        address _addressProvider
    ) FlashLoanSimpleReceiverBase(IPoolAddressesProvider(_addressProvider)) {}

    function fn_RequestFlashLoan(address _token, uint256 _amount) public {
        address receiverAddress = address(this);
        address asset = _token;
        uint256 amount = _amount;
        uint16 referralCode = 0;
        bytes memory _calldata;

        POOL.flashLoanSimple(
            receiverAddress,
            asset,
            amount,
            _calldata,
            referralCode
        );
    }

    //This function is called after your contract has received the flash loaned amount
    function executeOperation(
        address asset,
        uint256 amount,
        uint256 premium,
        address initiator,
        bytes calldata params
    ) external override returns (bool) {
        uint256 totalAmount = amount + premium;

        if (
            IERC20(asset).allowance(address(this), address(POOL)) < totalAmount
        ) {
            IERC20(asset).approve(address(POOL), totalAmount);
        }

        return true;
    }
}

contract YemoVur is YemoFlash, BVat {
    address public addressProvider;
    address public weth; // WETH address

    receive() external payable {}

    struct ICVat {
        address vat;
        address py;
    }

    mapping(string => ICVat) public vats;
    address[] public vatAddresses;

    constructor(address _addressProvider) YemoFlash(_addressProvider) {
        addressProvider = _addressProvider;
    }

    function _createVAT(
        address _owner,
        string memory _k
    ) internal returns (ICVat memory) {
        PY py = new PY(_owner);
        BVat vat = new BVat();
        address pyAddress = address(py);
        address vatAddress = address(vat);

        py.setImplementation(vatAddress);

        vats[_k] = ICVat(vatAddress, pyAddress);
        vatAddresses.push(vatAddress);

        return vats[_k];
    }

    function vur(
        address _token,
        uint256 _amount,
        bytes memory _calldata
    ) public {
        _createVAT(msg.sender, "a");
        _createVAT(msg.sender, "b");
        _createVAT(msg.sender, "c");

        // fn_RequestFlashLoan(_token, _amount);
    }
}

interface IPY {
    function setImplementation(address _implementation) external;
}

interface IBVat {
    function deposit(address token, uint256 amount) external;
    function withdraw(address token, uint256 amount, address receiver) external;
    function withdrawWETH(uint256 amount) external;
}

interface IWETH {
    function deposit() external payable;
    function withdraw(uint256) external;
}
