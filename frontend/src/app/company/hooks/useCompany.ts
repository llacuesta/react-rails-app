import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createNewCompany, deleteCompany, fetchCompanies, fetchCompany, updateCompany } from "../api/companies";
import { Company } from "../types/Company";

export const useCompanies = () => {
  return useQuery({
    queryKey: ["companiesData"],
    queryFn: fetchCompanies
  });
}

export const useCompany = (company_id: string) => {
  return useQuery({
    queryKey: ["companyData", company_id],
    queryFn: () => fetchCompany(company_id)
  });
}

export const useCreateCompany = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: Company) => createNewCompany(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companiesData"] })
    }
  })
}

export const useUpdateCompany = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { id: string, data: Company }) => updateCompany(payload.id, payload.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companiesData"] })
    }
  })
}

export const useDeleteCompany = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteCompany(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comapniesData"] })
    }
  })
}