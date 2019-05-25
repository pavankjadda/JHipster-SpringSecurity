export interface IEmployeeProject {
  id?: number;
  employeeFirstName?: string;
  employeeId?: number;
  projectProjectTitle?: string;
  projectId?: number;
}

export class EmployeeProject implements IEmployeeProject {
  constructor(
    public id?: number,
    public employeeFirstName?: string,
    public employeeId?: number,
    public projectProjectTitle?: string,
    public projectId?: number
  ) {}
}
