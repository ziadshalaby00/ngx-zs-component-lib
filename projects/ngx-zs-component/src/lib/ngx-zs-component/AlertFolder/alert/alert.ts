// ==============================================
// Types
// ==============================================

import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  effect,
  inject,
  input,
  signal
} from '@angular/core';
import { AlertService } from '../alert-service/alert-service';
import { zIndices, ZIndicesType } from '../../z-index';

export interface AlertType {
  id: number | string;
  message: string;
  type: 'success' | 'danger' | 'warning' | 'info';
  autoClose?: boolean;
  duration?: number;
  showCloseButton?: boolean;
  progress?: number;
}

export interface AlertFullType extends AlertType {
  icon: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
}

export type OldAlertsType = Set<number | string>;

export const ALERT_CONFIG: Record<
  AlertType['type'],
  Omit<AlertFullType, keyof AlertType>
> = {
  success: {
    icon: 'fas fa-check-circle',
    bgColor: 'zs:bg-green-100 zs:dark:bg-green-800',
    textColor: 'zs:text-green-800 zs:dark:text-green-100',
    borderColor: 'zs:border-green-500 zs:dark:border-green-300'
  },
  danger: {
    icon: 'fas fa-exclamation-circle',
    bgColor: 'zs:bg-red-100 zs:dark:bg-red-800',
    textColor: 'zs:text-red-800 zs:dark:text-red-100',
    borderColor: 'zs:border-red-500 zs:dark:border-red-300'
  },
  warning: {
    icon: 'fas fa-exclamation-triangle',
    bgColor: 'zs:bg-yellow-100 zs:dark:bg-yellow-800',
    textColor: 'zs:text-yellow-800 zs:dark:text-yellow-100',
    borderColor: 'zs:border-yellow-500 zs:dark:border-yellow-300'
  },
  info: {
    icon: 'fas fa-info-circle',
    bgColor: 'zs:bg-blue-100 zs:dark:bg-blue-800',
    textColor: 'zs:text-blue-800 zs:dark:text-blue-100',
    borderColor: 'zs:border-blue-500 zs:dark:border-blue-300'
  }
};

export type PositionClassType = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
const PositionClasses: Record<PositionClassType, string> = {
  'top-left': 'zs:top-4 zs:left-4',
  'top-right': 'zs:top-4 zs:right-4',
  'bottom-left': 'zs:bottom-4 zs:left-4',
  'bottom-right': 'zs:bottom-4 zs:right-4',
}

// ==============================================
// Component Decorator
// ==============================================

@Component({
  selector: 'ZS-alert',
  imports: [CommonModule],
  templateUrl: './alert.html',
  styleUrl: './alert.css'
})
export class Alert {
  
  // ==============================================
  // Dependencies
  // ==============================================
  readonly zIndices: ZIndicesType = zIndices;
  readonly alertService: AlertService = inject(AlertService);

  // ==============================================
  // Inputs
  // ==============================================

  readonly positionClass = input<PositionClassType>('top-right');
  readonly defaultShowCloseButton = input<boolean>(true);
  readonly defaultAutoClose = input<boolean>(true);
  readonly defaultDuration = input<number>(5000);

  // ==============================================
  // Signals & Computed Properties
  // ==============================================

  private readonly oldAlerts = signal<OldAlertsType>(new Set());

  private readonly direction = computed<'top' | 'bottom'>(() => 
    this.positionClass().startsWith('top') ? 'top' : 'bottom'
  );

  readonly positionClasses = computed<string>(() => 
    PositionClasses[this.positionClass()]
  );

  readonly alerts = computed<AlertType[]>(() => {
    const list = this.alertService.alerts();
    return this.direction() === 'bottom' ? [...list].reverse() : list;
  });

  readonly alertConfig: ReturnType<typeof computed<AlertFullType[]>> =
    computed((): AlertFullType[] => {
      return this.alerts().map((alert: AlertType) => {
        const config = ALERT_CONFIG[alert.type] ?? ALERT_CONFIG.info;
        return { ...alert, ...config };
      });
    });

  // ==============================================
  // Private Properties
  // ==============================================

  private activeIntervals = new Map<string | number, number>();

  // ==============================================
  // Lifecycle & Effects
  // ==============================================

  constructor() {
    effect(() => {
      const alerts = this.alerts();
      const oldIds = this.oldAlerts();

      // استخرج التنبيهات الجديدة فقط
      const newOnes = alerts.filter(a => !oldIds.has(a.id));

      // سجّل كل تنبيه جديد
      for (const alert of newOnes) {
        this.registerAlert(alert);
      }
    });
  }

  ngOnDestroy(): void {
    this.activeIntervals.forEach(clearInterval);
    this.activeIntervals.clear();
  }

  // ==============================================
  // Private Methods
  // ==============================================

  private registerAlert(alert: AlertType): void {
    // Mark alert as processed
    const updatedSet = new Set(this.oldAlerts());
    updatedSet.add(alert.id);
    this.oldAlerts.set(updatedSet);

    const autoClose = alert.autoClose ?? this.defaultAutoClose();
    const duration = alert.duration ?? this.defaultDuration();

    if (autoClose) {
      let progress = 100;
      const step = 100 / (duration / 100);

      const interval = window.setInterval(() => {
        progress = Math.max(0, progress - step);

        this.alertService.alerts.update((all: AlertType[]) =>
          all.map((a: AlertType) =>
            a.id === alert.id ? { ...a, progress } as AlertType : a
          )
        );

        if (progress <= 0) {
          this.closeAlert(alert.id);
        }
      }, 100);

      this.activeIntervals.set(alert.id, interval);
    }
  }

  // ==============================================
  // Public Methods
  // ==============================================

  closeAlert(id: string | number): void {
    // Clear active interval if exists
    const interval = this.activeIntervals.get(id);
    if (interval) {
      clearInterval(interval);
      this.activeIntervals.delete(id);
    }

    // Remove from processed alerts
    const updatedSet = new Set(this.oldAlerts());
    updatedSet.delete(id);
    this.oldAlerts.set(updatedSet);

    // Remove from service
    this.alertService.onAlertClosed(id);
  }
}