import { Employee } from '@/types/employee';

export type SortOrder = 'asc' | 'desc' | null;
export type SortableColumn = keyof Employee;

export interface FilterValues {
  department: string[];
  position: string[];
  reportingManager: string[];
  workArrangement: string[];
  employmentStatus: string[];
}

export const getUniqueValues = (employees: Employee[], key: keyof Employee): string[] => {
  const values = employees.map(emp => String(emp[key]));
  return Array.from(new Set(values)).sort();
};

export const filterEmployees = (
  employees: Employee[],
  filters: FilterValues,
  searchQuery: string
): Employee[] => {
  return employees.filter(employee => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const searchableFields = [
        employee.fullName,
        employee.department,
        employee.position,
        employee.email,
        employee.phoneNumber,
      ];
      const matchesSearch = searchableFields.some(field =>
        field.toLowerCase().includes(query)
      );
      if (!matchesSearch) return false;
    }

    // Column filters
    if (filters.department.length > 0 && !filters.department.includes(employee.department)) {
      return false;
    }
    if (filters.position.length > 0 && !filters.position.includes(employee.position)) {
      return false;
    }
    if (filters.reportingManager.length > 0 && !filters.reportingManager.includes(employee.reportingManager)) {
      return false;
    }
    if (filters.workArrangement.length > 0 && !filters.workArrangement.includes(employee.workArrangement)) {
      return false;
    }
    if (filters.employmentStatus.length > 0 && !filters.employmentStatus.includes(employee.employmentStatus)) {
      return false;
    }

    return true;
  });
};

export const sortEmployees = (
  employees: Employee[],
  sortColumn: SortableColumn | null,
  sortOrder: SortOrder
): Employee[] => {
  if (!sortColumn || !sortOrder) return employees;

  return [...employees].sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    // Handle undefined values
    if (aValue === undefined && bValue === undefined) return 0;
    if (aValue === undefined) return 1;
    if (bValue === undefined) return -1;

    let comparison = 0;
    if (aValue < bValue) comparison = -1;
    if (aValue > bValue) comparison = 1;

    return sortOrder === 'asc' ? comparison : -comparison;
  });
};

export const paginateData = <T,>(data: T[], page: number, itemsPerPage: number): T[] => {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return data.slice(startIndex, endIndex);
};

export const getTotalPages = (totalItems: number, itemsPerPage: number): number => {
  return Math.ceil(totalItems / itemsPerPage);
};
