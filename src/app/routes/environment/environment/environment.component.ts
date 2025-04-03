import { Component, inject, input, output } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApplicationService } from '../../../services/application.service';
import { Application } from '../../../models/application.model';
import { Environment } from '../../../models/environment';

@Component({
  selector: 'app-environment',
  imports: [ReactiveFormsModule],
  templateUrl: './environment.component.html',
})
export class EnvironmentComponent {
  applicationService = inject(ApplicationService);

  cancel = output<void>();
  addEnvironment = output<any>();
  updateEnvironment = output<any>();
  environment = input<Environment>();
  applications: Application[] = [];

  form!: FormGroup;
  isEdit!: boolean;

  ngOnInit(): void {
    this.isEdit = !!this.environment()?.id;
    this.form = new FormGroup({
      name: new FormControl(this.environment()?.name ?? '', Validators.required),
      description: new FormControl(this.environment()?.description ?? '', Validators.required),
      branchName: new FormControl(this.environment()?.branchName ?? '', Validators.required),
      isActive: new FormControl(this.environment()?.isActive ?? true, Validators.required),
    });
    this.applicationService.getApplications().subscribe(apps => (this.applications = apps));
  }

  onCancel() {
    this.cancel.emit();
  }

  onSubmit() {
    let subApp = this.form.value;
    if (this.isEdit) {
      this.updateEnvironment.emit({ id: this.environment()?.id, ...subApp });
    } else {
      this.addEnvironment.emit(subApp);
    }
  }
}
