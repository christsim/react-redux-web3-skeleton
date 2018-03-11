import React from "react";
import { connect } from "react-redux";
import { getWeb3Action } from "../actions/web3Actions";
import Web3Component from "./Web3Component";
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
        return (<Web3Component/>);
    }
}