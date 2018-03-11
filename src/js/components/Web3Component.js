import React from "react";
import { connect } from "react-redux";
import { 
    getWeb3Action, 
    getWeb3BlockNumberAction, 
    getWeb3AccountAction,
    getWeb3AccountBalanceAction,
    setWeb3BlockNumberAction, 
    setWeb3AccountAction 
    
} from "../actions/web3Actions";
import store from "../store";
import { notifyBlockNumberChange, notifyAccountChanged } from "../util/web3Util";

@connect(
    //map to props
    (store) => {
        return {
            loading: store.web3Reducer.loading,
            web3: store.web3Reducer.web3,
            blockNumber: store.web3Reducer.blockNumber,
            account: store.web3Reducer.account,
            balance: store.web3Reducer.balance,
            error: store.web3Reducer.error
        }
    }
)
export default class Web3Component extends React.Component {
    componentWillMount() {
        store.dispatch(getWeb3Action())
            .then(web3Action => web3Action.action.payload)
            .then(web3 => {

                store.dispatch(getWeb3AccountAction(web3));
                store.dispatch(getWeb3BlockNumberAction(web3));

                web3.eth.getProtocolVersion()
                    .then(console.log);
                web3.eth.isSyncing()                                
                    .then(console.log);

                var subscription = web3.eth.subscribe('pendingTransactions', function(error, result){
                    if (error)
                        console.log(error);
                    console.log(result);
                })
                .on("data", function(transaction){
                    console.log(transaction);
                });

                var subscription = web3.eth.subscribe('newBlockHeaders', function(error, result){
                    if (error)
                        console.log(error);
                    console.log(result);
                })
                .on("data", function(blockHeader){
                    console.log(blockHeader);
                });
                

                notifyAccountChanged(web3, (account => {
                    store.dispatch(setWeb3AccountAction(web3, account));
                    store.dispatch(getWeb3AccountBalanceAction(web3, account));
                }));
                notifyBlockNumberChange(web3, (blockNumber => {
                    store.dispatch(setWeb3BlockNumberAction(web3, blockNumber))
                    store.dispatch(getWeb3AccountBalanceAction(web3, store.getState().web3Reducer.account));
                }));
            });
    }

    componentWillUpdate(nextProps) {
        if (nextProps.account != this.props.account &&
            nextProps.account != 0 &&
            nextProps.account != null) {
            store.dispatch(getWeb3AccountBalanceAction(nextProps.web3, nextProps.account));
        }
    }

    render() {
        var body = (this.props.loading) ? 
        (<h1>Loading</h1>) : 
        (
            <div>
                <h1>Web3 {this.props.web3.version}</h1>
                <div>BlockNumber: {this.props.blockNumber}</div>
                <div>Account: {this.props.account}</div>
                <div>Balance: {this.props.balance}</div>
                <div>{this.props.error}</div>
            </div>
        );

        return (
            <div>
                {body}
            </div>
        );
    }
}