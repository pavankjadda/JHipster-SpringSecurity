import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'address',
        loadChildren: './projects/address/address.module#ProjectsAddressModule'
      },
      {
        path: 'employee',
        loadChildren: './projects/employee/employee.module#ProjectsEmployeeModule'
      },
      {
        path: 'project',
        loadChildren: './projects/project/project.module#ProjectsProjectModule'
      },
      {
        path: 'employee-project',
        loadChildren: './projects/employee-project/employee-project.module#ProjectsEmployeeProjectModule'
      },
      {
        path: 'department',
        loadChildren: './projects/department/department.module#ProjectsDepartmentModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayEntityModule {}
