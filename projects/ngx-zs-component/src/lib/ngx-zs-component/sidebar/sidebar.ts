import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, input, model, viewChild, ChangeDetectionStrategy } from '@angular/core';
import { zIndices, ZIndicesType } from '../z-index';

@Component({
  selector: 'ZS-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./sidebar.css'],
})
export class Sidebar {
  readonly zIndices: ZIndicesType = zIndices;
  readonly header = input<string>('Side Bar');
  readonly openSide = model<boolean>(false);

  readonly preventClose = input<boolean>(false)
  readonly floating = input<boolean>(false);
  readonly closeOnOverlay = input<boolean>(true);

  toggleSide() {
    if(this.preventClose() && this.openSide()) return;
    this.openSide.update(v => !v);
  }

  onOverlayClick(event: MouseEvent) {
    if(this.preventClose()) return;
    if (this.closeOnOverlay()) {
      this.openSide.set(false);
    }
  }

  @HostListener('document:keydown.escape')
  onEsc() {
    if(this.preventClose()) return;
    if (this.openSide()) {
      this.openSide.set(false);
    }
  }
}
