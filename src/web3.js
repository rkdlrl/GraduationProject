//overrides metamask v0.2 for our 1.0 version. 
//1.0 lets us use async and await instead of promises
import Web3 from 'web3';

const web3 = new Web3(window.web3.currentProvider);
// const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws'));
// const web3 = new Web3(new Web3.providers.HttpProvider(
//     'https://rinkeby.infura.io/foo',
//   ));
export default web3;