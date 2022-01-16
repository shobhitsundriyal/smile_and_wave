import React from 'react'

function Bubble({ sentBy, message, timestamp }) {
	return (
		<div className='flex mb-2 '>
			<div className='rounded-lg py-2 px-3 bg-[#F2F2F2]'>
				<p className='text-sm text-teal text-orange-500'>{sentBy}</p>
				<p className='text-lg mt-1'>{message}</p>
				<p className='text-right text-xs text-grey-dark mt-1'>
					{timestamp}
				</p>
			</div>
		</div>
	)
}

export default Bubble
