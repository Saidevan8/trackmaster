import React, { useState, useEffect } from 'react';
import { User, Expense } from '../types';
import { storageService } from '../services/storageService';
import { format, parseISO, isSameDay } from 'date-fns';
import { Calendar as CalendarIcon, Filter, Search } from 'lucide-react';

interface HistoryProps {
  user: User;
}

export const History: React.FC<HistoryProps> = ({ user }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    storageService.getExpenses(user.id).then(data => {
        setExpenses(data);
        setLoading(false);
    });
  }, [user.id]);

  const displayedExpenses = expenses.filter(e =>
    isSameDay(parseISO(e.date), parseISO(selectedDate))
  );

  const total = displayedExpenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Expense History</h2>
          <p className="text-gray-500 mt-1">Review your spending on a specific day.</p>
        </div>
        
        <div className="flex items-center gap-4 bg-white p-2 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 px-2 text-gray-500">
                <Filter size={20} />
                <span className="font-medium text-sm">Filter Date:</span>
            </div>
            <input 
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border-gray-300 rounded-md shadow-sm focus:border-emerald-500 focus:ring-emerald-500 py-2 px-3 border"
            />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center bg-gray-50 gap-4">
            <div className="flex items-center gap-2">
                <CalendarIcon className="text-emerald-600" size={20} />
                <h3 className="font-semibold text-gray-800">Transactions for {format(parseISO(selectedDate), 'MMMM do, yyyy')}</h3>
            </div>
            <div className="bg-emerald-100 px-4 py-1.5 rounded-full">
                <span className="text-emerald-800 text-sm font-semibold">Total: ${total.toFixed(2)}</span>
            </div>
        </div>
        
        {loading ? (
            <div className="p-8 text-center text-gray-500">Loading expenses...</div>
        ) : displayedExpenses.length === 0 ? (
            <div className="p-12 text-center">
                <div className="mx-auto h-12 w-12 text-gray-300 mb-3">
                    <Search className="h-full w-full" />
                </div>
                <p className="text-gray-500 text-lg">No expenses found for this date.</p>
                <p className="text-gray-400 text-sm">Try selecting a different date.</p>
            </div>
        ) : (
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {displayedExpenses.map((expense) => (
                        <tr key={expense.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {format(parseISO(expense.date), 'MMM dd, yyyy')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {expense.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                            {expense.category}
                            </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                            ${expense.amount.toFixed(2)}
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )}
      </div>
    </div>
  );
};
