import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
	Bars3Icon,
	CurrencyDollarIcon,
	DocumentDuplicateIcon,
	BuildingOffice2Icon,
	UsersIcon,
} from '@heroicons/react/24/outline';
import clementineLogo from '../../assets/clementinesv.svg';
import ContactTenant from '../../components/landlordComponents/LTenantList';
import PropertyOverview from '../../components/landlordComponents/LPropertyList';
import PaymentDashboard from '../../components/landlordComponents/LPaymentDashboard';
import Documents from '../../components/landlordComponents/LDocuments';

const navigation = [
	{
		name: 'Payment Dashboard',
		href: '#',
		icon: CurrencyDollarIcon,
		current: true,
	},
	{ name: 'Tenants', href: '#', icon: UsersIcon, current: false },
	{ name: 'Properties', href: '#', icon: BuildingOffice2Icon, current: false },
	{ name: 'Documents', href: '#', icon: DocumentDuplicateIcon, current: false },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function Example() {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [activeComponent, setActiveComponent] = useState(null);

	// Handler to change the active component
	const handleNavigationClick = (componentName) => {
		setActiveComponent(componentName);
	};

	return (
		<>
			<div className='bg-custom-theme'>
				<Transition.Root
					show={sidebarOpen}
					as={Fragment}
				>
					<Dialog
						as='div'
						className='relative z-50 lg:hidden'
						onClose={setSidebarOpen}
					></Dialog>
				</Transition.Root>

				{/* Static sidebar for desktop */}
				<div className='bg-custom-theme fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-white border-r border-gray-200 lg:w-72'>
					{/* Sidebar component, swap this element with another sidebar if you like */}
					<div className='flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6'>
						<div className='flex h-16 shrink-0 items-center'>
							<img
								className='h-8 w-auto'
								src={clementineLogo}
								alt='Your Company'
							/>
							<span
								aria-hidden='true'
								style={{
									marginLeft: '0.6rem',
									marginTop: '0.1rem',
								}}
								className='text-orange text-2xl font-medium'
							>
								Clementine
							</span>
						</div>
						<nav className='flex flex-1 flex-col'>
							<ul
								role='list'
								className='flex flex-1 flex-col gap-y-7'
							>
								<li>
									<ul
										role='list'
										className='-mx-2 space-y-1'
									>
										{navigation.map((item) => (
											<li key={item.name}>
												<button
													onClick={() => handleNavigationClick(item.name)}
													className={classNames(
														item.current
															? 'bg-[#fffcf9] text-indigo-600'
															: 'bg-[#fffcf9] text-gray-700',
														'hover:text-[#52b386ff]', // Apply hover style to all items
														'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
													)}
												>
													<item.icon
														className={classNames(
															item.current
																? 'text-indigo-600'
																: 'text-gray-400 group-hover:text-indigo-600',
															'h-6 w-6 shrink-0'
														)}
														aria-hidden='true'
													/>
													{item.name}
												</button>
											</li>
										))}
									</ul>
								</li>

								<li className='-mx-6 mt-auto'>
									<a
										href='#'
										className='flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50'
									></a>
								</li>
							</ul>
						</nav>
					</div>
				</div>

				<div className='sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden'>
					<button
						type='button'
						className='-m-2.5 p-2.5 text-gray-700 lg:hidden'
						onClick={() => setSidebarOpen(true)}
					>
						<span className='sr-only'>Open sidebar</span>
						<Bars3Icon
							className='h-6 w-6'
							aria-hidden='true'
						/>
					</button>
					<div className='flex-1 text-sm font-semibold leading-6 text-gray-900'>
						Dashboard
					</div>
					<a href='#'>
						<span className='sr-only'>Your profile</span>
						<img
							className='h-8 w-8 rounded-full bg-gray-50'
							src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
							alt=''
						/>
					</a>
				</div>

				<main className='bg-stone lg:pl-72'>
					<div className='px-4 py-10 sm:px-6 lg:px-8 lg:py-6'>
						{activeComponent === 'Payment Dashboard' && <PaymentDashboard />}
						{activeComponent === 'Tenants' && <ContactTenant />}
						{activeComponent === 'Properties' && <PropertyOverview />}
						{activeComponent === 'Documents' && <Documents />}
					</div>
				</main>
			</div>
		</>
	);
}
