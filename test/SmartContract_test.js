const ImpactCoin = artifacts.require("ImpactCoin");

contract("ImpactCoin", (accounts) => {
    it("should put 100000000 ImpactCoin in the contract", async () => {
        const impactCoinInstance_eins = await ImpactCoin.deployed();
        const balance = await impactCoinInstance_eins.getBalance.call(impactCoinInstance_eins.address);
        assert.equal(balance.valueOf(), 100000000, "100000000 wasn't in the first account");
    });
    it("should send coin correctly", async () => {
        const impactCoinInstance_zwei = await ImpactCoin.deployed();

        // Setup 1 account.
        const receiver = accounts[6];

        // Get initial balances of first and second account.
        const accountOneStartingBalance = (
            await impactCoinInstance_zwei.getBalance.call(impactCoinInstance_zwei.address)
        ).toNumber();
        const accountTwoStartingBalance = (
            await impactCoinInstance_zwei.getBalance.call(receiver)
        ).toNumber();

        // Make transaction from first account to second.
        const amount = 100;
        await impactCoinInstance_zwei.requestCoins(amount, {from: receiver});

        // Get balances of first and second account after the transactions.
        const accountOneEndingBalance = (
            await impactCoinInstance_zwei.getBalance.call(impactCoinInstance_zwei.address)
        ).toNumber();
        const accountTwoEndingBalance = (
            await impactCoinInstance_zwei.getBalance.call(receiver)
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

    it ("should only pay coins, until the maximum of earnings is reached", async () => {

        const impactCoinInstance_drei = await ImpactCoin.deployed();
        const receiver = accounts[7];
        let amount = 20;

        const balance_one = (
            await impactCoinInstance_drei.getBalance.call(receiver)
        ).toNumber();

        for (let i = 0; i < 5; i++) {
            await impactCoinInstance_drei.requestCoins(amount, {from: receiver});
        }

        const balance_two = (
            await impactCoinInstance_drei.getBalance.call(receiver)
        ).toNumber();

        await impactCoinInstance_drei.requestCoins(amount, {from: receiver});

        const balance_three = (
            await impactCoinInstance_drei.getBalance.call(receiver)
        ).toNumber();

        assert.equal(balance_one + (5 * amount), balance_two, "hat fünf mal den Amount überwiesen");
        assert.equal(balance_two, balance_three, "Nach dem fünften Durchgang gab es keine weitere Überweisung");

    });

    it ("should return the right amount of payout for the specific user", async () => {
        const impactCoinInstance_vier = await ImpactCoin.deployed();
        const receiver = accounts[9];
        let amount = 10;
        let var_payout = (await impactCoinInstance_vier.getPayoutAmount({from: receiver}));
        assert.equal(var_payout.toNumber(), 0, "Payout ist null");
        await impactCoinInstance_vier.requestCoins(amount, {from: receiver});
        let var_payout_zwei = (await impactCoinInstance_vier.getPayoutAmount({from: receiver}));
        assert.equal(var_payout_zwei.toNumber(), 10, "Payout ist eins");
    });

    it ("should calculate the right amount of rewards", async () => {
       const impactCoinInstance_sechs = await ImpactCoin.deployed();
       const receiver = accounts[4]
        //Baum
       let reward = (await impactCoinInstance_sechs.calculateReward.call(1, 0, {from: receiver}));
       assert.equal(reward.toNumber(), 15, "Reward ist 15 für einen Baum");
       //läuft 10km statt 10 km zu fahren
        let reward2 = (await impactCoinInstance_sechs.calculateReward.call(2, 10000, {from: receiver}));
        assert.equal(reward2.toNumber(), (10000/1000) * 1, "Für Gehen werden (10000/1000) * 1 coins kalkuliert")

    });



});
