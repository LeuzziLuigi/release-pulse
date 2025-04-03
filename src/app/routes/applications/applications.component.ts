import { Component, inject, OnInit, signal } from '@angular/core';
import { Application } from '../../models/application.model';
import { ModalComponent } from '../../components/modal/modal.component';
import { ApplicationComponent } from './application/application.component';
import { FormatDatePipe } from '../../utils/format-date.pipe';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { ApplicationService } from '../../services/application.service';

@Component({
  selector: 'app-repositories',
  imports: [ModalComponent, ApplicationComponent, FormatDatePipe, SpinnerComponent],
  templateUrl: './applications.component.html',
})
export class ApplicationsComponent implements OnInit {
  applicationService = inject(ApplicationService);
  applications: Application[] = [];
  isAddingApplication = signal(false);
  isLoaded = signal(false);
  currentApplication?: Application = undefined;

  ngOnInit(): void {
    this.applicationService.getApplications().subscribe(list => {
      this.applications = list;
      this.isLoaded.set(true);
    });
  }

  openApplicationModal(application?: Application) {
    application ? (this.currentApplication = application) : (this.currentApplication = undefined);
    this.isAddingApplication.set(true);
  }

  onAddApplication(application: Application) {
    this.applicationService.addApplication(application).subscribe(createdApp => {
      this.applications.push(createdApp);
    });
    this.closeApplicationModal();
  }

  onUpdateApplication(application: Application) {
    this.applicationService.updateApplication(application).subscribe(updatedApplication => {
      const index = this.applications.findIndex(p => p.id === application.id);
      this.applications[index] = updatedApplication;
    });
    this.closeApplicationModal();
  }

  onDeleteApplication(application: Application, index: number) {
    if (application.id) {
      this.applicationService.deleteApplication(application.id).subscribe(() => {
        this.applications.splice(index);
      });
    }
  }

  closeApplicationModal() {
    this.isAddingApplication.set(false);
  }
}
