import { BaseEntity } from './../../shared';

export class EmployeeProject implements BaseEntity {
    constructor(
        public id?: number,
        public employeeFirstName?: string,
        public employeeId?: number,
        public projectProjectTitle?: string,
        public projectId?: number,
    ) {
    }
}
