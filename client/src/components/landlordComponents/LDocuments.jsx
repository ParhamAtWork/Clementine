import { useEffect, useState } from 'react';
import axios from 'axios';


export default function Example() {
	const [transactions, setTransactions] = useState([]); 

	useEffect(() => {
		// Fetch users when the component mounts
		axios
			.get('http://localhost:8000/Transactions')
			.then((response) => {
				// Handle the response from the server
				setTransactions(response.data);
			})
			.catch((error) => {
				// Handle errors here if the request fails
				console.error('There was an error fetching the users!', error);
			});
	}, []);


	return (
		<div className='px-4 sm:px-6 lg:px-8'>
			<div className='sm:flex flex justify-between'>
				<div className='sm:flex'>
					<h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
						Documents
					</h1>
				</div>
				<div className='mt-4 sm:ml-16 sm:mt-0 sm:flex-none'>
					<button
						type='button'
						className=' rounded-md bg-[#558540] text-stone px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
					>
						Add Document
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
										className='whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0'
									>
										Transaction ID
									</th>
									<th
										scope='col'
										className='whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900'
									>
										Tenant Name
									</th>
									<th
										scope='col'
										className='whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900'
									>
										Address
									</th>
									<th
										scope='col'
										className='whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900'
									>
										Unit
									</th>
									<th
										scope='col'
										className='whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900'
									>
										Rent Amount
									</th>
									<th
										scope='col'
										className='whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900'
									>
										Payment Date
									</th>
									<th
										scope='col'
										className='relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-0'
									>
										<span className='sr-only'>Edit</span>
									</th>
								</tr>
							</thead>
							<tbody className='divide-y divide-gray-200 bg-white'>
								{transactions.map((transaction) => (
									<tr key={transaction.TransactionID}>
										<td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-0'>
											{transaction.TransactionID}
										</td>
										<td className='whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900'>
											{transaction.TenantName}
										</td>
										<td className='whitespace-nowrap px-3 py-4 text-sm text-gray-900'>
											{transaction.Address}
										</td>
										<td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
											{transaction.Unit}
										</td>
										<td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
											{transaction.Amount}
										</td>
										<td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
											{Date(transaction.TransactionDate).substring(0, 15)}
										</td>
										<td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0'>
											<a
												href='#'
												className='text-[#f98500] hover:text-[#f98500] underline'
											>
												Edit<span className='sr-only'>, {transaction.id}</span>
											</a>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}
