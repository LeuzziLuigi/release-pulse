import { Component, inject, input, output } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubApplication } from '../../../models/sub-application.model';
import { ApplicationService } from '../../../services/application.service';
import { Application } from '../../../models/application.model';

@Component({
  selector: 'app-sub-application',
  imports: [ReactiveFormsModule],
  templateUrl: './sub-application.component.html',
})
export class SubApplicationComponent {
  applicationService = inject(ApplicationService);

  cancel = output<void>();
  addSubApplication = output<any>();
  updateSubApplication = output<any>();
  subApplication = input<SubApplication>();
  applications: Application[] = [];

  form!: FormGroup;
  isEdit!: boolean;

  ngOnInit(): void {
    this.isEdit = !!this.subApplication()?.id;
    this.form = new FormGroup({
      name: new FormControl(this.subApplication()?.name ?? '', Validators.required),
      pipelineUrl: new FormControl(this.subApplication()?.pipelineUrl ?? '', Validators.required),
      serverFolderPath: new FormControl(this.subApplication()?.serverFolderPath ?? '', Validators.required),
      healthCheckUrl: new FormControl(this.subApplication()?.healthCheckUrl ?? '', Validators.required),
      applicationId: new FormControl(this.subApplication()?.applicationId ?? '', Validators.required),
    });
    this.applicationService.getApplications().subscribe(apps => (this.applications = apps));
  }

  onCancel() {
    this.cancel.emit();
  }

  onSubmit() {
    let subApp = this.form.value;
    if (this.isEdit) {
      this.updateSubApplication.emit({ id: this.subApplication()?.id, ...subApp });
    } else {
      this.addSubApplication.emit(subApp);
    }
  }
}
