import { Component, input, OnInit, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Project } from '../../../models/project.model';

@Component({
  selector: 'app-repository',
  imports: [ReactiveFormsModule],
  templateUrl: './project.component.html',
})
export class ProjectComponent implements OnInit {
  cancel = output<void>();
  addProject = output<any>();
  updateProject = output<any>();
  project = input<Project>();

  form!: FormGroup;
  isEdit!: boolean;

  ngOnInit(): void {
    this.isEdit = !!this.project()?.id;
    this.form = new FormGroup({
      name: new FormControl(this.project()?.name ?? '', Validators.required),
      devopsProjectName: new FormControl(this.project()?.devopsProjectName ?? '', Validators.required),
    });
  }

  onCancel() {
    this.cancel.emit();
  }

  onSubmit() {
    let project = this.form.value;
    if (this.isEdit) {
      this.updateProject.emit({ id: this.project()?.id, ...this.form.value });
    } else {
      this.addProject.emit(project);
    }
  }
}
