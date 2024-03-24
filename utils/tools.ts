import { BigNumber, Contract } from "ethers"
import hre, { ethers } from "hardhat"
import { logg } from "./core/logger"
export type DeployResult = {
    name: string
    args: any[]
    address: string
    deployed: any
    contract: any
}

const deploy = async (
    name: string,
    args: any[] = [],
    gasLimit: number = 1000000000
): Promise<DeployResult> => {
    const c = await ethers.getContractFactory(name)

    const cD = await c.deploy(...args, { gasLimit: gasLimit })

    const deployed = (await cD.deployed()) as Contract
    logg.info(`Deployed ${name} to: ${deployed.address}`)
    return {
        name: name,
        args: args,
        address: deployed.address,
        deployed: deployed,
        contract: cD,
    }
}

const contactAt = async (name: string, address: string): Promise<Contract> => {
    const c = await ethers.getContractAt("DSSProxyFactory", address)
    return c
}

const verify = async (c: DeployResult) => {
    console.log("Verifying contract...")
    const network = hre.network.name
    try {
        await hre.run("verify:verify", {
            address: c.address,
            network: network,
        })
        console.log(`Verification successful for ${c.name} at ${c.address}`)
    } catch (error) {
        console.error(`Verification failed for ${c.name} at ${c.address}`, error)
    }
    console.log("Contract verified!")
    return c
}

const deployAndVerify = async (name: string, args: any[] = []) => {
    const c = await deploy(name, args)
    await verify(c)
    return c
}

const numToString = (num: number | string): string => {
    return num.toString()
}

const toEther = (wei: string | number, decimals: number = 18) => {
    const ether = ethers.utils.parseEther(numToString(wei))
    return ether
}

const fromEther = (eth: string | number, decimals: number = 18) => {
    const etherString = eth.toString()
    const ether = decimals !== undefined ? parseFloat(etherString).toFixed(decimals) : etherString
    return ethers.utils.parseEther(ether)
}

const maxApproveAmount = (): BigNumber => {
    return ethers.constants.MaxUint256
}

const getChainId = async () => {
    // wtite your script here
    const chainId = await ethers.provider.getNetwork().then((network) => network.chainId)
    const chainIdBN = BigNumber.from(chainId)
    const chainIdStr = chainIdBN.toString()

    return { chainIdStr, chainIdBN }
}

export {
    deploy,
    verify,
    deployAndVerify,
    toEther,
    fromEther,
    maxApproveAmount,
    getChainId,
    contactAt,
}
