export const ABI = [
	{
		"inputs": [],
		"name": "_AlreadyVoted",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "_CandidateAlreadyExists",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_Address",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "StandAsCandidate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_voterAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_CandidateAddress",
				"type": "address"
			}
		],
		"name": "Vote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCandidates",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "_CandidateAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "votes",
						"type": "uint256"
					}
				],
				"internalType": "struct BlockchainVoting.Candidate[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getVoters",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "voterAddress",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "_CandidateAddress",
						"type": "address"
					}
				],
				"internalType": "struct BlockchainVoting.Voter[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]