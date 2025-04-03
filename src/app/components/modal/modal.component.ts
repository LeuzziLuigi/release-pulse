import { Component, output } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
})
export class ModalComponent {
  close = output<void>()

  closeModal(): void {
	  this.close.emit();
  }
}
