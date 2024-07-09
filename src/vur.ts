import { ethers } from "hardhat"
import { accounts, deployContracts, getContractBytes } from "./utils"
import { logg } from "@utils/core/logger"
import YKit from "./YKit/YKit"

async function makeKit(baseContracts, toBeRegisteredContracts) {
    const [deployer] = await accounts()
    const _YKit = new YKit(baseContracts, toBeRegisteredContracts, deployer)
    return _YKit
}

async function makeYSpace() {
    const [deployer] = await accounts()

    const baseContracts = [
        {
            name: "YProxy",
            params: [],
        },
        {
            name: "ContractFactory",
            params: [],
        },
    ]

    const toBeRegisteredContracts = [
        {
            name: "YProxy",
            bytes: await getContractBytes("YProxy", deployer),
        },
        {
            name: "ProxyRegistry",
            bytes: await getContractBytes("ProxyRegistry", deployer),
        },
        {
            name: "AdvancedEscrow",
            bytes: await getContractBytes("AdvancedEscrow", deployer),
        },
        {
            name: "UniswapV3Flash",
            bytes: await getContractBytes("UniswapV3Flash", deployer),
        },
        {
            name: "AdvancedERC20Locker",
            bytes: await getContractBytes("AdvancedERC20Locker", deployer),
        },
        {
            name: "ERC20Locker",
            bytes: await getContractBytes("ERC20Locker", deployer),
        },
        {
            name: "ETHLocker",
            bytes: await getContractBytes("ETHLocker", deployer),
        },
        {
            name: "StakingContract",
            bytes: await getContractBytes("StakingContract", deployer),
        },
        {
            name: "SimpleSwapper",
            bytes: await getContractBytes("SimpleSwapper", deployer),
        },
        {
            name: "SimpleVault",
            bytes: await getContractBytes("SimpleVault", deployer),
        },
    ]
}

;(async () => {
    const [deployer, player] = await ethers.getSigners()
    await makeYSpace()
    // await qucickSetup(deployer.address)
    //  await setup("0xf52dbD4300950fB5139becF10F81e94F37cE9074")
})()
