export enum ExpenseCategory {
  FOOD = 'Food',
  TRANSPORTATION = 'Transportation',
  SHOPPING = 'Shopping',
  HOUSING = 'Housing',
  UTILITIES = 'Utilities',
  ENTERTAINMENT = 'Entertainment',
  HEALTH = 'Health',
  OTHER = 'Other'
}

export interface Expense {
  id: string;
  userId: string;
  title: string;
  amount: number;
  category: ExpenseCategory;
  date: string; // ISO string
  createdAt: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
  passwordHash: string; // In a real app, never store plain passwords. We will simulate a hash.
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

export type ViewState = 'HOME' | 'LOGIN' | 'SIGNUP' | 'DASHBOARD' | 'REPORTS' | 'HISTORY';
