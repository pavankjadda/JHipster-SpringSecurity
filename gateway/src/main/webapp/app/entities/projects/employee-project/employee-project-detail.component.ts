import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEmployeeProject } from 'app/shared/model/projects/employee-project.model';

@Component({
  selector: 'jhi-employee-project-detail',
  templateUrl: './employee-project-detail.component.html'
})
export class EmployeeProjectDetailComponent implements OnInit {
  employeeProject: IEmployeeProject;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ employeeProject }) => {
      this.employeeProject = employeeProject;
    });
  }

  previousState() {
    window.history.back();
  }
}
