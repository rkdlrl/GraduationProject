import storehash from './storehash'
import web3 from './web3';

// storehash.events.ProposalAdded((error, event) => {
//     console.log('event',error, event);
// });

async function addAddr(a) {
    var tr;
    await storehash.methods.addData(a.data, a.pkHex).send({
        from: a.account[0],
    }, (error, transactionHash) => {
        if(error != undefined) { console.log(error)};
        tr = transactionHash;
    }); 
    return tr;
};

async function getdataIdList(a) {
    var tr;
    await storehash.methods.getdataIdList(a.account[0]).send({
        from: a.account[0],
    }, (error, transactionHash) => {
        if(error != undefined) { console.log(error)};
        tr = transactionHash;
    }); 
    return tr;
};

async function getdata(id) {
    var tr;
    await storehash.methods.getdata(id).send({
        from: a.account[0],
    }, (error, transactionHash) => {
        if(error != undefined) { console.log(error)};
        tr = transactionHash;
    }); 
    return tr;
};

async function addTrading(a) {
    var tr;

    await storehash.methods.propose(a.proposalAddr, a.price, a.pkHex).send({
        from: a.account[0],
    }, (error, transactionHash) => {
        if(error != undefined) { console.log(error)};
        tr = transactionHash;
        console.log('transactionHash',transactionHash);
    }); 
    
    return tr;
};

async function makeDeal(a) {
    var tr;

    await storehash.methods.transfor(a._id).send({
        from: a.account[0], value:web3.utils.toWei(a.price.toString())
    }, (error, transactionHash) => {
        if(error != undefined) { console.log(error)}
        tr = transactionHash;
        console.log('transactionHash',transactionHash);
    })
    .on('MakedDealAdded', function(hash){
        console.log(hash);
    }); 
    
    return tr;
};

async function getTxBlock(tr) {
    try{
        //get Transaction Receipt in console on click
        //See: https://web3js.readthedocs.io/en/1.0/web3-eth.html#gettransactionreceipt
        var tx;
        await web3.eth.getTransactionReceipt(tr, (err, txReceipt)=>{
            if(err != undefined) { console.log(err)};
          tx = txReceipt;
          console.log(txReceipt);
        }); //await for getTransactionReceipt
        return tx;
      } catch(error){
          console.log(error);
          return error;
      }
};

async function getProposalId(_id) {
    return await storehash.methods.getId(_id).call();
}

export {addAddr, addTrading, getTxBlock, makeDeal, getProposalId, getdataIdList, getdata};