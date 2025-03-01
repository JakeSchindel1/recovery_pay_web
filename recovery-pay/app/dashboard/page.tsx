'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Dashboard() {
  // Mock data for the dashboard
  const stats = [
    { name: 'Total Residents', value: '32', change: '+2', changeType: 'increase' },
    { name: 'Occupancy Rate', value: '92%', change: '+5%', changeType: 'increase' },
    { name: 'Monthly Revenue', value: '$24,500', change: '+$1,200', changeType: 'increase' },
    { name: 'Outstanding Payments', value: '$2,800', change: '-$500', changeType: 'decrease' },
  ];

  const recentPayments = [
    { id: 1, resident: 'Michael Johnson', amount: '$750', date: '2023-03-01', status: 'Paid' },
    { id: 2, resident: 'Sarah Williams', amount: '$750', date: '2023-03-01', status: 'Paid' },
    { id: 3, resident: 'David Brown', amount: '$750', date: '2023-02-28', status: 'Paid' },
    { id: 4, resident: 'Emily Davis', amount: '$750', date: '2023-02-28', status: 'Paid' },
    { id: 5, resident: 'Robert Wilson', amount: '$750', date: '2023-02-27', status: 'Paid' },
  ];

  const upcomingPayments = [
    { id: 1, resident: 'James Smith', amount: '$750', dueDate: '2023-03-05', status: 'Pending' },
    { id: 2, resident: 'Jennifer Lee', amount: '$750', dueDate: '2023-03-07', status: 'Pending' },
    { id: 3, resident: 'Thomas Moore', amount: '$750', dueDate: '2023-03-10', status: 'Pending' },
  ];

  const houses = [
    { id: 1, name: 'Serenity House - Main', occupancy: '100%', beds: '12/12', address: '123 Recovery Rd' },
    { id: 2, name: 'Serenity House - West', occupancy: '90%', beds: '9/10', address: '456 Healing Ave' },
    { id: 3, name: 'Serenity House - East', occupancy: '80%', beds: '8/10', address: '789 Wellness Blvd' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Welcome back, John. Here's what's happening with your recovery houses.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <p className="text-sm font-medium text-gray-500">{stat.name}</p>
            <p className="mt-2 text-3xl font-bold text-foreground">{stat.value}</p>
            <div className="mt-2 flex items-center">
              <span
                className={`text-sm font-medium ${
                  stat.changeType === 'increase'
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {stat.change}
              </span>
              <svg
                className={`w-4 h-4 ml-1 ${
                  stat.changeType === 'increase'
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    stat.changeType === 'increase'
                      ? 'M5 10l7-7m0 0l7 7m-7-7v18'
                      : 'M19 14l-7 7m0 0l-7-7m7 7V3'
                  }
                />
              </svg>
              <span className="text-sm text-gray-500 ml-2">from last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Recent Payments */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Recent Payments</h2>
            <Link
              href="/dashboard/payments"
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              View all
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Resident
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentPayments.map((payment) => (
                  <tr key={payment.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {payment.resident}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming Payments */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Upcoming Payments</h2>
            <Link
              href="/dashboard/payments"
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              View all
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Resident
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {upcomingPayments.map((payment) => (
                  <tr key={payment.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {payment.resident}
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Houses Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Houses Overview</h2>
          <Link
            href="/dashboard/houses"
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Manage houses
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  House Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Occupancy
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Beds
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {houses.map((house) => (
                <tr key={house.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {house.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {house.occupancy}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {house.beds}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {house.address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      href={`/dashboard/houses/${house.id}`}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/dashboard/residents/new"
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex items-center"
        >
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold">Add New Resident</h3>
            <p className="text-sm text-gray-500">Register a new resident</p>
          </div>
        </Link>
        
        <Link
          href="/dashboard/payments/record"
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex items-center"
        >
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold">Record Payment</h3>
            <p className="text-sm text-gray-500">Log a new payment</p>
          </div>
        </Link>
        
        <Link
          href="/dashboard/reports"
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex items-center"
        >
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold">Generate Report</h3>
            <p className="text-sm text-gray-500">Create financial reports</p>
          </div>
        </Link>
      </div>
    </div>
  );
} 