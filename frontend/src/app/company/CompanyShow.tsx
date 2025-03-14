import { Link, useParams, useNavigate } from "react-router";
import { useCompany, useDeleteCompany, useUpdateCompany } from "./hooks/useCompany";
import { useEffect, useState } from "react";
import { Company } from "./types/Company";
import { Employee } from "../employee/types/Employee";
import { useEmployees } from "../employee/hooks/useEmployee";
import { useProjects } from "../project/hooks/useProject";
import { Project } from "../project/types/Project";

export default function CompanyShow() {
    // api calls
    const param = useParams() as { company_id: string }
    const { data: company, error, isLoading } = useCompany(param.company_id);
    const { data: employees, error: empError, isLoading: empIsLoading } = useEmployees();
    const { data: projects, error: projError, isLoading: projisLoading } = useProjects();

    // states
    const [toggleEdit, setToggleEdit] = useState(false);
    const [newCompanyName, setNewCompanyName] = useState("");
    const [companyEmployees, setCompanyEmployees] = useState(Array<Employee>);
    const [companyProjects, setCompanyProjects] = useState(Array<Project>);
    useEffect(() => {
      if (company) {
        setNewCompanyName(company.data.company_name);
      }
    }, [company]);
    useEffect(() => {
      if (employees) {
        const filteredEmployees = employees.data.filter(employee => employee.company_id === parseInt(param.company_id));
        setCompanyEmployees(filteredEmployees);
      }
    }, [employees, param.company_id]);
    useEffect(() => {
      if (projects) {
        const filteredProjects = projects.data.filter(project => project.company_id === parseInt(param.company_id));
        setCompanyProjects(filteredProjects);
      }
    }, [projects, param.company_id]);

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
          <div className="flex flex-col w-1/2 gap-4 items-start">
            <div className="flex gap-4 items-end">
              <p className="text-3xl font-bold">Employees</p>
              <Link to="/employees">
                <button className="hover:underline">View all employees</button>
              </Link>
            </div >
            
            <div className="flex flex-col w-full items-start">
              {
                empIsLoading ? <p className="text-lg">Fetching employee information...</p> :
                empError ? <div>
                  <p className="text-lg text-red-500">An error has occured</p>
                  <p>{empError.message}</p>
                </div> :
                companyEmployees.length === 0 ? <p className="text-lg">This company has no employees.</p> :
                companyEmployees.map(employee => (
                  <div className="inline-flex gap-2 p-2 px-4 border-b border-sky-400 w-full">
                    <p className="w-[30px]">{employee.id}</p> <p>{employee.first_name}</p> <p>{employee.last_name}</p>
                  </div>
                ))
              }              
            </div>
          </div>

          {/* list of projects */}
          <div className="flex flex-col w-1/2 gap-4 items-start">
            <div className="flex gap-4 items-end">
              <p className="text-3xl font-bold">Projects</p>
              <Link to="/projects">
                <button className="hover:underline">View all projects</button>
              </Link>
            </div>
            
            <div className="flex flex-col w-full items-start">
              {
                projisLoading ? <p className="text-lg">Fetching project information...</p> :
                projError ? <div>
                  <p className="text-lg text-red-500">An error has occured</p>
                  <p>{projError.message}</p>
                </div> :
                companyProjects.length === 0 ? <p className="text-lg">This company has no projects.</p> :
                companyProjects.map(project => (
                  <div className="inline-flex gap-2 p-2 px-4 border-b border-sky-400 w-full">
                    <p className="w-[30px]">{project.id}</p> <p>{project.project_name}</p>
                  </div>
                ))
              }              
            </div>
          </div>
        </div>
      </div>
    )
}