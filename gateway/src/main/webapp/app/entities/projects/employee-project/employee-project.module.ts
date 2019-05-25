import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared';
import {
  EmployeeProjectComponent,
  EmployeeProjectDetailComponent,
  EmployeeProjectUpdateComponent,
  EmployeeProjectDeletePopupComponent,
  EmployeeProjectDeleteDialogComponent,
  employeeProjectRoute,
  employeeProjectPopupRoute
} from './';

const ENTITY_STATES = [...employeeProjectRoute, ...employeeProjectPopupRoute];

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    EmployeeProjectComponent,
    EmployeeProjectDetailComponent,
    EmployeeProjectUpdateComponent,
    EmployeeProjectDeleteDialogComponent,
    EmployeeProjectDeletePopupComponent
  ],
  entryComponents: [
    EmployeeProjectComponent,
    EmployeeProjectUpdateComponent,
    EmployeeProjectDeleteDialogComponent,
    EmployeeProjectDeletePopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProjectsEmployeeProjectModule {}
