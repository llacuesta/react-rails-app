import { useParams } from "react-router";
import { useProject } from "./hooks/useProject";

export default function ProjectShow() {
  // api call
  const param = useParams() as { project_id: string }
  const { data: project, error, isLoading } = useProject(param.project_id);
  console.log(project)

  return (
    isLoading ? <div>
      <p className="text-lg">Fetching project...</p>
    </div> : error ? <div>
      <p className="text-lg text-red-500">An error has occured</p>
      <p>{error.message}</p>
    </div> : <div>
      {
        <p>Project: {project?.data.project_name} {project?.data.duration} {project?.data.start_date.toString()}</p>
      }
    </div>
  )
}