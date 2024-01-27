const {Web3} = require('web3')
const jsonRpcURL = 'HTTP://127.0.0.1:7545'
const web3 = new Web3(jsonRpcURL)
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
]
const contractAddress = '0xdDb68Efa4Fdc889cca414C0a7AcAd3C5Cc08A8C5'
const address = '0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2'
const contract = new web3.eth.Contract(abi, contractAddress)




/* 
 This will not execute the function
 instead it will return the function
 as it is. Try to un comment line 16
 and see the output.
*/

/* 
 This will execute the function
 and return a promise as it is an
 asynchronous function. Try to un
 comment line 24 and see the output.
*/
//console.log(contract.methods.name().call())
// Function call to fetch the information