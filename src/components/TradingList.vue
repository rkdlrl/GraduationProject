<template>
  <div class="regTrading">
    <header>
        <h1> Register Trading</h1>
    </header>
    
    <h3> Select proposal </h3>
    <form class="form-horizontal" v-on:submit.prevent="onSubmit()">
        <div class="form-group">
            <label class="col-sm-4" >get data</label>
            <textarea class="col-sm-6" type="text" v-model="getData"></textarea>
        </div>
        <Button class="btn btn-primary" type="submit"> buy it </Button>
    </form>
    <br/>
    <Button @click="onClick()"> Get Transaction Receipt </Button>

    <Button @click="getPriceList(1000000000)"> Get PriceList </Button>
    <table>
      <thead>
        <tr>
          <th class="col-xs-4">select</th>
          <th class="col-xs-4">dataTpye</th>
          <th class="col-xs-4">price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in dataList" v-bind:key="item.key">
          <td><input type='checkbox' :id="index" :value="item" v-model="chkedData"></td>
          <td>{{item.type}}</td>
          <td style="max-width: 200px;">{{item.price}}</td>
        </tr>
      </tbody>
    </table>
    <br/>
    <Button @click="seeTx()"> go Transaction block</Button>
  </div>
</template>

<script>
import {addTrade, getPriceList, getData,  getPropose} from '../orbit'
import {makeDeal, getTxBlock, getProposalId} from '../etherum'
import {getPk, getPkB, gerReKey, reEncryptData, decryptMy, decryptRe} from '../reencrypt'
import {makeHash} from '../hash'

const convert = (from, to) => str => Buffer.from(str, from).toString(to);
const utf8ToHex = convert('utf8', 'hex');
const hexToUtf8 = convert('hex', 'utf8');

export default {
  data () {
    return {
        transactionData : {
            _id:'',
            price:'',
            account:''
        },
        dataList : '',
        chkedData : [],
        ethAddress:'',
        transactionHash:'',
        txReceipt: {
            blockNumber:'',
            gasUsed:'',
        },
        getData: ''
    }
  },
    methods: {
        onSubmit: function() {
            (async () => {
                this.transactionHash = 'Loading..';
                this.transactionData._id = this.chkedData[0]._id;

                var id = await getProposalId(this.transactionData._id);
                var enDataAddr = await getPropose(id);
                console.log("enDataAddr ", enDataAddr[0].addr);
                var enData = await getData(enDataAddr[0].addr);
                console.log("enData:", enData.payload.value.data);

                var dddd = await decryptMy(enData.payload.value.data);
                // console.log("decryptMy", dddd);

                var pkB = await getPkB();
                var rekey = await gerReKey(pkB);
                console.log("rekey:",rekey);
                var reEnData = await reEncryptData(rekey, enData.payload.value.data);
                console.log("reEnData:",reEnData);

                var deData = await decryptRe(reEnData);
                console.log("deData", deData);
                this.getData = hexToUtf8(deData);

                this.transactionData.price = this.chkedData[0].price;
                this.transactionData.account = await this.$store.dispatch('getAccounts');
                console.log(this.transactionData);
                this.transactionHash = await makeDeal(this.transactionData);
                console.log(this.transactionHash);
            })();
        },

        onClick: function() {
            (async () => {
                this.txReceipt.blockNumber='waiting..';
                this.txReceipt.gasUsed='waiting...';
                var tr = await getTxBlock(this.transactionHash);
                this.txReceipt.blockNumber=tr.blockNumber;
                this.txReceipt.gasUsed=tr.gasUsed;
            })();
        },

        getPriceList: function(price) {
            (async () => {
                this.dataList = await getPriceList(price);
                console.log(this.dataList);
            })();

        },

        seeTx: function() {
            var url = 'https://rinkeby.etherscan.io/tx/'+this.transactionHash;
            window.open(url, "_blank");
        }
    },
}
</script>

<style >
table {
  margin:auto;
  border: 1px solid #444444;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #444444;
  padding: 0px 10px;
  text-align: center;
}
</style>
