/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { EmployeeProjectDeleteDialogComponent } from 'app/entities/projects/employee-project/employee-project-delete-dialog.component';
import { EmployeeProjectService } from 'app/entities/projects/employee-project/employee-project.service';

describe('Component Tests', () => {
  describe('EmployeeProject Management Delete Component', () => {
    let comp: EmployeeProjectDeleteDialogComponent;
    let fixture: ComponentFixture<EmployeeProjectDeleteDialogComponent>;
    let service: EmployeeProjectService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [EmployeeProjectDeleteDialogComponent]
      })
        .overrideTemplate(EmployeeProjectDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EmployeeProjectDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EmployeeProjectService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
