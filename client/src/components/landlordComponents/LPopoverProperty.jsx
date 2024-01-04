/* eslint-disable no-unused-vars */
import { useState, Fragment, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { Dialog, Transition } from '@headlessui/react';

export default function Example() {
	const [open, setOpen] = useState(true);
	const [formData, setFormData] = useState({
		LandlordID: 3,
		Rent: '',
		Address: '',
		Unit: '',
		DueDayOfMonth: '2023-12-20 08:00:00'
	});

	// Handle input changes
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await axios.post(
				'http://localhost:8000/Properties',
				formData
			); // Replace with your API endpoint
			console.log('Property added!', response.data);
		} catch (error) {
			console.error('There was an error adding the property!', error);
		}
	};

	useEffect(() => {
	}, []);

	

	return (
		<Transition.Root
			show={open}
			as={Fragment}
		>
			<Dialog
				as='div'
				className='relative z-10'
				onClose={setOpen}
			>
				<div className='fixed inset-0 bg-stone' />

				<div className='fixed inset-0 overflow-hidden'>
					<div className='absolute inset-0 overflow-hidden'>
						<div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16'>
							<Transition.Child
								as={Fragment}
								enter='transform transition ease-in-out duration-500 sm:duration-700'
								enterFrom='translate-x-full'
								enterTo='translate-x-0'
								leave='transform transition ease-in-out duration-500 sm:duration-700'
								leaveFrom='translate-x-0'
								leaveTo='translate-x-full'
							>
								<Dialog.Panel className='pointer-events-auto w-screen max-w-md'>
									<form
										className='flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl'
										onSubmit={handleSubmit}
									>
										<div className='h-0 flex-1 overflow-y-auto'>
											<div className='bg-indigo-700 px-4 py-6 sm:px-6'>
												<div className='flex items-center justify-between'>
													<div className='ml-3 flex h-7 items-center'>
														<Dialog.Title className='text-base font-semibold leading-6 text-white'>
															New Property
														</Dialog.Title>
														<button
															type='button'
															className='relative rounded-md hover:text-white focus:outline-none focus:ring-2 focus:ring-white'
															onClick={() => setOpen(false)}
														>
															<span className='absolute -inset-2.5' />
															<span className='sr-only'>Close panel</span>
															<XMarkIcon
																className='h-6 w-6'
																aria-hidden='true'
															/>
														</button>
													</div>
												</div>
												<div className='mt-1'>
													<p className='text-sm text-indigo-300'>
														Get started by filling in the information below to
														create your new property for rent.
													</p>
												</div>
											</div>
											<div className='flex flex-1 flex-col justify-between'>
												<div className='divide-y divide-gray-200 px-4 sm:px-6'>
													<div className='space-y-6 pb-5 pt-6'>
														<div>
															<label
																htmlFor='project-name'
																className='block text-sm font-medium leading-6 text-gray-900'
															>
																Street Address
															</label>
															<div className='mt-2'>
																<input
																	type='text'
																	name='Address'
																	id='Address'
																	onChange={handleInputChange}
																	value={formData.Address}
																	className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
																/>
															</div>
														</div>
														<div>
															<label
																htmlFor='project-name'
																className='block text-sm font-medium leading-6 text-gray-900'
															>
																Apt. #
															</label>
															<div className='mt-2'>
																<input
																	type='text'
																	name='Unit'
																	id='Unit'
																	onChange={handleInputChange}
																	value={formData.Unit}
																	className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
																/>
															</div>
														</div>
														{/* <div>
																<label
																	htmlFor='project-name'
																	className='block text-sm font-medium leading-6 text-gray-900'
																>
																	City
																</label>
																<div className='mt-2'>
																	<input
																		type='text'
																		name='city'
																		id='city'
																		onChange={handleInputChange}
																		value={formData.city}
																		className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
																	/>
																</div>
															</div>
															<div>
																<label
																	htmlFor='project-name'
																	className='block text-sm font-medium leading-6 text-gray-900'
																>
																	State
																</label>
																<div className='mt-2'>
																	<input
																		type='text'
																		name='state'
																		maxLength={'2'}
																		id='state'
																		onChange={handleInputChange}
																		value={formData.state}
																		className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
																	/>
																</div>
															</div>
															<div>
																<label
																	htmlFor='project-name'
																	className='block text-sm font-medium leading-6 text-gray-900'
																>
																	Zip
																</label>
																<div className='mt-2'>
																	<input
																		type='number'
																		name='zip'
																		id='zip'
																		onChange={handleInputChange}
																		value={formData.zip}
																		className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
																	/>
																</div>
															</div> */}
														<div>
															<label
																htmlFor='project-name'
																className='block text-sm font-medium leading-6 text-gray-900'
															>
																Rent Amount
															</label>
															<div className='mt-2'>
																<input
																	type='number'
																	name='Rent'
																	id='Rent'
																	onChange={handleInputChange}
																	value={formData.Rent}
																	className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
																/>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className='flex flex-shrink-0 justify-end px-4 py-4'>
											<button
												type='button'
												className='rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-[#558540] hover:bg-gray-50'
												onClick={() => setOpen(false)}
											>
												Cancel
											</button>
											<button
												type='submit'
												className='ml-4 inline-flex justify-center rounded-md bg-[#558540] px-3 py-2 text-sm font-semibold shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 text-stone ring-1 ring-[#000]'
												onClick={() => {
													alert('Property Added!');
													setOpen(false);
												}}
											>
												Add Property
											</button>
										</div>
									</form>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}
