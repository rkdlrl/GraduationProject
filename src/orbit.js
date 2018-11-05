import ipfs from './ipfs'
const OrbitDB = require('orbit-db');

const orbitdb = new OrbitDB(ipfs);
var db = '';
var logDb = '';

(async () => {
    try {
        // Create / Open a DocumentStore , Replicate the database with peers, requires IPFS PubSub. but not supported browser
        db = await orbitdb.docs('1030', {replicate: false}, { indexBy: 'pkHex' });
        logDb = await orbitdb.log('10304', {replicate: false});
        // before loading the database.
        await db.load()
        await logDb.load()

        // Listen for updates from peers, database has synced with another peer. 
        // db.events.on('replicated', (address) => {
        //     // iterator : Returns an Array of Objects, -1 : all, collect : ??
        //     console.log('replicated: ', db.iterator({ limit: -1 }).collect())
        // })

        console.log('db.address: ',db.address.toString())
        console.log('logDb.address: ',logDb.address.toString())
        // // Add an entry
        // const hash = await db.add('world')
        // console.log('add Hash: ',hash)

        // // Query
        // const result = db.iterator({ limit: -1 }).collect()
        // console.log(JSON.stringify(result, null, 2))
        
        // // world만 깔끔하게 나오게 하기
        // result.forEach((post) => {
        //     let data = post.payload.value
        //     console.log(data)
        // })

        // json 형식으로도 가능
        // feed.add({ title: 'Hello', content: 'World' })

    } catch (e) {
        console.log('ERROR: ',e);
    }
})();

async function addData(a) {
    const hash = await logDb.add(a);
    const result = await logDb.iterator({ limit: -1}).collect()
    var result2 = [];
    result.forEach((e) => {
        // if(e.payload.value.pkHex != undefined) {
        //     if(e.payload.value.pkHex == a) {
                result2.push(e);
            // }
        // }
    });
    console.log('added data: ',result);
    // const hash = await db.put(a);
    
    // const all = db.query((doc) => doc.pkHex == a.pkHex)
    
    // const result = db.get(a.pkHex);   //single obj
    return hash;
};

async function addTrade(a) {
    const hash = await db.put(a);
    const all = db.query((doc) => doc.pkHex == a.pkHex);
    console.log('added Trade: ', all);
    
    return hash;
};

async function getDataList(a) {
    const result = await logDb.iterator({ limit: -1}).collect();
    var result2 = [];
    result.forEach((e) => {
        if(e.payload.value.pkHex != undefined) {
            if(e.payload.value.pkHex == a) {
                result2.push(e);
            }
        }
    });
    var list = [];
    result2.forEach((post) => {
        var a = {
            hash: '',
            type: '',
            data: ''
        };
        a.hash = post.hash;
        if(post.payload.value.type != undefined){
            a.type = post.payload.value.type
        };
        if(post.payload.value.data != undefined){
            a.data = post.payload.value.data
        };
        list.push(a);
    })
    return list;
};

async function getPriceList(a) {
    const all = await db.query((doc) => doc.price <= a);
    console.log(all);
    return all;
}

async function getData(id) {
    const result = await logDb.get(id);
    return result;
}

async function getPropose(id) {
    const result = await db.get(id*1);
    return result;
}

// async function addData(a) {
//     const hash = await db.add(a);
//     console.log('add Hash: ',hash);
//     const result = db.iterator({ limit: 1 }).collect()
//     result.forEach((post) => {
//         let data = post.payload.value
//         console.log('added data: ',data)
//     })
//     return hash;
// };

export {addData, addTrade, getDataList, getPriceList, getData, getPropose};
export default orbitdb;