import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'release-pulse';

  menuOpen = false;
  userSettingsOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleUserSettings(){
    this.userSettingsOpen = !this.userSettingsOpen;
  }
}
