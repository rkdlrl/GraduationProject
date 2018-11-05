<template>
  <div class="regTrading">
    <header>
        <h1> Register Trading</h1>
    </header>
    
    <h3> Input your price </h3>
    <form class="form-horizontal" v-on:submit.prevent="onSubmit()">
        <div class="form-group">
            <label class="col-sm-4" >data address</label>
            <input class="col-sm-6" type="text" v-model="formData.addr" required readonly>
        </div>
        <div class="form-group">
            <label class="col-sm-4" >price</label>
            <input class="col-sm-6" type="text" v-model="formData.price" required>
        </div>
        <Button class="btn btn-primary" type="submit"> Send it </Button>
    </form>
    <br/>
    <Button @click="onClick()"> Get Transaction Receipt </Button>

    <Button @click="getDataList()"> Get dataList </Button>
    <table>
      <thead>
        <tr>
          <th class="col-xs-2">select</th>
          <th class="col-xs-2">dataTpye</th>
          <th class="col-xs-8">data</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in dataList" v-bind:key="index">
          <td><input type='checkbox' :id="index" :value="item" v-model="chkedData"></td>
          <td>{{item.type}}</td>
          <td style="word-break:break-all; white-space:pre-wrap; ">{{item.data}}</td>
        </tr>
      </tbody>
    </table>
    <br/>
    <Button @click="seeTx()"> go Transaction block</Button>
  </div>
</template>

<script>
import {addTrade, getDataList} from '../orbit'
import {addTrading, getTxBlock} from '../etherum'
import {getPk} from '../reencrypt'
import {makeHash} from '../hash'

export default {
  data () {
    return {
        formData: {
            addr:'',
            tradeAddr:'',
            price:'',
            pkHex:'',
            isSold:false,
            _id:''
        },
        transactionData : {
            proposalAddr:'',
            price:'',
            pkHex:'',
            account:''
        },
        dataList : '',
        chkedData : [],
        ethAddress:'',
        transactionHash:'',
        txReceipt: {
            blockNumber:'',
            gasUsed:'',
        }
    }
  },
    methods: {
        onSubmit: function() {
            (async () => {
                this.formData.pkHex = await getPk();
                this.formData._id = new Date().getTime().toString();
                this.formData.addr = this.chkedData[0].hash;
                // this.formData.type = this.chkedData[0].type;

                this.transactionData.proposalAddr = await addTrade(this.formData);
                this.transactionData.proposalAddr = this.formData._id;
                this.transactionData.price = this.formData.price;

                this.transactionHash = 'Loading..';
                this.transactionData.pkHex = this.formData.pkHex;
                this.transactionData.account = await this.$store.dispatch('getAccounts');
                this.transactionHash = await addTrading(this.transactionData);

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

        getDataList: function() {
            (async () => {
                var pk = await getPk();
                this.dataList = await getDataList(pk);
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
