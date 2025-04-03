import { Injectable, Injector } from '@angular/core';
import { SubApplication } from '../models/sub-application.model';
import { Observable, of } from 'rxjs';
import { BaseService } from '@schneideress/ra-common';
import { environment } from '../../environments/environemnt';


@Injectable({
  providedIn: 'root'
})
export class SubApplicationService extends BaseService {

  constructor(public override injector: Injector) {
    super(injector, environment.apiBaseUrl);
  }

  getSubApplications(): Observable<Array<SubApplication>> {
    return this.get('SubApplication');
  }

  addSubApplication(subapplication: SubApplication): Observable<SubApplication> {
    return this.post('SubApplication', subapplication);
  }

  deleteSubApplication(id: number) {
    return this.delete('SubApplication/'+id);
  }

  updateSubApplication(subapplication: SubApplication): Observable<SubApplication> {
    return this.put('SubApplication/'+subapplication.id, subapplication);
  }
}
