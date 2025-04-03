import { Component, inject, OnInit, signal } from '@angular/core';
import { ModalComponent } from '../../components/modal/modal.component';
import { FormatDatePipe } from '../../utils/format-date.pipe';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { EnvironmentComponent } from './environment/environment.component';
import { EnvironmentService } from '../../services/environment.service';
import { Environment } from '../../models/environment';

@Component({
  selector: 'app-environments',
  imports: [ModalComponent, FormatDatePipe, SpinnerComponent, EnvironmentComponent],
  templateUrl: './environment.component.html',
})
export class EnvironmentsComponent implements OnInit {
  environmentService = inject(EnvironmentService);
  environments: Environment[] = [];
  isAddingApplication = signal(false);
  isLoaded = signal(false);
  currentEnvironment?: Environment = undefined;

  ngOnInit(): void {
    this.environmentService.getEnvironments().subscribe(list => {
      this.environments = list;
      this.isLoaded.set(true);
    });
  }

  openApplicationModal(environment?: Environment) {
    environment ? (this.currentEnvironment = environment) : (this.currentEnvironment = undefined);
    this.isAddingApplication.set(true);
  }

  onAddEnvironment(environment: Environment) {
    this.environmentService.addEnvironment(environment).subscribe(createdApp => {
      this.environments.push(createdApp);
    });
    this.closeEnvironmentModal();
  }

  onUpdateEnvironment(environment: Environment) {
    this.environmentService.updateEnvironment(environment).subscribe(updatedApplication => {
      const index = this.environments.findIndex(p => p.id === environment.id);
      this.environments[index] = updatedApplication;
    });
    this.closeEnvironmentModal();
  }

  onDeleteEnvironment(environment: Environment, index: number) {
    if (environment.id) {
      this.environmentService.deleteEnvironment(environment.id).subscribe(() => {
        this.environments.splice(index);
      });
    }
  }

  closeEnvironmentModal() {
    this.isAddingApplication.set(false);
  }
}
