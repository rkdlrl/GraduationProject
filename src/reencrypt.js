import axios from 'axios'

async function getPk(msg) {
    var k;
    await axios.post('http://127.0.0.1:5000/key', {id: 'A'})
        .then(response => {
            if(response.data.result != undefined) {   console.log('getPk: OK');            }
            k = response.data.result;
        })
    return k;
};

async function getPkB(msg) {
    var k;
    await axios.post('http://127.0.0.1:5000/key', {id: 'B'})
        .then(response => {
            if(response.data.result != undefined) {   console.log('getPkB: OK');            }
            k = response.data.result;
        })
    return k;
};

async function encryptData(data) {
    var k;
    await axios.post('http://127.0.0.1:5000/encryption', {id: 'A', data: data})
        .then(response => {
            if(response.data.result != undefined) {   console.log('encryptData: OK');            }
            k = response.data.result;
        })
    return k;
};

async function decryptMy(data) {
    var k;
    await axios.post('http://127.0.0.1:5000/decryptMy', {id: 'A', data: data})
        .then(response => {
            if(response.data.result != undefined) {   console.log('decryptMy: OK');            }
            k = response.data.result;
        })
    return k;
};

async function decryptRe(data) {
    var k;
    await axios.post('http://127.0.0.1:5000/decryptRe', {id: 'B', data: data})
        .then(response => {
            if(response.data.result != undefined) {   console.log('decryptRe: OK');            }
            k = response.data.result;
        })
    return k;
};

async function gerReKey(data) {
    var k;
    await axios.post('http://127.0.0.1:5000/ReKey', {id: 'A', pk: data})
        .then(response => {
            if(response.data.result != undefined) {   console.log('gerReKey: OK');            }
            k = response.data.result;
        })
    return k;
};

async function reEncryptData(rekey, data) {
    var k;
    await axios.post('http://127.0.0.1:5000/ReEncrypt', {reKey: rekey, data: data})
    .then(response => {
          k = response.data.result;
        })
    return k;
};

export {getPk, getPkB, encryptData, gerReKey, reEncryptData, decryptMy, decryptRe};