import { Component, computed, input, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';

export interface PagesType {
  label: string;
  routerLink: string;
}

@Component({
  selector: 'ZS-footer',
  imports: [RouterModule],
  templateUrl: './footer.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './footer.css',
})
export class Footer {
  readonly showDefultContent = input<boolean>(true)
  readonly pages = input<PagesType[]>([]);
}
