import { BaseEntity } from './../../shared';

export class Employee implements BaseEntity {
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
        public employeeProjects?: BaseEntity[],
        public addressStreetName?: string,
        public addressId?: number,
    ) {
    }
}
