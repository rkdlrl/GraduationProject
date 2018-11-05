//using the infura.io node, otherwise ipfs requires you to run a //daemon on your own computer/server.
const ipfsApi = require('ipfs-api');
const ipfs = new ipfsApi('ipfs.infura.io', '5001', {protocol: 'https'})
//run with local daemon
// const ipfsApi = require('ipfs-api');
// const ipfs = ipfsApi('localhost', '5001');
export default ipfs;