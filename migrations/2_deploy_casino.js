const casinoContract = artifacts.require("Casino.sol");

module.exports = function(deployer, network) {
  deployer.deploy(casinoContract,web3.toWei(0.01, 'ether'));
};