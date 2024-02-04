const ImpactCoin = artifacts.require("ImpactCoin");

contract("ImpactCoin", (accounts) => {
    it("should put 100000 ImpactCoin in the first account", async () => {
        const impactCoinInstance = await ImpactCoin.deployed();
        const balance = await impactCoinInstance.getBalance.call(accounts[0]);
        assert.equal(balance.valueOf(), 100000, "100000 wasn't in the first account");
    });
    it("should send coin correctly", async () => {
        const impactCoinInstance = await ImpactCoin.deployed();

        // Setup 2 accounts.
        const accountOne = accounts[0]; //initial Coin Owner
        const accountTwo = accounts[6];

        // Get initial balances of first and second account.
        const accountOneStartingBalance = (
            await impactCoinInstance.getBalance.call(accountOne)
        ).toNumber();
        const accountTwoStartingBalance = (
            await impactCoinInstance.getBalance.call(accountTwo)
        ).toNumber();

        // Make transaction from first account to second.
        const amount = 10;
        await impactCoinInstance.transferCoins(accountTwo, amount, { from: accountOne });

        // Get balances of first and second account after the transactions.
        const accountOneEndingBalance = (
            await impactCoinInstance.getBalance.call(accountOne)
        ).toNumber();
        const accountTwoEndingBalance = (
            await impactCoinInstance.getBalance.call(accountTwo)
        ).toNumber();

        assert.equal(
            accountOneEndingBalance,
            accountOneStartingBalance - amount,
            "Amount wasn't correctly taken from the sender"
        );
        assert.equal(
            accountTwoEndingBalance,
            accountTwoStartingBalance + amount,
            "Amount wasn't correctly sent to the receiver"
        );
    });
});
