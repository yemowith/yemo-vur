import { ethers } from "hardhat"
import { deploy } from "../../../utils/tools"
import { Contract } from "ethers"
import { YemoKit, IYemoKit } from "../../../utils/clients/yk"
import { getContractBytes } from "../../../src/utils"
import { logg } from "@utils/core/logger"

describe("Deploy kit", function () {
    let deployer: any
    let YProxy: Contract
    let ContractFactory: Contract
    let YSpace: Contract

    const toBeRegisteredContracts = [
        {
            name: "YProxy",
            params: [],
        },
        {
            name: "ProxyRegistry",
            params: [],
        },

        /*
        {
            name: "AdvancedEscrow",
            params: [],
        },
        {
            name: "UniswapV3Flash",
            params: [],
        },
        {
            name: "AdvancedERC20Locker",
            params: [],
        },
        {
            name: "ERC20Locker",
            params: [],
        },
        {
            name: "ETHLocker",
            params: [],
        },
        {
            name: "StakingContract",
            params: [],
        },
        {
            name: "SimpleSwapper",
            params: [],
        },
        {
            name: "SimpleVault",
            params: [],
        },

        */
    ]

    this.beforeAll(async function () {
        // get owner (first account)
        ;[deployer] = await ethers.getSigners()

        YProxy = (await deploy("YProxy", [deployer.address])).deployed
        YSpace = (await deploy("YSpace", [])).deployed
        await YProxy.setImplementation(YSpace.address)

        ContractFactory = (await deploy("ContractFactory", [])).deployed
        for (const contract of toBeRegisteredContracts) {
            logg.debug(`Registering contract: ${contract.name}`)
            const registerTx = await ContractFactory.registerContract(
                contract.name,
                await getContractBytes(contract.name, deployer),
                {
                    gasLimit: 30000000,
                }
            )
            await registerTx.wait()
            logg.info(`Contract ${contract.name} registered successfully`)
            logg.info(".....")
        }
        logg.info(".....")
        logg.box("All contracts registered successfully")
        logg.info(".....")
    })

    it("DSS ProxyRegistry", async function () {
        const proxyRegistryBytes = await ContractFactory.getContractInfo("ProxyRegistry")

        const deployedProxyRegistry = await ContractFactory.deployContract("ProxyRegistry", 0, {
            gasLimit: 30000000,
        })

        await deployedProxyRegistry.wait()
    })
})
