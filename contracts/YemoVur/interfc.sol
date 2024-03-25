// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.20;

import {DataTypes} from "@aave/core-v3/contracts/protocol/libraries/types/DataTypes.sol";

interface IUniswapV3SwapCallback {
    function uniswapV3SwapCallback(
        int256 amount0Delta,
        int256 amount1Delta,
        bytes calldata data
    ) external;
}

interface IV3SwapRouter is IUniswapV3SwapCallback {
    struct ExactInputSingleParams {
        address tokenIn;
        address tokenOut;
        uint24 fee;
        address recipient;
        uint256 amountIn;
        uint256 amountOutMinimum;
        uint160 sqrtPriceLimitX96;
    }

    function exactInputSingle(
        ExactInputSingleParams calldata params
    ) external payable returns (uint256 amountOut);

    struct ExactInputParams {
        bytes path;
        address recipient;
        uint256 amountIn;
        uint256 amountOutMinimum;
    }

    /// @notice Swaps `amountIn` of one token for as much as possible of another along the specified path
    /// @dev Setting `amountIn` to 0 will cause the contract to look up its own balance,
    /// and swap the entire amount, enabling contracts to send tokens before calling this function.
    /// @param params The parameters necessary for the multi-hop swap, encoded as `ExactInputParams` in calldata
    /// @return amountOut The amount of the received token
    function exactInput(
        ExactInputParams calldata params
    ) external payable returns (uint256 amountOut);

    struct ExactOutputSingleParams {
        address tokenIn;
        address tokenOut;
        uint24 fee;
        address recipient;
        uint256 amountOut;
        uint256 amountInMaximum;
        uint160 sqrtPriceLimitX96;
    }

    /// @notice Swaps as little as possible of one token for `amountOut` of another token
    /// that may remain in the router after the swap.
    /// @param params The parameters necessary for the swap, encoded as `ExactOutputSingleParams` in calldata
    /// @return amountIn The amount of the input token
    function exactOutputSingle(
        ExactOutputSingleParams calldata params
    ) external payable returns (uint256 amountIn);

    struct ExactOutputParams {
        bytes path;
        address recipient;
        uint256 amountOut;
        uint256 amountInMaximum;
    }

    /// @notice Swaps as little as possible of one token for `amountOut` of another along the specified path (reversed)
    /// that may remain in the router after the swap.
    /// @param params The parameters necessary for the multi-hop swap, encoded as `ExactOutputParams` in calldata
    /// @return amountIn The amount of the input token
    function exactOutput(
        ExactOutputParams calldata params
    ) external payable returns (uint256 amountIn);
}

interface ISwapRouter is IUniswapV3SwapCallback {
    struct ExactInputSingleParams {
        address tokenIn;
        address tokenOut;
        uint24 fee;
        address recipient;
        uint256 deadline;
        uint256 amountIn;
        uint256 amountOutMinimum;
        uint160 sqrtPriceLimitX96;
    }

    function exactInputSingle(
        ExactInputSingleParams calldata params
    ) external payable returns (uint256 amountOut);

    struct ExactInputParams {
        bytes path;
        address recipient;
        uint256 deadline;
        uint256 amountIn;
        uint256 amountOutMinimum;
    }

    function exactInput(
        ExactInputParams calldata params
    ) external payable returns (uint256 amountOut);

    struct ExactOutputSingleParams {
        address tokenIn;
        address tokenOut;
        uint24 fee;
        address recipient;
        uint256 deadline;
        uint256 amountOut;
        uint256 amountInMaximum;
        uint160 sqrtPriceLimitX96;
    }

    function exactOutputSingle(
        ExactOutputSingleParams calldata params
    ) external payable returns (uint256 amountIn);

    struct ExactOutputParams {
        bytes path;
        address recipient;
        uint256 deadline;
        uint256 amountOut;
        uint256 amountInMaximum;
    }

    function exactOutput(
        ExactOutputParams calldata params
    ) external payable returns (uint256 amountIn);
}

