const ImpactCoin = artifacts.require("contracts/ImpactCoin.sol");

module.exports = function(deployer) {
    deployer.deploy(ImpactCoin, 1000 * 10 ** 18, "ImpactCoin", 18, "IC");
};