const transactions = [
	{
		id: '1',
		tenantname: 'Garrett Boscoe',
		address: '123 address road',
		unit: '1',
		amountpaid: '$3,509.00',
		outstandingbalance: '$0',
		paymentdate: '12/11/2023',
	},
	{
		id: '2',
		tenantname: 'Garrett Boscoe',
		address: '123 address road',
		unit: '1',
		amountpaid: '$3,509.00',
		outstandingbalance: '$0',
		paymentdate: '12/11/2023',
	},
	{
		id: '3',
		tenantname: 'Garrett Boscoe',
		address: '123 address road',
		unit: '1',
		amountpaid: '$3,509.00',
		outstandingbalance: '$0',
		paymentdate: '12/11/2023',
	}
];

export default function Example() {
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
										Amount Paid
									</th>
									<th
										scope='col'
										className='whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900'
									>
										Remaining Balance
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
									<tr key={transaction.id}>
										<td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-0'>
											{transaction.id}
										</td>
										<td className='whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900'>
											{transaction.tenantname}
										</td>
										<td className='whitespace-nowrap px-3 py-4 text-sm text-gray-900'>
											{transaction.address}
										</td>
										<td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
											{transaction.unit}
										</td>
										<td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
											{transaction.amountpaid}
										</td>
										<td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
											{transaction.outstandingbalance}
										</td>
										<td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
											{transaction.paymentdate}
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
