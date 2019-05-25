import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { EmployeeProject } from 'app/shared/model/projects/employee-project.model';
import { EmployeeProjectService } from './employee-project.service';
import { EmployeeProjectComponent } from './employee-project.component';
import { EmployeeProjectDetailComponent } from './employee-project-detail.component';
import { EmployeeProjectUpdateComponent } from './employee-project-update.component';
import { EmployeeProjectDeletePopupComponent } from './employee-project-delete-dialog.component';
import { IEmployeeProject } from 'app/shared/model/projects/employee-project.model';

@Injectable({ providedIn: 'root' })
export class EmployeeProjectResolve implements Resolve<IEmployeeProject> {
  constructor(private service: EmployeeProjectService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEmployeeProject> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<EmployeeProject>) => response.ok),
        map((employeeProject: HttpResponse<EmployeeProject>) => employeeProject.body)
      );
    }
    return of(new EmployeeProject());
  }
}

export const employeeProjectRoute: Routes = [
  {
    path: '',
    component: EmployeeProjectComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EmployeeProjects'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EmployeeProjectDetailComponent,
    resolve: {
      employeeProject: EmployeeProjectResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EmployeeProjects'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EmployeeProjectUpdateComponent,
    resolve: {
      employeeProject: EmployeeProjectResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EmployeeProjects'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EmployeeProjectUpdateComponent,
    resolve: {
      employeeProject: EmployeeProjectResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EmployeeProjects'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const employeeProjectPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: EmployeeProjectDeletePopupComponent,
    resolve: {
      employeeProject: EmployeeProjectResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'EmployeeProjects'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
