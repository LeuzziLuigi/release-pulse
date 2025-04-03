import { Injectable, Injector } from '@angular/core';
import { Application } from '../models/application.model';
import { Observable, of } from 'rxjs';
import { BaseService } from '@schneideress/ra-common';
import { environment } from '../../environments/environemnt';


@Injectable({
  providedIn: 'root'
})
export class ApplicationService extends BaseService {

  constructor(public override injector: Injector) {
    super(injector, environment.apiBaseUrl);
  }

  getApplications(): Observable<Array<Application>> {
    return this.get('Application');
  }

  addApplication(application: Application): Observable<Application> {
    return this.post('Application', application);
  }

  deleteApplication(id: number) {
    return this.delete('Application/'+id);
  }

  updateApplication(application: Application): Observable<Application> {
    return this.put('Application/'+application.id, application);
  }
}
