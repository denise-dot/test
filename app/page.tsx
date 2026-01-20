'use client';

import { useState } from 'react';
import EmployeeTable from '@/components/EmployeeTable';
import { mockEmployees, currentUser } from '@/data/mockData';
import { UserRole } from '@/types/employee';
import { Users } from 'lucide-react';

export default function Home() {
  const [user] = useState(currentUser);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-3 rounded-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900">Employee Directory</h1>
                <p className="text-gray-600 mt-1">Company ABC Employee Management System</p>
              </div>
            </div>
            
            {/* User Info */}
            <div className="bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-200">
              <div className="text-right">
                <p className="text-sm text-gray-500">Logged in as</p>
                <p className="font-semibold text-gray-900">{user.name}</p>
                <RoleBadge role={user.role} />
              </div>
            </div>
          </div>

          {/* HR Notice */}
          {(user.role === 'HR' || user.role === 'Admin') && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <span className="font-semibold">HR Access:</span> Click on any employee row to view detailed information and manage their profile.
              </p>
            </div>
          )}
        </div>

        {/* Employee Table */}
        <EmployeeTable employees={mockEmployees} userRole={user.role} />
      </div>
    </main>
  );
}

function RoleBadge({ role }: { role: UserRole }) {
  const colors = {
    Admin: 'bg-red-100 text-red-800',
    HR: 'bg-purple-100 text-purple-800',
    Employee: 'bg-gray-100 text-gray-800',
  };

  return (
    <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-semibold ${colors[role]}`}>
      {role}
    </span>
  );
}
