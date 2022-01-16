export const contractAddress = '0x841d2ee4D9d9F11978f0B8E3fba6B71836BCD646'
export const contractABI = [
	{
		inputs: [],
		stateMutability: 'nonpayable',
		type: 'constructor',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'from',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'timestamp',
				type: 'uint256',
			},
			{
				indexed: false,
				internalType: 'string',
				name: 'message',
				type: 'string',
			},
		],
		name: 'newWave',
		type: 'event',
	},
	{
		inputs: [],
		name: 'getAllWaves',
		outputs: [
			{
				components: [
					{
						internalType: 'address',
						name: 'from',
						type: 'address',
					},
					{
						internalType: 'uint256',
						name: 'timestamp',
						type: 'uint256',
					},
					{
						internalType: 'string',
						name: 'message',
						type: 'string',
					},
				],
				internalType: 'struct WavePortal.Wave[]',
				name: '',
				type: 'tuple[]',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'getTotalWaves',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		name: 'noWavesSentby',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'string',
				name: '_message',
				type: 'string',
			},
		],
		name: 'wave',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
]
