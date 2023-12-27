import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

export default function Example() {
	const roleId = 'rol_q3kxgXHvsT0KfWXv';
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		phoneNumber: '',
		tenantEmail: '',
		streetAddress: '',
		aptNum: '',
		city: '',
		state: '',
		zip: '',
		rentAmount: '',
		dueDate: '',
	});

	// Handle input changes
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	// Handle form submission
	const handleSave = (e) => {
		e.preventDefault();
		// Here you can use formData for your API request
		console.log(formData);
		// Example: axios.post('your-api-endpoint', formData);
		createUserWithMetadata(formData);
	};

	async function getManagementApiToken() {
		const options = {
			method: 'POST',
			url: 'https://dev-wyvx8c2jswjwvuxo.us.auth0.com/oauth/token',
			headers: { 'content-type': 'application/json' },
			data: {
				client_id: 'pERLNKBQu6My2BO1JjwLjt01598HRECR',
				client_secret:
					'SDJWwk2NQ3hy_qdxXIfoHESjo37GevULaq-K0IOgW0fYUsS3Ka17wleBd9sjHOUE',
				audience: 'https://dev-wyvx8c2jswjwvuxo.us.auth0.com/api/v2/',
				grant_type: 'client_credentials',
			},
		};

		try {
			const response = await axios(options);
			return response.data.access_token;
		} catch (error) {
			console.error('Error obtaining Management API Token:', error);
			console.log(response.data.access_token);
		}
	}

	async function createUserWithMetadata(formData) {
		const token = await getManagementApiToken(); // Obtain the Management API Token

		const options = {
			method: 'POST',
			url: `https://dev-wyvx8c2jswjwvuxo.us.auth0.com/api/v2/users`,
			headers: {
				'content-type': 'application/json',
				Authorization: `Bearer ${token}`, // Use the token from getManagementApiToken
			},
			data: {
				// Include other necessary user fields like email, password, connection, etc.
				email: formData.tenantEmail,
				password: 'user_password', // Set a secure password
				connection: 'Username-Password-Authentication', // Update with your connection
				user_metadata: formData, // Include the form data as user metadata
			},
		};

		try {
			const response = await axios(options);
			console.log('New user created:', response.data);
		} catch (error) {
			console.error('Error creating new user:', error);
		}
	}

	return (
		<form
			className='flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl'
			onSubmit={handleSave}
		>
			<div className='h-0 flex-1 overflow-y-auto'>
				<div className='bg-indigo-700 px-4 py-6 sm:px-6'>
					<div className='flex items-center justify-between'>
						<div className='ml-3 flex h-7 items-center'>
							<button
								type='button'
								className='relative rounded-md hover:text-white focus:outline-none focus:ring-2 focus:ring-white'
								// onClick={() => setOpen(false)}
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
							Get started by filling in the information below to create your new
							tenant.
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
									First Name
								</label>
								<div className='mt-2'>
									<input
										type='text'
										name='firstName'
										id='first-name'
										onChange={handleInputChange}
										value={formData.firstName}
										className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
									/>
								</div>
							</div>
							<div>
								<label
									htmlFor='project-name'
									className='block text-sm font-medium leading-6 text-gray-900'
								>
									Last Name
								</label>
								<div className='mt-2'>
									<input
										type='text'
										name='lastName'
										id='last-name'
										onChange={handleInputChange}
										value={formData.lastName}
										className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
									/>
								</div>
							</div>
							<div>
								<label
									htmlFor='project-name'
									className='block text-sm font-medium leading-6 text-gray-900'
								>
									Phone Number
								</label>
								<div className='mt-2'>
									<input
										type='tel'
										name='phoneNumber'
										id='phone-number'
										onChange={handleInputChange}
										value={formData.phoneNumber}
										className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
									/>
								</div>
							</div>
							<div>
								<label
									htmlFor='project-name'
									className='block text-sm font-medium leading-6 text-gray-900'
								>
									Tenant Email
								</label>
								<div className='mt-2'>
									<input
										type='email'
										name='tenantEmail'
										id='tenant-email'
										onChange={handleInputChange}
										value={formData.tenantEmail}
										className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
									/>
								</div>
							</div>
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
										name='streetAddress'
										id='street-address'
										onChange={handleInputChange}
										value={formData.streetAddress}
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
										type='number'
										name='aptNum'
										id='apt-num'
										onChange={handleInputChange}
										value={formData.aptNum}
										className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
									/>
								</div>
							</div>
							<div>
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
							</div>
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
										name='rentAmount'
										id='rent-amount'
										onChange={handleInputChange}
										value={formData.rentAmount}
										className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
									/>
								</div>
							</div>
							<div>
								<label
									htmlFor='project-name'
									className='block text-sm font-medium leading-6 text-gray-900'
								>
									Due Date
								</label>
								<div className='mt-2'>
									<input
										type='date'
										name='dueDate'
										id='due-date'
										onChange={handleInputChange}
										value={formData.dueDate}
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
					// onClick={() => setOpen(false)}
				>
					Cancel
				</button>
				<button
					type='submit'
					className='ml-4 inline-flex justify-center rounded-md bg-[#558540] px-3 py-2 text-sm font-semibold shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 text-stone ring-1 ring-[#000]'
					onClick={() => createUserWithMetadata(formData)}
				>
					Save
				</button>
			</div>
		</form>
	);
}
