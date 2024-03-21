import { ethers } from "hardhat";
import {
  DeployResult,
  deploy,
  fromEther,
  verifyContract,
} from "../../../../utils/tools";
import { Contract } from "ethers";

async function DSSProxydFactoryDeployer(): Promise<{ contracts: Contract[] }> {
  // get deployer
  const [deployer, player] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const DSSProxyCFactory = await deploy("DSSProxyCFactory");

  return {
    contracts: [DSSProxyCFactory.contract],
  };
}

export { DSSProxydFactoryDeployer };
