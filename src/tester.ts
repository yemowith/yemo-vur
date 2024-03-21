import { ethers } from "hardhat";
import { deploy, fromEther, maxApproveAmount, toEther } from "../utils/tools";
import { approve, balanceOf } from "../utils/clients/erc20";
import { balanceOfETH, sendETH } from "../utils/clients/transfers";
import { fromWETH, toWETH } from "../utils/clients/weth";

import TempAddresses from "../utils/helpers/tempAddress";

const tempAddress = new TempAddresses();

async function tester() {
  // get deployer
  /*
  const [deployer, player] = await ethers.getSigners();
  const [deployerAddress] = [deployer.address];
  tempAddress.addWallets([{ code: "deployer", address: deployerAddress}]);

  const wmatic = getAddresses("wmatic", "matic");
  tempAddress.addWallets([{ code: "wmatic", address: wmatic}]);

  let SimpleVault = await deploy("BaseSimpleVault", [wmatic]);
  const [SimpleVaultContract, SimpleVaultAddress] = [SimpleVault.deployed, SimpleVault.address];


  await sendETH(SimpleVaultAddress, toEther(1));
  console.log("Waiting for 3 seconds before deposit...");
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const balanceWETH2 = await balanceOf(SimpleVaultAddress, wmatic);
    console.log("Balance of SimpleVault:", balanceWETH2);
  
    const yemotoken = await YemoToken(deployerAddress,1000000);
    const yemotokenAddress = yemotoken.address;
    tempAddress.addWallets([{ code: "Yemo token", address: yemotokenAddress} ]);


    let amountYemo =  toEther(1)

    await approve(SimpleVaultAddress,maxApproveAmount(),yemotoken.address);


    await balanceOf(SimpleVaultAddress, yemotoken.address);
   
    await SimpleVaultContract.deposit(yemotoken.address, amountYemo);
    console.log("Waiting for 3 seconds before deposit...");
    await new Promise((resolve) => setTimeout(resolve, 3000));

    await balanceOf(SimpleVaultAddress, yemotoken.address);

   
    await SimpleVaultContract.withdraw(yemotoken.address,  toEther(0.5), deployerAddress);
    console.log("Waiting for 3 seconds before withdraw...");
    await new Promise((resolve) => setTimeout(resolve, 3000));

    await balanceOf(SimpleVaultAddress, yemotoken.address);

*/
}

tester().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
