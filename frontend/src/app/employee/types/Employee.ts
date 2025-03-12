export interface Employee {
  id?: string;
  first_name: string;
  last_name: string;
  company_id: number;
}

export type EmployeeResponse = {
  data: Employee;
}

export type EmployeesResponse = {
  data: Employee[];
}