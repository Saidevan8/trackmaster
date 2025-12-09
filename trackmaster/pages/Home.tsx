import React from 'react';
import { ViewState } from '../types';
import { Button } from '../components/Button';
import { ShieldCheck, TrendingUp, PieChart, Wallet, Check, X, ArrowRight } from 'lucide-react';

interface HomeProps {
  setView: (view: ViewState) => void;
}

export const Home: React.FC<HomeProps> = ({ setView }) => {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-emerald-50/50">
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-24">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
            <div className="mt-24 sm:mt-32 lg:mt-16">
              <span className="inline-flex items-center rounded-md bg-emerald-600/10 px-3 py-1 text-sm font-medium text-emerald-600 ring-1 ring-inset ring-emerald-600/10">
                Just Released: Version 1.0
              </span>
            </div>
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Master Your Money with <span className="text-emerald-600">TrackMaster</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              The new standard for personal finance. Track daily spending, visualize habits, and gain control over your budget without the clutter of traditional apps.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Button onClick={() => setView('SIGNUP')} className="text-lg px-8 py-3 shadow-xl shadow-emerald-200">
                Get Started Free
              </Button>
              <Button onClick={() => setView('LOGIN')} variant="ghost" className="text-lg group">
                Log In <span aria-hidden="true" className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Button>
            </div>
          </div>
          <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mt-0 lg:mr-0 lg:max-w-none lg:flex-none xl:ml-32">
            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
              <div className="rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                <img
                  src="https://picsum.photos/seed/finance/1000/700?grayscale"
                  alt="App screenshot"
                  className="w-[76rem] rounded-md shadow-2xl ring-1 ring-gray-900/10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison / Impact Section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">The TrackMaster Difference</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We built TrackMaster to solve the frustration of complex, ad-filled finance apps. Here is how we impact your financial journey compared to others.
            </p>
          </div>
          
          <div className="mt-16 rounded-3xl bg-gray-50 ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none overflow-hidden">
            <div className="p-8 sm:p-10 lg:flex-auto">
              <h3 className="text-2xl font-bold tracking-tight text-gray-900">Typical Expense Trackers</h3>
              <p className="mt-6 text-base leading-7 text-gray-600">
                Most alternatives are either too complex (spreadsheets) or too annoying (ad-supported apps). They often sell your data or lock basic features behind a paywall.
              </p>
              <div className="mt-8 flex items-center gap-x-4">
                <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">Common Frustrations</h4>
                <div className="h-px flex-auto bg-gray-100" />
              </div>
              <ul role="list" className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6">
                <li className="flex gap-x-3 items-center">
                   <div className="flex-none rounded-full bg-red-100 p-1">
                    <X className="h-4 w-4 text-red-600" aria-hidden="true" />
                   </div>
                  Intrusive Video Ads
                </li>
                <li className="flex gap-x-3 items-center">
                   <div className="flex-none rounded-full bg-red-100 p-1">
                    <X className="h-4 w-4 text-red-600" aria-hidden="true" />
                   </div>
                  Complex Setup (Spreadsheets)
                </li>
                <li className="flex gap-x-3 items-center">
                   <div className="flex-none rounded-full bg-red-100 p-1">
                    <X className="h-4 w-4 text-red-600" aria-hidden="true" />
                   </div>
                  Unclear Privacy Policies
                </li>
                <li className="flex gap-x-3 items-center">
                   <div className="flex-none rounded-full bg-red-100 p-1">
                    <X className="h-4 w-4 text-red-600" aria-hidden="true" />
                   </div>
                  Paid Monthly Reports
                </li>
              </ul>
            </div>
            <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
              <div className="rounded-2xl bg-emerald-600 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16 h-full">
                <div className="mx-auto max-w-xs px-8">
                  <p className="text-base font-semibold text-emerald-100">The V1.0 Standard</p>
                  <p className="mt-6 flex items-baseline justify-center gap-x-2">
                    <span className="text-4xl font-bold tracking-tight text-white">TrackMaster</span>
                  </p>
                   <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-emerald-100 text-left">
                    <li className="flex gap-x-3 items-center">
                       <Check className="h-5 w-5 flex-none text-white" aria-hidden="true" />
                      100% Ad-Free Experience
                    </li>
                    <li className="flex gap-x-3 items-center">
                       <Check className="h-5 w-5 flex-none text-white" aria-hidden="true" />
                      Visual Analytics included
                    </li>
                    <li className="flex gap-x-3 items-center">
                       <Check className="h-5 w-5 flex-none text-white" aria-hidden="true" />
                      Secure Local Authentication
                    </li>
                     <li className="flex gap-x-3 items-center">
                       <Check className="h-5 w-5 flex-none text-white" aria-hidden="true" />
                      Filter by Date & Category
                    </li>
                  </ul>
                  <div className="mt-10">
                    <Button onClick={() => setView('SIGNUP')} className="w-full bg-white text-emerald-600 hover:bg-emerald-50 shadow-none ring-1 ring-inset ring-gray-300 border-0">
                        Join the Revolution
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-emerald-600">Core Features</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything needed to track expenses efficiently
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600">
                  <Wallet className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                Easy Logging
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Quickly add expenses like Petrol, Snacks, or Dinner with our intuitive dashboard.
              </dd>
            </div>
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600">
                  <PieChart className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                Visual Reports
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Analyze spending with beautiful pie charts, bar charts, and weekly breakdowns.
              </dd>
            </div>
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600">
                  <ShieldCheck className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                Secure Data
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Your data is secure. We use best-in-class security practices to keep your financial info safe.
              </dd>
            </div>
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600">
                  <TrendingUp className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                Detailed Stats
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600">
                Track daily, weekly, and monthly totals to spot trends and save money.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};