import { ethers } from "hardhat"
import { toEther } from "../../utils/tools"
import { accounts, deployContracts, getContractBytes } from "../utils"
import { logg } from "@utils/core/logger"
import { contractOf } from "../config"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { Contract } from "ethers"

const _CONTRACT_FACTORY = contractOf("ContractFactory") as string
const CONTRACT_FACTORY = ethers.getContractAt("ContractFactory", _CONTRACT_FACTORY)

class YKit {
    _baseContracts: Contract[] = []

    _deployedContracts: Contract[] = []

    _registeredContracts: Contract[] = []

    _toBeRegisteredContracts: { name: string; bytes: string }[] = []

    _deployer: SignerWithAddress

    constructor(
        baseContracts: Contract[],
        toBeRegisteredContracts: { name: string; bytes: string }[],
        deployer: SignerWithAddress
    ) {
        this._baseContracts = baseContracts
        this._toBeRegisteredContracts = toBeRegisteredContracts
        this._deployer = deployer
    }

    getYKit = () => {
        return {
            baseContracts: this._baseContracts,
            toBeRegisteredContracts: this._toBeRegisteredContracts,
            deployer: this._deployer,
            registeredContracts: this._registeredContracts,
            deployedContracts: this._deployedContracts,
        }
    }

    loadBaseContracts = async (withNewDeploying: boolean = false) => {}

    /**
     * deploy base contracts and register to be registered contracts
     */
    deployBaseContracts = async (deployer: SignerWithAddress) => {}

    saveContractBytes = async (contracts: { name: string; bytes: string }[]) => {
        for (const { name, bytes } of contracts) {
            //  const _contractFactory = await contractFactory.deployed()
            //   await _contractFactory.registerContract(name, bytes)
        }
    }
}

export default YKit
