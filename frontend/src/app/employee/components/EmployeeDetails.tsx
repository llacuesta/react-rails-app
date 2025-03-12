import { useState } from "react";

interface EmployeeDetailsProps {
  id: number;
  firstName: string;
  lastName: string;
  companyId: number;
  toggle: boolean;
  toggleEdit: (id: number) => void;
  handleDelete: (id: number) => void;
}

export default function EmployeeDetails({
  id,
  firstName,
  lastName,
  companyId,
  toggle,
  toggleEdit,
  handleDelete
}: EmployeeDetailsProps) {
  const [fname, setFname] = useState(firstName);
  const [lname, setLname] = useState(lastName);

  return (
    <div key={id} className="flex gap-4">
      <p className="w-[50px]">{id}</p>
      { !toggle ? <p className="w-[150px]">{fname}</p> : <input className="w-[150px]" value={fname} onChange={e => setFname(e.target.value)}></input> }
      { !toggle ? <p className="w-[150px]">{lname}</p> : <input className="w-[150px]" value={lname} onChange={e => setLname(e.target.value)}></input> }
      <p className="w-[50px]">{companyId}</p>

      { !toggle ? <button onClick={() => toggleEdit(id)}>Edit</button> : <button onClick={() => toggleEdit(id)}>Save</button> }
      {/* { toggle ? <button onClick={() => handleDelete(String(employee.id))}>Delete</button> : <></> } */}
    </div>
)
}