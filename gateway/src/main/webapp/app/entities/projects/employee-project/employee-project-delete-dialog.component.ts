import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEmployeeProject } from 'app/shared/model/projects/employee-project.model';
import { EmployeeProjectService } from './employee-project.service';

@Component({
  selector: 'jhi-employee-project-delete-dialog',
  templateUrl: './employee-project-delete-dialog.component.html'
})
export class EmployeeProjectDeleteDialogComponent {
  employeeProject: IEmployeeProject;

  constructor(
    protected employeeProjectService: EmployeeProjectService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.employeeProjectService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'employeeProjectListModification',
        content: 'Deleted an employeeProject'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-employee-project-delete-popup',
  template: ''
})
export class EmployeeProjectDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ employeeProject }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(EmployeeProjectDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.employeeProject = employeeProject;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/employee-project', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/employee-project', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
