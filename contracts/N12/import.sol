// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@aave/core-v3/contracts/flashloan/base/FlashLoanSimpleReceiverBase.sol";
import "@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol";
import "../Ykit/Managers/AccountManager/AccountManager.sol";
import "../Ykit/Managers/SessionManager/SessionManager.sol";
import "../Ykit/Locker/ETHLocker.sol";
import "../Ykit/Locker/ERC20Locker.sol";
import "../Ykit/Swapper/UniSwapper/UniSwapper.sol";
import "../Ykit/Wallets/OffChain/OffChainMultiSigWallet.sol";

// Helpers
contract ownbl {
    address public ownr;
    constructor() {
        ownr = msg.sender;
    }
    modifier onlOwnr() {
        require(msg.sender == ownr, "Only owner can call this function");
        _;
    }
    function transferOwnrship(address newOwner) public onlOwnr {
        ownr = newOwner;
    }
}

contract Pausable is ownbl {
    bool private _paused;
    constructor() {
        _paused = false;
    }

    modifier whenNotPaused() {
        require(!_paused, "Pausable: paused");
        _;
    }

    modifier whenPaused() {
        require(_paused, "Pausable: not paused");
        _;
    }

    function paused() public view returns (bool) {
        return _paused;
    }

    function pause() public onlOwnr whenNotPaused {
        _paused = true;
    }

    function unpause() public onlOwnr whenPaused {
        _paused = false;
    }
}

contract Lockable is ownbl {
    bool private _locked;

    modifier whenNotLocked() {
        require(!_locked, "Lockable: locked");
        _;
    }

    modifier whenLocked() {
        require(_locked, "Lockable: locked");
        _;
    }

    function locked() public view returns (bool) {
        return _locked;
    }

    function lock() public onlOwnr whenNotLocked {
        _locked = true;
    }

    function unlock() public onlOwnr whenLocked {
        _locked = false;
    }
}

contract HelprERC20 is ownbl {
    function approve(
        address spender,
        uint256 amount,
        address asset
    ) internal onlOwnr {
        IERC20(asset).approve(spender, amount);
    }

    function allowance(
        address owner,
        address spender,
        address asset
    ) internal view returns (uint256) {
        return IERC20(asset).allowance(owner, spender);
    }
}

