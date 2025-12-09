import { Expense, User, ExpenseCategory } from '../types';

const USERS_KEY = 'expense_tracker_users';
const EXPENSES_KEY = 'expense_tracker_expenses';
const SESSION_KEY = 'expense_tracker_session';

// Helper to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper for ID generation with fallback
const generateId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const storageService = {
  // --- Auth Methods ---
  
  async signup(user: Omit<User, 'id'>): Promise<User> {
    await delay(500);
    const users = this.getUsers();
    
    // Normalize inputs for comparison
    const normalizedEmail = user.email.trim().toLowerCase();
    const normalizedUsername = user.username.trim().toLowerCase();

    if (users.find(u => u.email.trim().toLowerCase() === normalizedEmail)) {
      throw new Error('Email already exists');
    }
    if (users.find(u => u.username.trim().toLowerCase() === normalizedUsername)) {
      throw new Error('Username already exists');
    }

    const newUser: User = { 
        ...user, 
        email: user.email.trim(), // Store trimmed
        username: user.username.trim(), // Store trimmed
        id: generateId() 
    };
    
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return newUser;
  },

  async login(identifier: string, password: string): Promise<User> {
    await delay(500);
    const users = this.getUsers();
    
    const normalizedIdentifier = identifier.trim().toLowerCase();

    const user = users.find(u => {
      const isEmail = u.email.trim().toLowerCase() === normalizedIdentifier;
      const isUsername = u.username.trim().toLowerCase() === normalizedIdentifier;
      // Password match must be exact, but we handle the lookup case-insensitively
      return (isEmail || isUsername); 
    });

    if (!user) {
      throw new Error('Account not found. Please sign up first.');
    }

    if (user.passwordHash !== password) {
        throw new Error('Incorrect password.');
    }
    
    // Set session
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    return user;
  },

  logout() {
    localStorage.removeItem(SESSION_KEY);
  },

  getCurrentUser(): User | null {
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
  },

  getUsers(): User[] {
    const stored = localStorage.getItem(USERS_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  // --- Expense Methods ---

  async getExpenses(userId: string): Promise<Expense[]> {
    await delay(300);
    const allExpenses = this.getAllExpensesRaw();
    return allExpenses.filter(e => e.userId === userId).sort((a, b) => b.createdAt - a.createdAt);
  },

  async addExpense(expense: Omit<Expense, 'id' | 'createdAt'>): Promise<Expense> {
    await delay(300);
    const allExpenses = this.getAllExpensesRaw();
    const newExpense: Expense = {
      ...expense,
      id: generateId(),
      createdAt: Date.now(),
    };
    allExpenses.push(newExpense);
    localStorage.setItem(EXPENSES_KEY, JSON.stringify(allExpenses));
    return newExpense;
  },

  async updateExpense(updatedExpense: Expense): Promise<void> {
    await delay(300);
    let allExpenses = this.getAllExpensesRaw();
    const index = allExpenses.findIndex(e => e.id === updatedExpense.id);
    if (index !== -1) {
      allExpenses[index] = updatedExpense;
      localStorage.setItem(EXPENSES_KEY, JSON.stringify(allExpenses));
    }
  },

  async deleteExpense(id: string): Promise<void> {
    await delay(300);
    let allExpenses = this.getAllExpensesRaw();
    allExpenses = allExpenses.filter(e => e.id !== id);
    localStorage.setItem(EXPENSES_KEY, JSON.stringify(allExpenses));
  },

  getAllExpensesRaw(): Expense[] {
    const stored = localStorage.getItem(EXPENSES_KEY);
    return stored ? JSON.parse(stored) : [];
  }
};