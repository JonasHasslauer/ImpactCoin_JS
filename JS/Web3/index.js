
var web3 = new Web3('http://localhost:7545');

/*
Connects with the abi and the smart contract adress to the SC
 */
const smart_contract_ic_logic = "0xdDb68Efa4Fdc889cca414C0a7AcAd3C5Cc08A8C5";
const abi = [
    {
        "inputs": [],
        "name": "get_action_multiple",
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
                "internalType": "string",
                "name": "action",
                "type": "string"
            }
        ],
        "name": "set_action_multiple",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "passenger",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "km",
                "type": "uint256"
            }
        ],
        "name": "set_both",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];
var spec_smart_contract = new web3.eth.Contract(abi, smart_contract_ic_logic);


/*
Function gets the params from the html form
 */
function get_params_from_form(){
    let km = document.getElementById("km").value
    let passenger = document.getElementById("passenger").value
}

/*
Is needed to connect Chrome with MetaMask
 */
async function connect() {
    if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        window.web3 = new Web3(window.ethereum);
    } else {
        console.log("No wallet");
    }


}

async function get_contracts(){
    const account = await web3.eth.getAccounts();
    const currentAccount = account[0];
    console.log("Current Account: " + currentAccount)
}


