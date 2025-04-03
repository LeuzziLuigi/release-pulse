import { Component, inject, OnInit, signal } from '@angular/core';
import { RepositoryService } from '../../services/repository.service';
import { Repository } from '../../models/repository.model';
import { ModalComponent } from '../../components/modal/modal.component';
import { RepositoryComponent } from './repository/repository.component';
import { FormatDatePipe } from '../../utils/format-date.pipe';
import { SpinnerComponent } from '../../components/spinner/spinner.component';

@Component({
  selector: 'app-repositories',
  imports: [ModalComponent, RepositoryComponent, FormatDatePipe, SpinnerComponent],
  templateUrl: './repositories.component.html',
})
export class RepositoriesComponent implements OnInit {
  repositoryService = inject(RepositoryService);
  repositories: Repository[] = [];
  isLoaded = signal(false);
  isAddingRepository = signal(false);
  currentRepository?: Repository = undefined;

  ngOnInit(): void {
    this.repositoryService.getRepositories().subscribe(list => {
      this.repositories = list;
      this.isLoaded.set(true);
    });
  }

  openRepositoryModal(repository?: Repository) {
    repository ? (this.currentRepository = repository) : (this.currentRepository = undefined);
    this.isAddingRepository.set(true);
  }

  onAddRepository(repository: Repository) {
    this.repositoryService.addRepository(repository).subscribe(createdRepository => {
      this.repositories.push(createdRepository);
    });
    this.closeRepositoryModal();
  }

  onUpdateRepository(repository: Repository) {
    this.repositoryService.updateRepository(repository).subscribe(updatedRepository => {
      const index = this.repositories.findIndex(p => p.id === repository.id);
      this.repositories[index] = updatedRepository;
    });
    this.closeRepositoryModal();
  }

  onDeleteRepository(repository: Repository, index: number) {
    if (repository.id) {
      this.repositoryService.deleteRepository(repository.id).subscribe(() => {
        this.repositories.splice(index);
      });
    }
  }

  closeRepositoryModal() {
    this.isAddingRepository.set(false);
  }
}
