// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.15;

import "../helpers/BaseMoldule.sol";

contract BorrowRepayMoldule is BaseMoldule {
    address public lender;
    address public borrower;
    uint256 public loanAmount;
    bool public loanGiven;
    bool public loanRepaid;

    event LoanRequested(address indexed borrower, uint256 amount);
    event LoanRepaid(address indexed borrower, uint256 amount);

    modifier onlyLender() {
        require(msg.sender == lender, "Only lender can perform this action");
        _;
    }

    modifier onlyBorrower() {
        require(
            msg.sender == borrower,
            "Only borrower can perform this action"
        );
        _;
    }

    modifier loanNotGiven() {
        require(!loanGiven, "Loan has already been given");
        _;
    }

    modifier loanNotRepaid() {
        require(loanGiven && !loanRepaid, "Loan has already been repaid");
        _;
    }

    constructor() {
        lender = msg.sender;
    }

    function requestLoan(uint256 amount) external loanNotGiven {
        borrower = msg.sender;
        loanAmount = amount;
        loanGiven = true;
        emit LoanRequested(borrower, amount);
    }

    function repayLoan() external payable onlyBorrower loanNotRepaid {
        require(
            msg.value == loanAmount,
            "Amount sent must be equal to loan amount"
        );
        loanRepaid = true;
        emit LoanRepaid(borrower, msg.value);
    }

    function withdraw() external onlyLender {
        require(loanRepaid, "Loan must be repaid before withdrawal");
        payable(lender).transfer(address(this).balance);
    }
}
