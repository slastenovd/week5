const studentContract = artifacts.require("Student.sol");

module.exports = function(deployer, network) {
  deployer.deploy(studentContract,web3.toWei(0.01, 'ether'));
};