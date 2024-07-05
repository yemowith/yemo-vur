// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.20;

import "hardhat/console.sol";

import "@aave/core-v3/contracts/flashloan/base/FlashLoanSimpleReceiverBase.sol";
import "@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol";
import "@aave/core-v3/contracts/dependencies/openzeppelin/contracts/IERC20.sol";
import "./Ykit/ADRSB.sol";
import "./Ykit/DPLR.sol";
import "./Ykit/ADRSB.sol";
import "./Ykit/ADRSB.sol";
import "./VLTFLS.sol";

abstract contract YK {
    address public owner;
    address public adrsb;

    constructor(address _owner, address _adrsb) {
        owner = _owner;
    }
}

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

/*
abstract contract Swp is YK {
    ISwapRouter public immutable router;

    constructor() {
        address routerAddress = "0x2f39d218133AFaB8F2B819B1066c7E434Ad94E9e";
        router = ISwapRouter(routerAddress);
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
                recipient: address(this),
                deadline: block.timestamp,
                amountIn: amountIn,
                amountOutMinimum: 0,
                sqrtPriceLimitX96: 0
            });

        amountOut = router.exactInputSingle(params);
    }
}
*/

contract BOMBA {
    constructor() public {}
}

abstract contract DEFAC is YK {
    uint256 private nextId = 1;

    struct RDefa {
        uint256 id;
        address token;
        address rcvrAdr;
        uint256 amount;
        SBOMBA pompa;
        address caller;
        uint256 time;
        string status;
    }
    mapping(uint256 => RDefa) public defalar;

    struct SBOMBA {
        address pyA;
        address bombaA;
    }
    mapping(string => SBOMBA) public bombalar;

    modifier onlyCaller(uint256 _defaId) {
        require(
            defalar[_defaId].caller == msg.sender,
            "You are not authorized to perform this action."
        );
        _;
    }

    modifier defaExists(uint256 _defaId) {
        require(defalar[_defaId].id != 0, "Defa does not exist.");
        _;
    }

    function crtbomba(string memory _n) public returns (SBOMBA memory) {
        address dplr = IADRSB(adrsb).gAdrs("dplr");
        IDPLR(dplr).mpy(owner, _n);
        bytes memory bytecode = abi.encodePacked(
            type(BOMBA).creationCode,
            abi.encode(
                IADRSB(adrsb).gAdrs("appProvider"),
                IADRSB(adrsb).gAdrs("swapRouter")
            )
        );

        IDPLR(dplr).dpl(uint256(keccak256(abi.encodePacked(_n))), bytecode);
        address pyA = payable(IDPLR(dplr).gldpldPy());
        address bombaA = payable(IDPLR(dplr).gLdpld());
        IPY(pyA).setimplt(bombaA);
        bombalar[_n] = SBOMBA(pyA, bombaA);
        return bombalar[_n];
    }

    function yeniBomba(
        string memory _n
    ) external view returns (address, address) {
        SBOMBA memory sb = bombalar[_n];
        return (sb.pyA, sb.bombaA);
    }

    function newDefa(
        address _token,
        address _reciver,
        uint256 _amount,
        string memory _bombaName
    ) external returns (uint256) {
        SBOMBA memory pompa = crtbomba(_bombaName);
        RDefa memory _newDefa = RDefa(
            nextId,
            _token,
            _reciver,
            _amount,
            pompa,
            msg.sender,
            block.timestamp,
            "Initialized"
        );
        defalar[nextId] = _newDefa;
        uint256 createdId = nextId;
        nextId++;
        return createdId;
    }

    function initDefa(
        uint256 _defaId
    ) external onlyCaller(_defaId) defaExists(_defaId) {
        defalar[_defaId].status = "Initialized";
    }

    function startDefa(
        uint256 _defaId
    ) external onlyCaller(_defaId) defaExists(_defaId) {
        defalar[_defaId].status = "Started";
    }

    function gSOMBA(string memory _name) public view returns (SBOMBA memory) {
        return bombalar[_name];
    }

    function gDefa(uint256 _id) public view returns (RDefa memory) {
        return defalar[_id];
    }
}

contract YemoVur is DEFAC, BVat {
    address private lpy;
    address private adrsp;
    uint256 private mnRqrdAmt = 0.5 ether;
    address public vltfls;
    address public weth;
    bool inited = false;

    modifier onlyInited() {
        require(inited, "Contract not initialized");
        _;
    }

    constructor(
        address _owner,
        address _adrsb,
        address _weth,
        address _adrsp,
        address _vltfls
    ) YK(_owner, _adrsb) {
        weth = _weth;
        adrsb = _adrsb;
        adrsp = _adrsp;
        vltfls = _vltfls;
    }

    event Act(string name, uint256 value, string desc);
    event Inf(string name, uint256 value, string desc);

    function getWETH() external view returns (address) {
        return weth;
    }

    function getADRSB() external view returns (address) {
        return adrsb;
    }

    function init() external {
        require(!inited, "contract is inited beforly.");
        inited = true;
        // VLTFLS _vltfls = new VLTFLS(adrsp, weth);
    }

    function _bfrVur(string memory _n) internal {
        require(address(this).balance >= mnRqrdAmt, "Insufficient ETH balance");

        IVLTFLS(vltfls).start(weth, 1000000);
        SBOMBA storage bomba = bombalar[_n];
        uint256 _bba = IERC20(bomba.bombaA).balanceOf(address(this));

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

    function vur() public view onlyInited returns (bool) {
        return true;
    }

    function vurR() external view returns (SBOMBA memory) {
        return bombalar["Y"];
    }
}
