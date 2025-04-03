import { Routes } from '@angular/router';
import { ApplicationsComponent } from './routes/applications/applications.component';
import { ProjectsComponent } from './routes/projects/projects.component';
import { RepositoriesComponent } from './routes/repositories/repositories.component';
import { SubApplicationsComponent } from './routes/sub-applications/sub-applications.component';
import { EnvironmentsComponent } from './routes/environment/environment.component';

export const routes: Routes = [
  { path: 'projects', component: ProjectsComponent },
  { path: 'repos', component: RepositoriesComponent },
  { path: 'apps', component: ApplicationsComponent },
  { path: 'sub-apps', component: SubApplicationsComponent },
  { path: 'environments', component: EnvironmentsComponent }
];
