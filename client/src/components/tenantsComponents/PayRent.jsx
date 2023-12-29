import { LockClosedIcon } from '@heroicons/react/20/solid';
import { useState, useEffect } from 'react';
import { makePayment } from '../../../../server/services/fiserv-api.js';
import axios from 'axios';


export default function PayRent()
{
	const [email, setEmail] = useState('');
	const [nameOnCard, setNameOnCard] = useState('');
	const [cardNumber, setCardNumber] = useState('');
	const [expDate, setExpDate] = useState('');
	const [cvc, setCVC] = useState('');
	const [address, setAddress] = useState('');
	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const [postalCode, setPostalCode] = useState('');
	const [paymentAmount, setPaymentAmount] = useState('');
	const [paymentDate, setPaymentDate] = useState('');


	const numericPaymentAmount = parseFloat(paymentAmount)

	const handleInputChange = (event, setStateFunction) => {
		setStateFunction(event.target.value);
	  };

	  useEffect(() => {
		const currentDate = new Date();
		const formattedDate = `${currentDate.getMonth() + 1}-${currentDate.getDate()}-${currentDate.getFullYear()}`;
		setPaymentDate(formattedDate.toString());
	  }, []);

	const handleDateChange = (event, setStateFunction) => {
		let value = event.target.value;

		value = value.replace(/\D/g, '');

		if (event.nativeEvent.inputType === 'deleteContentBackward') {
			value = value.replace(/(\d{2})\/(\d{0,2})/, '$1$2');
		} else {
			if (value.length <= 4) {
			value = value.replace(/(\d{2})(\d{0,2})/, '$1 / $2');
			} else {
			value = value.substring(0, 6);
			value = value.replace(/(\d{2})(\d{2})/, '$1 / $2');
			}
		}

		setStateFunction(value);
		};


	  const [expMonth, expYear] = expDate.split(' / ');


	// const paymentData = {
	// 	cardNum: "4005550000000029",
	// 	price: 123123.00,
	// 	cardExpMonth: "01",
	// 	cardExpYear: "2035",
	// };

	const paymentData = {
		email: email,
		nameOnCard: nameOnCard,
		cardNum: cardNumber,
		price: numericPaymentAmount,
		cardExpMonth: expMonth,
		cardExpYear: expYear,
		cvc: cvc,
		address: address,
		city: city,
		state: state,
		postalCode: postalCode,
		paymentAmount: paymentAmount,
		paymentDate: paymentDate
	};
	

	const handlePayButtonClick =  () => {	
	axios
       .post("http://localhost:8000/charges", paymentData)
       .then((response) => {
		console.log(response.data);
		console.log(paymentData);
		window.alert("Payment Successful!");
		return axios.post("http://localhost:8000/Receipts", paymentData);
       })
	   .then ((secondResponse) => {
		console.log(secondResponse.data);
		window.alert("Both POSTS Successful!");
	   })
       .catch((error) => {
		if (error.response) {  // LEFT OFF HERE!!!
			// The request was made and the server responded with a status code
			// that falls out of the range of 2xx
			console.error("Server responded with an error status:", error.response.status);
			console.error("Error data:", error.response.data);
			console.log("MINE", error.response.data.error[0]);
	
			if (error.response.data && error.response.data.error && Array.isArray(error.response.data.error)) {
			  const apiError = error.response.data.error[0];
	
			  // Check the error type and code
			  if (apiError.type === 'GATEWAY' && apiError.code === '104') {
				console.error("Gateway error: Unable to assign card to brand (Invalid)");
				// Handle the specific error case here
			  } else {
				// Handle other error cases
				console.error("Unhandled API error:", apiError.message);
			  }
			}
		  } else if (error.request) {
			// The request was made but no response was received
			console.error("No response received from the server");
		  } else {
			// Something happened in setting up the request that triggered an Error
			console.error("Error setting up the request:", error.message);
		  }
		});
	};


		
	return (
		<>
		<h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>Pay Rent</h1>
			<main className='bg-[#e1e1e1] lg:flex lg:min-h-full lg:flex-row-reverse lg:overflow-hidden'>
				<h1 className='sr-only'>Checkout</h1>

				{/* Order summary */}
				<section
					aria-labelledby='summary-heading'
					className='hidden w-full max-w-md flex-col bg-gray-50 lg:flex my-40'
				>


					<div className='bottom-0 flex-none border-gray-200 bg-gray-50 p-6'>
						<form>
							<label
								htmlFor='discount-code'
								className='block text-sm font-medium text-gray-700'
							>
								Payment Amount

							</label>
							<div className='mt-1 flex space-x-4'>
								<input
									type='text'
									id='payment-amount'
									name='payment-amount'
									value={paymentAmount}
									onChange={(e) => handleInputChange(e, setPaymentAmount)}
									className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
								/>
							</div>
							<p className='mt-3 text-m font-medium text-gray-700'>
								Payment Total: {new Intl.NumberFormat('en-US', {
								style: 'currency',
								currency: 'USD',
								}).format(paymentAmount)}
								</p>
						</form>

						<dl className='mt-4 space-y-2 text-sm font-medium text-gray-500'>

							<div className='flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900'>

							</div>
							<button
								type='submit'
								onClick={handlePayButtonClick}
								className='mt-6 w-full rounded-md border border-transparent bg-[#52b386ff] px-4 py-2 text-md font-medium text-[#fff] shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
							>
							{paymentAmount && !isNaN(paymentAmount) && !isNaN(parseFloat(paymentAmount))
								? `Pay $${parseFloat(paymentAmount).toLocaleString()}`
								: `Pay`}   
							<span style={{ marginLeft: '0.2rem' }}></span>
							</button>
						</dl>
					</div>
				</section>

				{/* Checkout form */}
				<section
					aria-labelledby='payment-heading'
					className='flex-auto overflow-y-auto px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pb-24 lg:pt-0'
				>
					<h2
						id='payment-heading'
						className='sr-only'
					>
						Payment and shipping details
					</h2>

					<div className='mx-auto max-w-lg lg:pt-16'>



						<form className='mt-0'>
							<div className='grid grid-cols-12 gap-x-4 gap-y-6'>
								<div className='col-span-full'>
									<label
										htmlFor='email-address'
										className='block text-sm font-medium text-gray-700'
									>
										Email Address
									</label>
									<div className='mt-1'>
										<input
											type='email'
											id='email-address'
											name='email-address'
											value={email}
											onChange={(e) => handleInputChange(e, setEmail)}
											autoComplete='email'
											className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
										/>
									</div>
								</div>

								<div className='col-span-full'>
									<label
										htmlFor='name-on-card'
										className='block text-sm font-medium text-gray-700'
									>
										Name on card
									</label>
									<div className='mt-1'>
										<input
											type='text'
											id='name-on-card'
											name='name-on-card'
											autoComplete='cc-name'
											className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
											value={nameOnCard}
											onChange={(e) => handleInputChange(e, setNameOnCard)}
										/>
									</div>
								</div>

								<div className='col-span-full'>
									<label
										htmlFor='card-number'
										className='block text-sm font-medium text-gray-700'
									>
										Card number
									</label>
									<div className='mt-1'>
										<input
											type='text'
											id='card-number'
											name='card-number'
											value={cardNumber}
											onChange={(e) => handleInputChange(e, setCardNumber)}
											autoComplete='cc-number'
											className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
										/>
									</div>
								</div>

								<div className='col-span-8 sm:col-span-9'>
									<label
										htmlFor='expiration-date'
										className='block text-sm font-medium text-gray-700'
									>
										Expiration date (MM/YYYY)
									</label>
									<div className='mt-1'>
										<input
											type='text'
											name='expiration-date'
											value={expDate}
											onChange={(e) => handleDateChange(e, setExpDate)}
											id='expiration-date'
											autoComplete='cc-exp'
											className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
										/>
									</div>
								</div>

								<div className='col-span-4 sm:col-span-3'>
									<label
										htmlFor='cvc'
										className='block text-sm font-medium text-gray-700'
									>
										CVC
									</label>
									<div className='mt-1'>
										<input
											type='text'
											name='cvc'
											id='cvc'
											value={cvc}
											onChange={(e) => handleInputChange(e, setCVC)}
											autoComplete='csc'
											className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
										/>
									</div>
								</div>

								<div className='col-span-full'>
									<label
										htmlFor='address'
										className='block text-sm font-medium text-gray-700'
									>
										Address
									</label>
									<div className='mt-1'>
										<input
											type='text'
											id='address'
											name='address'
											value={address}
											onChange={(e) => handleInputChange(e, setAddress)}
											autoComplete='street-address'
											className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
										/>
									</div>
								</div>

								<div className='col-span-full sm:col-span-4'>
									<label
										htmlFor='city'
										className='block text-sm font-medium text-gray-700'
									>
										City
									</label>
									<div className='mt-1'>
										<input
											type='text'
											id='city'
											name='city'
											value={city}
											onChange={(e) => handleInputChange(e, setCity)}
											autoComplete='address-level2'
											className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
										/>
									</div>
								</div>

								<div className='col-span-full sm:col-span-4'>
									<label
										htmlFor='region'
										className='block text-sm font-medium text-gray-700'
									>
										State / Province
									</label>
									<div className='mt-1'>
										<input
											type='text'
											id='state'
											name='state'
											value={state}
											onChange={(e) => handleInputChange(e, setState)}
											autoComplete='address-level1'
											className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
										/>
									</div>
								</div>

								<div className='col-span-full sm:col-span-4'>
									<label
										htmlFor='postal-code'
										className='block text-sm font-medium text-gray-700'
									>
										Postal code
									</label>
									<div className='mt-1'>
										<input
											type='text'
											id='postal-code'
											name='postal-code'
											value={postalCode}
											onChange={(e) => handleInputChange(e, setPostalCode)}
											autoComplete='postal-code'
											className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
										/>
									</div>
								</div>
							</div>

							<div className='mt-6 flex space-x-2'>
								<div className='flex h-5 items-center'>
									<input
										id='same-as-shipping'
										name='same-as-shipping'
										type='checkbox'
										defaultChecked
										className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
									/>
								</div>
								<label
									htmlFor='same-as-shipping'
									className='text-sm font-medium text-gray-900'
								>
									Billing address is the same as shipping address
								</label>
							</div>
							
						<div className='relative mt-8'>
							<div
								className='absolute inset-0 flex items-center'
								aria-hidden='true'
							>
								<div className='w-full ' />
							</div>
							<p className='mt-6 flex justify-center text-sm font-medium text-gray-500'>
								<LockClosedIcon
									className='mr-1.5 h-5 w-5 text-gray-400'
									aria-hidden='true'
								/>
								Payment details stored in plain text
							</p>
							<div className='relative flex justify-center'>
								
								<span className='bg-white px-4 text-md mt-5 mb-8 font-medium text-gray-500'>
									or
								</span>
								
							</div>
							<button
							type='button'
							className='flex w-full items-center justify-center rounded-md border border-transparent bg-[#000000] py-2 text-[#fff] hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2'
						>
							<span className='sr-only'>Pay with Apple Pay</span>
							<svg
								className='h-5 w-auto'
								fill='currentColor'
								viewBox='0 0 50 20'
							>
							<path d='M9.536 2.579c-.571.675-1.485 1.208-2.4 1.132-.113-.914.334-1.884.858-2.484C8.565.533 9.564.038 10.374 0c.095.951-.276 1.884-.838 2.579zm.829 1.313c-1.324-.077-2.457.751-3.085.751-.638 0-1.6-.713-2.647-.694-1.362.019-2.628.79-3.323 2.017-1.429 2.455-.372 6.09 1.009 8.087.676.99 1.485 2.075 2.552 2.036 1.009-.038 1.409-.656 2.628-.656 1.228 0 1.58.656 2.647.637 1.104-.019 1.8-.99 2.475-1.979.771-1.122 1.086-2.217 1.105-2.274-.02-.019-2.133-.828-2.152-3.263-.02-2.036 1.666-3.007 1.742-3.064-.952-1.408-2.437-1.56-2.951-1.598zm7.645-2.76v14.834h2.305v-5.072h3.19c2.913 0 4.96-1.998 4.96-4.89 0-2.893-2.01-4.872-4.885-4.872h-5.57zm2.305 1.941h2.656c2 0 3.142 1.066 3.142 2.94 0 1.875-1.142 2.95-3.151 2.95h-2.647v-5.89zM32.673 16.08c1.448 0 2.79-.733 3.4-1.893h.047v1.779h2.133V8.582c0-2.14-1.714-3.52-4.351-3.52-2.447 0-4.256 1.399-4.323 3.32h2.076c.171-.913 1.018-1.512 2.18-1.512 1.41 0 2.2.656 2.2 1.865v.818l-2.876.171c-2.675.162-4.123 1.256-4.123 3.159 0 1.922 1.495 3.197 3.637 3.197zm.62-1.76c-1.229 0-2.01-.59-2.01-1.494 0-.933.752-1.475 2.19-1.56l2.562-.162v.837c0 1.39-1.181 2.379-2.743 2.379zM41.1 20c2.247 0 3.304-.856 4.227-3.454l4.047-11.341h-2.342l-2.714 8.763h-.047l-2.714-8.763h-2.409l3.904 10.799-.21.656c-.352 1.114-.923 1.542-1.942 1.542-.18 0-.533-.02-.676-.038v1.779c.133.038.705.057.876.057z' />
							</svg>
						</button>
						</div>
						</form>
					</div>
				</section>
			</main>
		</>
	);

	
	
};
