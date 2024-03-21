import { ethers } from "hardhat";
import { deploy, fromEther } from "../../utils/tools";
import { balanceOf } from "../../utils/clients/erc20";

async function all() {
  // get deployer
  const [deployer, player] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const Op = await deploy("Op", [deployer.address]);
  const OpAddress = Op.address;

  await Op.deployed.test();

  const proxyFactory = await Op.deployed.proxyFactoryAddress();
  console.log("ProxyFactory deployed to:", proxyFactory);

  const proxyAddress = await Op.deployed.proxyAddress();
  console.log("Proxy deployed to:", proxyAddress);
}

all().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
