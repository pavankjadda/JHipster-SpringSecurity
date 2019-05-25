import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IEmployeeProject } from 'app/shared/model/projects/employee-project.model';
import { AccountService } from 'app/core';
import { EmployeeProjectService } from './employee-project.service';

@Component({
  selector: 'jhi-employee-project',
  templateUrl: './employee-project.component.html'
})
export class EmployeeProjectComponent implements OnInit, OnDestroy {
  employeeProjects: IEmployeeProject[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected employeeProjectService: EmployeeProjectService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.employeeProjectService
      .query()
      .pipe(
        filter((res: HttpResponse<IEmployeeProject[]>) => res.ok),
        map((res: HttpResponse<IEmployeeProject[]>) => res.body)
      )
      .subscribe(
        (res: IEmployeeProject[]) => {
          this.employeeProjects = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInEmployeeProjects();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IEmployeeProject) {
    return item.id;
  }

  registerChangeInEmployeeProjects() {
    this.eventSubscriber = this.eventManager.subscribe('employeeProjectListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