interface IPoolAddressesProvider {
    event MarketIdSet(string indexed oldMarketId, string indexed newMarketId);
    event PoolUpdated(address indexed oldAddress, address indexed newAddress);
    event PoolConfiguratorUpdated(
        address indexed oldAddress,
        address indexed newAddress
    );
    event PriceOracleUpdated(
        address indexed oldAddress,
        address indexed newAddress
    );
    event ACLManagerUpdated(
        address indexed oldAddress,
        address indexed newAddress
    );
    event ACLAdminUpdated(
        address indexed oldAddress,
        address indexed newAddress
    );
    event PriceOracleSentinelUpdated(
        address indexed oldAddress,
        address indexed newAddress
    );
    event PoolDataProviderUpdated(
        address indexed oldAddress,
        address indexed newAddress
    );
    event ProxyCreated(
        bytes32 indexed id,
        address indexed proxyAddress,
        address indexed implementationAddress
    );
    event AddressSet(
        bytes32 indexed id,
        address indexed oldAddress,
        address indexed newAddress
    );
    event AddressSetAsProxy(
        bytes32 indexed id,
        address indexed proxyAddress,
        address oldImplementationAddress,
        address indexed newImplementationAddress
    );

    function getMarketId() external view returns (string memory);
    function setMarketId(string calldata newMarketId) external;
    function getAddress(bytes32 id) external view returns (address);
    function setAddressAsProxy(
        bytes32 id,
        address newImplementationAddress
    ) external;
    function setAddress(bytes32 id, address newAddress) external;
    function getPool() external view returns (address);
    function setPoolImpl(address newPoolImpl) external;
    function getPoolConfigurator() external view returns (address);
    function setPoolConfiguratorImpl(address newPoolConfiguratorImpl) external;
    function getPriceOracle() external view returns (address);
    function setPriceOracle(address newPriceOracle) external;
    function getACLManager() external view returns (address);
    function setACLManager(address newAclManager) external;
    function getACLAdmin() external view returns (address);
    function setACLAdmin(address newAclAdmin) external;
    function getPriceOracleSentinel() external view returns (address);
    function setPriceOracleSentinel(address newPriceOracleSentinel) external;
    function getPoolDataProvider() external view returns (address);
    function setPoolDataProvider(address newDataProvider) external;
}
interface IPool {
    event MintUnbacked(
        address indexed reserve,
        address user,
        address indexed onBehalfOf,
        uint256 amount,
        uint16 indexed referralCode
    );

    event BackUnbacked(
        address indexed reserve,
        address indexed backer,
        uint256 amount,
        uint256 fee
    );

    event Supply(
        address indexed reserve,
        address user,
        address indexed onBehalfOf,
        uint256 amount,
        uint16 indexed referralCode
    );

    event Withdraw(
        address indexed reserve,
        address indexed user,
        address indexed to,
        uint256 amount
    );

    event Borrow(
        address indexed reserve,
        address user,
        address indexed onBehalfOf,
        uint256 amount,
        DataTypes.InterestRateMode interestRateMode,
        uint256 borrowRate,
        uint16 indexed referralCode
    );

    event Repay(
        address indexed reserve,
        address indexed user,
        address indexed repayer,
        uint256 amount,
        bool useATokens
    );

    event SwapBorrowRateMode(
        address indexed reserve,
        address indexed user,
        DataTypes.InterestRateMode interestRateMode
    );

    event IsolationModeTotalDebtUpdated(
        address indexed asset,
        uint256 totalDebt
    );

    event UserEModeSet(address indexed user, uint8 categoryId);

    event ReserveUsedAsCollateralEnabled(
        address indexed reserve,
        address indexed user
    );

    event ReserveUsedAsCollateralDisabled(
        address indexed reserve,
        address indexed user
    );

    event RebalanceStableBorrowRate(
        address indexed reserve,
        address indexed user
    );

    event FlashLoan(
        address indexed target,
        address initiator,
        address indexed asset,
        uint256 amount,
        DataTypes.InterestRateMode interestRateMode,
        uint256 premium,
        uint16 indexed referralCode
    );

