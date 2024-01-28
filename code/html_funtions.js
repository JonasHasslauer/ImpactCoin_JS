var web3 = new Web3('http://localhost:7545');
var contracts = web3.eth.getAccounts();
web3.eth.getBalance("0x25732625c2952497AefdbcB65fEAb28FB62c81bB").then(console.log)

/*
Function gets the params from the html form
 */
function get_params(){
    let km = document.getElementById("km").value
    let passenger = document.getElementById("passenger").value
    console.log(km, passenger)
    console.log(web3.eth.getAccounts());
    return {
        km,
        passenger
    }
}

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


