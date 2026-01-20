export type WorkArrangement = 'On-site' | 'Hybrid' | 'Remote';
export type EmploymentStatus = 'Full-time' | 'Part-time' | 'Contract' | 'Intern';
export type Department = 'Engineering' | 'HR' | 'Sales' | 'Marketing' | 'Finance' | 'Operations' | 'Product';
export type UserRole = 'Admin' | 'HR' | 'Employee';

export interface Employee {
  id: string;
  fullName: string;
  department: Department;
  position: string;
  reportingManager: string;
  workArrangement: WorkArrangement;
  employmentStatus: EmploymentStatus;
  email: string;
  phoneNumber: string;
  startDate: string;
  profilePicture?: string;
  // Optional role-specific fields
  skills?: string[];
  projects?: string[];
  certifications?: string[];
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
}
