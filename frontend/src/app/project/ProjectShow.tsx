import { useParams } from "react-router";
import { useProject, useUpdateProject } from "./hooks/useProject";
import { useEffect, useState } from "react";
import { Project } from "./types/Project";

export default function ProjectShow() {
  // api call
  const param = useParams() as { project_id: string }
  const { data: project, error, isLoading } = useProject(param.project_id);

  // states
  const [toggleEdit, setToggleEdit] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newDuration, setNewDuration] = useState(0);
  const [newStartDate, setNewStartDate] = useState(new Date);
  const [newCompanyId, setNewCompanyId] = useState(0);
  useEffect(() => {
    if (project) {
      setNewProjectName(project.data.project_name);
      setNewDuration(project.data.duration);
      setNewStartDate(project.data.start_date);
      setNewCompanyId(project.data.company_id);
    }
  }, [project]);

  // save edit
  const updateMutation = useUpdateProject();
  const saveEdits = (id: string) => {
    const newProject: Project = {
      project_name: newProjectName,
      duration: newDuration,
      start_date: newStartDate,
      company_id: newCompanyId
    }
    updateMutation.mutate({ id: String(id), data: newProject });
  }

  if (isLoading) return <p className="text-lg">Fetching project information...</p>
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
        <div className="flex gap-4 items-end">

          {
            !toggleEdit ? 
            <p className="text-4xl font-bold">{newProjectName}</p> :
            <input className="text-4xl font-bold" value={newProjectName} onChange={e => setNewProjectName(e.target.value)} />
          }
          
          <div className="flex gap-2">
            {
              !toggleEdit ? 
              <button className="hover:underline" onClick={() => setToggleEdit(!toggleEdit)}>Edit</button> : 
              <button className="hover:underline" onClick={() => {
                setToggleEdit(!toggleEdit);
                saveEdits(param.project_id);
              }}>Save</button>
            }
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full items-start">
          <div className="inline-flex gap-2">
            <p className="w-[150px] text-left">Project duration:</p>
            <p>{newDuration}</p>
            <p>hours</p>
          </div>
          <div className="inline-flex gap-2">
            <p className="w-[150px] text-left">Date started:</p>
            <p>{new Date(newStartDate).toDateString()}</p>
          </div>
        </div>
    </div>
  )
}