import { useLocation } from "react-router";
import { Link } from "react-router";

interface ProjectDetailsProps {
  id: number,
  projectName: string,
  companyId: number;
}

export default function ProjectDetails({
  id,
  projectName,
  companyId
}: ProjectDetailsProps) {
  const { pathname } = useLocation();

  return (
    <Link to={`${pathname.replace(/\/+$/, '')}/${id}`} className="w-full">
      <div className="flex justify-center border-b border-sky-400 p-2 px-8 w-full">
        <p className="w-[30px]">{id}</p>
        <p className="w-full">{projectName}</p>
        <p className="w-[30px]">{companyId}</p>
      </div>
    </Link>    
  )
}