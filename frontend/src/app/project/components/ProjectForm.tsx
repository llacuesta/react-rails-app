import { Dispatch, SetStateAction, SyntheticEvent } from "react";

interface ProjectFormProps {
  onSubmit: (e: SyntheticEvent) => void;
  projectName: string;
  duration: number;
  startDate: Date;
  companyId: number;
  setProjectName: Dispatch<SetStateAction<string>>;
  setDuration: Dispatch<SetStateAction<number>>;
  setStartDate: Dispatch<SetStateAction<Date>>;
  setCompanyId: Dispatch<SetStateAction<number>>;
}

export default function ProjectForm({
  onSubmit,
  projectName,
  duration,
  startDate,
  companyId,
  setProjectName,
  setDuration,
  setStartDate,
  setCompanyId
}: ProjectFormProps) {
  return (
    <form method="post" onSubmit={onSubmit} className="flex gap-2 w-full">
      <input type="text" placeholder="Project Name" value={projectName} onChange={e => setProjectName(e.target.value)} className="p-2 border border-sky-400 w-full"/>
      <input type="number" placeholder="Duration (in hours)" value={duration} onChange={e => setDuration(parseInt(e.target.value))} className="p-2 border border-sky-400 w-full"/>
      <input type="text" placeholder="Start Date" value={startDate.toDateString()} onChange={e => setStartDate(new Date(e.target.value))} className="p-2 border border-sky-400 w-full"/>
      <input type="number" placeholder="Company" value={companyId} onChange={e => setCompanyId(parseInt(e.target.value))} className="p-2 border border-sky-400 w-full"/>
      <button type="submit" className="w-[800px] bg-sky-400 text-white">Create Project</button>
    </form>
  )
}