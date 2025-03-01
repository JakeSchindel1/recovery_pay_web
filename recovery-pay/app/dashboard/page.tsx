'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

export default function Dashboard() {
  // Parallax effect refs and state
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle scroll for parallax effect
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        setScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <div ref={containerRef} className="relative min-h-screen">
      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 opacity-30">
          <div 
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/40 to-blue-500/40 rounded-full mix-blend-multiply blur-[128px] animate-pulse" 
            style={{ 
              animationDuration: '8s',
              transform: `translate(${scrollY * 0.02}px, ${scrollY * -0.03}px)` 
            }}
          ></div>
          <div 
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-violet-500/40 to-primary/40 rounded-full mix-blend-multiply blur-[128px] animate-pulse" 
            style={{ 
              animationDuration: '12s',
              transform: `translate(${scrollY * -0.02}px, ${scrollY * 0.03}px)` 
            }}
          ></div>
        </div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      </div>

      <div className="mb-8 relative">
        <div className="inline-flex items-center px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full text-primary font-medium text-sm mb-4 border border-primary/20">
          <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></span>
          Dashboard Overview
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">Welcome to Your Dashboard</h1>
        <p className="text-lg text-mutedForeground">Here's what's happening with your recovery houses today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div 
            key={stat.name} 
            className="bg-card/30 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
            style={{ transform: `translateY(${scrollY * 0.02 * (index % 2 === 0 ? 1 : -1)}px)` }}
          >
            <p className="text-sm font-medium text-mutedForeground">{stat.name}</p>
            <p className="mt-2 text-3xl font-bold text-foreground">{stat.value}</p>
            <div className="mt-2 flex items-center">
              <span
                className={`text-sm font-medium ${
                  stat.changeType === 'increase'
                    ? 'text-emerald-500'
                    : 'text-rose-500'
                }`}
              >
                {stat.change}
              </span>
              <svg
                className={`w-4 h-4 ml-1 ${
                  stat.changeType === 'increase'
                    ? 'text-emerald-500'
                    : 'text-rose-500'
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
              <span className="text-sm text-mutedForeground ml-2">from last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Recent Payments */}
        <div 
          className="bg-card/30 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
          style={{ transform: `translateY(${scrollY * 0.01}px)` }}
        >
          <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-foreground">Recent Payments</h2>
            <Link
              href="/dashboard/payments"
              className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center"
            >
              View all
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/5">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-mutedForeground uppercase tracking-wider">
                    Resident
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-mutedForeground uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-mutedForeground uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-mutedForeground uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                      {payment.resident}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-mutedForeground">
                      {payment.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-mutedForeground">
                      {payment.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100/10 text-emerald-500">
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
        <div 
          className="bg-card/30 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
          style={{ transform: `translateY(${scrollY * -0.01}px)` }}
        >
          <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-foreground">Upcoming Payments</h2>
            <Link
              href="/dashboard/payments"
              className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center"
            >
              View all
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/5">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-mutedForeground uppercase tracking-wider">
                    Resident
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-mutedForeground uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-mutedForeground uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-mutedForeground uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {upcomingPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                      {payment.resident}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-mutedForeground">
                      {payment.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-mutedForeground">
                      {payment.dueDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100/10 text-amber-500">
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
      <div 
        className="bg-card/30 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 mb-8"
        style={{ transform: `translateY(${scrollY * 0.015}px)` }}
      >
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-foreground">Houses Overview</h2>
          <Link
            href="/dashboard/houses"
            className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center"
          >
            Manage houses
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/5">
            <thead className="bg-white/5">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-mutedForeground uppercase tracking-wider">
                  House Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-mutedForeground uppercase tracking-wider">
                  Occupancy
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-mutedForeground uppercase tracking-wider">
                  Beds
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-mutedForeground uppercase tracking-wider">
                  Address
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-mutedForeground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {houses.map((house) => (
                <tr key={house.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                    {house.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-mutedForeground">
                    {house.occupancy}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-mutedForeground">
                    {house.beds}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-mutedForeground">
                    {house.address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      href={`/dashboard/houses/${house.id}`}
                      className="text-primary hover:text-primary/80 transition-colors"
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
      <div 
        className="bg-gradient-to-br from-primary/10 to-blue-500/10 backdrop-blur-md rounded-xl border border-white/10 p-6 mb-8"
        style={{ transform: `translateY(${scrollY * 0.02}px)` }}
      >
        <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Add Resident', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', href: '/dashboard/residents/new' },
            { name: 'Record Payment', icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z', href: '/dashboard/payments/new' },
            { name: 'Add House', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', href: '/dashboard/houses/new' },
            { name: 'Generate Report', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', href: '/dashboard/reports/new' },
          ].map((action, index) => (
            <Link
              key={index}
              href={action.href}
              className="group bg-white/10 backdrop-blur-sm rounded-xl p-4 flex flex-col items-center justify-center hover:bg-white/20 transition-all duration-300 border border-white/10 hover:border-primary/30"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary/80 to-blue-500/80 rounded-xl flex items-center justify-center mb-3 shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300">
                <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={action.icon} />
                </svg>
              </div>
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300">{action.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Activity Timeline */}
      <div 
        className="bg-card/30 backdrop-blur-md rounded-xl border border-white/10 p-6 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
        style={{ transform: `translateY(${scrollY * 0.025}px)` }}
      >
        <h2 className="text-lg font-semibold text-foreground mb-6">Recent Activity</h2>
        <div className="relative">
          <div className="absolute top-0 bottom-0 left-4 w-0.5 bg-white/10"></div>
          <div className="space-y-6">
            {[
              { title: 'New resident added', description: 'James Wilson was added to Serenity House - Main', time: '2 hours ago', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
              { title: 'Payment received', description: 'Sarah Williams made a payment of $750', time: '5 hours ago', icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z' },
              { title: 'Bed availability updated', description: 'Serenity House - West has 1 new bed available', time: '1 day ago', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
            ].map((activity, index) => (
              <div key={index} className="relative pl-10">
                <div className="absolute left-0 top-1 w-8 h-8 bg-gradient-to-br from-primary/80 to-blue-500/80 rounded-full flex items-center justify-center shadow-lg shadow-primary/20">
                  <svg className="w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={activity.icon} />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-medium text-foreground">{activity.title}</h3>
                  <p className="text-sm text-mutedForeground mt-1">{activity.description}</p>
                  <p className="text-xs text-mutedForeground/70 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 