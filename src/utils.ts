import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { balanceOfETH, sendETH } from "@utils/clients/transfers"
import { logg } from "@utils/core/logger"
import { toEther } from "@utils/tools"
import { BigNumber, Contract } from "ethers"
import { ethers } from "hardhat"

const chargeC = async (c: string, a: BigNumber) => {
    const b = await balanceOfETH(c)
    if (b < a) {
        logg.info(`Charge ${a} ETH to ${c}`)
        await sendETH(c, a)
    }
    return b
}

const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

const checkBalance = async (deployer: string) => {
    const balanceD = await balanceOfETH(deployer)
    logg.success("Deployer balance: ", toEther(balanceD))
    if (balanceD.lt(toEther(0.1))) {
        throw new Error("Deployer balance is too low")
    }
}

const accounts = async () => {
    const [deployer, player] = await ethers.getSigners()
    return [deployer, player]
}

const deployContracts = async (
    contracts: { name: string; params: any[] }[],
    deployer: any
): Promise<{
    deployedContracts: { name: string; address: string; params: any[]; contract: Contract }[]
    getContractOf: (name: string) => {
        name: string
        address: string
        params: any[]
        contract: Contract
    }
}> => {
    const deployedContracts: {
        name: string
        address: string
        params: any[]
        contract: Contract
    }[] = []

    for (const contractInfo of contracts) {
        const contractFactory = await ethers.getContractFactory(contractInfo.name, deployer)
        const contractInstance = await contractFactory.deploy(...contractInfo.params)
        deployedContracts.push({
            name: contractInfo.name,
            address: contractInstance.address,
            params: contractInfo.params,
            contract: contractInstance,
        })
        logg.success(`Deployed ${contractInfo.name}: ${contractInstance.address}`)
    }

    const getContractOf = (name: string) => {
        const contractAddress = deployedContracts.find((d) => d.name === name)
        if (!contractAddress) {
            throw new Error(`Contract with name ${name} not found`)
        }
        return contractAddress
    }

    return { deployedContracts, getContractOf }
}

const getContractBytes = async (name: string, account: SignerWithAddress) => {
    const [deployer] = await accounts()
    const contractFactory = await ethers.getContractFactory(name, account)
    const contractBytecode = contractFactory.bytecode
    return contractBytecode
}

export { accounts, chargeC, checkBalance, sleep, deployContracts, getContractBytes }
