import web3 from './web3';
//access our local copy to contract deployed on rinkeby testnet
// 새로짠 코드
const address = '0xd68d17cCFF7e57CB8aDD142283D1dEa6693C25D2';

//use your own contract address, 수정전 계약코드
// const address = '0xD8B6dc18952F87654bfD0f77C139b28d0Ac144c4';
//use the ABI from your contract
const abi = [
	{
		"constant": true,
		"inputs": [
			{
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getData",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_data",
				"type": "string"
			},
			{
				"name": "_pkHex",
				"type": "string"
			}
		],
		"name": "addData",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_proposalAddr",
				"type": "string"
			},
			{
				"name": "_price",
				"type": "uint256"
			},
			{
				"name": "_pkHex",
				"type": "string"
			}
		],
		"name": "propose",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_proposalId",
				"type": "string"
			}
		],
		"name": "transfor",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_proposalId",
				"type": "string"
			}
		],
		"name": "getId",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "getDataIdList",
		"outputs": [
			{
				"name": "",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "data",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "pkHex",
				"type": "string"
			}
		],
		"name": "DataAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "proposalAddr",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "price",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "pkHex",
				"type": "string"
			}
		],
		"name": "ProposalAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "proposalAddr",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "price",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "buyer",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "seller",
				"type": "address"
			}
		],
		"name": "MakedDealAdded",
		"type": "event"
	}
]
// 구형
// const abi = [
//     {
//       "constant": false,
//       "inputs": [
//         {
//           "name": "x",
//           "type": "string"
//         }
//       ],
//       "name": "sendHash",
//       "outputs": [],
//       "payable": false,
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "constant": true,
//       "inputs": [],
//       "name": "getHash",
//       "outputs": [
//         {
//           "name": "x",
//           "type": "string"
//         }
//       ],
//       "payable": false,
//       "stateMutability": "view",
//       "type": "function"
//     }
//   ]
export default new web3.eth.Contract(abi, address);