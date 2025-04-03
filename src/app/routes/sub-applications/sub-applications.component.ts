import { Component, inject, OnInit, signal } from '@angular/core';
import { ModalComponent } from '../../components/modal/modal.component';
import { FormatDatePipe } from '../../utils/format-date.pipe';
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { SubApplicationService } from '../../services/sub-application.service';
import { SubApplication } from '../../models/sub-application.model';
import { SubApplicationComponent } from './sub-application/sub-application.component';

@Component({
  selector: 'app-repositories',
  imports: [ModalComponent, FormatDatePipe, SpinnerComponent, SubApplicationComponent],
  templateUrl: './sub-applications.component.html',
})
export class SubApplicationsComponent implements OnInit {
  subApplicationService = inject(SubApplicationService);
  subApplications: SubApplication[] = [];
  isAddingApplication = signal(false);
  isLoaded = signal(false);
  currentSubApplication?: SubApplication = undefined;

  ngOnInit(): void {
    this.subApplicationService.getSubApplications().subscribe(list => {
      this.subApplications = list;
      this.isLoaded.set(true);
    });
  }

  openApplicationModal(subApplication?: SubApplication) {
    subApplication ? (this.currentSubApplication = subApplication) : (this.currentSubApplication = undefined);
    this.isAddingApplication.set(true);
  }

  onAddSubApplication(subApplication: SubApplication) {
    this.subApplicationService.addSubApplication(subApplication).subscribe(createdApp => {
      this.subApplications.push(createdApp);
    });
    this.closeSubApplicationModal();
  }

  onUpdateSubApplication(subApplication: SubApplication) {
    this.subApplicationService.updateSubApplication(subApplication).subscribe(updatedApplication => {
      const index = this.subApplications.findIndex(p => p.id === subApplication.id);
      this.subApplications[index] = updatedApplication;
    });
    this.closeSubApplicationModal();
  }

  onDeleteSubApplication(subApplication: SubApplication, index: number) {
    if (subApplication.id) {
      this.subApplicationService.deleteSubApplication(subApplication.id).subscribe(() => {
        this.subApplications.splice(index);
      });
    }
  }

  closeSubApplicationModal() {
    this.isAddingApplication.set(false);
  }
}
