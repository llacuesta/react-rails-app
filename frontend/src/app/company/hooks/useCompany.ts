import { useQuery } from "@tanstack/react-query";
import { fetchCompanies, fetchCompany } from "../api/companies";

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