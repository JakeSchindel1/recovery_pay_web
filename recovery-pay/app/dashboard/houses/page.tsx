'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Houses() {
  // Mock data for houses
  const initialHouses = [
    {
      id: 1,
      name: 'Serenity House - Main',
      address: '123 Recovery Rd, Portland, OR 97201',
      totalBeds: 12,
      occupiedBeds: 10,
      monthlyRate: 750,
      manager: 'John Smith',
      managerPhone: '(555) 123-4567',
      managerEmail: 'john@example.com',
      status: 'Active',
      residents: [
        { id: 1, name: 'Michael Johnson' },
        { id: 2, name: 'Sarah Williams' },
        { id: 7, name: 'Jennifer Lee' }
      ]
    },
    {
      id: 2,
      name: 'Serenity House - West',
      address: '456 Healing Ave, Portland, OR 97209',
      totalBeds: 10,
      occupiedBeds: 8,
      monthlyRate: 800,
      manager: 'Emily Parker',
      managerPhone: '(555) 234-5678',
      managerEmail: 'emily@example.com',
      status: 'Active',
      residents: [
        { id: 3, name: 'David Brown' },
        { id: 4, name: 'Emily Davis' },
        { id: 8, name: 'Thomas Moore' }
      ]
    },
    {
      id: 3,
      name: 'Serenity House - East',
      address: '789 Sobriety St, Portland, OR 97214',
      totalBeds: 8,
      occupiedBeds: 6,
      monthlyRate: 700,
      manager: 'Michael Rodriguez',
      managerPhone: '(555) 345-6789',
      managerEmail: 'michael@example.com',
      status: 'Active',
      residents: [
        { id: 5, name: 'Robert Wilson' },
        { id: 6, name: 'James Smith' }
      ]
    },
    {
      id: 4,
      name: 'Serenity House - South',
      address: '101 Wellness Way, Portland, OR 97219',
      totalBeds: 10,
      occupiedBeds: 0,
      monthlyRate: 775,
      manager: 'Sarah Johnson',
      managerPhone: '(555) 456-7890',
      managerEmail: 'sarah@example.com',
      status: 'Opening Soon',
      residents: []
    }
  ];

  // Change from useState to const since we're not modifying houses
  const houses = initialHouses;
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');

  // Filter houses based on search term and filters
  const filteredHouses = houses.filter(house => {
    const matchesSearch = 
      house.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      house.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      house.manager.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All Statuses' || house.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Get unique statuses for filter dropdown
  const statuses = ['All Statuses', ...new Set(houses.map(house => house.status))];

  // Calculate total beds and occupancy rate
  const totalBeds = filteredHouses.reduce((sum, house) => sum + house.totalBeds, 0);
  const occupiedBeds = filteredHouses.reduce((sum, house) => sum + house.occupiedBeds, 0);
  const occupancyRate = totalBeds > 0 ? Math.round((occupiedBeds / totalBeds) * 100) : 0;

  return (
    <div>
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Recovery Houses</h1>
          <p className="text-gray-600">Manage your recovery houses and beds</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link
            href="/dashboard/houses/new"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New House
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow-sm rounded-lg p-4 border border-gray-100">
          <h2 className="text-lg font-medium mb-2">Total Houses</h2>
          <p className="text-3xl font-bold text-foreground">{filteredHouses.length}</p>
          <p className="text-sm text-gray-500 mt-1">
            {filteredHouses.filter(h => h.status === 'Active').length} active houses
          </p>
        </div>
        
        <div className="bg-white shadow-sm rounded-lg p-4 border border-gray-100">
          <h2 className="text-lg font-medium mb-2">Total Beds</h2>
          <p className="text-3xl font-bold text-foreground">{totalBeds}</p>
          <p className="text-sm text-gray-500 mt-1">
            {occupiedBeds} beds occupied
          </p>
        </div>
        
        <div className="bg-white shadow-sm rounded-lg p-4 border border-gray-100">
          <h2 className="text-lg font-medium mb-2">Occupancy Rate</h2>
          <p className="text-3xl font-bold text-foreground">{occupancyRate}%</p>
          <p className="text-sm text-gray-500 mt-1">
            {totalBeds - occupiedBeds} beds available
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700">
            Search
          </label>
          <input
            type="text"
            id="search"
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="Search by name, address, or manager"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div>
          <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700">
            Filter by Status
          </label>
          <select
            id="status-filter"
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Houses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHouses.length > 0 ? (
          filteredHouses.map((house) => (
            <div key={house.id} className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100">
              <div className="p-4 border-b border-gray-100">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium">{house.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{house.address}</p>
                  </div>
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    house.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {house.status}
                  </span>
                </div>
              </div>
              
              <div className="p-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Beds</p>
                    <p className="text-lg font-medium text-foreground">{house.occupiedBeds} / {house.totalBeds}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Occupancy</p>
                    <p className="text-lg font-medium text-foreground">
                      {house.totalBeds > 0 ? Math.round((house.occupiedBeds / house.totalBeds) * 100) : 0}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Monthly Rate</p>
                    <p className="text-lg font-medium text-foreground">${house.monthlyRate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Manager</p>
                    <p className="text-lg font-medium text-foreground">{house.manager}</p>
                  </div>
                </div>
                
                {house.residents.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Current Residents</p>
                    <div className="flex flex-wrap gap-2">
                      {house.residents.slice(0, 3).map((resident) => (
                        <Link 
                          key={resident.id}
                          href={`/dashboard/residents/${resident.id}`}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {resident.name}
                        </Link>
                      ))}
                      {house.residents.length > 3 && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          +{house.residents.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
                
                <div className="flex justify-end space-x-3 mt-4">
                  <Link
                    href={`/dashboard/houses/${house.id}`}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    View
                  </Link>
                  <Link
                    href={`/dashboard/houses/${house.id}/edit`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </Link>
                  <Link
                    href={`/dashboard/houses/${house.id}/beds`}
                    className="text-green-600 hover:text-green-900"
                  >
                    Manage Beds
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500">
            No houses found matching your search criteria.
          </div>
        )}
      </div>
    </div>
  );
} 