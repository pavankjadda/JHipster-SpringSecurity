import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IProject, Project } from 'app/shared/model/projects/project.model';
import { ProjectService } from './project.service';
import { IDepartment } from 'app/shared/model/projects/department.model';
import { DepartmentService } from 'app/entities/projects/department';

@Component({
  selector: 'jhi-project-update',
  templateUrl: './project-update.component.html'
})
export class ProjectUpdateComponent implements OnInit {
  project: IProject;
  isSaving: boolean;

  departments: IDepartment[];

  editForm = this.fb.group({
    id: [],
    projectName: [null, [Validators.required]],
    projectTitle: [null, [Validators.required]],
    departmentId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected projectService: ProjectService,
    protected departmentService: DepartmentService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ project }) => {
      this.updateForm(project);
      this.project = project;
    });
    this.departmentService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IDepartment[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDepartment[]>) => response.body)
      )
      .subscribe((res: IDepartment[]) => (this.departments = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(project: IProject) {
    this.editForm.patchValue({
      id: project.id,
      projectName: project.projectName,
      projectTitle: project.projectTitle,
      departmentId: project.departmentId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const project = this.createFromForm();
    if (project.id !== undefined) {
      this.subscribeToSaveResponse(this.projectService.update(project));
    } else {
      this.subscribeToSaveResponse(this.projectService.create(project));
    }
  }

  private createFromForm(): IProject {
    const entity = {
      ...new Project(),
      id: this.editForm.get(['id']).value,
      projectName: this.editForm.get(['projectName']).value,
      projectTitle: this.editForm.get(['projectTitle']).value,
      departmentId: this.editForm.get(['departmentId']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProject>>) {
    result.subscribe((res: HttpResponse<IProject>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

  trackDepartmentById(index: number, item: IDepartment) {
    return item.id;
  }
}
