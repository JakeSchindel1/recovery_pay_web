'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Payments() {
  // State for payments data and filters
  const [payments, setPayments] = useState(initialPayments);
  const [upcomingPayments, setUpcomingPayments] = useState(initialUpcomingPayments);
  const [searchTerm, setSearchTerm] = useState('');
  const [houseFilter, setHouseFilter] = useState('All Houses');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState('All Methods');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [activeTab, setActiveTab] = useState('completed');

  // Get unique houses for filter dropdown
  const houses = ['All Houses', ...new Set([...payments, ...upcomingPayments].map(payment => payment.house))];
  
  // Get unique payment methods for filter dropdown
  const paymentMethods = ['All Methods', ...new Set(payments.map(payment => payment.method))];

  // Filter payments based on search term and filters
  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.resident.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.reference.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesHouse = houseFilter === 'All Houses' || payment.house === houseFilter;
    
    const matchesMethod = 
      paymentMethodFilter === 'All Methods' || 
      payment.method === paymentMethodFilter;
    
    // Date range filtering
    let matchesDateRange = true;
    if (dateRange.from && dateRange.to) {
      const paymentDate = new Date(payment.date);
      const fromDate = new Date(dateRange.from);
      const toDate = new Date(dateRange.to);
      matchesDateRange = paymentDate >= fromDate && paymentDate <= toDate;
    } else if (dateRange.from) {
      const paymentDate = new Date(payment.date);
      const fromDate = new Date(dateRange.from);
      matchesDateRange = paymentDate >= fromDate;
    } else if (dateRange.to) {
      const paymentDate = new Date(payment.date);
      const toDate = new Date(dateRange.to);
      matchesDateRange = paymentDate <= toDate;
    }
    
    return matchesSearch && matchesHouse && matchesMethod && matchesDateRange;
  });

  // Filter upcoming payments based on search term and house filter
  const filteredUpcomingPayments = upcomingPayments.filter(payment => {
    const matchesSearch = 
      payment.resident.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesHouse = houseFilter === 'All Houses' || payment.house === houseFilter;
    
    return matchesSearch && matchesHouse;
  });

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Payments</h1>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <Link
            href="/dashboard/payments/record"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg
              className="-ml-1 mr-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Record Payment
          </Link>
          <Link
            href="/dashboard/payments/export"
            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg
              className="-ml-1 mr-2 h-5 w-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            Export
          </Link>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700">
            Search
          </label>
          <input
            type="text"
            name="search"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by resident or reference"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="house-filter" className="block text-sm font-medium text-gray-700">
            House
          </label>
          <select
            id="house-filter"
            name="house-filter"
            value={houseFilter}
            onChange={(e) => setHouseFilter(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            {houses.map((house) => (
              <option key={house} value={house}>
                {house}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="payment-method-filter" className="block text-sm font-medium text-gray-700">
            Payment Method
          </label>
          <select
            id="payment-method-filter"
            name="payment-method-filter"
            value={paymentMethodFilter}
            onChange={(e) => setPaymentMethodFilter(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            {paymentMethods.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="date-from" className="block text-sm font-medium text-gray-700">
            Date Range
          </label>
          <div className="mt-1 flex space-x-2">
            <input
              type="date"
              id="date-from"
              name="date-from"
              value={dateRange.from}
              onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
            <input
              type="date"
              id="date-to"
              name="date-to"
              value={dateRange.to}
              onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('completed')}
            className={`${
              activeTab === 'completed'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Completed Payments
          </button>
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`${
              activeTab === 'upcoming'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Upcoming Payments
          </button>
        </nav>
      </div>

      {/* Payments Table */}
      {activeTab === 'completed' ? (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          {filteredPayments.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Resident
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    House
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Method
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reference
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPayments.map((payment) => (
                  <tr key={payment.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {payment.resident}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.house}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.method}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.reference}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-3">
                        <Link
                          href={`/dashboard/payments/${payment.id}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View
                        </Link>
                        <button
                          className="text-blue-600 hover:text-blue-900"
                          onClick={() => {
                            alert(`Receipt for payment #${payment.id} would be printed here.`);
                          }}
                        >
                          Print Receipt
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="py-12 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  vectorEffect="non-scaling-stroke"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No payments found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          {filteredUpcomingPayments.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Resident
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    House
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUpcomingPayments.map((payment) => (
                  <tr key={payment.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {payment.resident}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.house}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.dueDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/dashboard/payments/record?resident=${payment.residentId}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Record Payment
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="py-12 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  vectorEffect="non-scaling-stroke"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No upcoming payments found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Mock data for completed payments
const initialPayments = [
  {
    id: 1,
    residentId: 1,
    resident: 'Michael Johnson',
    house: 'Serenity House - Main',
    amount: '$750',
    date: '2023-03-01',
    status: 'Completed',
    method: 'Credit Card',
    reference: 'TXID-12345'
  },
  {
    id: 2,
    residentId: 2,
    resident: 'Sarah Williams',
    house: 'Serenity House - Main',
    amount: '$750',
    date: '2023-03-01',
    status: 'Completed',
    method: 'Bank Transfer',
    reference: 'TXID-23456'
  },
  {
    id: 3,
    residentId: 3,
    resident: 'David Brown',
    house: 'Serenity House - West',
    amount: '$750',
    date: '2023-02-28',
    status: 'Completed',
    method: 'Cash',
    reference: 'CASH-3456'
  },
  {
    id: 4,
    residentId: 4,
    resident: 'Emily Davis',
    house: 'Serenity House - West',
    amount: '$750',
    date: '2023-02-28',
    status: 'Completed',
    method: 'Credit Card',
    reference: 'TXID-34567'
  },
  {
    id: 5,
    residentId: 5,
    resident: 'Robert Wilson',
    house: 'Serenity House - East',
    amount: '$750',
    date: '2023-02-27',
    status: 'Completed',
    method: 'Bank Transfer',
    reference: 'TXID-45678'
  },
  {
    id: 6,
    residentId: 7,
    resident: 'Thomas Moore',
    house: 'Serenity House - Main',
    amount: '$750',
    date: '2023-02-27',
    status: 'Completed',
    method: 'Cash',
    reference: 'CASH-5678'
  },
  {
    id: 7,
    residentId: 2,
    resident: 'Sarah Williams',
    house: 'Serenity House - Main',
    amount: '$750',
    date: '2023-02-01',
    status: 'Completed',
    method: 'Credit Card',
    reference: 'TXID-56789'
  },
  {
    id: 8,
    residentId: 1,
    resident: 'Michael Johnson',
    house: 'Serenity House - Main',
    amount: '$750',
    date: '2023-02-01',
    status: 'Completed',
    method: 'Bank Transfer',
    reference: 'TXID-67890'
  },
  {
    id: 9,
    residentId: 4,
    resident: 'Emily Davis',
    house: 'Serenity House - West',
    amount: '$750',
    date: '2023-02-01',
    status: 'Completed',
    method: 'Cash',
    reference: 'CASH-6789'
  },
  {
    id: 10,
    residentId: 3,
    resident: 'David Brown',
    house: 'Serenity House - West',
    amount: '$750',
    date: '2023-01-31',
    status: 'Completed',
    method: 'Credit Card',
    reference: 'TXID-78901'
  }
];

// Mock data for upcoming payments
const initialUpcomingPayments = [
  {
    id: 1,
    residentId: 1,
    resident: 'Michael Johnson',
    house: 'Serenity House - Main',
    amount: '$750',
    dueDate: '2023-04-01',
    status: 'Pending'
  },
  {
    id: 2,
    residentId: 2,
    resident: 'Sarah Williams',
    house: 'Serenity House - Main',
    amount: '$750',
    dueDate: '2023-04-01',
    status: 'Pending'
  },
  {
    id: 3,
    residentId: 4,
    resident: 'Emily Davis',
    house: 'Serenity House - West',
    amount: '$750',
    dueDate: '2023-04-01',
    status: 'Pending'
  },
  {
    id: 4,
    residentId: 7,
    resident: 'Thomas Moore',
    house: 'Serenity House - Main',
    amount: '$750',
    dueDate: '2023-04-01',
    status: 'Pending'
  },
  {
    id: 5,
    residentId: 3,
    resident: 'David Brown',
    house: 'Serenity House - West',
    amount: '$750',
    dueDate: '2023-03-01',
    status: 'Overdue'
  },
  {
    id: 6,
    residentId: 5,
    resident: 'Robert Wilson',
    house: 'Serenity House - East',
    amount: '$750',
    dueDate: '2023-03-01',
    status: 'Overdue'
  }
]; 