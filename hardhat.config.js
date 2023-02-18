require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    // npx hardhat run scripts/deploy.js --network mantle-testnet
    "mantle-testnet": {
      url: "https://rpc.testnet.mantle.xyz/",
      accounts: [process.env.PRIVATEKEY],
      chainId: 5001,
      gasPrice: 8000000000
    },
    // npx hardhat run scripts/deploy.js --network hyperspace
    hyperspace: {
      url: "https://api.hyperspace.node.glif.io/rpc/v1",
      accounts: [process.env.PRIVATEKEY],
      chainId: 3141,
      gasPrice: 8000000000
    },
  }
};
