/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { EmployeeProjectUpdateComponent } from 'app/entities/projects/employee-project/employee-project-update.component';
import { EmployeeProjectService } from 'app/entities/projects/employee-project/employee-project.service';
import { EmployeeProject } from 'app/shared/model/projects/employee-project.model';

describe('Component Tests', () => {
  describe('EmployeeProject Management Update Component', () => {
    let comp: EmployeeProjectUpdateComponent;
    let fixture: ComponentFixture<EmployeeProjectUpdateComponent>;
    let service: EmployeeProjectService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [EmployeeProjectUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(EmployeeProjectUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EmployeeProjectUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EmployeeProjectService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new EmployeeProject(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new EmployeeProject();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
