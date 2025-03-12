import { useCompanies } from "./hooks/useCompany";
import { Company } from "./types/Company";

export default function CompanyIndex() {
  // api call
  const { data: companies, error, isLoading } = useCompanies();
  console.log(companies)

  return (
    isLoading ? <div>
      <p className="text-lg">Fetching companies...</p>
    </div> : error ? <div>
      <p className="text-lg text-red-500">An error has occured</p>
      <p>{error.message}</p>
    </div> : <div>
      {
        companies?.data.map((company: Company) => 
          <p key={company.id}>
            {company.id} {company.company_name}
          </p>
        )
      }
    </div>
  )
}
