const ImpactCoin = artifacts.require("contracts/ImpactCoin.sol");

module.exports = function(deployer) {
    deployer.deploy(ImpactCoin, 100000, "ImpactCoin", 0, "IC");
};