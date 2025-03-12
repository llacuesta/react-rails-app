import axios from "axios";

// types
import { Employee, EmployeeResponse, EmployeesResponse } from "../types/Employee";
// path
const EMPLOYEE_API_PATH = "http://127.0.0.1:3000/api/employees";

export const fetchEmployees = async (): Promise<EmployeesResponse> => {
  const res = await axios.get(EMPLOYEE_API_PATH);
  return res;
}

export const createNewEmployee = async (payload: Employee): Promise<EmployeeResponse> => {
  const res = await axios.post(EMPLOYEE_API_PATH, payload);
  return res;
}

export const updateEmployee = async (user_id: string, payload: Employee): Promise<EmployeeResponse> => {
  const res = await axios.patch(`${EMPLOYEE_API_PATH}/${user_id}`, payload);
  return res;
}

export const deleteEmployee = async (user_id: string): Promise<EmployeeResponse> => {
  const res = await axios.delete(`${EMPLOYEE_API_PATH}/${user_id}`);
  return res;
}