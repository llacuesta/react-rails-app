import { Link, useLocation } from "react-router"

interface CompanyCardProps {
  id: number,
  companyName: string
}

export default function CompanyCard({
  id, 
  companyName,
}: CompanyCardProps) {
  const { pathname } = useLocation();

  return (
    <Link to={`${pathname.replace(/\/+$/, '')}/${id}`} className="w-full">
      <div className="flex justify-center border-b border-sky-400 p-2 w-full">
        <p className="w-[30px]">{id}</p>
        <p className="w-full">{companyName}</p>
      </div>
    </Link>
  )
}