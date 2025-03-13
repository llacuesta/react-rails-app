import EmployeeDetails from "./components/EmployeeDetails";
import EmployeeForm from "./components/EmployeeForm";
import { useCreateEmployee, useDeleteEmployee, useEmployees, useUpdateEmployee } from "./hooks/useEmployee";
import { Employee } from "./types/Employee";
import { SyntheticEvent, useState } from "react";

export default function EmployeeIndex() {
  // api call
  const { data: employees, error, isLoading } = useEmployees();

  // states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyId, setCompanyId] = useState(0);

  // handle submit
  const createMutation = useCreateEmployee();
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()

    const newEmployee: Employee = {
      first_name: firstName,
      last_name: lastName,
      company_id: companyId
    }
    createMutation.mutate(newEmployee)
  };

  // handle edit
  const [editing, setEditing] = useState(new Array(employees?.data.length).fill( false ));
  const toggleEdit = (id: number) => {
    const newEditing = [...editing];
    newEditing[id - 1] = !editing[id - 1];
    setEditing(newEditing);
  };

  // save edits
  const [newFname, setNewFname] = useState("");
  const [newLname, setNewLname] = useState("");
  const updateMutation = useUpdateEmployee();
  const saveEdits = (id: number, company_id: number) => {
    const newEmployee: Employee = {
      first_name: newFname,
      last_name: newLname,
      company_id
    }
    updateMutation.mutate({ user_id: String(id), data: newEmployee });
  }

  // handle delete
  const deleteMutation = useDeleteEmployee();
  const handleDelete = (id: number) => {
    deleteMutation.mutate(String(id));
  };

  if (isLoading) return <p className="text-lg">Fetching employees...</p>
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
      <p className="text-4xl font-bold">List of All Employees</p>
      <div className="flex flex-col w-full">
        {
          employees?.data.map((employee: Employee) => 
            <EmployeeDetails key={employee.id} id={Number(employee.id!)} firstName={employee.first_name} lastName={employee.last_name} setNewFname={setNewFname} setNewLname={setNewLname} companyId={employee.company_id} toggle={editing[Number(employee.id)! - 1]} toggleEdit={toggleEdit} handleDelete={handleDelete} handleEdit={saveEdits}/>
          )
        }
      </div>

      <EmployeeForm onSubmit={handleSubmit} firstName={firstName} lastName={lastName} companyId={companyId} setFirstName={setFirstName} setLastName={setLastName} setCompanyId={setCompanyId} />
    </div>
  )
}