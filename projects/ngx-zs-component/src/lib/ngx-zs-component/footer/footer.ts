import { Component, computed, input } from '@angular/core';
import { RouterModule } from '@angular/router';

export interface PagesType {
  label: string;
  routerLink: string;
}

@Component({
  selector: 'ZS-footer',
  imports: [RouterModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  readonly showDefultContent = input<boolean>(true)
  readonly pages = input<PagesType[]>([]);
}
