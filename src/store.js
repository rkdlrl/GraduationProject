import Vue from 'vue'
import Vuex from 'vuex'
import web3 from './web3'
import storehash from './storehash'
import ipfs from './ipfs'

// vuex를 이용한 데이터 공유
Vue.use(Vuex)
// 전역변수 선언
var storage = localStorage

export const store = new Vuex.Store({
  state: {
  },
  getters: {
  },
  // 동기화 메소드
  mutations: {
  },
  // 비동기식 메소드, 보통 action에서 mutations을 호출
  actions: {
    onClick (transactionHash) {
      try{
        //get Transaction Receipt in console on click
        //See: https://web3js.readthedocs.io/en/1.0/web3-eth.html#gettransactionreceipt
        web3.eth.getTransactionReceipt(transactionHash, (err, txReceipt)=>{
          console.log(err,txReceipt);
          return txReceipt;
        }); //await for getTransactionReceipt
      } catch(error){
          console.log(error);
      }
    },

    getAccounts() {
      //bring in user's metamask account address
      const accounts = web3.eth.getAccounts();
      return accounts;
    },

    getEthAddress() {
      //obtain contract address from storehash.js
      const ethAddress= storehash.options.address;
      return ethAddress;
    },

    // 싱크 안맞음
    // addAddrInChain(context, a) {
    //   var tr;
    //   storehash.methods.sendHash(a.addr).send({
    //     from: a.account[0],
    //   }, (error, transactionHash) => {
    //     if(error != undefined) { console.log(error)};
    //     tr = transactionHash;
    //   }); 
    //   return tr;
    // },

    onSubmit (context, a) {
      const buffers = a.buffer;
      const accounts = a.account;
      //save document to IPFS,return its hash#, and set hash# to state
      //https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#add 
      ipfs.add(buffers, (err, ipfsHash) => {
        if(err != undefined) {  console.log(err);}
        //setState by setting ipfsHash to ipfsHash[0].hash 
        const r = {
          ipfsHash : ipfsHash[0].hash,
          transactionHash : ''
        };
        // call Ethereum contract method "sendHash" and .send IPFS hash to etheruem contract 
        //return the transaction hash from the ethereum contract
        //see, this https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#methods-mymethod-send
        storehash.methods.sendHash(ipfsHash[0].hash).send({
          from: accounts[0],
        }, (error, transactionHash) => {
          if(err != 'undefined') { console.log(error)};
          r.transactionHash = transactionHash;
          return r;
        }); 
      })
    }
  }
})
