import { useParams } from "react-router";
import { useCompany } from "./hooks/useCompany";

export default function CompanyShow() {
    // api call
    const param = useParams() as { company_id: string }
    const { data: company, error, isLoading } = useCompany(param.company_id);
    console.log(company)

    return (
      isLoading ? <div>
        <p className="text-lg">Fetching company...</p>
      </div> : error ? <div>
        <p className="text-lg text-red-500">An error has occured</p>
        <p>{error.message}</p>
      </div> : <div>
        {
          <p>Company: {company?.data.company_name}</p>
        }
      </div>
    )
}