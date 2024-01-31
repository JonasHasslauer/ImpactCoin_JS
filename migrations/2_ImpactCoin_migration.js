const ImpactCoin = artifacts.require("contracts/ImpactCoin.sol");

module.exports = function(deployer) {
    deployer.deploy(ImpactCoin, 100000000000000, "ImpactCoin", 2, "IC");
};