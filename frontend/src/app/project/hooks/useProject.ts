import { useQuery } from "@tanstack/react-query";
import { fetchProject, fetchProjects } from "../api/projects";

export const useProjects = () => {
  return useQuery({
    queryKey: ["projectsData"],
    queryFn: fetchProjects
  })
}

export const useProject = (project_id: string) => {
  return useQuery({
    queryKey: ["projectData", project_id],
    queryFn: () => fetchProject(project_id)
  });
}