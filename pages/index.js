import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import { useState, useEffect } from 'react'
import { contractAddress, contractABI } from '../contractdetails'

export default function Home() {
	const [currentAccount, setCurrentAccount] = useState()
	const [wavesByCurrentUser, setWavesByCurrentUser] = useState()
	const [isLoading, setIsLoading] = useState(0)
	const [message, setMessage] = useState()
	const [textVal, setTextVal] = useState()
	const router = useRouter()

	const expectedTransactionTime = 21000

	const checkMetamsk = async () => {
		try {
			const { ethereum } = window
			if (!ethereum) {
				console.log('Make sure you have metamask')
				return
			} else {
				console.log('Ethereum object is present')
			}

			/*
			 * Check if we're authorized to access the user's wallet
			 */
			const accounts = await ethereum.request({ method: 'eth_accounts' })
			if (accounts.length !== 0) {
				const account = accounts[0]
				console.log('Found an authorized account:', account)
				setCurrentAccount(account)
			} else {
				console.log('No authorized account found')
			}
			return accounts[0]
		} catch (err) {
			console.log(err)
		}
	}

	/*
	 * This runs our function when the page loads.
	 */
	useEffect(() => {
		checkMetamsk() //returns accounts[0]
	}, [])

	/**Connect wallet function */
	const connectWallet = async () => {
		try {
			const { ethereum } = window
			if (!ethereum) {
				alert("You don't MetaMask!")
				return
			}
			const accounts = await ethereum.request({
				method: 'eth_requestAccounts',
			})
			console.log('Connected', accounts[0])
			setCurrentAccount(accounts[0])
		} catch (err) {
			console.log(err)
		}
	}

	/**Wave function */
	const wave = async () => {
		try {
			const { ethereum } = window

			if (ethereum) {
				const provider = new ethers.providers.Web3Provider(ethereum)
				const signer = provider.getSigner()
				const wavePortalContract = new ethers.Contract(
					contractAddress,
					contractABI,
					signer
				)
				//console.log(message)
				if (!message) {
					setMessage('No message sent.... 😢😢')
				}
				await wavePortalContract.wave(message)
				setIsLoading(1)
				//Not the best fix but works for now
				setTimeout(async () => {
					await wavePortalContract
						.noWavesSentby(currentAccount)
						.then((res) => {
							setWavesByCurrentUser(parseInt(res._hex))
							console.log(parseInt(res._hex))
						})
					setIsLoading(0)
					console.log('.......')
					await wavePortalContract
						.getTotalWaves()
						.then((count) =>
							console.log(
								'Retrieved total wave count... %d',
								parseInt(count._hex)
							)
						)
				}, expectedTransactionTime)

				/*await wavePortalContract
					.getTotalWaves()
					.then((count) =>
						console.log('Retrieved total wave count... %d', count)
					)*/
			} else {
				console.log("Ethereum object doesn't exist!")
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className='background h-screen justify-center items-center flex'>
			<Head>
				<title>Smile and Wave</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<div className='flex flex-col'>
				<div>
					<Image
						src='https://c.tenor.com/u97XzGLsUFQAAAAC/private-skipper.gif'
						width='400'
						height='300'
						className='m-7'
					/>
				</div>
				<div className='justify-center items-center flex flex-col gap-2'>
					{currentAccount ? (
						isLoading ? (
							<button className='text-black cursor-not-allowed flex py-3'>
								{/**Spinner */}
								<div className=' flex justify-center items-center'>
									<div className='animate-spin rounded-full h-6 w-6 border-b-2 border-t-2 border-zinc-800'></div>
								</div>
								<div className='mx-3  text-yellow-50 font-bold'>
									Please Wait... while transaction is being
									mined
								</div>
							</button>
						) : (
							<>
								<textarea
									className=' w-full rounded-md p-2 scrollbar-hide resize-none'
									onChange={(e) => setMessage(e.target.value)}
									value={textVal}
									placeholder='Type us a sweet message too...'
									maxLength='69'
									rows='3'
								></textarea>
								<div className='flex gap-x-2'>
									<button
										className='button text-white font-bold'
										onClick={wave}
									>
										👋 Wave at Us
									</button>
									<button
										className='button text-white font-bold'
										onClick={(e) => {
											router.push({
												pathname: '/messages',
												query: {
													account: currentAccount,
												},
											})
										}}
									>
										See all the Messages
									</button>
								</div>
							</>
						)
					) : (
						<button
							className='button text-black'
							onClick={connectWallet}
						>
							Connect Metamask
						</button>
					)}
				</div>
				<div className='justify-center items-center flex'>
					{wavesByCurrentUser ? (
						<p className='text-white'>
							Thank you for waving us {wavesByCurrentUser} times
						</p>
					) : (
						<div />
					)}
				</div>
			</div>
		</div>
	)
}
