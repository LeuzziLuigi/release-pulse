import { Injectable, Injector } from '@angular/core';
import { Project } from '../models/project.model';
import { Observable, of } from 'rxjs';
import { BaseService } from '@schneideress/ra-common';
import { environment } from '../../environments/environemnt';


@Injectable({
  providedIn: 'root'
})
export class ProjectService extends BaseService {

  constructor(public override injector: Injector) {
    super(injector, environment.apiBaseUrl);
  }

  getProjects(): Observable<Array<Project>> {
    return this.get('Project');
  }

  addProject(project: Project): Observable<Project> {
    return this.post('Project', project);
  }

  deleteProject(id: number) {
    return this.delete('Project/'+id);
  }

  updateProject(project: Project): Observable<Project> {
    return this.put('Project/'+project.id, project);
  }
}
