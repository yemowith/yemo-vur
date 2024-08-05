// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ETHFlashLender.sol";
import "./ETHFlashBorrower.sol";

contract ETHFlashLoanFactory {
    address[] public lenders;
    address[] public borrowers;

    event LenderCreated(address lender);
    event BorrowerCreated(address borrower);

    // Yeni bir ETHFlashLender oluştur ve kaydet
    function createLender() external returns (address) {
        ETHFlashLender lender = new ETHFlashLender();
        lenders.push(address(lender));
        emit LenderCreated(address(lender));
        return address(lender);
    }

    // Yeni bir ETHFlashBorrower oluştur ve kaydet
    function createBorrower(address lenderAddress) external returns (address) {
        ETHFlashLender lender = ETHFlashLender(payable(lenderAddress));
        ETHFlashBorrower borrower = new ETHFlashBorrower(lender);
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