    event LiquidationCall(
        address indexed collateralAsset,
        address indexed debtAsset,
        address indexed user,
        uint256 debtToCover,
        uint256 liquidatedCollateralAmount,
        address liquidator,
        bool receiveAToken
    );

    event ReserveDataUpdated(
        address indexed reserve,
        uint256 liquidityRate,
        uint256 stableBorrowRate,
        uint256 variableBorrowRate,
        uint256 liquidityIndex,
        uint256 variableBorrowIndex
    );

    event MintedToTreasury(address indexed reserve, uint256 amountMinted);

    function mintUnbacked(
        address asset,
        uint256 amount,
        address onBehalfOf,
        uint16 referralCode
    ) external;

    function backUnbacked(
        address asset,
        uint256 amount,
        uint256 fee
    ) external returns (uint256);

    function supply(
        address asset,
        uint256 amount,
        address onBehalfOf,
        uint16 referralCode
    ) external;

    function supplyWithPermit(
        address asset,
        uint256 amount,
        address onBehalfOf,
        uint16 referralCode,
        uint256 deadline,
        uint8 permitV,
        bytes32 permitR,
        bytes32 permitS
    ) external;

    function withdraw(
        address asset,
        uint256 amount,
        address to
    ) external returns (uint256);

    function borrow(
        address asset,
        uint256 amount,
        uint256 interestRateMode,
        uint16 referralCode,
        address onBehalfOf
    ) external;

    function repay(
        address asset,
        uint256 amount,
        uint256 interestRateMode,
        address onBehalfOf
    ) external returns (uint256);

    function repayWithPermit(
        address asset,
        uint256 amount,
        uint256 interestRateMode,
        address onBehalfOf,
        uint256 deadline,
        uint8 permitV,
        bytes32 permitR,
        bytes32 permitS
    ) external returns (uint256);

    function repayWithATokens(
        address asset,
        uint256 amount,
        uint256 interestRateMode
    ) external returns (uint256);

    function swapBorrowRateMode(
        address asset,
        uint256 interestRateMode
    ) external;

    function rebalanceStableBorrowRate(address asset, address user) external;

    function setUserUseReserveAsCollateral(
        address asset,
        bool useAsCollateral
    ) external;

    function liquidationCall(
        address collateralAsset,
        address debtAsset,
        address user,
        uint256 debtToCover,
        bool receiveAToken
    ) external;

    function flashLoan(
        address receiverAddress,
        address[] calldata assets,
        uint256[] calldata amounts,
        uint256[] calldata interestRateModes,
        address onBehalfOf,
        bytes calldata params,
        uint16 referralCode
    ) external;

    function flashLoanSimple(
        address receiverAddress,
        address asset,
        uint256 amount,
        bytes calldata params,
        uint16 referralCode
    ) external;

    function getUserAccountData(
        address user
    )
        external
        view
        returns (
            uint256 totalCollateralBase,
            uint256 totalDebtBase,
            uint256 availableBorrowsBase,
            uint256 currentLiquidationThreshold,
            uint256 ltv,
            uint256 healthFactor
        );

    function initReserve(
        address asset,
        address aTokenAddress,
        address stableDebtAddress,
        address variableDebtAddress,
        address interestRateStrategyAddress
    ) external;

    function dropReserve(address asset) external;

    function setReserveInterestRateStrategyAddress(
        address asset,
        address rateStrategyAddress
    ) external;

    function setConfiguration(
        address asset,
        DataTypes.ReserveConfigurationMap calldata configuration
    ) external;

    function getConfiguration(
        address asset
    ) external view returns (DataTypes.ReserveConfigurationMap memory);

    function getUserConfiguration(
        address user
    ) external view returns (DataTypes.UserConfigurationMap memory);

    function getReserveNormalizedIncome(
        address asset
    ) external view returns (uint256);

    function getReserveNormalizedVariableDebt(
        address asset
    ) external view returns (uint256);

    function getReserveData(
        address asset
    ) external view returns (DataTypes.ReserveData memory);

