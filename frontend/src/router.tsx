import { createBrowserRouter } from "react-router";

// main
import App from './App.tsx'
// companies
import CompanyIndex from "./app/company/CompanyIndex.tsx";
import ProjectIndex from "./app/project/ProjectIndex.tsx";
import CompanyShow from "./app/company/CompanyShow.tsx";
import ProjectShow from "./app/project/ProjectShow.tsx";
import EmployeeIndex from "./app/employee/EmployeeIndex.tsx";

const router = createBrowserRouter([
  // routes
  { 
    path: "/", 
    element: <App />,
    children: [
      {
        path: "employees",
        children: [
          { path: "", element: <EmployeeIndex /> }
        ]
      },
      { 
        path: "companies", 
        children: [
          { path: "", element: <CompanyIndex /> },
          { path: ":company_id", element: <CompanyShow /> }
        ] 
      },
      { 
        path: "projects", 
        children: [
          { path: "", element: <ProjectIndex /> },
          { path: ":project_id", element: <ProjectShow /> }
        ]
      }
    ]
  },
  
]);

export default router;