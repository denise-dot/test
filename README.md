# Employee Directory - Home

A modern, full-featured employee directory management system built with Next.js, React, and TypeScript.

## Overview

This web application provides a comprehensive employee directory for Company ABC, allowing HR teams to manage employee information while providing read-only access to non-HR employees.

## Features

### ✨ Core Functionality

- **Employee Directory Table**: Display all employees with comprehensive information
- **Advanced Search**: Search across name, department, position, email, and phone number
- **Filtering**: Multi-select filters for department, position, manager, work arrangement, and employment status
- **Sorting**: Click column headers to sort by any field (ascending/descending)
- **Pagination**: Navigate through employee records with page controls
- **Role-Based Access Control**: Different views and permissions for HR vs. regular employees
- **Employee Profile Modal**: Detailed view with additional information (HR-only access)

### 👥 User Roles

1. **Admin**: Full access to all features
2. **HR Team Members**: Can view detailed employee profiles and manage information
3. **Non-HR Employees**: View-only access to basic colleague information

### 📋 Employee Information

**Required Fields (Visible to all):**
- Full Name
- Department
- Position
- Reporting Manager
- Work Arrangement (On-site, Hybrid, Remote)
- Employment Status (Full-time, Part-time, Contract, Intern)
- Email Address
- Phone Number
- Start Date

**Optional Fields (HR-only in detail view):**
- Skills
- Current Projects
- Certifications
- Emergency Contact Information

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd test
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
test/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page with employee directory
├── components/
│   ├── EmployeeTable.tsx    # Main table component with filters & pagination
│   └── EmployeeModal.tsx    # Employee detail modal (HR-only)
├── data/
│   └── mockData.ts          # Mock employee data
├── types/
│   └── employee.ts          # TypeScript type definitions
├── utils/
│   └── tableUtils.ts        # Utility functions for filtering, sorting, pagination
└── public/                  # Static assets
```

## Role Switching

To test different user roles, modify the `currentUser` object in `data/mockData.ts`:

```typescript
export const currentUser: User = {
  id: '3',
  name: 'Emily Davis',
  role: 'HR', // Change to 'Employee' or 'Admin' to test different roles
  email: 'emily.davis@companyabc.com',
};
```

## Features Demo

### Search and Filter
- Use the search bar to find employees by any searchable field
- Click "Filters" to open multi-select filter dropdowns
- Combine search and filters for precise results
- Active filters are highlighted with a badge count

### Sorting
- Click any column header to sort
- First click: ascending order
- Second click: descending order
- Third click: remove sorting

### Pagination
- Navigate using page numbers or arrow buttons
- Jump to first/last page using double arrows
- Shows 10 employees per page

### Employee Details (HR Only)
- Click any employee row to view detailed profile
- See additional information like skills, projects, and certifications
- View formatted profile with clean, modern design

## Design System

The application follows a modern, clean design with:
- **Color Scheme**: Blue and gray tones for professional appearance
- **Status Badges**: Color-coded for quick identification
  - Employment Status: Green (Full-time), Blue (Part-time), Yellow (Contract), Purple (Intern)
  - Work Arrangement: Indigo (On-site), Teal (Hybrid), Orange (Remote)
- **Typography**: Clear hierarchy with proper font weights and sizes
- **Spacing**: Consistent padding and margins for visual clarity

## Future Enhancements (Out of Scope)

- Payroll and salary management
- Leave and absence management
- Automatic employee profile creation
- Employee self-service profile editing
- Third-party integrations
- Reporting and analytics
- Mobile application
- Multi-language support

## License

This project is proprietary to Company ABC.

## Contact

For questions or support, contact the HR team at Company ABC.
