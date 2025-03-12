import { useState, Dispatch, SetStateAction } from "react";

interface EmployeeDetailsProps {
  id: number;
  firstName: string;
  lastName: string;
  companyId: number;
  toggle: boolean;
  setNewFname: Dispatch<SetStateAction<string>>;
  setNewLname: Dispatch<SetStateAction<string>>;
  toggleEdit: (id: number) => void;
  handleEdit: (id: number, company_id: number) => void;
  handleDelete: (id: number) => void;
}

export default function EmployeeDetails({
  id,
  firstName,
  lastName,
  companyId,
  toggle,
  setNewFname,
  setNewLname,
  toggleEdit,
  handleEdit,
  handleDelete,
}: EmployeeDetailsProps) {
  const [fname, setFname] = useState(firstName);
  const [lname, setLname] = useState(lastName);

  return (
    <div key={id} className="flex gap-4">
      <p className="w-[50px]">{id}</p>
      { 
        !toggle ? 
        <p className="w-[150px]">{fname}</p> : 
        <input className="w-[150px]" value={fname} onChange={e => {
          setNewFname(e.target.value);
          setFname(e.target.value)
        }}></input> 
      }
      { 
        !toggle ? 
        <p className="w-[150px]">{lname}</p> : 
        <input className="w-[150px]" value={lname} onChange={e => {
          setNewLname(e.target.value);
          setLname(e.target.value)
        }}></input> 
      }
      <p className="w-[50px]">{companyId}</p>

      { 
        !toggle ? 
        <button onClick={() => {
          toggleEdit(id);
          setNewFname(firstName);
          setNewLname(lastName);
        }}>Edit</button> : 
        <button onClick={() => {
          toggleEdit(id);
          handleEdit(id, companyId);
        }}>Save</button> 
      }
      { !toggle ? <button onClick={() => handleDelete(id)}>Delete</button> : <></> }
    </div>
)
}