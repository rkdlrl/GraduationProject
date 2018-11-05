<template>
  <div class="regData">
    <header>
        <h1> Register Data</h1>
    </header>
    
    <h3> Input your data </h3>
    <form class="form-horizontal" v-on:submit.prevent="onSubmit()">
        <div class="form-group">
            <label class="col-sm-4" >data type</label>
            <input class="col-sm-6" type="text" v-model="formData.type" required>
        </div>
        <div class="form-group">
            <label class="col-sm-4" >data</label>
            <input class="col-sm-6" type="text" v-model="formData.data" required>
        </div>
        <div class="form-group hidden">
            <label class="col-sm-4" >public key</label>
            <input class="col-sm-6" type="text" v-model="formData.pkHex">
        </div>
        <Button class="btn btn-primary" type="submit"> Send it </Button>
    </form>
    <br/>
    <Button @click="onClick()"> Get Transaction Receipt </Button>

    <table>
        <thead>
        <tr>
            <th>Tx Receipt Category</th>
            <th>Values</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>IPFS Hash</td>
            <td>{{transactionData.addr}}</td>
        </tr>
        <tr>
            <td>Ethereum Contract Address</td>
            <td>{{ethAddress}}</td>
        </tr>
        <tr>
            <td>Tx Hash # </td>
            <td>{{transactionHash}}</td>
        </tr>
        <tr>
            <td>Block Number # </td>
            <td>{{txReceipt.blockNumber}}</td>
        </tr>
        <tr>
            <td>Gas Used</td>
            <td>{{txReceipt.gasUsed}}</td>
        </tr>
        </tbody>
    </table>

    <br/>
    <Button @click="seeTx()"> go Transaction block</Button>
    <Button @click="getExcel()"> get Excel data</Button>
    <Button @click="regExcelData()"> reg data</Button>
  </div>
</template>

<script>
import {addData, getData} from '../orbit'
import {addAddr, getTxBlock} from '../etherum'
import {getPk, encryptData, decryptMy} from '../reencrypt'
import {makeHash} from '../hash'
import data from '../data'

const convert = (from, to) => str => Buffer.from(str, from).toString(to);
const utf8ToHex = convert('utf8', 'hex');
const hexToUtf8 = convert('hex', 'utf8');

export default {
  data () {
    return {
        excelData: [],
        formData: {
            type:'',
            data:'',
            pkHex:'',
        },
        transactionData : {
            data:'',
            pkHex:'',
            account:'',
        },
        ethAddress:'',
        transactionHash:'',
        txReceipt: {
            blockNumber:'',
            gasUsed:'',
        }
    }
  },
    methods: {
        getExcel: function() {
            var pkHex;
            (async () => {
                pkHex = await getPk();
            })();
            data.forEach( item => {
                let dump = {type:'동서발전 발전량',data:'', pkHex:'00a78d51ea70735abe873bacb5db0ea05e04827a25ab3fe6eaff6e8016f176e799d0ce4b6ca852981581b5432d1e86f3e9f68b1777d90d56fc80605f4b9718c2e1615d35f25d8da18f5cd4843b369d1c5ea671a90f6f90b13041cdf64161e09f8c601405df421e70b7b379dd2c4c1976d505757a11c25bb285df4eb65356b76bef7f0268bf01331a6eb159d36a957b61c5413c24a41da905a7d2019fda4f695824b8f085e918e735cdde00d95e04c5e5923cbba609b0d65c63d0da344d746a08e701'};
                dump.data = item;
                this.excelData.push(dump);
            });
            console.log("excelData", this.excelData);
        },
        regExcelData: function() {
            (async () => {
                var startTime = new Date().getTime();
                this.excelData[0].data = await encryptData(this.excelData[0].data);
                // var dddd = await decryptMy(this.excelData[0].data);
                // console.log("dddd", hexToUtf8(dddd));
                var endTime;
                await addData(this.excelData[0]).then(a => {
                    endTime = new Date().getTime();
                    console.log(endTime - startTime);
                });
                // var a = await encryptData({data: "HIHI"});
                // var aa = await decryptMy(a);
                // console.log("aa", hexToUtf8(aa));
            })();

            // (async () => {
            //     var startTime = new Date().getTime();
            //     this.formData.pkHex = await getPk();
            //     this.formData.data = this.excelData[0].data;
            //     this.formData.type = '동서발전 발전량';
            //     console.log(this.formData);
            //     this.transactionHash = 'Loading..';
            //     this.transactionData.data = JSON.stringify(this.formData.data);
            //     this.transactionData.pkHex = this.formData.pkHex;
            //     this.transactionData.account = await this.$store.dispatch('getAccounts');
            //     var endTime;
            //     this.transactionHash = await addAddr(this.transactionData).then(a => {
            //         endTime = new Date().getTime();
            //         console.log(endTime - startTime);
            //     });

            // })();

        },

        onSubmit: function() {
            (async () => {
                this.formData.pkHex = await getPk();
                console.log(this.formData);
                this.formData.data = await encryptData(this.formData.data);

                // this.transactionHash = 'Loading..';

                this.transactionData.addr = await addData(this.formData);
                console.log(this.transactionData.addr);
                // this.transactionData.dataHash = await makeHash(this.formData);
                // this.transactionData.pkHex = this.formData.pkHex;
                // this.transactionData.account = await this.$store.dispatch('getAccounts');

                // this.transactionHash = await addAddr(this.transactionData);

                // var dddd = await decryptMy(this.formData.data);
                // console.log("data", this.formData.data);
                // console.log("dddd", dddd);
                // console.log("dddd", hexToUtf8(dddd));
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
