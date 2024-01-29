
var web3 = new Web3('http://localhost:3300');

/*
Login function to connect with the Metamask-Wallet
 */
async function connect() {
    if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        window.web3 = new Web3(window.ethereum);
    } else {
        console.log("No wallet");
    }
}

/*
Connects with the smart contract using the abi and the smart contract address
 */
const smart_contract_token = "0xd9145CCE52D386f254917e481eB44e9943F39138";
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
                "name": "_to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
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
    }
];
var spec_smart_contract = new web3.eth.Contract(abi, smart_contract_token);

/*
Definitionen, die notwendig für den API-Call sind
 */
const custom_id_petrol_car = "passenger_vehicle-vehicle_type_car-fuel_source_bio_petrol-distance_na-engine_size_medium";
const data_version = "^0";
const source_lca_activity = "fuel_combustion";

let form_co2e;
let form_km;
let form_passenger;
let form_action;

/*
Function gets the params from the html form
 */

function get_params(){
    //get the params from the html form
    form_km = document.getElementById("km").value
    form_passenger = document.getElementById("passagiere").value
    form_action = document.getElementById("action-select").value

    // if co2e did not get filled in the html, take a standard value from the climatic api
    if (document.getElementById("co2e") === "" || document.getElementById("co2e") == null){
        form_co2e = get_car_emissions_from_api(form_km, custom_id_petrol_car, data_version, source_lca_activity);
    }else {
        form_co2e = document.getElementById("co2e").value
    }
    console.log(form_km, form_passenger, form_co2e, form_action);
}
function calculate_co2_emissions(){
    //has to be defined
    return null;
}

function send_coins(){
    //m. E. n müsste nur die "Transfer"-Funktion im Smart Contract aufgerufen werden

}


 function get_car_emissions_from_api(passengers, distance, customId, dataVersion, sourceLcaActivity) {
    let api_object = new Climatiq(passengers, distance, customId, dataVersion, sourceLcaActivity);
    api_object = fetchData(Climatiq.url, api_object.calculateCo2e(), api_object.authorizationHeaders);
    api_object.then(function(result) {
        return (result.co2e);
    })
}



async function get_contracts(){
    const account = await web3.eth.getAccounts();
    const currentAccount = account[0];
    console.log("Current Account: " + currentAccount)
}


