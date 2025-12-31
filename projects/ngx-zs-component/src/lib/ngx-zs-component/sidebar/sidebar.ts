import { CommonModule } from '@angular/common';
import { Component, effect, inject, input, model } from '@angular/core';
import { zIndices, ZIndicesType } from '../z-index';

@Component({
  selector: 'ZS-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'],
})
export class Sidebar {
  readonly zIndices: ZIndicesType = zIndices;
  readonly header = input<string>('Side Bar');
  readonly openSide = model<boolean>(false);
  readonly floating = input<boolean>(false);

  toggleSide() {
    this.openSide.update((v) => !v);
  }
}
