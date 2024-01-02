import { Fragment, useState, useEffect } from 'react';
import axios from 'axios';


import {
	ArrowDownCircleIcon,
	ArrowPathIcon,
	ArrowUpCircleIcon,
	StarIcon,
} from '@heroicons/react/20/solid';


const statuses = {
	Paid: 'text-green-700 bg-green-50 ring-green-600/20',
	Withdraw: 'text-gray-600 bg-gray-50 ring-gray-500/10',
	Overdue: 'text-red-700 bg-red-50 ring-red-600/10',
};


function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function PaymentHistory() {
	const [receipts, setReceipts] = useState([]); // State to hold user data
	

	useEffect(() => {
		// Fetch users when the component mounts
		axios
			.get('http://localhost:8000/Receipts')
			.then((response) => {
				// Handle the response from the server
				setReceipts(response.data);
			})
			.catch((error) => {
				// Handle errors here if the request fails
				console.error('There was an error fetching payments!', error);
			});
	}, []); // The empty array ensures this effect runs once on mount


	return (
		<div className="px-4 sm:px-6 lg:px-8">
		  <div className="flex justify-between">
			<h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
			  Payment History
			</h1>
		  </div>
		  <div className="mt-8 flow-root">
			<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
			  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
				<table className="min-w-full divide-y divide-gray-300">
				  <thead>
					<tr>
					<th
						scope="col"
						className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
					  >
						Invoice #
					  </th>
					  <th
						scope="col"
						className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
					  >
						Name
					  </th>
					  <th
						scope="col"
						className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
					  >
						Address
					  </th>
					  <th
						scope="col"
						className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
					  >
						Payment Amount
					  </th>
					  <th
						scope="col"
						className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
					  >
						Date Paid
					  </th>
					</tr>
				  </thead>
				  <tbody className="divide-y divide-gray-200">
					{receipts.slice().reverse().map((receipt) => (
					  <tr key={receipt.paymentID}>
						<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
						  {receipt.PaymentID}
						</td>
						<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
						  {receipt.Name.toUpperCase()}
						</td>
						<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-0">
						  {receipt.Address}
						</td>
						<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-0">
							{new Intl.NumberFormat('en-US', {
								style: 'currency',
								currency: 'USD',
								}).format(receipt.PaymentAmount)}
						</td>
						<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-0">
						  {receipt.PaymentDate}
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
	