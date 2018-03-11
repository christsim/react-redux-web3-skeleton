var Web3 = require('web3');
const EventEmitter = require('events');


export function getWeb3() {
    return new Promise((resolve, reject) => {
        // Wait for loading completion to avoid race conditions with web3 injection timing.
        window.addEventListener('load', function (dispatch) {
            // Checking if Web3 has been injected by the browser (Mist/MetaMask)
            if (typeof web3 !== 'undefined') {
                // Use Mist/MetaMask's provider.
                let web3Injected = new Web3(web3.currentProvider);
                console.log('Injected web3 detected.');
                resolve(web3Injected);
            } else {
                // Fallback to localhost if no web3 injection.
                var provider = new Web3.providers.HttpProvider('http://localhost:8545');
                let web3Local = new Web3(provider);
                console.log('No web3 instance injected, using Local web3.');
                resolve(web3Local);
            }
        });
    });
}

export function notifyAccountChanged(web3, accountUpdatedFunction) {
    var account = null;
    var accountInterval = setInterval(function () {
        web3.eth.getAccounts().then(accounts => {
            if (accounts.length > 0) {
                if (accounts[0] !== account) {
                    account = accounts[0];
                    accountUpdatedFunction(account);
                }
            } else if (account != null) {
                account = null;
                accountUpdatedFunction(account);
            }
            return account;
        });
    }, 100);
}

export function notifyBlockNumberChange(web3, blockNumberUpdatedFunction) {
    var currentblockNumber = null;
    var accountInterval = setInterval(function () {
        web3.eth.getBlockNumber().then(blockNumber => {
            if (currentblockNumber !== blockNumber) {
                currentblockNumber = blockNumber;
                blockNumberUpdatedFunction(blockNumber);
            }
            return blockNumber;
        });
    }, 1000);
}