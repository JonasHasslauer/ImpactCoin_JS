const ImpactCoin = artifacts.require("contracts/ImpactCoin.sol");

module.exports = function(deployer) {
    deployer.deploy(ImpactCoin, 1000000000000000, "ImpactCoin", 18, "IC");
};