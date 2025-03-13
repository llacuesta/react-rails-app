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
    <div className="flex justify-center border-b border-sky-400 p-2 px-8 w-full gap-8">
      <p className="w-[30px]">{id}</p>
      <div className="w-full flex">
        { 
          !toggle ? 
          <p className="w-[125px] text-left">{fname}</p> : 
          <input className="w-[125px]" value={fname} onChange={e => {
            setNewFname(e.target.value);
            setFname(e.target.value)
          }}></input> 
        }
        { 
          !toggle ? 
          <p className="w-[150px] text-left">{lname}</p> : 
          <input className="w-[150px]" value={lname} onChange={e => {
            setNewLname(e.target.value);
            setLname(e.target.value)
          }}></input> 
        }
      </div>
      
      <p className="w-[50px]">{companyId}</p>

      <div className="flex gap-4 w-[150px]">
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

    </div>
)
}