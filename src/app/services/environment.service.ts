import { Injectable, Injector } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BaseService } from '@schneideress/ra-common';
import { environment } from '../../environments/environemnt';
import { Environment } from '../models/environment';


@Injectable({
  providedIn: 'root'
})
export class EnvironmentService extends BaseService {

  constructor(public override injector: Injector) {
    super(injector, environment.apiBaseUrl);
  }

  getEnvironments(): Observable<Array<Environment>> {
    return this.get('Environment');
  }

  addEnvironment(environment: Environment): Observable<Environment> {
    return this.post('Environment', environment);
  }

  deleteEnvironment(id: number) {
    return this.delete('Environment/'+id);
  }

  updateEnvironment(environment: Environment): Observable<Environment> {
    return this.put('Environment/'+environment.id, environment);
  }
}
