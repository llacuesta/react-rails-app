import axios from "axios";

// types 
import { Project, ProjectResponse, ProjectsResponse } from "../types/Project";
// path
const PROJECT_API_PATH = "http://127.0.0.1:3000/api/projects";

export const fetchProjects = async (): Promise<ProjectsResponse> => {
  const res = await axios.get(PROJECT_API_PATH);
  return res;
}

export const fetchProject = async (project_id: string): Promise<ProjectResponse> => {
  const res = await axios.get(`${PROJECT_API_PATH}/${project_id}`);
  return res;
} 

export const createNewProject = async (payload: Project): Promise<ProjectResponse> => {
  const res = await axios.post(PROJECT_API_PATH, payload);
  return res;
}

export const updateProject = async (id: string, payload: Project): Promise<ProjectResponse> => {
  const res = await axios.patch(`${PROJECT_API_PATH}/${id}`, payload);
  return res;
}

export const deleteProject = async (id: string): Promise<ProjectResponse> => {
  const res = await axios.delete(`${PROJECT_API_PATH}/${id}`);
  return res;
}