import { HardhatUserConfig, task } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"
import "@typechain/hardhat"
import "tsconfig-paths/register"
import "solidity-coverage"
//import "@nomicfoundation/hardhat-verify";

import * as dotenv from "dotenv"
import { makeNetworkHardhat } from "./utils/stores/networksStore"

dotenv.config()

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
    networks: makeNetworkHardhat(),
    /*
  sourcify: {
    enabled: false,
    // Optional: specify a different Sourcify server
    // apiUrl: "https://sourcify.dev/server",
    // Optional: specify a different Sourcify repository
    // browserUrl: "https://repo.sourcify.dev",
  },
  */
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
}

export default config
