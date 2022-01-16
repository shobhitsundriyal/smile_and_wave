import React from 'react'
import Head from 'next/head'
import { Switch } from '@headlessui/react'
import { useState, useEffect } from 'react'
import Bubble from '../components/Bubble'
import { useRouter } from 'next/router'
import { contractAddress, contractABI } from '../contractdetails'
import { ethers } from 'ethers'
import moment from 'moment'
import Image from 'next/image'

function Messages({ account, waveContract }) {
	const [allMessages, setAllMessages] = useState(true) //for the toggle
	const [gotMessages, setGotMessages] = useState(0)
	const [msgData, setMsgData] = useState()
	const router = useRouter()
	const currAccount = router.query.account
	//console.log(currAccount)
	let allMessagesRecived = []
	let i = 0
	let temp = [1, 2, 3, 4, 5, 6, 4]

	/**Get the messages */
	useEffect(() => {
		async function fecthData() {
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

					await wavePortalContract.getAllWaves().then((messArr) => {
						console.log('============================')
						console.log(messArr)
						//setMsgData(messArr)
						console.log(temp)
						messArr.forEach((element, i) => {
							if (!allMessages) {
								if (
									element.from.toUpperCase() ==
									currAccount.toUpperCase()
								) {
									var time = moment
										.unix(parseInt(element.timestamp._hex))
										.format('DD-MM-YYYY h:mm a')
									allMessagesRecived.push(
										<Bubble
											key={i}
											sentBy={element.from}
											message={element.message}
											timestamp={time}
										/>
									)
								}
							} else {
								var time = moment
									.unix(parseInt(element.timestamp._hex))
									.format('DD-MM-YYYY h:mm a')
								allMessagesRecived.push(
									<Bubble
										key={i}
										sentBy={element.from}
										message={element.message}
										timestamp={time}
									/>
								)
							}
							//console.log(i)
						})
						setMsgData(allMessagesRecived)
						setGotMessages(1)
					})

					//console.log(allMessagesRecived)
					//setGotMessages([0, 2].length)
				} else {
					console.log("Ethereum object doesn't exist!")
				}
			} catch (error) {
				console.log(error)
			}
		}
		fecthData()
	}, [allMessages])
	//const getAllMessage =
	//getAllMessage() //call
	if (!gotMessages)
		return (
			<>
				<div className='w-full h-screen flex justify-center items-center'>
					<Image
						src='https://media3.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif?cid=ecf05e47i2a25glwredhkcg1uie5ekckpryzrckyuh5y8zwq&rid=giphy.gif&ct=g'
						height='200'
						width='200'
					/>
				</div>
			</>
		)
	return (
		<>
			<div className='background h-screen justify-center flex'>
				<Head>
					<title>Smile and Wave</title>
					<link rel='icon' href='/favicon.ico' />
				</Head>
				<div className='w-4/5 bg-slate-300 rounded-2xl p-2'>
					<div className='flex gap-4'>
						<ul
							className='text-purple-500 rounded-full p-2 hover:bg-purple-400 hover:cursor-pointer hover:text-white cursor-pointer transition-all delay-150'
							onClick={(e) => {
								router.push('/')
							}}
						>
							🡸 Go Back
						</ul>
						<div className='p-2 flex gap-x-5'>
							<ul>Your messages</ul>

							<Switch
								checked={allMessages}
								onChange={setAllMessages}
								className={`${
									allMessages ? 'bg-black' : 'bg-white'
								}
          		relative inline-flex flex-shrink-0 h-6 w-16 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
							>
								<span
									aria-hidden='true'
									className={`${
										allMessages
											? 'translate-x-9'
											: 'translate-x-1'
									}
            			pointer-events-none inline-block mr-2 h-5 w-5 rounded-full bg-slate-600 shadow-lg transform ring-0 transition ease-in-out duration-200`}
								/>
							</Switch>
							<ul>All messages</ul>
						</div>
					</div>
					<hr className=' border-black mt-2' />
					<div className='flex flex-col p-2 m-1 overflow-y-scroll h-[90vh] scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-800'>
						{msgData}
					</div>
				</div>
			</div>
		</>
	)
}

export default Messages
