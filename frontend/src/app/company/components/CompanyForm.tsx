import { Dispatch, SetStateAction, SyntheticEvent } from "react";

interface CompanyFormProps {
  onSubmit: (e: SyntheticEvent) => void;
  companyName: string;
  setCompanyName: Dispatch<SetStateAction<string>>;
}

export default function CompanyForm({
  onSubmit,
  companyName,
  setCompanyName
}: CompanyFormProps) {
  return (
    <form method="post" onSubmit={onSubmit} className="flex gap-2 w-full">
      <input type="text" placeholder="Company Name" value={companyName} onChange={e => setCompanyName(e.target.value)} className="p-2 border border-sky-400 w-full"/>
      <button type="submit" className="w-[200px] bg-sky-400 text-white">Add Company</button>
    </form>
  )  
}