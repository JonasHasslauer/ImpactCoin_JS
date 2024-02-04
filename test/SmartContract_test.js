const ImpactCoin = artifacts.require("ImpactCoin");

contract("ImpactCoin", (accounts) => {
    it("should put 100000 ImpactCoin in the first account", async () => {
        const impactCoinInstance_eins = await ImpactCoin.deployed();
        const balance = await impactCoinInstance_eins.getBalance.call(accounts[0]);
        assert.equal(balance.valueOf(), 100000, "100000 wasn't in the first account");
    });
    it("should send coin correctly", async () => {
        const impactCoinInstance_zwei = await ImpactCoin.deployed();

        // Setup 2 accounts.
        const accountOne = accounts[0]; //initial Coin Owner
        const accountTwo = accounts[6];

        // Get initial balances of first and second account.
        const accountOneStartingBalance = (
            await impactCoinInstance_zwei.getBalance.call(accountOne)
        ).toNumber();
        const accountTwoStartingBalance = (
            await impactCoinInstance_zwei.getBalance.call(accountTwo)
        ).toNumber();

        // Make transaction from first account to second.
        const amount = 100;
        await impactCoinInstance_zwei.transferCoins(accountTwo, amount, { from: accountOne });

        // Get balances of first and second account after the transactions.
        const accountOneEndingBalance = (
            await impactCoinInstance_zwei.getBalance.call(accountOne)
        ).toNumber();
        const accountTwoEndingBalance = (
            await impactCoinInstance_zwei.getBalance.call(accountTwo)
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

    it ("should only get tokens until the maximum payout is reached", async () => {

        const impactCoinInstance_drei = await ImpactCoin.deployed();
        const accountOne = accounts[6]; //initial Coin Owner
        const accountTwo = accounts[7];
        let amount = 10;

        const balance_one = (
            await impactCoinInstance_drei.getBalance.call(accountOne)
        ).toNumber();

        for (let i = 0; i < 5; i++) {
            await impactCoinInstance_drei.transferCoins(accountTwo, amount, {from: accountOne});
        }

        const balance_two = (
            await impactCoinInstance_drei.getBalance.call(accountOne)
        ).toNumber();

        await impactCoinInstance_drei.transferCoins(accountTwo, amount, {from: accountOne});

        const balance_three = (
            await impactCoinInstance_drei.getBalance.call(accountOne)
        ).toNumber();

        assert.equal(balance_one - (5 * amount), balance_two, "hat fünf mal den Amount überwiesen");
        assert.equal(balance_two, balance_three, "Nach dem fünften Durchgang gab es keine weitere Überweisung");

    });

    it ("should return the right amount of payouts for the specific user", async () => {
        const impactCoinInstance_vier = await ImpactCoin.deployed();
        const accountOne = accounts[0]; //initial Coin Owner
        const accountTwo = accounts[9];
        let amount = 10;
        let var_payout = (await impactCoinInstance_vier.getPayoutAmount({from: accountTwo}));
        assert.equal(var_payout.toNumber(), 0, "Payout ist null");
        await impactCoinInstance_vier.transferCoins(accountTwo, amount, {from: accountOne});
        let var_payout_zwei = (await impactCoinInstance_vier.getPayoutAmount({from: accountTwo}));
        assert.equal(var_payout_zwei.toNumber(), 1, "Payout ist eins");

    });

});
