import { ethers } from "hardhat";
import {
  DeployResult,
  deploy,
  fromEther,
  verifyContract,
} from "../../../../utils/tools";
import { Contract } from "ethers";

async function AddresHelperDeployer(): Promise<{ contracts: Contract[] }> {
  // get deployer
  const [deployer, player] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const AddressesHelpers = await deploy("AddressesHelpers", [deployer.address]);

  return {
    contracts: [AddressesHelpers.contract],
  };
}

export default AddresHelperDeployer;
