import { ethers } from "hardhat";
import { balanceOf } from "../../utils/clients/erc20";
import { deploy, fromEther } from "../../utils/tools";

async function getSigners() {
  const [deployer, player] = await ethers.getSigners();
  return deployer;
}

async function YemoToken(owner: string, initialSupply: number = 1000000) {
  //const YemoSpace = await deploy("YemoSpace");
  const initialSupplyWei = ethers.utils.parseUnits(
    initialSupply.toString(),
    18
  );
  const YemoToken = await deploy("YemoToken", [
    "YemoToken",
    "YEMO",
    initialSupplyWei,
    owner,
  ]);
  return YemoToken;
}

export { YemoToken };
