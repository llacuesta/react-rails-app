import { Link, useParams, useNavigate } from "react-router";
import { useCompany, useDeleteCompany, useUpdateCompany } from "./hooks/useCompany";
import { useEffect, useState } from "react";
import { Company } from "./types/Company";

export default function CompanyShow() {
    // api calls
    const param = useParams() as { company_id: string }
    const { data: company, error, isLoading } = useCompany(param.company_id);

    // states
    const [toggleEdit, setToggleEdit] = useState(false);
    const [newCompanyName, setNewCompanyName] = useState("");
    useEffect(() => {
      if (company) {
        setNewCompanyName(company.data.company_name);
      }
    }, [company]);

    // save edit
    const updateMutation = useUpdateCompany();
    const saveEdits = (id: string) => {
      const newCompany: Company = {
        company_name: newCompanyName
      }
      updateMutation.mutate({ id, data: newCompany })
    }

    // handle delete
    const deleteMutation = useDeleteCompany();
    const navigate = useNavigate();
    const handleDelete = (id: number) => {
      deleteMutation.mutate(String(id));
    };

    if (isLoading) return <p className="text-lg">Fetching company information...</p>
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
        <div className="flex gap-4 items-end">

          {
            !toggleEdit ? 
            <p className="text-4xl font-bold">{newCompanyName}</p> :
            <input className="text-4xl font-bold" value={newCompanyName} onChange={e => setNewCompanyName(e.target.value)} />
          }
          
          <div className="flex gap-2">
            {
              !toggleEdit ? 
              <button className="hover:underline" onClick={() => setToggleEdit(!toggleEdit)}>Edit</button> : 
              <button className="hover:underline" onClick={() => {
                setToggleEdit(!toggleEdit);
                saveEdits(param.company_id);
              }}>Save</button>
            }
            { !toggleEdit ? <button onClick={() => {
              handleDelete(Number(param.company_id));
              navigate("/companies");
            }}>Delete</button> : <></> }     
          </div>
        </div>

        <div className="flex w-full gap-8">
          {/* list of employees */}
          <div className="flex flex-col w-1/2 items-start">
            <div className="flex gap-4 items-end">
              <p className="text-3xl font-bold">Employees</p>
              <Link to="/employees">
                <button className="hover:underline">View all employees</button>
              </Link>
            </div>
            {
              
            }
          </div>

          {/* list of projects */}
          <div className="flex flex-col w-1/2 items-start">
            <div className="flex gap-4 items-end">
              <p className="text-3xl font-bold">Projects</p>
              <Link to="/projects">
                <button className="hover:underline">View all projects</button>
              </Link>
            </div>
            {
              
            }
          </div>
        </div>
      </div>
    )
}