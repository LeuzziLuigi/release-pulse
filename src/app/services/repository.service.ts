import { Injectable, Injector } from '@angular/core';
import { Repository } from '../models/repository.model';
import { Observable, of } from 'rxjs';
import { BaseService } from '@schneideress/ra-common';
import { environment } from '../../environments/environemnt';


@Injectable({
  providedIn: 'root'
})
export class RepositoryService extends BaseService {

  constructor(public override injector: Injector) {
    super(injector, environment.apiBaseUrl);
  }

  getRepositories(): Observable<Array<Repository>> {
    return this.get('Repository');
  }

  addRepository(repository: Repository): Observable<Repository> {
    return this.post('Repository', repository);
  }

  deleteRepository(id: number) {
    return this.delete('Repository/'+id);
  }

  updateRepository(repository: Repository): Observable<Repository> {
    return this.put('Repository/'+repository.id, repository);
  }
}
