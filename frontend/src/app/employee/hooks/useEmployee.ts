import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createNewEmployee, deleteEmployee, fetchEmployees } from "../api/employees";
import { Employee } from "../types/Employee";

export const useEmployees = () => {
  return useQuery({
    queryKey: ["employeeData"],
    queryFn: fetchEmployees
  })
}

export const useCreateEmployee = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: Employee) => createNewEmployee(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employeeData"] })
    }
  })
}

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (user_id: string) => deleteEmployee(user_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employeeData"] })
    }
  })
}