import { HardhatUserConfig, task } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"
import "@typechain/hardhat"
import "solidity-coverage"
import "tsconfig-paths/register"

//import * as tenderly from "@tenderly/hardhat-tenderly"
//tenderly.setup({ automaticVerifications: true })

//import "@nomicfoundation/hardhat-verify";

import * as dotenv from "dotenv"
dotenv.config()
import { makeNetworkHardhat } from "./utils/stores/networksStore"
import { HardhatNetworkUserConfig, NetworksUserConfig } from "hardhat/types"
import { toEther } from "@utils/tools"

const ownerWallet = process.env.OWNER_PRIVATE_KEY as string
const userWallet = process.env.USER_PRIVATE_KEY as string
const gamerWallet = process.env.GAMER_PRIVATE_KEY as string

const networks: NetworksUserConfig = {
    ...makeNetworkHardhat(),
}

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
                version: "0.8.20",
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
            url: "https://rpc.tenderly.co/fork/bf713b88-9251-4057-b8cf-14121642ea2f",
            accounts: [ownerWallet, userWallet, gamerWallet],
        },
        devnet: {
            url: "http://127.0.0.1:7545",
            accounts: [ownerWallet, userWallet, gamerWallet],
        },
    },
    etherscan: {
        apiKey: {
            phalcon: "rpc_ad4e5c0b76d842d58ac8814a53b54954",
        },
        customChains: [
            {
                network: "phalcon",
                chainId: 1,
                urls: {
                    apiURL: "https://api.phalcon.xyz/api/rpc_a42c7acb00684fbdab5279a6b185a2c9",
                    browserURL: "https://scan.phalcon.xyz/fork_c156807e849b4e81b43afa8119632e43",
                },
            },
        ],
    },
    /*
    tenderly: {
        project: "yemowith",
        username: "yemosoft",
    },
    */
    mocha: {
        timeout: 4 * 60 * 1000,
    },
}

export default config
