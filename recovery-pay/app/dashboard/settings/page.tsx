'use client';

import { useState, FormEvent } from 'react';

export default function Settings() {
  // State for account settings
  const [accountSettings, setAccountSettings] = useState({
    name: 'John Smith',
    email: 'john@serenityhouse.com',
    phone: '(555) 123-4567',
    organization: 'Serenity Recovery Houses',
  });

  // State for notification preferences
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    paymentReminders: true,
    newResidentAlerts: true,
    maintenanceAlerts: true,
    occupancyUpdates: false,
    weeklyReports: true,
    monthlyReports: true,
  });

  // State for payment settings
  const [paymentSettings, setPaymentSettings] = useState({
    acceptCreditCards: true,
    acceptBankTransfers: true,
    acceptCash: true,
    autoGenerateReceipts: true,
    paymentDueDay: 1,
    gracePeriodDays: 5,
    lateFeeAmount: 25,
    applyLateFees: true,
  });

  // Handle form submissions
  const handleAccountSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert('Account settings updated successfully!');
  };

  const handleNotificationSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert('Notification preferences updated successfully!');
  };

  const handlePaymentSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert('Payment settings updated successfully!');
  };

  // Mock subscription plan
  const subscriptionPlan = {
    name: 'Premium',
    price: '$49.99',
    billingCycle: 'monthly',
    features: [
      'Unlimited residents',
      'Unlimited houses',
      'Advanced reporting',
      'Custom branding',
      'Theme customization',
      'API access',
      'Priority support',
    ],
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-foreground">Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Navigation sidebar */}
        <div className="md:col-span-1">
          <nav className="space-y-1">
            <a
              href="#account"
              className="bg-card text-foreground group rounded-md px-3 py-2 flex items-center text-sm font-medium"
            >
              <svg
                className="text-mutedForeground group-hover:text-foreground mr-3 h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Account
            </a>

            <a
              href="#notifications"
              className="text-foreground hover:bg-card group rounded-md px-3 py-2 flex items-center text-sm font-medium"
            >
              <svg
                className="text-mutedForeground group-hover:text-foreground mr-3 h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              Notifications
            </a>

            <a
              href="#payments"
              className="text-foreground hover:bg-card group rounded-md px-3 py-2 flex items-center text-sm font-medium"
            >
              <svg
                className="text-mutedForeground group-hover:text-foreground mr-3 h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
              Payments
            </a>

            <a
              href="#appearance"
              className="text-foreground hover:bg-card group rounded-md px-3 py-2 flex items-center text-sm font-medium"
            >
              <svg
                className="text-mutedForeground group-hover:text-foreground mr-3 h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                />
              </svg>
              Appearance
            </a>

            <a
              href="#subscription"
              className="text-foreground hover:bg-card group rounded-md px-3 py-2 flex items-center text-sm font-medium"
            >
              <svg
                className="text-mutedForeground group-hover:text-foreground mr-3 h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                />
              </svg>
              Subscription
            </a>
          </nav>
        </div>

        <div className="md:col-span-2">
          <div className="space-y-8">
            {/* Account Settings */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium">Account Settings</h2>
                <p className="text-sm text-gray-500">
                  Update your account information and organization details
                </p>
              </div>
              <div className="px-6 py-4">
                <form onSubmit={handleAccountSubmit}>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={accountSettings.name}
                        onChange={(e) =>
                          setAccountSettings({ ...accountSettings, name: e.target.value })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={accountSettings.email}
                        onChange={(e) =>
                          setAccountSettings({ ...accountSettings, email: e.target.value })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone
                      </label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={accountSettings.phone}
                        onChange={(e) =>
                          setAccountSettings({ ...accountSettings, phone: e.target.value })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="organization" className="block text-sm font-medium text-gray-700">
                        Organization
                      </label>
                      <input
                        type="text"
                        id="organization"
                        name="organization"
                        value={accountSettings.organization}
                        onChange={(e) =>
                          setAccountSettings({ ...accountSettings, organization: e.target.value })
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Save Account Settings
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Notification Preferences */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium">Notification Preferences</h2>
                <p className="text-sm text-gray-500">
                  Manage how and when you receive notifications
                </p>
              </div>
              <div className="px-6 py-4">
                <form onSubmit={handleNotificationSubmit}>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="emailNotifications"
                          name="emailNotifications"
                          type="checkbox"
                          checked={notificationSettings.emailNotifications}
                          onChange={(e) =>
                            setNotificationSettings({
                              ...notificationSettings,
                              emailNotifications: e.target.checked,
                            })
                          }
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="emailNotifications" className="font-medium text-gray-700">
                          Email Notifications
                        </label>
                        <p className="text-gray-500">Receive notifications via email</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="smsNotifications"
                          name="smsNotifications"
                          type="checkbox"
                          checked={notificationSettings.smsNotifications}
                          onChange={(e) =>
                            setNotificationSettings({
                              ...notificationSettings,
                              smsNotifications: e.target.checked,
                            })
                          }
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="smsNotifications" className="font-medium text-gray-700">
                          SMS Notifications
                        </label>
                        <p className="text-gray-500">Receive notifications via text message</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="paymentReminders"
                          name="paymentReminders"
                          type="checkbox"
                          checked={notificationSettings.paymentReminders}
                          onChange={(e) =>
                            setNotificationSettings({
                              ...notificationSettings,
                              paymentReminders: e.target.checked,
                            })
                          }
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="paymentReminders" className="font-medium text-gray-700">
                          Payment Reminders
                        </label>
                        <p className="text-gray-500">
                          Get notified about upcoming and overdue payments
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="newResidentAlerts"
                          name="newResidentAlerts"
                          type="checkbox"
                          checked={notificationSettings.newResidentAlerts}
                          onChange={(e) =>
                            setNotificationSettings({
                              ...notificationSettings,
                              newResidentAlerts: e.target.checked,
                            })
                          }
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="newResidentAlerts" className="font-medium text-gray-700">
                          New Resident Alerts
                        </label>
                        <p className="text-gray-500">
                          Get notified when new residents are added
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="maintenanceAlerts"
                          name="maintenanceAlerts"
                          type="checkbox"
                          checked={notificationSettings.maintenanceAlerts}
                          onChange={(e) =>
                            setNotificationSettings({
                              ...notificationSettings,
                              maintenanceAlerts: e.target.checked,
                            })
                          }
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="maintenanceAlerts" className="font-medium text-gray-700">
                          Maintenance Alerts
                        </label>
                        <p className="text-gray-500">
                          Get notified about maintenance issues
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="occupancyUpdates"
                          name="occupancyUpdates"
                          type="checkbox"
                          checked={notificationSettings.occupancyUpdates}
                          onChange={(e) =>
                            setNotificationSettings({
                              ...notificationSettings,
                              occupancyUpdates: e.target.checked,
                            })
                          }
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="occupancyUpdates" className="font-medium text-gray-700">
                          Occupancy Updates
                        </label>
                        <p className="text-gray-500">
                          Get notified about changes in occupancy
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="weeklyReports"
                          name="weeklyReports"
                          type="checkbox"
                          checked={notificationSettings.weeklyReports}
                          onChange={(e) =>
                            setNotificationSettings({
                              ...notificationSettings,
                              weeklyReports: e.target.checked,
                            })
                          }
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="weeklyReports" className="font-medium text-gray-700">
                          Weekly Reports
                        </label>
                        <p className="text-gray-500">
                          Receive weekly summary reports
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="monthlyReports"
                          name="monthlyReports"
                          type="checkbox"
                          checked={notificationSettings.monthlyReports}
                          onChange={(e) =>
                            setNotificationSettings({
                              ...notificationSettings,
                              monthlyReports: e.target.checked,
                            })
                          }
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="monthlyReports" className="font-medium text-gray-700">
                          Monthly Reports
                        </label>
                        <p className="text-gray-500">
                          Receive monthly financial reports
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Save Notification Preferences
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Payment Settings */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium">Payment Settings</h2>
                <p className="text-sm text-gray-500">
                  Configure payment methods and policies
                </p>
              </div>
              <div className="px-6 py-4">
                <form onSubmit={handlePaymentSubmit}>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700">Payment Methods</h3>
                      <div className="mt-2 space-y-4">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="acceptCreditCards"
                              name="acceptCreditCards"
                              type="checkbox"
                              checked={paymentSettings.acceptCreditCards}
                              onChange={(e) =>
                                setPaymentSettings({
                                  ...paymentSettings,
                                  acceptCreditCards: e.target.checked,
                                })
                              }
                              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="acceptCreditCards" className="font-medium text-gray-700">
                              Accept Credit Cards
                            </label>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="acceptBankTransfers"
                              name="acceptBankTransfers"
                              type="checkbox"
                              checked={paymentSettings.acceptBankTransfers}
                              onChange={(e) =>
                                setPaymentSettings({
                                  ...paymentSettings,
                                  acceptBankTransfers: e.target.checked,
                                })
                              }
                              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="acceptBankTransfers" className="font-medium text-gray-700">
                              Accept Bank Transfers
                            </label>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="acceptCash"
                              name="acceptCash"
                              type="checkbox"
                              checked={paymentSettings.acceptCash}
                              onChange={(e) =>
                                setPaymentSettings({
                                  ...paymentSettings,
                                  acceptCash: e.target.checked,
                                })
                              }
                              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="acceptCash" className="font-medium text-gray-700">
                              Accept Cash
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-700">Receipt Settings</h3>
                      <div className="mt-2">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="autoGenerateReceipts"
                              name="autoGenerateReceipts"
                              type="checkbox"
                              checked={paymentSettings.autoGenerateReceipts}
                              onChange={(e) =>
                                setPaymentSettings({
                                  ...paymentSettings,
                                  autoGenerateReceipts: e.target.checked,
                                })
                              }
                              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="autoGenerateReceipts" className="font-medium text-gray-700">
                              Automatically Generate Receipts
                            </label>
                            <p className="text-gray-500">
                              Generate and email receipts when payments are recorded
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-700">Payment Schedule</h3>
                      <div className="mt-2 grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                          <label htmlFor="paymentDueDay" className="block text-sm font-medium text-gray-700">
                            Payment Due Day
                          </label>
                          <select
                            id="paymentDueDay"
                            name="paymentDueDay"
                            value={paymentSettings.paymentDueDay}
                            onChange={(e) =>
                              setPaymentSettings({
                                ...paymentSettings,
                                paymentDueDay: parseInt(e.target.value),
                              })
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          >
                            {[...Array(28)].map((_, i) => (
                              <option key={i + 1} value={i + 1}>
                                {i + 1}
                              </option>
                            ))}
                          </select>
                          <p className="mt-1 text-sm text-gray-500">
                            Day of the month when payments are due
                          </p>
                        </div>
                        <div>
                          <label htmlFor="gracePeriodDays" className="block text-sm font-medium text-gray-700">
                            Grace Period (Days)
                          </label>
                          <input
                            type="number"
                            id="gracePeriodDays"
                            name="gracePeriodDays"
                            min="0"
                            max="30"
                            value={paymentSettings.gracePeriodDays}
                            onChange={(e) =>
                              setPaymentSettings({
                                ...paymentSettings,
                                gracePeriodDays: parseInt(e.target.value),
                              })
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          />
                          <p className="mt-1 text-sm text-gray-500">
                            Number of days after due date before payment is considered late
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-700">Late Fees</h3>
                      <div className="mt-2 space-y-4">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="applyLateFees"
                              name="applyLateFees"
                              type="checkbox"
                              checked={paymentSettings.applyLateFees}
                              onChange={(e) =>
                                setPaymentSettings({
                                  ...paymentSettings,
                                  applyLateFees: e.target.checked,
                                })
                              }
                              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="applyLateFees" className="font-medium text-gray-700">
                              Apply Late Fees
                            </label>
                            <p className="text-gray-500">
                              Automatically apply late fees to overdue payments
                            </p>
                          </div>
                        </div>
                        <div>
                          <label htmlFor="lateFeeAmount" className="block text-sm font-medium text-gray-700">
                            Late Fee Amount ($)
                          </label>
                          <input
                            type="number"
                            id="lateFeeAmount"
                            name="lateFeeAmount"
                            min="0"
                            step="0.01"
                            value={paymentSettings.lateFeeAmount}
                            onChange={(e) =>
                              setPaymentSettings({
                                ...paymentSettings,
                                lateFeeAmount: parseFloat(e.target.value),
                              })
                            }
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Save Payment Settings
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Appearance Settings */}
            <div id="appearance" className="bg-card shadow rounded-lg mb-8">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-foreground">Appearance Settings</h3>
                <div className="mt-2 max-w-xl text-sm text-mutedForeground">
                  <p>Customize the look and feel of your recovery house application.</p>
                </div>
                <div className="mt-5">
                  <div className="space-y-4">
                    <div className="border border-border rounded-lg p-4">
                      <h4 className="text-md font-medium text-foreground mb-2">Theme Editor</h4>
                      <p className="text-sm text-mutedForeground mb-4">
                        Create and customize themes for your recovery house application. 
                        {subscriptionPlan.name === 'Premium' ? 
                          ' As a Premium subscriber, you can create custom themes for your users.' : 
                          ' Upgrade to Premium to access theme customization features.'}
                      </p>
                      <a
                        href="/dashboard/settings/theme-editor"
                        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                          subscriptionPlan.name === 'Premium' ? 
                          'bg-primary hover:bg-primaryHover' : 
                          'bg-gray-400 cursor-not-allowed'
                        }`}
                        aria-disabled={subscriptionPlan.name !== 'Premium'}
                      >
                        {subscriptionPlan.name === 'Premium' ? 'Open Theme Editor' : 'Upgrade to Access'}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 