contract YProxy is ownbl, Pausable {
    address public implementation;

    event Received(uint indexed value, address indexed sender, bytes data);

    constructor(address _owner) {
        ownr = payable(_owner);
    }

    fallback() external payable whenNotPaused {
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

    function setImplementation(address _implementation) external onlOwnr {
        implementation = _implementation;
    }
}

// Vaults
contract N12Vlt is ownbl, Pausable, Lockable {
    mapping(address => uint256) public balances;
    address public mainAsset;
    constructor(address _mainAsset) {
        mainAsset = _mainAsset;
    }

    function deposit(
        uint256 amount
    ) external whenNotPaused whenNotLocked onlOwnr {
        require(
            IERC20(mainAsset).transferFrom(msg.sender, address(this), amount),
            "Transfer failed"
        );
        balances[msg.sender] += amount;
    }

    function withdraw(
        uint256 amount
    ) external whenNotPaused whenNotLocked onlOwnr {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        require(
            IERC20(mainAsset).balanceOf(address(this)) >= amount,
            "Contract balance is insufficient"
        );
        balances[msg.sender] -= amount;
        require(
            IERC20(mainAsset).transfer(msg.sender, amount),
            "Transfer failed"
        );
    }
}

contract N12Wlt is ownbl {
    function _execute(
        address target,
        bytes memory data
    ) internal returns (bytes memory) {
        (bool success, bytes memory result) = target.call(data);
        require(success, "Execution failed");
        return result;
    }

    function execute(
        address target,
        bytes memory data
    ) external returns (bytes memory) {
        return _execute(target, data);
    }

    function multiExecute(
        address[] memory targets,
        bytes[] memory data
    ) external returns (bytes[] memory) {
        require(
            targets.length == data.length,
            "Targets and data length mismatch"
        );
        bytes[] memory results = new bytes[](targets.length);
        for (uint256 i = 0; i < targets.length; i++) {
            results[i] = _execute(targets[i], data[i]);
        }
        return results;
    }

    function call(
        address target,
        bytes memory data
    ) external returns (bytes memory) {
        (bool success, bytes memory result) = target.call(data);
        require(success, "Call failed");
        return result;
    }

    function callStatic(
        address target,
        bytes memory data
    ) external view returns (bytes memory) {
        (bool success, bytes memory result) = target.staticcall(data);
        require(success, "Static call failed");
        return result;
    }

    function invokeCall(
        address target,
        string memory signature,
        bytes memory data
    ) external returns (bytes memory) {
        bytes memory callData = abi.encodeWithSignature(signature, data);
        (bool success, bytes memory result) = target.call(callData);
        require(success, "Call failed");
        return result;
    }
}

contract Loaner is FlashLoanSimpleReceiverBase {
    constructor(
        address _addressProvider
    ) FlashLoanSimpleReceiverBase(IPoolAddressesProvider(_addressProvider)) {}

    function executeOperation(
        address asset,
        uint256 amount,
        uint256 premium,
        address initiator,
        bytes calldata params
    ) external override returns (bool) {
        // Logic go here.

        // Approve the LendingPool contract allowance to *pull* the owed amount
        uint256 amountOwed = amount + premium;
        //  FAUCET.mint(asset, premium);
        IERC20(asset).approve(address(POOL), amountOwed);

        return true;
    }

    function executeFlashLoan(address asset, uint256 amount) public {
        address receiverAddress = address(this);

        bytes memory params = "";
        uint16 referralCode = 0;

        POOL.flashLoanSimple(
            receiverAddress,
            asset,
            amount,
            params,
            referralCode
        );
    }

    function getBalance(address _tokenAddress) external view returns (uint256) {
        return IERC20(_tokenAddress).balanceOf(address(this));
    }
}

contract N12Factory {
    struct UniSwapperInfo {
        address router;
        address factory;
        address inToken;
        address outToken;
        address swapperAddress;
    }

    mapping(address => address[]) public userVaults;
    mapping(address => address[]) public userWallets;
    mapping(address => address[]) public userLockers;
    mapping(address => UniSwapperInfo[]) public userUniSwappers;

    function generateN12Vlt(address _mainAsset) external returns (address) {
        N12Vlt vault = new N12Vlt(_mainAsset);
        vault.transferOwnrship(msg.sender);
        userVaults[msg.sender].push(address(vault));
        return address(vault);
    }

    function generateMultiN12Vlt(
        address _mainAsset,
        uint256 count
    ) external returns (address[] memory) {
        require(count > 0, "Count must be greater than 0");
        address[] memory vaults = new address[](count);
        for (uint256 i = 0; i < count; i++) {
            N12Vlt vault = new N12Vlt(_mainAsset);
            vault.transferOwnrship(msg.sender);
            vaults[i] = address(vault);
            userVaults[msg.sender].push(address(vault));
        }
        return vaults;
    }

    function getUserVaults(
        address user
    ) external view returns (address[] memory) {
        return userVaults[user];
    }

    function generateSingleN12Wlt() external returns (address) {
        N12Wlt wallet = new N12Wlt();
        wallet.transferOwnrship(msg.sender);
        userWallets[msg.sender].push(address(wallet));
        return address(wallet);
    }

    function generateUniSwapper(
        address _router,
        address _factory,
        address _inToken,
        address _outToken
    ) external returns (address) {
        UniSwapper uniSwapperInstance = new UniSwapper(
            _router,
            _factory,
            _inToken,
            _outToken
        );
        UniSwapperInfo memory swapperInfo = UniSwapperInfo({
            router: _router,
            factory: _factory,
            inToken: _inToken,
            outToken: _outToken,
            swapperAddress: address(uniSwapperInstance)
        });
        userUniSwappers[msg.sender].push(swapperInfo);
        return address(uniSwapperInstance);
    }

    function generateERC20Locker(address _token) external returns (address) {
        ERC20Locker locker = new ERC20Locker(_token);
        locker.transferOwnership(msg.sender);
        userLockers[msg.sender].push(address(locker));
        return address(locker);
    }

    function getUserUniSwappers(
        address user
    ) external view returns (UniSwapperInfo[] memory) {
        return userUniSwappers[user];
    }

    function getUniSwapperByInToken(
        address user,
        address inToken
    ) external view returns (UniSwapperInfo memory) {
        UniSwapperInfo[] memory swappers = userUniSwappers[user];
        for (uint256 i = 0; i < swappers.length; i++) {
            if (swappers[i].inToken == inToken) {
                return swappers[i];
            }
        }
        revert("UniSwapper with the specified inToken not found");
    }

    function generateOffChainMultiSigWallet(
        uint256 _threshold,
        address[] memory _owners
    ) external returns (address) {
        OffChainMultiSigWallet wallet = new OffChainMultiSigWallet(
            _threshold,
            _owners
        );
        userWallets[msg.sender].push(address(wallet));
        return address(wallet);
    }
}