    function finalizeTransfer(
        address asset,
        address from,
        address to,
        uint256 amount,
        uint256 balanceFromBefore,
        uint256 balanceToBefore
    ) external;

    function getReservesList() external view returns (address[] memory);

    function getReserveAddressById(uint16 id) external view returns (address);

    function ADDRESSES_PROVIDER()
        external
        view
        returns (IPoolAddressesProvider);

    function updateBridgeProtocolFee(uint256 bridgeProtocolFee) external;

    function updateFlashloanPremiums(
        uint128 flashLoanPremiumTotal,
        uint128 flashLoanPremiumToProtocol
    ) external;

    function configureEModeCategory(
        uint8 id,
        DataTypes.EModeCategory memory config
    ) external;

    function getEModeCategoryData(
        uint8 id
    ) external view returns (DataTypes.EModeCategory memory);

    function setUserEMode(uint8 categoryId) external;

    function getUserEMode(address user) external view returns (uint256);

    function resetIsolationModeTotalDebt(address asset) external;

    function MAX_STABLE_RATE_BORROW_SIZE_PERCENT()
        external
        view
        returns (uint256);

    function FLASHLOAN_PREMIUM_TOTAL() external view returns (uint128);

    function BRIDGE_PROTOCOL_FEE() external view returns (uint256);

    function FLASHLOAN_PREMIUM_TO_PROTOCOL() external view returns (uint128);

    function MAX_NUMBER_RESERVES() external view returns (uint16);

    function mintToTreasury(address[] calldata assets) external;

    function rescueTokens(address token, address to, uint256 amount) external;

    function deposit(
        address asset,
        uint256 amount,
        address onBehalfOf,
        uint16 referralCode
    ) external;
}

interface IEEMT {
    // Event definition
    event EventLog(address indexed from, string sub, uint256 time, string data);

    // Function to emit an event
    function emitEvent(
        string memory sub,
        string memory data
    ) external returns (bool);

    // Function to receive event requests
    function receiveEventRequest(
        string memory sub,
        string memory data
    ) external returns (bool);
}

interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(
        address recipient,
        uint256 amount
    ) external returns (bool);
    function allowance(
        address owner,
        address spender
    ) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );
}

interface IDPLR {
    function ga(
        uint256 _salt,
        bytes memory bytecode
    ) external view returns (address);

    function dpl(
        uint256 _salt,
        bytes memory bytecode
    ) external returns (address);

    function gLdpld() external view returns (address);

    function mpy(address _a, string memory _p) external returns (address);

    function gldpldPy() external view returns (address);
}

interface IPY {
    function setimplt(address _implt) external;
}

interface IBVat {
    function deposit(address token, uint256 amount) external;
    function withdraw(address token, uint256 amount, address receiver) external;
    function withdrawWETH(uint256 amount) external;
}

interface IWETH {
    function deposit() external payable;
    function withdraw(uint256) external;

    function transfer(address dst, uint wad) external returns (bool);
}

interface IBOMBA {
    function vur(address _token, uint256 _amount) external returns (bool);
    function glstlqltamt() external view returns (uint256);
}

interface IDEFAC {
    struct SBOMBA {
        address pyA;
        address bombaA;
    }

    struct Defa {
        uint256 id;
        address token;
        address rcvrAdr;
        uint256 amount;
        SBOMBA pompa;
        address caller;
        uint256 time;
        string status;
    }

    function yeniBomba(
        string memory _n
    ) external view returns (address, address);
    function newDefa(
        address _token,
        address _reciver,
        uint256 _amount,
        string memory _bombaName
    ) external returns (uint256);
    function startDefa(uint256 _defaId) external;
    function initDefa(uint256 _defaId) external;
    function gSOMBA(string memory _name) external view returns (SBOMBA memory);
    function gDefa(uint256 _id) external view returns (Defa memory);
}

interface IADRSB {
    function adrs(string memory _key, address _adrs) external returns (bool);
    function gAdrs(string memory _key) external view returns (address);
}
