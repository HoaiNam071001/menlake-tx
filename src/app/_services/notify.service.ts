import { Injectable } from '@angular/core';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TxRequest, TxResponse } from '../_model/tx.model';

@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  constructor(private _notifications: NotificationsService,) {}
  success(content: string, title: string) {
    this._notifications.create(title, content, NotificationType.Success);
  }

  error(content: string, title: string) {
    this._notifications.create(title, content, NotificationType.Error);
  }
}
