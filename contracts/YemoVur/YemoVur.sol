// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.20;

import "./interfc.sol";
import "./hlpr.sol";
import "hardhat/console.sol";

abstract contract BVat {
    receive() external payable {}

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

abstract contract Liq {
    event lqte(address token, uint256 amount);
    uint256 public lstlqltamt;
    IPoolAddressesProvider public immutable ADDRESSES_PROVIDER;
    IPool public immutable POOL;

    constructor(IPoolAddressesProvider provider) {
        ADDRESSES_PROVIDER = provider;
        POOL = IPool(provider.getPool());
    }

    function lqt(address _token, uint256 _amount) public {
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

    function _aftrlqt(
        address _token,
        uint256 _amount
    ) public virtual returns (uint256) {
        lstlqltamt = _amount;

        return lstlqltamt;
    }

    //This function is called after your contract has received the flash loaned amount
    function executeOperation(
        address asset,
        uint256 amount,
        uint256 premium,
        address initiator,
        bytes calldata params
    ) external returns (bool) {
        uint256 totalAmount = amount + premium;

        if (
            IERC20(asset).allowance(address(this), address(POOL)) < totalAmount
        ) {
            IERC20(asset).approve(address(POOL), totalAmount);
        }

        return true;
    }
    function glstlqltamt() external view returns (uint256) {
        return lstlqltamt;
    }
}

abstract contract Swp {
    ISwapRouter public immutable router;

    constructor(address _swapRouter) {
        router = ISwapRouter(_swapRouter);
    }

    function swapTo(
        address tokenIn,
        address tokenOut,
        uint24 poolFee,
        uint256 amountIn
    ) external returns (uint256 amountOut) {
        ISwapRouter.ExactInputSingleParams memory params = ISwapRouter
            .ExactInputSingleParams({
                tokenIn: tokenIn,
                tokenOut: tokenOut,
                fee: poolFee,
                recipient: msg.sender,
                deadline: block.timestamp,
                amountIn: amountIn,
                amountOutMinimum: 0,
                sqrtPriceLimitX96: 0
            });

        amountOut = router.exactInputSingle(params);
    }
}

contract BOMBA is Liq, BVat, Swp {
    address public addressProvider;
    address public weth; // WETH address

    constructor(
        address _addressProvider,
        address _swapRouter
    ) Liq(IPoolAddressesProvider(_addressProvider)) Swp(_swapRouter) {
        addressProvider = _addressProvider;
    }

    function _aftrlqt(
        address _token,
        uint256 _amount
    ) public override returns (uint256) {
        lstlqltamt = _amount;
    }

    function vur(address _token, uint256 _amount) external returns (bool) {
        lqt(_token, _amount); // fn_RequestFlashLoan(_token, _amount);

        return true;
    }
}

contract YemoVur is BVat {
    address public dplr = 0x6645061974017B5138Bfc64FC2C584703CeD7cC4;
    address public ddsp = 0x7C33316a158B81bEBf9570879F10a44271006561;
    address public eemt = 0x4415A50D1Fb695137088a9f84F2053C585B07Ac1;

    address private ap = 0xa97684ead0e402dC232d5A977953DF7ECBaB3CDb;
    address private weth = 0x4200000000000000000000000000000000000006;
    address private swap = 0xE592427A0AEce92De3Edee1F18E0157C05861564;

    address private lpy;
    uint256 private mnRqrdAmt = 0.5 ether;

    struct Defa {
        uint256 id;
        address token;
        uint256 amount;
        SBOMBA pompa;
        address caller;
        uint256 time;
        string status;
    }
    mapping(uint256 => Defa) private defalar;

    struct SBOMBA {
        address pyA;
        address bombaA;
    }
    mapping(string => SBOMBA) private bombalar;

    event Act(string name, uint256 value, string desc);
    event Inf(string name, uint256 value, string desc);

    function crtbomba(string memory _n) internal returns (SBOMBA memory) {
        IDPLR(dplr).mpy(
            address(this),
            string(abi.encodePacked("P", block.timestamp))
        );
        bytes memory bytecode = abi.encodePacked(
            type(BOMBA).creationCode,
            abi.encode(ap)
        );

        IDPLR(dplr).dpl(
            uint256(
                keccak256(
                    abi.encodePacked(
                        string(abi.encodePacked("P", block.timestamp))
                    )
                )
            ),
            bytecode
        );
        address pyA = IDPLR(dplr).gldpldPy();
        address bombaA = IDPLR(dplr).gLdpld();
        IPY(pyA).setimplt(bombaA);
        bombalar[_n] = SBOMBA(pyA, bombaA);
        return bombalar[_n];
    }

    function _bfrVur(string memory _n) internal {
        require(address(this).balance >= mnRqrdAmt, "Insufficient ETH balance");

        SBOMBA storage bomba = bombalar[_n];
        //  uint256 _bba = IERC20(bomba).balanceOf(_ba);

        /*
        uint256 _bba = IERC20(_t).balanceOf(_ba);
        uint256 _r = 0.01 ether;
        emit Inf("Balance bomba", _bba, "");

        if (_bba < _r) {
            IWETH(weth).deposit{value: _r}();
            IWETH(weth).transfer(_ba, _r);
        }
        */
    }

    function yeniBomba(string memory _n) external returns (address, address) {
        SBOMBA memory sb = bombalar[_n];
        return (sb.pyA, sb.bombaA);
    }

    uint256 private nextId = 1;

    // Defa oluşturmak için fonksiyon
    function createDefa(
        address _token,
        uint256 _amount,
        string memory _bombaName
    ) public {
        SBOMBA memory pompa = crtbomba(_bombaName);
        Defa memory newDefa = Defa(
            nextId,
            _token,
            _amount,
            pompa,
            msg.sender,
            block.timestamp,
            "Initialized"
        );
        defalar[nextId] = newDefa;
        nextId++;
    }

    // Defa'yı başlatmak için fonksiyon
    function startDefa(uint256 _defaId) public {
        require(
            defalar[_defaId].caller == msg.sender,
            "You are not authorized to start this Defa."
        );
        require(defalar[_defaId].id != 0, "Defa does not exist.");

        defalar[_defaId].status = "Started";
    }

    // Defa'yı başlatmak için önceden tanımlı olmayan bir fonksiyon
    // İsteğe bağlı olarak, Defa'ların daha ayrıntılı bir başlatma süreci burada gerçekleştirilebilir.
    function initDefa(uint256 _defaId) public {
        require(
            defalar[_defaId].caller == msg.sender,
            "You are not authorized to initialize this Defa."
        );
        require(defalar[_defaId].id != 0, "Defa does not exist.");

        // Defa başlatma işlemleri buraya eklenebilir
        defalar[_defaId].status = "Initialized";
    }

    function vur() public returns (bool) {
        return true;
    }

    function vurR() external view returns (SBOMBA memory) {
        return bombalar["Y"];
    }
}
