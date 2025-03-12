export interface Project {
  id: string;
  project_name: string;
  duration: number;
  start_date: Date;
  company_id: number;
}

export type ProjectResponse = {
  data: Project;
}

export type ProjectsResponse = {
  data: Project[];
}