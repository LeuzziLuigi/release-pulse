import { Component, inject, input, output } from '@angular/core';
import { Application } from '../../../models/application.model';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Repository } from '../../../models/repository.model';
import { RepositoryService } from '../../../services/repository.service';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/project.model';

@Component({
  selector: 'app-application',
  imports: [ReactiveFormsModule],
  templateUrl: './application.component.html',
})
export class ApplicationComponent {
  projectService = inject(ProjectService);
  repositoryService = inject(RepositoryService);

  cancel = output<void>();
  addApplication = output<any>();
  updateApplication = output<any>();
  application = input<Application>();
  projects: Project[] = [];
  repositories: Repository[] = [];

  form!: FormGroup;
  isEdit!: boolean;

  ngOnInit(): void {
    this.isEdit = !!this.application()?.id;
    this.form = new FormGroup({
      name: new FormControl(this.application()?.name ?? '', Validators.required),
      projectId: new FormControl(this.application()?.projectId ?? '', Validators.required),
      repositoryId: new FormControl(this.application()?.repositoryId ?? '', Validators.required),
    });
    this.projectService.getProjects().subscribe(projects => (this.projects = projects));
    this.repositoryService.getRepositories().subscribe(repos => (this.repositories = repos));
  }

  onCancel() {
    this.cancel.emit();
  }

  onSubmit() {
    let application = this.form.value;
    if (this.isEdit) {
      this.updateApplication.emit({ id: this.application()?.id, ...application });
    } else {
      this.addApplication.emit(application);
    }
  }
}
