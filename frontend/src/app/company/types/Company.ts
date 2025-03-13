export interface Company {
  id?: string;
  company_name: string;
}

export type CompanyResponse = {
  data: Company;
}

export type CompaniesResponse = {
  data: Company[];
}