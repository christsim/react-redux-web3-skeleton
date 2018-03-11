import {
    getWeb3
} from "../util/web3Util";

export function getWeb3Action() {
    return {
        type: "GET_WEB3",
        payload: getWeb3()
    }
}

export function getWeb3BlockNumberAction(web3) {
    return {
        type: "GET_WEB3_BLOCKNUMBER",
        payload: web3.eth.getBlockNumber()
            .then(blockNumber => blockNumber == 0 ? "0" : blockNumber)
    }
}

export function getWeb3AccountAction(web3) {
    return {
        type: "GET_WEB3_ACCOUNT",
        payload: web3.eth.getAccounts().then(accounts => accounts.length > 0 ? accounts[0]: null)
    }
}

export function setWeb3BlockNumberAction(web3, blockNumber) {
    return {
        type: "GET_WEB3_BLOCKNUMBER",
        payload: Promise.resolve(blockNumber == 0 ? "0" : blockNumber)
    }
}

export function setWeb3AccountAction(web3, account) {
    return {
        type: "GET_WEB3_ACCOUNT",
        payload: account ? Promise.resolve(account) : Promise.reject("No account selected or account locked.")
    }
}

export function getWeb3AccountBalanceAction(web3, account) {
    return {
        type: "GET_WEB3_ACCOUNT_BALANCE",
        payload: account ? web3.eth.getBalance(account).then(balance => web3.utils.fromWei(balance, 'ether')) : Promise.reject("No account selected or account locked.")
    }
}