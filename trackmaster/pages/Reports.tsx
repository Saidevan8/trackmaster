import React, { useEffect, useState, useMemo } from 'react';
import { User, Expense } from '../types';
import { storageService } from '../services/storageService';
import { 
    PieChart, Pie, Cell, ResponsiveContainer, Tooltip as ReTooltip, Legend, 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line 
} from 'recharts';
import { format, subDays, isAfter, parseISO, startOfYear, startOfMonth } from 'date-fns';

interface ReportsProps {
  user: User;
}

const COLORS = ['#059669', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444', '#EC4899', '#6366F1', '#10B981'];

type TimeRange = 'DAY' | 'WEEK' | 'MONTH' | 'YEAR';

// Custom Tooltip for Bar and Line Charts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    let dateLabel = label;
    // Try to format if it looks like a date ISO string (YYYY-MM-DD)
    if (typeof label === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(label)) {
        try {
            dateLabel = format(parseISO(label), 'EEEE, MMM do, yyyy');
        } catch (e) {
            // keep original label if parsing fails
        }
    }

    return (
      <div className="bg-white p-3 border border-gray-100 shadow-xl rounded-lg">
        <p className="text-sm font-medium text-gray-500 mb-1">{dateLabel}</p>
        <p className="text-lg font-bold text-emerald-600">
          ${Number(payload[0].value).toFixed(2)}
        </p>
      </div>
    );
  }
  return null;
};

export const Reports: React.FC<ReportsProps> = ({ user }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [range, setRange] = useState<TimeRange>('MONTH');

  useEffect(() => {
    storageService.getExpenses(user.id).then(setExpenses);
  }, [user.id]);

  // Filter Logic
  const filteredExpenses = useMemo(() => {
    const now = new Date();
    let startDate = now;

    switch (range) {
      case 'DAY':
        startDate = subDays(now, 1);
        break;
      case 'WEEK':
        startDate = subDays(now, 7);
        break;
      case 'MONTH':
        startDate = startOfMonth(now);
        break;
      case 'YEAR':
        startDate = startOfYear(now);
        break;
    }

    // For "Day", we might want exact date matching
    if (range === 'DAY') {
         return expenses.filter(e => format(parseISO(e.date), 'yyyy-MM-dd') === format(now, 'yyyy-MM-dd'));
    }

    return expenses.filter(e => isAfter(parseISO(e.date), startDate));
  }, [expenses, range]);

  // Data for Pie Chart (By Category)
  const categoryData = useMemo(() => {
    const grouped: Record<string, number> = {};
    filteredExpenses.forEach(e => {
      grouped[e.category] = (grouped[e.category] || 0) + e.amount;
    });
    return Object.keys(grouped).map(name => ({ name, value: grouped[name] }));
  }, [filteredExpenses]);

  // Data for Bar/Line Chart (Over Time)
  const timeData = useMemo(() => {
    const grouped: Record<string, number> = {};
    filteredExpenses.forEach(e => {
        let key = e.date;
        if (range === 'YEAR') {
            key = format(parseISO(e.date), 'MMM'); // Group by month name
        } 
        grouped[key] = (grouped[key] || 0) + e.amount;
    });

    let keys = Object.keys(grouped);

    if (range === 'YEAR') {
        // Sort months chronologically
        const monthOrder: Record<string, number> = { 'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5, 'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11 };
        keys.sort((a, b) => (monthOrder[a] ?? 0) - (monthOrder[b] ?? 0));
    } else {
        // Sort ISO dates
        keys.sort();
    }

    return keys.map(date => ({ date, amount: grouped[date] }));
  }, [filteredExpenses, range]);

  const totalSpent = filteredExpenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Financial Reports</h2>
        <div className="bg-white p-1 rounded-lg border border-gray-200 flex mt-4 sm:mt-0 shadow-sm">
          {(['DAY', 'WEEK', 'MONTH', 'YEAR'] as TimeRange[]).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                range === r ? 'bg-emerald-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {r.charAt(0) + r.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-8">
         <div className="bg-emerald-600 rounded-xl shadow-lg p-8 text-white text-center sm:text-left sm:flex justify-between items-center">
             <div>
                 <h3 className="text-emerald-100 font-medium text-lg">Total Spent ({range.toLowerCase()})</h3>
                 <p className="text-4xl font-bold mt-2">${totalSpent.toFixed(2)}</p>
             </div>
             <div className="mt-4 sm:mt-0 text-emerald-100 text-sm max-w-xs">
                 Based on your selected time range. Keep tracking to see accurate trends.
             </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Spending by Category</h3>
          <div className="h-80 w-full">
            {categoryData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    // Updated label to show Name and exact Amount
                    label={({ name, value }) => `${name}: $${value.toFixed(2)}`}
                    >
                    {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                    </Pie>
                    <ReTooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
                    <Legend />
                </PieChart>
                </ResponsiveContainer>
            ) : (
                <div className="h-full flex items-center justify-center text-gray-400">No data for this period</div>
            )}
          </div>
        </div>

        {/* Bar/Line Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Spending Trend</h3>
          <div className="h-80 w-full">
            {timeData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                 {range === 'YEAR' ? (
                     <BarChart data={timeData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <ReTooltip content={<CustomTooltip />} />
                        <Bar dataKey="amount" fill="#059669" radius={[4, 4, 0, 0]} />
                    </BarChart>
                 ) : (
                    <LineChart data={timeData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="date" tickFormatter={(str) => format(parseISO(str), 'MM/dd')} />
                        <YAxis />
                        <ReTooltip content={<CustomTooltip />} />
                        <Line type="monotone" dataKey="amount" stroke="#059669" strokeWidth={2} activeDot={{ r: 8 }} />
                    </LineChart>
                 )}
                </ResponsiveContainer>
            ) : (
                <div className="h-full flex items-center justify-center text-gray-400">No data for this period</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};