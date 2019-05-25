import { IEmployeeProject } from 'app/shared/model/projects/employee-project.model';

export interface IEmployee {
  id?: number;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  salary?: number;
  photoContentType?: string;
  photo?: any;
  descriptionContentType?: string;
  description?: any;
  notesContentType?: string;
  notes?: any;
  employeeProjects?: IEmployeeProject[];
  addressStreetName?: string;
  addressId?: number;
}

export class Employee implements IEmployee {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public middleName?: string,
    public salary?: number,
    public photoContentType?: string,
    public photo?: any,
    public descriptionContentType?: string,
    public description?: any,
    public notesContentType?: string,
    public notes?: any,
    public employeeProjects?: IEmployeeProject[],
    public addressStreetName?: string,
    public addressId?: number
  ) {}
}
