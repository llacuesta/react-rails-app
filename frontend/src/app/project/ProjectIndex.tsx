import { useProjects } from "./hooks/useProject";
import { Project } from "./types/Project";

export default function ProjectIndex() {
  // api call
  const { data: projects, error, isLoading } = useProjects();
  console.log(projects)

  return (
    isLoading ? <div>
      <p className="text-lg">Fetching projects...</p>
    </div> : error ? <div>
      <p className="text-lg text-red-500">An error has occured</p>
      <p>{error.message}</p>
    </div> : <div>
      {
        projects?.data.map((project: Project) => 
          <p key={project.id}>
            {project.id} {project.project_name}
          </p>
        )
      }
    </div>
  )
}