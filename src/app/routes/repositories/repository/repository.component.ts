import { Component, input, OnInit, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Repository } from '../../../models/repository.model';

@Component({
  selector: 'app-repository',
  imports: [ReactiveFormsModule],
  templateUrl: './repository.component.html',
})
export class RepositoryComponent implements OnInit {
  cancel = output<void>();
  addRepository = output<any>();
  updateRepository = output<any>();
  repository = input<Repository>();

  form!: FormGroup;
  isEdit!: boolean;

  ngOnInit(): void {
    this.isEdit = !!this.repository()?.id;
    this.form = new FormGroup({
      name: new FormControl(this.repository()?.name ?? '', Validators.required),
      path: new FormControl(this.repository()?.path ?? '', Validators.required),
      sourceCd: new FormControl(this.repository()?.sourceCd ?? '', Validators.required),
      isActive: new FormControl(this.repository()?.isActive ?? true, Validators.required),
    });
  }

  onCancel() {
    this.cancel.emit();
  }

  onSubmit() {
    let repository = this.form.value;
    if (this.isEdit) {
      this.updateRepository.emit({ id: this.repository()?.id, ...repository });
    } else {
      this.addRepository.emit(repository);
    }
  }
}
