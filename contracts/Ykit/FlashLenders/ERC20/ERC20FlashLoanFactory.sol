// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC20FlashLender.sol";
import "./ERC20FlashBorrower.sol";

contract ERC20FlashLoanFactory {
    address[] public lenders;
    address[] public borrowers;

    event LenderCreated(address lender);
    event BorrowerCreated(address borrower);

    // Yeni bir ERC20FlashLender oluştur ve kaydet
    function createLender(address tokenAddress) external returns (address) {
        ERC20FlashLender lender = new ERC20FlashLender(IERC20(tokenAddress));
        lenders.push(address(lender));
        emit LenderCreated(address(lender));
        return address(lender);
    }

    // Yeni bir ERC20FlashBorrower oluştur ve kaydet
    function createBorrower(address lenderAddress) external returns (address) {
        ERC20FlashLender lender = ERC20FlashLender(lenderAddress);
        ERC20FlashBorrower borrower = new ERC20FlashBorrower(lender);
        borrowers.push(address(borrower));
        emit BorrowerCreated(address(borrower));
        return address(borrower);
    }

    // Tüm lender'ları döndür
    function getAllLenders() external view returns (address[] memory) {
        return lenders;
    }

    // Tüm borrower'ları döndür
    function getAllBorrowers() external view returns (address[] memory) {
        return borrowers;
    }
}
