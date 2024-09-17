// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.21;

import "forge-std/Test.sol";
import "../src/Faucet.sol";

contract FaucetTest is Test {
    Faucet public faucet;
    address public owner;
    address public user1;
    address public user2;

    function setUp() public {
        owner = address(this);
        user1 = address(0x1);
        user2 = address(0x2);
        faucet = new Faucet(1 ether);
    }

    function testInitialState() public {
        assertEq(faucet.payoutAmount(), 1 ether);
        assertEq(faucet.totalFaucetFunds(), 0);
        assertEq(faucet.totalDonators(), 0);
        assertEq(faucet.totalPayouts(), 0);
    }

    function testDeposit() public {
        vm.deal(user1, 5 ether);
        vm.prank(user1);
        faucet.deposit{value: 2 ether}();

        assertEq(faucet.totalFaucetFunds(), 2 ether);
        assertEq(faucet.totalDonators(), 1);
    }

    function testSendEth() public {
        vm.deal(address(faucet), 5 ether);
        vm.prank(user1);
        faucet.sendEth(payable(user1));

        assertEq(faucet.totalPayouts(), 1);
        assertEq(user1.balance, 1 ether);
    }

    function testSetPayoutAmount() public {
        faucet.setPayoutAmt(0.5 ether);
        assertEq(faucet.payoutAmount(), 0.5 ether);
    }

}
