import EmployeeDetails from "./components/EmployeeDetails";
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

    console.log(newEmployee)

    updateMutation.mutate({ user_id: String(id), data: newEmployee })
  }

  // handle delete
  const deleteMutation = useDeleteEmployee();
  const handleDelete = (id: number) => {
    deleteMutation.mutate(String(id))
  };

  return (
    isLoading ? <div>
      <p className="text-lg">Fetching employees...</p>
    </div> : error ? <div>
      <p className="text-lg text-red-500">An error has occured</p>
      <p>{error.message}</p>
    </div> : <div>
      {
        employees?.data.map((employee: Employee) => 
          <EmployeeDetails key={employee.id} id={Number(employee.id!)} firstName={employee.first_name} lastName={employee.last_name} setNewFname={setNewFname} setNewLname={setNewLname} companyId={employee.company_id} toggle={editing[Number(employee.id)! - 1]} toggleEdit={toggleEdit} handleDelete={handleDelete} handleEdit={saveEdits}/>
        )
      }
      
      {/* Input fields for create */}
      <form method="post" onSubmit={handleSubmit}>
        <input type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)}/>
        <input type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)}/>
        <input type="number" placeholder="Company" value={companyId} onChange={e => setCompanyId(parseInt(e.target.value))}/>
        <button type="submit">Create Employee</button>
      </form>
    </div>
  )
}