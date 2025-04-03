import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet, RouterLink, ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { mockExternalDependencies } from './utils/ra';
import { map, distinctUntilChanged, filter } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  router = inject(Router);
  activeRoute = signal('');
  title = 'release-pulse';

  menuOpen = false;
  userSettingsOpen = false;

  navItems = [
    {
      name: 'Projects',
      icon: 'fa-folder',
      route: '/projects'
    },
    {
      name: 'Repos',
      icon: 'fa-sitemap',
      route: '/repos'
    },
    {
      name: 'Deployments',
      icon: 'fa-rocket',
      route: '/deployments'
    },
    {
      name: 'Environments',
      icon: 'fa-regular fa-seedling',
      route: '/environments'
    },
    {
      name: 'Apps',
      icon: 'fa-user-crown',
      route: '/apps'
    },
    {
      name: 'Sub-apps',
      icon: 'fa-user-group-crown',
      route: '/sub-apps'
    },
  ];

  activeIndex = 0

  ngOnInit(): void {
    mockExternalDependencies();
    this.router.events.subscribe((event: any) => {
      if(event instanceof NavigationEnd){
        this.activeRoute.set(event.url);
      }
      });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleUserSettings(){
    this.userSettingsOpen = !this.userSettingsOpen;
  }
}
