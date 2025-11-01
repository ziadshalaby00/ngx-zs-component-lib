import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class VisibilityObserverService {
  private observer: IntersectionObserver;
  private callbacks = new WeakMap<Element, () => void>();

  constructor() {
    this.observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const callback = this.callbacks.get(entry.target);
          if (callback) {
            callback();
            this.callbacks.delete(entry.target);
            this.observer.unobserve(entry.target);
          }
        }
      }
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px 0px 0px'
    });
  }

  observe(el: Element, callback: () => void): void {
    this.callbacks.set(el, callback);
    this.observer.observe(el);
  }

  unobserve(el: Element): void {
    this.callbacks.delete(el);
    this.observer.unobserve(el);
  }
}