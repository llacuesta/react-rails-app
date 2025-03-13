import CompanyCard from "./components/CompanyCard";
import CompanyForm from "./components/CompanyForm";
import { useCompanies, useCreateCompany } from "./hooks/useCompany";
import { Company } from "./types/Company";
import { SyntheticEvent, useState } from "react";

export default function CompanyIndex() {
  // api call
  const { data: companies, error, isLoading } = useCompanies();
  console.log(companies)

  // handle submit
  const [companyName, setCompanyName] = useState("");
  const createMutation = useCreateCompany();
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const newCompany: Company = {
      company_name: companyName
    }
    createMutation.mutate(newCompany);
  }

  if (isLoading) return <p className="text-lg">Fetching companies...</p>
  if (error) {
    return (
      <div>
        <p className="text-lg text-red-500">An error has occured</p>
        <p>{error.message}</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8 items-start w-full">
      <p className="text-4xl font-bold">List of Companies</p>
      <div className="flex flex-col w-full">
        {
          companies?.data.map((company: Company) => 
            <CompanyCard key={company.id} id={Number(company.id)} companyName={company.company_name} />
          )
        }
      </div>
      <CompanyForm onSubmit={handleSubmit} companyName={companyName} setCompanyName={setCompanyName}/>
    </div>
  )
}
