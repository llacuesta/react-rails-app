import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createNewProject, fetchProject, fetchProjects } from "../api/projects";
import { Project } from "../types/Project";

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

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Project) => createNewProject(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projectsData"] })
    }
  })
}