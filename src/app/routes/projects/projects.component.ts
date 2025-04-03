import { Component, inject, OnInit, signal } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { ModalComponent } from '../../components/modal/modal.component';
import { ProjectComponent } from './project/project.component';
import { FormatDatePipe } from '../../utils/format-date.pipe';
import { SpinnerComponent } from '../../components/spinner/spinner.component';

@Component({
  selector: 'app-repositories',
  imports: [ModalComponent, ProjectComponent, FormatDatePipe, SpinnerComponent],
  templateUrl: './projects.component.html',
})
export class ProjectsComponent implements OnInit {
  projectService = inject(ProjectService);
  projects: Project[] = [];
  isAddingProject = signal(false);
  isLoaded = signal(false);
  currentProject?: Project = undefined;

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(list => {
      this.projects = list;
      this.isLoaded.set(true);
    });
  }

  openProjectModal(project?: Project) {
    project ? (this.currentProject = project) : (this.currentProject = undefined);
    this.isAddingProject.set(true);
  }

  onAddProject(project: Project) {
    this.projectService.addProject(project).subscribe(createdProject => {
      this.projects.push(createdProject);
    });
    this.closeProjectModal();
  }

  onUpdateProject(project: Project) {
    this.projectService.updateProject(project).subscribe(updatedProject => {
      const index = this.projects.findIndex(p => p.id === project.id);
      this.projects[index] = updatedProject;
    });
    this.closeProjectModal();
  }

  onDeleteProject(project: Project, index: number) {
    if (project.id) {
      this.projectService.deleteProject(project.id).subscribe(() => {
        this.projects.splice(index);
      });
    }
  }

  closeProjectModal() {
    this.isAddingProject.set(false);
  }
}
