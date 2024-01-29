const ImpactCoin = artifacts.require("contracts/ImpactCoin.sol");

module.exports = function(deployer) {
    deployer.deploy(ImpactCoin, 1000000, "ImpactCoin", 10, "IC");
};