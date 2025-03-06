'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Residents() {
  // Mock data for residents
  const initialResidents = [
    { 
      id: 1, 
      name: 'Michael Johnson', 
      house: 'Serenity House - Main',
      room: 'Room 101',
      admissionDate: '2023-01-15',
      paymentStatus: 'Current',
      lastPayment: '2023-03-01',
      nextPaymentDue: '2023-04-01',
      phone: '(555) 123-4567',
      email: 'michael.j@example.com'
    },
    { 
      id: 2, 
      name: 'Sarah Williams', 
      house: 'Serenity House - Main',
      room: 'Room 102',
      admissionDate: '2023-02-01',
      paymentStatus: 'Current',
      lastPayment: '2023-03-01',
      nextPaymentDue: '2023-04-01',
      phone: '(555) 234-5678',
      email: 'sarah.w@example.com'
    },
    { 
      id: 3, 
      name: 'David Brown', 
      house: 'Serenity House - West',
      room: 'Room 201',
      admissionDate: '2022-11-10',
      paymentStatus: 'Current',
      lastPayment: '2023-02-28',
      nextPaymentDue: '2023-03-28',
      phone: '(555) 345-6789',
      email: 'david.b@example.com'
    },
    { 
      id: 4, 
      name: 'Emily Davis', 
      house: 'Serenity House - West',
      room: 'Room 202',
      admissionDate: '2022-12-05',
      paymentStatus: 'Current',
      lastPayment: '2023-02-28',
      nextPaymentDue: '2023-03-28',
      phone: '(555) 456-7890',
      email: 'emily.d@example.com'
    },
    { 
      id: 5, 
      name: 'Robert Wilson', 
      house: 'Serenity House - East',
      room: 'Room 301',
      admissionDate: '2023-01-20',
      paymentStatus: 'Current',
      lastPayment: '2023-02-27',
      nextPaymentDue: '2023-03-27',
      phone: '(555) 567-8901',
      email: 'robert.w@example.com'
    },
    { 
      id: 6, 
      name: 'James Smith', 
      house: 'Serenity House - East',
      room: 'Room 302',
      admissionDate: '2023-02-15',
      paymentStatus: 'Pending',
      lastPayment: '2023-02-05',
      nextPaymentDue: '2023-03-05',
      phone: '(555) 678-9012',
      email: 'james.s@example.com'
    },
    { 
      id: 7, 
      name: 'Jennifer Lee', 
      house: 'Serenity House - Main',
      room: 'Room 103',
      admissionDate: '2023-01-10',
      paymentStatus: 'Pending',
      lastPayment: '2023-02-07',
      nextPaymentDue: '2023-03-07',
      phone: '(555) 789-0123',
      email: 'jennifer.l@example.com'
    },
    { 
      id: 8, 
      name: 'Thomas Moore', 
      house: 'Serenity House - West',
      room: 'Room 203',
      admissionDate: '2022-12-20',
      paymentStatus: 'Pending',
      lastPayment: '2023-02-10',
      nextPaymentDue: '2023-03-10',
      phone: '(555) 890-1234',
      email: 'thomas.m@example.com'
    },
  ];

  const residents = initialResidents;
  const [searchTerm, setSearchTerm] = useState('');
  const [houseFilter, setHouseFilter] = useState('All Houses');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('All Statuses');

  // Filter residents based on search term and filters
  const filteredResidents = residents.filter(resident => {
    const matchesSearch = 
      resident.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resident.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resident.phone.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesHouse = houseFilter === 'All Houses' || resident.house === houseFilter;
    
    const matchesPaymentStatus = 
      paymentStatusFilter === 'All Statuses' || 
      resident.paymentStatus === paymentStatusFilter;
    
    return matchesSearch && matchesHouse && matchesPaymentStatus;
  });

  // Get unique houses for filter dropdown
  const houses = ['All Houses', ...new Set(residents.map(resident => resident.house))];
  
  // Get unique payment statuses for filter dropdown
  const paymentStatuses = ['All Statuses', ...new Set(residents.map(resident => resident.paymentStatus))];

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-foreground">Residents</h1>
        <div className="mt-4 sm:mt-0">
          <Link
            href="/dashboard/residents/new"
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
            Add New Resident
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
            placeholder="Search by name, email, or phone"
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
          <label htmlFor="payment-status-filter" className="block text-sm font-medium text-gray-700">
            Payment Status
          </label>
          <select
            id="payment-status-filter"
            name="payment-status-filter"
            value={paymentStatusFilter}
            onChange={(e) => setPaymentStatusFilter(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            {paymentStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Residents Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        {filteredResidents.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {filteredResidents.map((resident) => (
              <li key={resident.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-500">
                          {resident.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{resident.name}</div>
                        <div className="text-sm text-gray-500">{resident.email}</div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Link
                        href={`/dashboard/residents/${resident.id}`}
                        className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        View
                      </Link>
                      <Link
                        href={`/dashboard/residents/${resident.id}/edit`}
                        className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/dashboard/payments/record?resident=${resident.id}`}
                        className="inline-flex items-center px-2.5 py-1.5 border border-transparent shadow-sm text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        Record Payment
                      </Link>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <div className="text-xs font-medium text-gray-500">House</div>
                      <div className="mt-1 text-sm text-foreground">{resident.house} - Room {resident.room}</div>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-gray-500">Admission Date</div>
                      <div className="mt-1 text-sm text-foreground">{resident.admissionDate}</div>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-gray-500">Payment Status</div>
                      <div className="mt-1">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            resident.paymentStatus === 'Current'
                              ? 'bg-green-100 text-green-800'
                              : resident.paymentStatus === 'Pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {resident.paymentStatus}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-gray-500">Next Payment Due</div>
                      <div className="mt-1 text-sm text-foreground">{resident.nextPaymentDue}</div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
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
            <h3 className="mt-2 text-sm font-medium text-gray-900">No residents found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 