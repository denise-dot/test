'use client';

import { useState, useMemo } from 'react';
import { Employee, UserRole } from '@/types/employee';
import { Search, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Filter } from 'lucide-react';
import {
  filterEmployees,
  sortEmployees,
  paginateData,
  getTotalPages,
  getUniqueValues,
  SortOrder,
  SortableColumn,
  FilterValues,
} from '@/utils/tableUtils';
import EmployeeModal from './EmployeeModal';

interface EmployeeTableProps {
  employees: Employee[];
  userRole: UserRole;
}

const ITEMS_PER_PAGE = 10;

export default function EmployeeTable({ employees, userRole }: EmployeeTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortColumn, setSortColumn] = useState<SortableColumn | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  
  const [filters, setFilters] = useState<FilterValues>({
    department: [],
    position: [],
    reportingManager: [],
    workArrangement: [],
    employmentStatus: [],
  });

  const isHR = userRole === 'HR' || userRole === 'Admin';

  // Get unique values for filters
  const filterOptions = useMemo(() => ({
    department: getUniqueValues(employees, 'department'),
    position: getUniqueValues(employees, 'position'),
    reportingManager: getUniqueValues(employees, 'reportingManager'),
    workArrangement: getUniqueValues(employees, 'workArrangement'),
    employmentStatus: getUniqueValues(employees, 'employmentStatus'),
  }), [employees]);

  // Apply filters, sorting, and pagination
  const processedEmployees = useMemo(() => {
    let result = filterEmployees(employees, filters, searchQuery);
    result = sortEmployees(result, sortColumn, sortOrder);
    return result;
  }, [employees, filters, searchQuery, sortColumn, sortOrder]);

  const totalPages = getTotalPages(processedEmployees.length, ITEMS_PER_PAGE);
  const paginatedEmployees = paginateData(processedEmployees, currentPage, ITEMS_PER_PAGE);

  const handleSort = (column: SortableColumn) => {
    if (sortColumn === column) {
      // Cycle through: asc -> desc -> null
      if (sortOrder === 'asc') setSortOrder('desc');
      else if (sortOrder === 'desc') {
        setSortOrder(null);
        setSortColumn(null);
      }
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
    setCurrentPage(1);
  };

  const handleFilterChange = (filterType: keyof FilterValues, value: string) => {
    setFilters(prev => {
      const currentValues = prev[filterType];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      return { ...prev, [filterType]: newValues };
    });
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      department: [],
      position: [],
      reportingManager: [],
      workArrangement: [],
      employmentStatus: [],
    });
    setCurrentPage(1);
  };

  const handleRowClick = (employee: Employee) => {
    if (isHR) {
      setSelectedEmployee(employee);
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Full-time': return 'bg-green-100 text-green-800';
      case 'Part-time': return 'bg-blue-100 text-blue-800';
      case 'Contract': return 'bg-yellow-100 text-yellow-800';
      case 'Intern': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getWorkArrangementBadgeColor = (arrangement: string) => {
    switch (arrangement) {
      case 'On-site': return 'bg-indigo-100 text-indigo-800';
      case 'Hybrid': return 'bg-teal-100 text-teal-800';
      case 'Remote': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const hasActiveFilters = Object.values(filters).some(f => f.length > 0);

  return (
    <div className="w-full">
      {/* Search and Filter Bar */}
      <div className="mb-6 space-y-4">
        <div className="flex gap-4">
          <div className="flex-grow relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search employees by name, department, position, email, or phone..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-colors ${
              hasActiveFilters 
                ? 'bg-blue-50 border-blue-500 text-blue-700' 
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Filter className="w-5 h-5" />
            Filters
            {hasActiveFilters && (
              <span className="ml-1 px-2 py-0.5 bg-blue-500 text-white text-xs rounded-full">
                {Object.values(filters).flat().length}
              </span>
            )}
          </button>
        </div>

        {/* Filter Dropdowns */}
        {showFilters && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-700">Filter By:</h3>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Clear all filters
                </button>
              )}
            </div>
            <div className="grid grid-cols-5 gap-4">
              <FilterDropdown
                label="Department"
                options={filterOptions.department}
                selected={filters.department}
                onChange={(value) => handleFilterChange('department', value)}
              />
              <FilterDropdown
                label="Position"
                options={filterOptions.position}
                selected={filters.position}
                onChange={(value) => handleFilterChange('position', value)}
              />
              <FilterDropdown
                label="Manager"
                options={filterOptions.reportingManager}
                selected={filters.reportingManager}
                onChange={(value) => handleFilterChange('reportingManager', value)}
              />
              <FilterDropdown
                label="Work Arrangement"
                options={filterOptions.workArrangement}
                selected={filters.workArrangement}
                onChange={(value) => handleFilterChange('workArrangement', value)}
              />
              <FilterDropdown
                label="Employment Status"
                options={filterOptions.employmentStatus}
                selected={filters.employmentStatus}
                onChange={(value) => handleFilterChange('employmentStatus', value)}
              />
            </div>
          </div>
        )}
      </div>

      {/* Results count */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {paginatedEmployees.length} of {processedEmployees.length} employees
        {searchQuery && ` (filtered from ${employees.length} total)`}
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <SortableHeader
                  label="Full Name"
                  column="fullName"
                  sortColumn={sortColumn}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
                <SortableHeader
                  label="Department"
                  column="department"
                  sortColumn={sortColumn}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
                <SortableHeader
                  label="Position"
                  column="position"
                  sortColumn={sortColumn}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
                <SortableHeader
                  label="Reporting Manager"
                  column="reportingManager"
                  sortColumn={sortColumn}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
                <SortableHeader
                  label="Work Arrangement"
                  column="workArrangement"
                  sortColumn={sortColumn}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
                <SortableHeader
                  label="Employment Status"
                  column="employmentStatus"
                  sortColumn={sortColumn}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
                <SortableHeader
                  label="Email"
                  column="email"
                  sortColumn={sortColumn}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
                <SortableHeader
                  label="Phone Number"
                  column="phoneNumber"
                  sortColumn={sortColumn}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
                <SortableHeader
                  label="Start Date"
                  column="startDate"
                  sortColumn={sortColumn}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedEmployees.map((employee) => (
                <tr
                  key={employee.id}
                  onClick={() => handleRowClick(employee)}
                  className={`${isHR ? 'cursor-pointer hover:bg-blue-50' : ''} transition-colors`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{employee.fullName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {employee.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {employee.position}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {employee.reportingManager}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getWorkArrangementBadgeColor(employee.workArrangement)}`}>
                      {employee.workArrangement}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(employee.employmentStatus)}`}>
                      {employee.employmentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {employee.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {employee.phoneNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {new Date(employee.startDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="p-2 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="First page"
              >
                <ChevronsLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              {/* Page numbers */}
              <div className="flex gap-1">
                {Array.from({ length: Math.min(4, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 4) {
                    pageNum = i + 1;
                  } else if (currentPage <= 2) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 1) {
                    pageNum = totalPages - 3 + i;
                  } else {
                    pageNum = currentPage - 1 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-1 rounded ${
                        currentPage === pageNum
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next page"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="p-2 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Last page"
              >
                <ChevronsRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Employee Modal (HR only) */}
      {selectedEmployee && isHR && (
        <EmployeeModal
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
        />
      )}
    </div>
  );
}

interface SortableHeaderProps {
  label: string;
  column: SortableColumn;
  sortColumn: SortableColumn | null;
  sortOrder: SortOrder;
  onSort: (column: SortableColumn) => void;
}

function SortableHeader({ label, column, sortColumn, sortOrder, onSort }: SortableHeaderProps) {
  const isActive = sortColumn === column;

  return (
    <th
      onClick={() => onSort(column)}
      className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100 select-none"
    >
      <div className="flex items-center gap-2">
        {label}
        <div className="flex flex-col">
          <ChevronUp className={`w-3 h-3 -mb-1 ${isActive && sortOrder === 'asc' ? 'text-blue-600' : 'text-gray-400'}`} />
          <ChevronDown className={`w-3 h-3 ${isActive && sortOrder === 'desc' ? 'text-blue-600' : 'text-gray-400'}`} />
        </div>
      </div>
    </th>
  );
}

interface FilterDropdownProps {
  label: string;
  options: string[];
  selected: string[];
  onChange: (value: string) => void;
}

function FilterDropdown({ label, options, selected, onChange }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-left text-sm flex items-center justify-between hover:bg-gray-50"
      >
        <span className="truncate">
          {selected.length > 0 ? `${label} (${selected.length})` : label}
        </span>
        <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
      </button>
      
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute z-20 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {options.map((option) => (
              <label
                key={option}
                className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(option)}
                  onChange={() => onChange(option)}
                  className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
