/* eslint-disable no-unused-vars */
import { Fragment, useState } from 'react';
import { Dialog, RadioGroup, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/20/solid';

const invoice = {
	subTotal: '$8,800.00',
	tax: '$1,760.00',
	total: '$10,560.00',
	items: [
		{
			id: 1,
			title: 'Logo redesign',
			description: 'New logo and digital asset playbook.',
			hours: '20.0',
			rate: '$100.00',
			price: '$2,000.00',
		},
		{
			id: 2,
			title: 'Website redesign',
			description: 'Design and program new company website.',
			hours: '52.0',
			rate: '$100.00',
			price: '$5,200.00',
		},
		{
			id: 3,
			title: 'Business cards',
			description: 'Design and production of 3.5" x 2.0" business cards.',
			hours: '12.0',
			rate: '$100.00',
			price: '$1,200.00',
		},
		{
			id: 4,
			title: 'T-shirt design',
			description: 'Three t-shirt design concepts.',
			hours: '4.0',
			rate: '$100.00',
			price: '$400.00',
		},
	],
};

const product = {
	name: "Women's Basic Tee",
	price: '$32',
	rating: 3.9,
	reviewCount: 512,
	href: '#',
	imageSrc:
		'https://tailwindui.com/img/ecommerce-images/product-page-01-featured-product-shot.jpg',
	imageAlt: "Back of women's Basic Tee in black.",
	colors: [
		{ name: 'Black', bgColor: 'bg-gray-900', selectedColor: 'ring-gray-900' },
		{
			name: 'Heather Grey',
			bgColor: 'bg-gray-400',
			selectedColor: 'ring-gray-400',
		},
	],
	sizes: [
		{ name: 'XXS', inStock: true },
		{ name: 'XS', inStock: true },
		{ name: 'S', inStock: true },
		{ name: 'M', inStock: true },
		{ name: 'L', inStock: true },
		{ name: 'XL', inStock: true },
		{ name: 'XXL', inStock: false },
	],
};

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function Example() {
	const [open, setOpen] = useState(false);
	const [selectedColor, setSelectedColor] = useState(product.colors[0]);
	const [selectedSize, setSelectedSize] = useState(product.sizes[2]);

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
				<Transition.Child
					as={Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<div className='fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block' />
				</Transition.Child>

				<div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
					<div className='flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4'>
						{/* This element is to trick the browser into centering the modal contents. */}
						<span
							className='hidden md:inline-block md:h-screen md:align-middle'
							aria-hidden='true'
						>
							&#8203;
						</span>
						<Transition.Child
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0 translate-y-4 md:translate-y-0 md:scale-95'
							enterTo='opacity-100 translate-y-0 md:scale-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100 translate-y-0 md:scale-100'
							leaveTo='opacity-0 translate-y-4 md:translate-y-0 md:scale-95'
						>
							<Dialog.Panel className='flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl'>
								<div className='relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8'>
									<button
										type='button'
										className='absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8'
										onClick={() => setOpen(false)}
									>
										<span className='sr-only'>Close</span>
										<XMarkIcon
											className='h-6 w-6'
											aria-hidden='true'
										/>
									</button>

									<div className='grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:items-center lg:gap-x-8'>
										<div className='aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5'>
											<img
												src={product.imageSrc}
												alt={product.imageAlt}
												className='object-cover object-center'
											/>
										</div>
										<div className='sm:col-span-8 lg:col-span-7'>
											<h2 className='text-xl font-medium text-gray-900 sm:pr-12'>
												{product.name}
											</h2>

											<section
												aria-labelledby='information-heading'
												className='mt-1'
											>
												<h3
													id='information-heading'
													className='sr-only'
												>
													Product information
												</h3>

												<p className='font-medium text-gray-900'>
													{product.price}
												</p>

												{/* Reviews */}
												<div className='mt-4'>
													<h4 className='sr-only'>Reviews</h4>
													<div className='flex items-center'>
														<p className='text-sm text-gray-700'>
															{product.rating}
															<span className='sr-only'> out of 5 stars</span>
														</p>
														<div className='ml-1 flex items-center'>
															{[0, 1, 2, 3, 4].map((rating) => (
																<StarIcon
																	key={rating}
																	className={classNames(
																		product.rating > rating
																			? 'text-yellow-400'
																			: 'text-gray-200',
																		'h-5 w-5 flex-shrink-0'
																	)}
																	aria-hidden='true'
																/>
															))}
														</div>
														<div className='ml-4 hidden lg:flex lg:items-center'>
															<span
																className='text-gray-300'
																aria-hidden='true'
															>
																&middot;
															</span>
															<a
																href='#'
																className='ml-4 text-sm font-medium text-indigo-600 hover:text-indigo-500'
															>
																See all {product.reviewCount} reviews
															</a>
														</div>
													</div>
												</div>
											</section>

											<section
												aria-labelledby='options-heading'
												className='mt-8'
											>
												<h3
													id='options-heading'
													className='sr-only'
												>
													Product options
												</h3>

												<form>
													{/* Color picker */}
													<div>
														<h4 className='text-sm font-medium text-gray-900'>
															Color
														</h4>

														<RadioGroup
															value={selectedColor}
															onChange={setSelectedColor}
															className='mt-2'
														>
															<RadioGroup.Label className='sr-only'>
																Choose a color
															</RadioGroup.Label>
															<div className='flex items-center space-x-3'>
																{product.colors.map((color) => (
																	<RadioGroup.Option
																		key={color.name}
																		value={color}
																		className={({ active, checked }) =>
																			classNames(
																				color.selectedColor,
																				active && checked
																					? 'ring ring-offset-1'
																					: '',
																				!active && checked ? 'ring-2' : '',
																				'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
																			)
																		}
																	>
																		<RadioGroup.Label
																			as='span'
																			className='sr-only'
																		>
																			{color.name}
																		</RadioGroup.Label>
																		<span
																			aria-hidden='true'
																			className={classNames(
																				color.bgColor,
																				'h-8 w-8 rounded-full border border-black border-opacity-10'
																			)}
																		/>
																	</RadioGroup.Option>
																))}
															</div>
														</RadioGroup>
													</div>

													{/* Size picker */}
													<div className='mt-8'>
														<div className='flex items-center justify-between'>
															<h4 className='text-sm font-medium text-gray-900'>
																Size
															</h4>
															<a
																href='#'
																className='text-sm font-medium text-indigo-600 hover:text-indigo-500'
															>
																Size guide
															</a>
														</div>

														<RadioGroup
															value={selectedSize}
															onChange={setSelectedSize}
															className='mt-2'
														>
															<RadioGroup.Label className='sr-only'>
																Choose a size
															</RadioGroup.Label>
															<div className='grid grid-cols-7 gap-2'>
																{product.sizes.map((size) => (
																	<RadioGroup.Option
																		key={size.name}
																		value={size}
																		className={({ active, checked }) =>
																			classNames(
																				size.inStock
																					? 'cursor-pointer focus:outline-none'
																					: 'cursor-not-allowed opacity-25',
																				active
																					? 'ring-2 ring-indigo-500 ring-offset-2'
																					: '',
																				checked
																					? 'border-transparent bg-indigo-600 text-white hover:bg-indigo-700'
																					: 'border-gray-200 bg-white text-gray-900 hover:bg-gray-50',
																				'flex items-center justify-center rounded-md border py-3 px-3 text-sm font-medium uppercase sm:flex-1'
																			)
																		}
																		disabled={!size.inStock}
																	>
																		<RadioGroup.Label as='span'>
																			{size.name}
																		</RadioGroup.Label>
																	</RadioGroup.Option>
																))}
															</div>
														</RadioGroup>
													</div>

													<button
														type='submit'
														className='mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
													>
														Add to bag
													</button>

													<p className='absolute left-4 top-4 text-center sm:static sm:mt-8'>
														<a
															href={product.href}
															className='font-medium text-indigo-600 hover:text-indigo-500'
														>
															View full details
														</a>
													</p>
												</form>
											</section>
										</div>
									</div>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}
//TODO
//  <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
//           <div className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
//             {/* Invoice summary */}
//             <div className="lg:col-start-3 lg:row-end-1">
//               <h2 className="sr-only">Summary</h2>
//               <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
//                 <dl className="flex flex-wrap">
//                   <div className="flex-auto pl-6 pt-6">
//                     <dt className="text-sm font-semibold leading-6 text-gray-900">Amount</dt>
//                     <dd className="mt-1 text-base font-semibold leading-6 text-gray-900">$10,560.00</dd>
//                   </div>
//                   <div className="flex-none self-end px-6 pt-4">
//                     <dt className="sr-only">Status</dt>
//                     <dd className="rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-600/20">
//                       Paid
//                     </dd>
//                   </div>
//                   <div className="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
//                     <dt className="flex-none">
//                       <span className="sr-only">Client</span>
//                       <UserCircleIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
//                     </dt>
//                     <dd className="text-sm font-medium leading-6 text-gray-900">Alex Curren</dd>
//                   </div>
//                   <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
//                     <dt className="flex-none">
//                       <span className="sr-only">Due date</span>
//                       <CalendarDaysIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
//                     </dt>
//                     <dd className="text-sm leading-6 text-gray-500">
//                       <time dateTime="2023-01-31">January 31, 2023</time>
//                     </dd>
//                   </div>
//                   <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
//                     <dt className="flex-none">
//                       <span className="sr-only">Status</span>
//                       <CreditCardIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
//                     </dt>
//                     <dd className="text-sm leading-6 text-gray-500">Paid with MasterCard</dd>
//                   </div>
//                 </dl>
//                 <div className="mt-6 border-t border-gray-900/5 px-6 py-6">
//                   <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
//                     Download receipt <span aria-hidden="true">&rarr;</span>
//                   </a>
//                 </div>
//               </div>
//             </div>

//             {/* Invoice */}
//             <div className="-mx-4 px-4 py-8 shadow-sm ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-16 xl:pb-20 xl:pt-16">
//               <h2 className="text-base font-semibold leading-6 text-gray-900">Invoice</h2>
//               <dl className="mt-6 grid grid-cols-1 text-sm leading-6 sm:grid-cols-2">
//                 <div className="sm:pr-4">
//                   <dt className="inline text-gray-500">Issued on</dt>{' '}
//                   <dd className="inline text-gray-700">
//                     <time dateTime="2023-23-01">January 23, 2023</time>
//                   </dd>
//                 </div>
//                 <div className="mt-2 sm:mt-0 sm:pl-4">
//                   <dt className="inline text-gray-500">Due on</dt>{' '}
//                   <dd className="inline text-gray-700">
//                     <time dateTime="2023-31-01">January 31, 2023</time>
//                   </dd>
//                 </div>
//                 <div className="mt-6 border-t border-gray-900/5 pt-6 sm:pr-4">
//                   <dt className="font-semibold text-gray-900">From</dt>
//                   <dd className="mt-2 text-gray-500">
//                     <span className="font-medium text-gray-900">Acme, Inc.</span>
//                     <br />
//                     7363 Cynthia Pass
//                     <br />
//                     Toronto, ON N3Y 4H8
//                   </dd>
//                 </div>
//                 <div className="mt-8 sm:mt-6 sm:border-t sm:border-gray-900/5 sm:pl-4 sm:pt-6">
//                   <dt className="font-semibold text-gray-900">To</dt>
//                   <dd className="mt-2 text-gray-500">
//                     <span className="font-medium text-gray-900">Tuple, Inc</span>
//                     <br />
//                     886 Walter Street
//                     <br />
//                     New York, NY 12345
//                   </dd>
//                 </div>
//               </dl>
//               <table className="mt-16 w-full whitespace-nowrap text-left text-sm leading-6">
//                 <colgroup>
//                   <col className="w-full" />
//                   <col />
//                   <col />
//                   <col />
//                 </colgroup>
//                 <thead className="border-b border-gray-200 text-gray-900">
//                   <tr>
//                     <th scope="col" className="px-0 py-3 font-semibold">
//                       Projects
//                     </th>
//                     <th scope="col" className="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell">
//                       Hours
//                     </th>
//                     <th scope="col" className="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell">
//                       Rate
//                     </th>
//                     <th scope="col" className="py-3 pl-8 pr-0 text-right font-semibold">
//                       Price
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {invoice.items.map((item) => (
//                     <tr key={item.id} className="border-b border-gray-100">
//                       <td className="max-w-0 px-0 py-5 align-top">
//                         <div className="truncate font-medium text-gray-900">{item.title}</div>
//                         <div className="truncate text-gray-500">{item.description}</div>
//                       </td>
//                       <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">
//                         {item.hours}
//                       </td>
//                       <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">
//                         {item.rate}
//                       </td>
//                       <td className="py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700">{item.price}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//                 <tfoot>
//                   <tr>
//                     <th scope="row" className="px-0 pb-0 pt-6 font-normal text-gray-700 sm:hidden">
//                       Subtotal
//                     </th>
//                     <th
//                       scope="row"
//                       colSpan={3}
//                       className="hidden px-0 pb-0 pt-6 text-right font-normal text-gray-700 sm:table-cell"
//                     >
//                       Subtotal
//                     </th>
//                     <td className="pb-0 pl-8 pr-0 pt-6 text-right tabular-nums text-gray-900">{invoice.subTotal}</td>
//                   </tr>
//                   <tr>
//                     <th scope="row" className="pt-4 font-normal text-gray-700 sm:hidden">
//                       Tax
//                     </th>
//                     <th
//                       scope="row"
//                       colSpan={3}
//                       className="hidden pt-4 text-right font-normal text-gray-700 sm:table-cell"
//                     >
//                       Tax
//                     </th>
//                     <td className="pb-0 pl-8 pr-0 pt-4 text-right tabular-nums text-gray-900">{invoice.tax}</td>
//                   </tr>
//                   <tr>
//                     <th scope="row" className="pt-4 font-semibold text-gray-900 sm:hidden">
//                       Total
//                     </th>
//                     <th
//                       scope="row"
//                       colSpan={3}
//                       className="hidden pt-4 text-right font-semibold text-gray-900 sm:table-cell"
//                     >
//                       Total
//                     </th>
//                     <td className="pb-0 pl-8 pr-0 pt-4 text-right font-semibold tabular-nums text-gray-900">
//                       {invoice.total}
//                     </td>
//                   </tr>
//                 </tfoot>
//               </table>
//             </div>
