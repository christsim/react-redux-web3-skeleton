import React from "react";
import { connect } from "react-redux";
import { getWeb3Action } from "../actions/web3Actions";
import Web3Provider from "./Web3Provider";
import Web3DetailsExample from "./Web3DetailsExample";
import store from "../store";

@connect(
    //map to props
    (store) => {
        return {

        }
    }
)
export default class Layout extends React.Component {
    componentWillMount() {
        store.dispatch(getWeb3Action());
    }
    render() {
        return (<Web3Provider>
                <Web3DetailsExample/>
            </Web3Provider>);
    }
}