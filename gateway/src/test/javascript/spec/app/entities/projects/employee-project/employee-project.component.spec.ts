/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { EmployeeProjectComponent } from 'app/entities/projects/employee-project/employee-project.component';
import { EmployeeProjectService } from 'app/entities/projects/employee-project/employee-project.service';
import { EmployeeProject } from 'app/shared/model/projects/employee-project.model';

describe('Component Tests', () => {
  describe('EmployeeProject Management Component', () => {
    let comp: EmployeeProjectComponent;
    let fixture: ComponentFixture<EmployeeProjectComponent>;
    let service: EmployeeProjectService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [EmployeeProjectComponent],
        providers: []
      })
        .overrideTemplate(EmployeeProjectComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EmployeeProjectComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EmployeeProjectService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new EmployeeProject(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.employeeProjects[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
