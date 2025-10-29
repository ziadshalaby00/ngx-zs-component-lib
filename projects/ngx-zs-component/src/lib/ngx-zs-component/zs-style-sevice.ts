import { Injectable, signal } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ZSStyleLoader {
  private readonly loaded = signal(false);

  load() {
    if (this.loaded()) return;

    // Double check for safety
    if (document.head.querySelector('link[data-zs-style="global"]')) return;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.setAttribute('data-zs-style', 'global');
    link.href = 'styles/global.css';
    document.head.appendChild(link);

    this.loaded.set(true);
  }
}