import axios from "axios";

// types
import { CompaniesResponse, CompanyResponse } from "../types/Company";
// path
const COMPANY_API_PATH = "http://127.0.0.1:3000/api/companies";

export const fetchCompanies = async (): Promise<CompaniesResponse> => {
  const res = await axios.get(COMPANY_API_PATH);
  return res;
}

export const fetchCompany = async (company_id: string): Promise<CompanyResponse> => {
  const res = await axios.get(`${COMPANY_API_PATH}/${company_id}`)
  return res;
}