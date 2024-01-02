import { useState, useEffect } from 'react';
import axios from 'axios';
// import LPopoverProperty from './LPopoverProperty';

export default function Example() {
	const [property, setProperty] = useState([]);
	const [showPopover, setShowPopover] = useState(false);

	const handleButtonClick = () => {
		setShowPopover(!showPopover);
	};

	useEffect(() => {
		// Fetch users when the component mounts
		axios
			.get('http://localhost:8000/Properties')
			.then((response) => {
				// Handle the response from the server
				setProperty(response.data);
			})
			.catch((error) => {
				// Handle errors here if the request fails
				console.error('There was an error fetching the transactions!', error);
			});
	}, []); // The empty array ensures this effect runs once on mount

	return (
		<div className='px-4 sm:px-6 lg:px-8 '>
			<div className='sm:flex flex justify-between'>
				<h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
					Properties
				</h1>

				<div className='mt-4 sm:ml-16 sm:mt-0 sm:flex-none'>
					<button
						type='button'
						className=' rounded-md bg-[#558540] text-stone px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
						onClick={handleButtonClick}
					>
						Add Property
					</button>
				</div>
			</div>
			<div className='mt-8 flow-root'>
				<div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
					<div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
						<table className='min-w-full divide-y divide-gray-300'>
							<thead>
								<tr>
									<th
										scope='col'
										className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0'
									>
										Address
									</th>
									<th
										scope='col'
										className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
									>
										Unit
									</th>
									<th
										scope='col'
										className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
									>
										Monthly Rent
									</th>

									<th
										scope='col'
										className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
									>
										Availability
									</th>
									<th
										scope='col'
										className='relative py-3.5 pl-3 pr-4 sm:pr-0'
									>
										<span className='sr-only'>Edit</span>
									</th>
								</tr>
							</thead>
							<tbody className='divide-y divide-gray-200'>
								{property.map((properties) => (
									<tr key={properties.PropertyID}>
										<td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0'>
											{properties.Address}
										</td>
										<td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
											{properties.Unit}
										</td>
										<td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
											{properties.Rent}
										</td>
										<td className='whitespace-nowrap px-3 py-4 text-sm'>
											<span className='inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-[#558540]'>
												{properties.OutstandingBalance === 0
													? 'Available'
													: 'Not Available'}
											</span>
										</td>
										<td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0'>
											<a
												href='#'
												className='text-[#f98500] hover:text-[#f98500] underline'
											>
												Edit
												<span className='sr-only'>
													, {properties.PropertyID}
												</span>
											</a>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
			{/* {showPopover && <LPopoverProperty />} */}
		</div>
	);
}
