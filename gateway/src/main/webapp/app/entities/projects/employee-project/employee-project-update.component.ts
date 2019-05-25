import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IEmployeeProject, EmployeeProject } from 'app/shared/model/projects/employee-project.model';
import { EmployeeProjectService } from './employee-project.service';
import { IEmployee } from 'app/shared/model/projects/employee.model';
import { EmployeeService } from 'app/entities/projects/employee';
import { IProject } from 'app/shared/model/projects/project.model';
import { ProjectService } from 'app/entities/projects/project';

@Component({
  selector: 'jhi-employee-project-update',
  templateUrl: './employee-project-update.component.html'
})
export class EmployeeProjectUpdateComponent implements OnInit {
  employeeProject: IEmployeeProject;
  isSaving: boolean;

  employees: IEmployee[];

  projects: IProject[];

  editForm = this.fb.group({
    id: [],
    employeeId: [],
    projectId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected employeeProjectService: EmployeeProjectService,
    protected employeeService: EmployeeService,
    protected projectService: ProjectService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ employeeProject }) => {
      this.updateForm(employeeProject);
      this.employeeProject = employeeProject;
    });
    this.employeeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IEmployee[]>) => mayBeOk.ok),
        map((response: HttpResponse<IEmployee[]>) => response.body)
      )
      .subscribe((res: IEmployee[]) => (this.employees = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.projectService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IProject[]>) => mayBeOk.ok),
        map((response: HttpResponse<IProject[]>) => response.body)
      )
      .subscribe((res: IProject[]) => (this.projects = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(employeeProject: IEmployeeProject) {
    this.editForm.patchValue({
      id: employeeProject.id,
      employeeId: employeeProject.employeeId,
      projectId: employeeProject.projectId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const employeeProject = this.createFromForm();
    if (employeeProject.id !== undefined) {
      this.subscribeToSaveResponse(this.employeeProjectService.update(employeeProject));
    } else {
      this.subscribeToSaveResponse(this.employeeProjectService.create(employeeProject));
    }
  }

  private createFromForm(): IEmployeeProject {
    const entity = {
      ...new EmployeeProject(),
      id: this.editForm.get(['id']).value,
      employeeId: this.editForm.get(['employeeId']).value,
      projectId: this.editForm.get(['projectId']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmployeeProject>>) {
    result.subscribe((res: HttpResponse<IEmployeeProject>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackEmployeeById(index: number, item: IEmployee) {
    return item.id;
  }

  trackProjectById(index: number, item: IProject) {
    return item.id;
  }
}
