import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEmployeeProject } from 'app/shared/model/projects/employee-project.model';

type EntityResponseType = HttpResponse<IEmployeeProject>;
type EntityArrayResponseType = HttpResponse<IEmployeeProject[]>;

@Injectable({ providedIn: 'root' })
export class EmployeeProjectService {
  public resourceUrl = SERVER_API_URL + 'services/projects/api/employee-projects';

  constructor(protected http: HttpClient) {}

  create(employeeProject: IEmployeeProject): Observable<EntityResponseType> {
    return this.http.post<IEmployeeProject>(this.resourceUrl, employeeProject, { observe: 'response' });
  }

  update(employeeProject: IEmployeeProject): Observable<EntityResponseType> {
    return this.http.put<IEmployeeProject>(this.resourceUrl, employeeProject, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IEmployeeProject>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IEmployeeProject[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
