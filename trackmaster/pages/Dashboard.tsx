import React, { useEffect, useState, useCallback } from 'react';
import { User, Expense, ExpenseCategory } from '../types';
import { storageService } from '../services/storageService';
import { Button } from '../components/Button';
import { format, isSameDay, isSameMonth, parseISO, startOfWeek, isSameWeek } from 'date-fns';
import { Plus, Trash2, Edit2, Calendar, TrendingDown } from 'lucide-react';

interface DashboardProps {
  user: User;
}

export const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>(ExpenseCategory.FOOD);
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [formLoading, setFormLoading] = useState(false);

  const fetchExpenses = useCallback(async () => {
    try {
      const data = await storageService.getExpenses(user.id);
      setExpenses(data);
    } catch (error) {
      console.error("Failed to load expenses", error);
    } finally {
      setLoading(false);
    }
  }, [user.id]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      if (editingId) {
        // Update
        const expenseToUpdate = expenses.find(e => e.id === editingId);
        if (expenseToUpdate) {
            await storageService.updateExpense({
                ...expenseToUpdate,
                title,
                amount: parseFloat(amount),
                category,
                date
            });
        }
        setEditingId(null);
      } else {
        // Add
        await storageService.addExpense({
          userId: user.id,
          title,
          amount: parseFloat(amount),
          category,
          date
        });
      }
      resetForm();
      await fetchExpenses();
    } catch (err) {
      console.error(err);
    } finally {
      setFormLoading(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setAmount('');
    setCategory(ExpenseCategory.FOOD);
    setDate(format(new Date(), 'yyyy-MM-dd'));
    setEditingId(null);
  };

  const handleEdit = (expense: Expense) => {
    setEditingId(expense.id);
    setTitle(expense.title);
    setAmount(expense.amount.toString());
    setCategory(expense.category);
    setDate(expense.date);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      await storageService.deleteExpense(id);
      await fetchExpenses();
    }
  };

  // Stats Logic
  const today = new Date();
  const todaysTotal = expenses
    .filter(e => isSameDay(parseISO(e.date), today))
    .reduce((sum, e) => sum + e.amount, 0);

  const weeklyTotal = expenses
    .filter(e => isSameWeek(parseISO(e.date), today))
    .reduce((sum, e) => sum + e.amount, 0);

  const monthlyTotal = expenses
    .filter(e => isSameMonth(parseISO(e.date), today))
    .reduce((sum, e) => sum + e.amount, 0);

  // Filter for Today's List
  const todaysListExpenses = expenses.filter(e => isSameDay(parseISO(e.date), today));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-emerald-100 flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500">Today's Spending</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">${todaysTotal.toFixed(2)}</p>
                <p className="text-xs text-emerald-600 mt-1">{format(today, 'MMMM do, yyyy')}</p>
            </div>
            <div className="p-3 bg-emerald-50 rounded-full">
                <TrendingDown className="h-6 w-6 text-emerald-600" />
            </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-blue-100 flex items-center justify-between">
             <div>
                <p className="text-sm font-medium text-gray-500">This Week</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">${weeklyTotal.toFixed(2)}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-full">
                <Calendar className="h-6 w-6 text-blue-600" />
            </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100 flex items-center justify-between">
             <div>
                <p className="text-sm font-medium text-gray-500">This Month</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">${monthlyTotal.toFixed(2)}</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-full">
                <Calendar className="h-6 w-6 text-purple-600" />
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 sticky top-24">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {editingId ? 'Update Expense' : 'Add New Expense'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Item Name</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Petrol, Snacks"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Amount ($)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  {Object.values(ExpenseCategory).map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <Button type="submit" isLoading={formLoading} className="flex-1">
                  {editingId ? 'Update' : 'Add Expense'}
                </Button>
                {editingId && (
                  <Button type="button" variant="secondary" onClick={resetForm}>
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* List Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                <h3 className="font-semibold text-gray-800">Today's Transactions</h3>
                <span className="text-sm text-gray-500">{todaysListExpenses.length} records</span>
            </div>
            
            {loading ? (
                <div className="p-8 text-center text-gray-500">Loading expenses...</div>
            ) : todaysListExpenses.length === 0 ? (
                <div className="p-12 text-center">
                    <div className="mx-auto h-12 w-12 text-gray-300 mb-3">
                        <Plus className="h-full w-full" />
                    </div>
                    <p className="text-gray-500 text-lg">No expenses for today.</p>
                    <p className="text-gray-400 text-sm">Add an expense with today's date to see it here.</p>
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
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {todaysListExpenses.map((expense) => (
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
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button onClick={() => handleEdit(expense)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                    <Edit2 className="h-4 w-4" />
                                </button>
                                <button onClick={() => handleDelete(expense.id)} className="text-red-600 hover:text-red-900">
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
