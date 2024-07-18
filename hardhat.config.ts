import * as dotenv from "dotenv"
dotenv.config()

import { HardhatUserConfig, task } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"
import "@typechain/hardhat"
import "solidity-coverage"
import "tsconfig-paths/register"
import "@nomicfoundation/hardhat-toolbox"
import "@typechain/hardhat"
import "solidity-coverage"
import "tsconfig-paths/register"

import * as tdly from "@tenderly/hardhat-tenderly"
tdly.setup({ automaticVerifications: true })

const ownerWallet = process.env.OWNER_PRIVATE_KEY as string
const userWallet = process.env.USER_PRIVATE_KEY as string
const gamerWallet = process.env.GAMER_PRIVATE_KEY as string

const trfleKey1 = process.env.TRFLE_KEY1 as string
const trfleKey2 = process.env.TRFLE_KEY2 as string
const trfleKey3 = process.env.TRFLE_KEY3 as string

const config: HardhatUserConfig = {
    solidity: {
        compilers: [
            {
                version: "0.8.20",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 1000,
                    },
                },
            },
            {
                version: "0.8.10",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 1000,
                    },
                },
            },
            {
                version: "0.8.18",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 1000,
                    },
                },
            },
            {
                version: "0.8.17",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 10000,
                    },
                },
            },
            {
                version: "0.5.1",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 1000,
                    },
                },
            },
            {
                version: "0.6.11",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 1000,
                    },
                },
            },
            {
                version: "0.6.6",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 1000,
                    },
                },
            },
            {
                version: "0.5.0",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 1000,
                    },
                },
            },
        ],
    },
    networks: {
        tenderly: {
            url: "https://virtual.polygon.rpc.tenderly.co/5d21fe27-769b-42f3-af2b-8b5e2deffcf2",
            accounts: [ownerWallet, userWallet, gamerWallet],
            gas: "auto",
            chainId: 137,
            gasPrice: "auto",
            allowUnlimitedContractSize: true,
        },
        devnet: {
            url: "http://127.0.0.1:8545",
            accounts: [trfleKey1, trfleKey2, trfleKey3],
            gas: 30000000,
        },
    },

    tenderly: {
        project: "yemovur",
        username: "yemowith",
        privateVerification: true,
        accessKey: "KEQ2xb5YY1cccJJvYid9zHY1TdjaQvPL",
    },
    mocha: {
        timeout: 4 * 60 * 1000,
    },
}

export default config
