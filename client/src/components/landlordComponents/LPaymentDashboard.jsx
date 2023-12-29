import { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
	UserIcon,
	XMarkIcon,
	HomeModernIcon,
	BanknotesIcon,
} from '@heroicons/react/24/outline';
import axios from 'axios';

const statusStyles = {
	success: 'bg-green-100 text-green-800',
	processing: 'bg-yellow-100 text-yellow-800',
	failed: 'bg-gray-100 text-gray-800',
};

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function Example() {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [transactions, setTransactions] = useState([]);
	const [tenantCount, setTenantCount] = useState([]);
	const [propertyCount, setPropertyCount] = useState([]);
	const [totalAmount, setTotalAmount] = useState(0);

	useEffect(() => {
		// Fetch users when the component mounts
		axios
			.get('http://localhost:8000/Transactions')
			.then((response) => {
				// Handle the response from the server
				setTransactions(response.data);
				const totalAmount = response.data.reduce(
					(total, transaction) => total + parseFloat(transaction.Amount),
					0
				);
				setTotalAmount(totalAmount);
			})
			.catch((error) => {
				// Handle errors here if the request fails
				console.error('There was an error fetching the transactions!', error);
			});
	}, []); // The empty array ensures this effect runs once on mount

	useEffect(() => {
		// Fetch transactions, tenants, and properties when the component mounts
		const fetchData = async () => {
			try {
				const tenantsResponse = await axios.get('http://localhost:8000/Users');
				setTenantCount(tenantsResponse.data);

				const propertiesResponse = await axios.get(
					'http://localhost:8000/Properties'
				);
				setPropertyCount(propertiesResponse.data);
			} catch (error) {
				console.error('There was an error fetching the data!', error);
			}
		};

		fetchData();
	}, []);

	const cards = [
		{
			name: 'Total',
			href: '#',
			icon: BanknotesIcon,
			amount: totalAmount ? `$${totalAmount.toFixed(2)}` : 'Loading...',
		},
		{
			name: 'Tenants',
			href: '#',
			icon: UserIcon,
			amount:
				tenantCount.length > 0
					? tenantCount[tenantCount.length - 1].UserID
					: 'Loading...',
		},
		{
			name: 'Properties',
			href: '#',
			icon: HomeModernIcon,
			amount:
				propertyCount.length > 0
					? propertyCount[propertyCount.length - 1].PropertyID
					: 'Loading...',
		},
	];

	return (
		<>
			<div className='min-h-full'>
				<Transition.Root
					show={sidebarOpen}
					as={Fragment}
				>
					<Dialog
						as='div'
						className='relative z-40 lg:hidden'
						onClose={setSidebarOpen}
					>
						<Transition.Child
							as={Fragment}
							enter='transition-opacity ease-linear duration-300'
							enterFrom='opacity-0'
							enterTo='opacity-100'
							leave='transition-opacity ease-linear duration-300'
							leaveFrom='opacity-100'
							leaveTo='opacity-0'
						>
							<div className='fixed inset-0 bg-gray-600 bg-opacity-75' />
						</Transition.Child>

						<div className='fixed inset-0 z-40 flex'>
							<Transition.Child
								as={Fragment}
								enter='transition ease-in-out duration-300 transform'
								enterFrom='-translate-x-full'
								enterTo='translate-x-0'
								leave='transition ease-in-out duration-300 transform'
								leaveFrom='translate-x-0'
								leaveTo='-translate-x-full'
							>
								<Dialog.Panel className='relative flex w-full max-w-xs flex-1 flex-col bg-cyan-700 pb-4 pt-5'>
									<Transition.Child
										as={Fragment}
										enter='ease-in-out duration-300'
										enterFrom='opacity-0'
										enterTo='opacity-100'
										leave='ease-in-out duration-300'
										leaveFrom='opacity-100'
										leaveTo='opacity-0'
									>
										<div className='absolute right-0 top-0 -mr-12 pt-2'>
											<button
												type='button'
												className='relative ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
												onClick={() => setSidebarOpen(false)}
											>
												<span className='absolute -inset-0.5' />
												<span className='sr-only'>Close sidebar</span>
												<XMarkIcon
													className='h-6 w-6 text-white'
													aria-hidden='true'
												/>
											</button>
										</div>
									</Transition.Child>
									<div className='flex flex-shrink-0 items-center px-4'>
										<img
											className='h-8 w-auto'
											src='https://tailwindui.com/img/logos/mark.svg?color=cyan&shade=300'
											alt='Easywire logo'
										/>
									</div>
								</Dialog.Panel>
							</Transition.Child>
							<div
								className='w-14 flex-shrink-0'
								aria-hidden='true'
							>
								{/* Dummy element to force sidebar to shrink to fit close icon */}
							</div>
						</div>
					</Dialog>
				</Transition.Root>

				<div className='flex justify-between '>
					<div className='ml-4 flex items-center'>{/* Profile dropdown */}</div>
				</div>

				<main className='flex-1 pb-8'>
					{/* Page header */}
					<div className='px-4 sm:px-6 lg:px-8 mx-auto'>
						<div className='sm:flex flex justify-between'>
							<h1 className='flex items-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl ml-15 mr-15 leading-6 text-gray-900 mx-auto'>
								Payment Dashboard
							</h1>
							<div className='sm:flex'></div>
						</div>

						<div className='mx-auto mt-8 max-w-6xl px-4 text-xlg font-medium leading-6 text-gray-900 sm:px-6 lg:px-8'>
							Overview
							<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
								<div className='mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
									{/* Card */}
									{cards.map((card) => (
										<div
											key={card.name}
											className='overflow-hidden rounded-lg bg-white shadow'
										>
											<div className='p-5'>
												<div className='flex items-center'>
													<div className='flex-shrink-0'>
														<card.icon
															className='h-6 w-6 text-gray-400'
															aria-hidden='true'
														/>
													</div>
													<div className='ml-5 w-0 flex-1'>
														<dl>
															<dt className='truncate text-sm font-medium text-gray-500'>
																{card.name}
															</dt>
															<dd>
																<div className='text-sm font-medium text-gray-900'>
																	{card.amount}
																</div>
															</dd>
														</dl>
													</div>
												</div>
											</div>
											<div className='bg-gray-50 px-5 py-3'>
												<div className='text-sm'>
													<a
														href={card.href}
														className='font-medium text-orange hover:text-orange'
													>
														View all
													</a>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
							<h2 className='mx-auto mt-8 max-w-6xl px-4 text-xlg font-medium leading-6 text-gray-900 sm:px-6 lg:px-8'>
								Recent activity
							</h2>
							{/* Activity table (small breakpoint and up) */}
							<div className='hidden sm:block'>
								<div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
									<div className='mt-2 flex flex-col'>
										<div className='min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg'>
											<table className='min-w-full divide-y divide-gray-200'>
												<thead>
													<tr>
														<th
															className='bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900'
															scope='col'
														>
															Transaction
														</th>
														<th
															className='bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900'
															scope='col'
														>
															Amount
														</th>
														<th
															className='hidden bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900 md:block'
															scope='col'
														>
															Status
														</th>
														<th
															className='bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900'
															scope='col'
														>
															Date
														</th>
													</tr>
												</thead>
												<tbody className='divide-y divide-gray-200 bg-white'>
													{transactions.map((transaction) => (
														<tr
															key={transaction.TransactionID}
															className='bg-white'
														>
															<td className='w-full max-w-0 whitespace-nowrap px-6 py-4 text-sm text-[#fac398]'>
																<div className='flex'>
																	<a
																		href={transaction.href}
																		className='group inline-flex space-x-2 truncate text-sm'
																	>
																		<BanknotesIcon
																			className='h-5 w-5 flex-shrink-0 text-green group-hover:text-green'
																			aria-hidden='true'
																		/>
																		<p className='truncate text-[#000] '>
																			{transaction.TransactionID}
																		</p>
																	</a>
																</div>
															</td>
															<td className='whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500'>
																<span className='font-medium text-gray-900'>
																	{'$ ' + transaction.Amount}
																</span>
																{transaction.currency}
															</td>
															<td className='hidden whitespace-nowrap px-6 py-4 text-sm text-gray-500 md:block'>
																<span
																	className={classNames(
																		statusStyles[transaction.FiservPaymentID],
																		'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize'
																	)}
																>
																	{transaction.FiservPaymentID}
																</span>
															</td>
															<td className='whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500'>
																<time dateTime={transaction.TransactionDate}>
																	{transaction.TransactionDate}
																</time>
															</td>
														</tr>
													))}
												</tbody>
											</table>
											{/* Pagination */}
											<nav
												className='flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6'
												aria-label='Pagination'
											>
												<div className='hidden sm:block'>
													<p className='text-sm text-gray-700'>
														Showing <span className='font-medium'>1</span> to{' '}
														<span className='font-medium'>10</span> of{' '}
														<span className='font-medium'>20</span> results
													</p>
												</div>
												<div className='flex flex-1 justify-between gap-x-3 sm:justify-end'>
													<a
														href='#'
														className='hover:text-orange relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-orange ring-1 ring-inset ring-[#fac398] hover:ring-orange'
													>
														Previous
													</a>
													<a
														href='#'
														className='hover:text-orange relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-orange ring-1 ring-inset ring-[#fac398] hover:ring-orange'
													>
														Next
													</a>
												</div>
											</nav>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</main>
			</div>
		</>
	);
}
