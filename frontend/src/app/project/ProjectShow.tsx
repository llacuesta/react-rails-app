import { useParams } from "react-router";
import { useProject } from "./hooks/useProject";
import { useEffect, useState } from "react";

export default function ProjectShow() {
  // api call
  const param = useParams() as { project_id: string }
  const { data: project, error, isLoading } = useProject(param.project_id);

  // states
  const [toggleEdit, setToggleEdit] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newDuration, setNewDuration] = useState(0);
  const [newStartDate, setNewStartDate] = useState(new Date);
  useEffect(() => {
    if (project) {
      setNewProjectName(project.data.project_name);
      setNewDuration(project.data.duration);
      setNewStartDate(project.data.start_date);
    }
  }, [project]);

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
                // saveEdits(param.company_id);
              }}>Save</button>
            }
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full items-start">
          <div className="inline-flex"><p className="w-[150px] text-left">Project duration:</p><p>{newDuration} hours</p></div>
          <div className="inline-flex"><p className="w-[150px] text-left">Date started:</p><p>{new Date(newStartDate).toDateString()}</p></div>
        </div>
    </div>
  )
}