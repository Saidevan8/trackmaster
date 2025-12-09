import React, { useState, useEffect } from 'react';
import { ViewState } from '../types';
import { storageService } from '../services/storageService';
import { Button } from '../components/Button';
import { Shield } from 'lucide-react';

interface SignupProps {
  onLoginSuccess: (user: any) => void;
  setView: (view: ViewState) => void;
}

export const Signup: React.FC<SignupProps> = ({ onLoginSuccess, setView }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    captcha: ''
  });
  const [captchaProblem, setCaptchaProblem] = useState({ num1: 0, num2: 0 });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    setCaptchaProblem({
      num1: Math.floor(Math.random() * 10),
      num2: Math.floor(Math.random() * 10)
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (parseInt(formData.captcha) !== captchaProblem.num1 + captchaProblem.num2) {
      setError('Incorrect Captcha answer');
      generateCaptcha();
      setFormData(prev => ({ ...prev, captcha: '' }));
      return;
    }

    setIsLoading(true);

    try {
      // Trim inputs to avoid invisible space issues
      const newUser = await storageService.signup({
        username: formData.username.trim(),
        email: formData.email.trim(),
        passwordHash: formData.password // Passwords are usually not trimmed, but users should be careful
      });
      // Auto login after signup
      await storageService.login(newUser.email, formData.password);
      onLoginSuccess(newUser);
    } catch (err: any) {
      setError(err.message || 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md border border-red-200">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm border p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm border p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm border p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm border p-2"
              />
            </div>

            {/* Captcha */}
            <div className="bg-emerald-50 p-4 rounded-md border border-emerald-100">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-800">Security Check</span>
              </div>
              <label className="block text-sm text-gray-700">
                What is {captchaProblem.num1} + {captchaProblem.num2}?
              </label>
              <input
                name="captcha"
                type="number"
                required
                value={formData.captcha}
                onChange={handleChange}
                placeholder="Enter result"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm border p-2"
              />
            </div>
          </div>

          <Button type="submit" className="w-full" isLoading={isLoading}>
            Create Account
          </Button>

          <div className="text-center text-sm">
            <span className="text-gray-500">Already have an account? </span>
            <button 
              type="button"
              onClick={() => setView('LOGIN')}
              className="font-medium text-emerald-600 hover:text-emerald-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};