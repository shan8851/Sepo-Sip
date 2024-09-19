// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "../lib/openzeppelin-contracts/contracts/access/Ownable.sol";
import "../lib/openzeppelin-contracts/contracts/utils/ReentrancyGuard.sol";

/// @title A faucet contract for distributing test Ether
/// @author Shan8851
/// @notice This contract allows users to request test Ether and others to donate
/// @dev Implements Ownable for access control and ReentrancyGuard for security
contract Faucet is Ownable, ReentrancyGuard {
    uint256 public totalFaucetFunds;
    uint256 public payoutAmount;
    uint256 public totalDonators;
    uint256 public totalPayouts;
    uint256 public constant waitTime = 1 days;

    struct Donator {
        address walletAddress;
        uint256 amountDonated;
        bool hasDonated;
        uint256 lastTimeSentAt;
    }

    // Mapping of user addresses to their Donator struct
    mapping(address => Donator) public donators;

    // Array to keep track of all donator addresses
    address[] public donatorAddresses;

    // Events for logging actions
    event Donated(address indexed userAddress, uint256 weiAmount, uint256 thisTotal, uint256 totalDonators);
    event EthSent(address indexed userAddress, uint256 weiAmount, uint256 thisTotal, uint256 totalPayouts);
    event PayoutAmountChanged(uint256 newAmount);

    /// @notice Initializes the faucet with a specified payout amount
    /// @param _payoutAmount The amount of Eth to be sent in each payout
    constructor(uint256 _payoutAmount) Ownable(msg.sender) {
        payoutAmount = _payoutAmount;
    }

    /// @notice Allows users to donate Eth to the faucet
    /// @dev Updates donator information and emits a Donated event
    function deposit() public payable {
        if (!donators[msg.sender].hasDonated) {
            totalDonators++;
            donators[msg.sender].hasDonated = true;
            donators[msg.sender].walletAddress = msg.sender;
            donatorAddresses.push(msg.sender);
        }
        donators[msg.sender].amountDonated += msg.value;

        emit Donated(msg.sender, msg.value, address(this).balance, totalDonators);
        totalFaucetFunds = address(this).balance;
    }

    /// @notice Allows owner to set a new payout amount
    /// @param payoutInWei The new payout amount in wei
    function setPayoutAmt(uint256 payoutInWei) public onlyOwner {
        payoutAmount = payoutInWei;
        emit PayoutAmountChanged(payoutInWei);
    }

    /// @notice Sends Eth to the specified address
    /// @param userAddress The address that receives the Eth
    /// @dev Checks for balance and wait time
    function sendEth(address payable userAddress) public nonReentrant {
        require(address(this).balance >= payoutAmount, "Insufficient balance");
        require(allowedToRequestPayout(msg.sender), "Wait time not elapsed");

        (bool sent,) = userAddress.call{value: payoutAmount}("");
        require(sent, "Failed to send Ether");

        totalPayouts++;
        emit EthSent(userAddress, payoutAmount, address(this).balance, totalPayouts);
        totalFaucetFunds = address(this).balance;
        donators[msg.sender].lastTimeSentAt = block.timestamp + waitTime;
    }

    /// @notice Retrieves the total number of donators
    /// @return The total number of unique donators
    function getTotalDonators() public view returns (uint256) {
        return totalDonators;
    }

    /// @notice Fetches information about a specific donator
    /// @param addr The address of the donator
    /// @return Donator struct containing the donator's information
    function getIndividualDonator(address addr) public view returns (Donator memory) {
        return donators[addr];
    }

    /// @notice Fetches the total number of payouts made
    /// @return The total number of successful payouts
    function getTotalPayouts() public view returns (uint256) {
        return totalPayouts;
    }

    /// @notice Fetched the current balance of the faucet
    /// @return The current balance in wei
    function getTotalFaucetFunds() public view returns (uint256) {
        return totalFaucetFunds;
    }

    /// @notice Fetches an array of all donator addresses
    /// @return Array containing all addresses that have donated
    function getDonatorAddresses() public view returns (address[] memory) {
        return donatorAddresses;
    }

    /// @notice Checks if an address is allowed to request a payout
    /// @param _address The address to check
    /// @return bool indicating whether the address can request a payout
    function allowedToRequestPayout(address _address) public view returns (bool) {
        if (donators[_address].lastTimeSentAt == 0) {
            return true;
        } else if (block.timestamp >= donators[_address].lastTimeSentAt) {
            return true;
        }
        return false;
    }

    /// @notice Allows the owner to withdraw all funds from the faucet
    /// @dev This function can only be called by the contract owner
    function withdrawEth() public onlyOwner {
        uint256 balance = address(this).balance;
        (bool sent,) = owner().call{value: balance}("");
        require(sent, "Failed to send Ether");
        totalFaucetFunds = 0;
    }
}
