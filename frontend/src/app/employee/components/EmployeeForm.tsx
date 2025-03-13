import { Dispatch, SetStateAction, SyntheticEvent } from "react";

interface EmployeeFormProps {
  onSubmit: (e: SyntheticEvent) => void;
  firstName: string;
  lastName: string;
  companyId: number;
  setFirstName: Dispatch<SetStateAction<string>>;
  setLastName: Dispatch<SetStateAction<string>>;
  setCompanyId: Dispatch<SetStateAction<number>>;
}

export default function EmployeeForm({
  onSubmit,
  firstName,
  lastName,
  companyId,
  setFirstName,
  setLastName,
  setCompanyId
}: EmployeeFormProps) {
  return (
    <form method="post" onSubmit={onSubmit} className="flex gap-2 w-full">
      <input type="text" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} className="p-2 border border-sky-400 w-full"/>
      <input type="text" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} className="p-2 border border-sky-400 w-full"/>
      <input type="number" placeholder="Company" value={companyId} onChange={e => setCompanyId(parseInt(e.target.value))} className="p-2 border border-sky-400 w-full"/>
      <button type="submit" className="w-[800px] bg-sky-400 text-white">Create Employee</button>
    </form>
  )
}