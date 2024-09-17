// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "forge-std/Script.sol";
import "../src/Faucet.sol";

contract DeployFaucet is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        uint256 payoutAmount = 50000000000000000; // 0.05 ETH
        Faucet faucet = new Faucet(payoutAmount);

        vm.stopBroadcast();

        console.log("Faucet deployed to:", address(faucet));
    }
}
