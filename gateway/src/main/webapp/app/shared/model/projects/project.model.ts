import { IEmployeeProject } from 'app/shared/model/projects/employee-project.model';

export interface IProject {
  id?: number;
  projectName?: string;
  projectTitle?: string;
  employeeProjects?: IEmployeeProject[];
  departmentDepartmentName?: string;
  departmentId?: number;
}

export class Project implements IProject {
  constructor(
    public id?: number,
    public projectName?: string,
    public projectTitle?: string,
    public employeeProjects?: IEmployeeProject[],
    public departmentDepartmentName?: string,
    public departmentId?: number
  ) {}
}
