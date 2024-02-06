const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
/*
Web3
 */
const contract_address = "0x81fa084037aA9a7616Af229d1187d1789d2294B7";
const abi = [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_initialAmount",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_tokenName",
                "type": "string"
            },
            {
                "internalType": "uint8",
                "name": "_decimalUnits",
                "type": "uint8"
            },
            {
                "internalType": "string",
                "name": "_tokenSymbol",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_payoutAmount",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "_owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "_spender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "_from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "_to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "remaining",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "allowed",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "internalType": "bool",
                "name": "success",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "balance",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "balances",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_action",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_emissions",
                "type": "uint256"
            }
        ],
        "name": "calculateReward",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "reward",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "addr",
                "type": "address"
            }
        ],
        "name": "getBalance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getPayoutAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "get_CoinOwner_Address",
        "outputs": [
            {
                "internalType": "address",
                "name": "coinOwner",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "payout",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "requestCoins",
        "outputs": [
            {
                "internalType": "bool",
                "name": "success",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transferCoins",
        "outputs": [
            {
                "internalType": "bool",
                "name": "success",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "internalType": "bool",
                "name": "success",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];
const contract = new web3.eth.Contract(abi, contract_address);

var currentAddress = "";

/*
Definitionen, die notwendig für den API-Call sind
 */
const custom_id_petrol_car = "passenger_vehicle-vehicle_type_car-fuel_source_bio_petrol-distance_na-engine_size_medium";
const data_version = "^0";
const source_lca_activity = "fuel_combustion";

/*
Aus der HTML-Form
 */

let form_km;
let form_action;

async function get_current_address() {
    let walletAddress = "";
    if (window.ethereum) {
        //console.log("Metamask");
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        const ethereum = window.ethereum;
        walletAddress = ethereum.selectedAddress;
        console.log("Is Address: " + web3.utils.isAddress(walletAddress));
        //console.log("Wallet address", walletAddress);
    } else if (window.web3) {
        console.log("Update metamask");
        alert("Update metamask");
    } else {
        console.log("Install metamask");
        alert("Install metamask");
    }
    document.getElementById('account').innerHTML = "<b>Account:</b> " + walletAddress;
    return walletAddress;
}

async function on_Click() {
    get_params();
    let emissions = await get_car_emissions_from_api(Number(form_km), custom_id_petrol_car, data_version, source_lca_activity)
    currentAddress = await get_current_address();
    let rewardAmount = (
        await contract.methods.calculateReward(Number(form_action),
        emissions * 1000).call({from: await get_current_address()}
    ));
    await getBalance();
    await contract.methods.requestCoins(rewardAmount)
        .send({from: await get_current_address()});
    await getBalance()
}

function get_params() {
    //get the params from the html form
    form_km = document.getElementById("km").value
    form_action = document.getElementById("action-select").value
}

async function get_car_emissions_from_api(distance, customId, dataVersion, sourceLcaActivity) {
    let api_object = new Climatiq(distance, customId, dataVersion, sourceLcaActivity);
    let data = await fetchData(Climatiq.url, api_object.calculateCo2e(), api_object.authorizationHeaders);
    return data.co2e;
}

async function getBalance(){
    await contract.methods.balanceOf(await get_current_address())
        .call().then(function (number){
            document.getElementById('textField').innerHTML = "<b>Impact Coins:</b> " + number;
        });
}








