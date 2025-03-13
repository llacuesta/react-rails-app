import { SyntheticEvent, useState } from "react";
import ProjectDetails from "./components/ProjectDetails";
import ProjectForm from "./components/ProjectForm";
import { useCreateProject, useProjects } from "./hooks/useProject";
import { Project } from "./types/Project";

export default function ProjectIndex() {
  // api call
  const { data: projects, error, isLoading } = useProjects();
  console.log(projects)

  // handle submit
  const [projectName, setProjectName] = useState("");
  const [duration, setDuration] = useState(0);
  const [startDate, setStartDate] = useState(new Date);
  const [companyId, setCompanyId] = useState(0);
  const createMutation = useCreateProject();
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const newProject: Project = {
      project_name: projectName,
      duration: duration,
      start_date: startDate,
      company_id: companyId
    }
    createMutation.mutate(newProject)
  }

  if (isLoading) return <p className="text-lg">Fetching projects...</p>
  if (error) {
    return (
      <div>
        <p className="text-lg text-red-500">An error has occured</p>
        <p>{error.message}</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8 items-start w-full">
      <p className="text-4xl font-bold">List of Projects</p>
      <div className="flex flex-col w-full">
        {
          projects?.data.map((project: Project) => 
            <ProjectDetails key={project.id} id={Number(project.id)} projectName={project.project_name} companyId={project.company_id} />
          )
        }
      </div>
      <ProjectForm onSubmit={handleSubmit} projectName={projectName} setProjectName={setProjectName} duration={duration} setDuration={setDuration} startDate={startDate} setStartDate={setStartDate} companyId={companyId} setCompanyId={setCompanyId}/>
    </div>
  )
}