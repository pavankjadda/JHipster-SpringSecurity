/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { EmployeeProjectDetailComponent } from 'app/entities/projects/employee-project/employee-project-detail.component';
import { EmployeeProject } from 'app/shared/model/projects/employee-project.model';

describe('Component Tests', () => {
  describe('EmployeeProject Management Detail Component', () => {
    let comp: EmployeeProjectDetailComponent;
    let fixture: ComponentFixture<EmployeeProjectDetailComponent>;
    const route = ({ data: of({ employeeProject: new EmployeeProject(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [EmployeeProjectDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(EmployeeProjectDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EmployeeProjectDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.employeeProject).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
