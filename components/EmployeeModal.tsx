'use client';

import { Employee } from '@/types/employee';
import { X } from 'lucide-react';

interface EmployeeModalProps {
  employee: Employee;
  onClose: () => void;
}

export default function EmployeeModal({ employee, onClose }: EmployeeModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Employee Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Top section - Profile picture and name */}
          <div className="flex items-start gap-6 mb-8">
            <div className="flex-shrink-0">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {employee.fullName.split(' ').map(n => n[0]).join('')}
              </div>
            </div>
            <div className="flex-grow">
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{employee.fullName}</h3>
              <p className="text-lg text-gray-600">{employee.position}</p>
            </div>
          </div>

          {/* Basic Information */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Basic Information</h4>
            <div className="grid grid-cols-2 gap-4">
              <InfoItem label="Department" value={employee.department} />
              <InfoItem label="Reporting Manager" value={employee.reportingManager} />
              <InfoItem label="Work Arrangement" value={employee.workArrangement} />
              <InfoItem label="Employment Status" value={employee.employmentStatus} />
              <InfoItem label="Email" value={employee.email} />
              <InfoItem label="Phone Number" value={employee.phoneNumber} />
              <InfoItem label="Start Date" value={new Date(employee.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} />
            </div>
          </div>

          {/* Optional Fields - Only show if data exists */}
          {employee.skills && employee.skills.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {employee.skills.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {employee.projects && employee.projects.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Current Projects</h4>
              <ul className="space-y-2">
                {employee.projects.map((project, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    <span className="text-gray-700">{project}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {employee.certifications && employee.certifications.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Certifications</h4>
              <ul className="space-y-2">
                {employee.certifications.map((cert, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    <span className="text-gray-700">{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {employee.emergencyContact && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Emergency Contact</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <InfoItem label="Name" value={employee.emergencyContact.name} />
                  <InfoItem label="Relationship" value={employee.emergencyContact.relationship} />
                  <InfoItem label="Phone" value={employee.emergencyContact.phone} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface InfoItemProps {
  label: string;
  value: string;
}

function InfoItem({ label, value }: InfoItemProps) {
  return (
    <div>
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="text-base text-gray-900 font-medium">{value}</p>
    </div>
  );
}
