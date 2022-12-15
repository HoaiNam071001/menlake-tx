import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TxRequest, TxResponse } from '../_model/tx.model';

@Injectable({
  providedIn: 'root',
})
export class TxService {
  constructor(private http: HttpClient) {}

  add(req: TxRequest): Observable<TxResponse> {
    return this.http.post<TxResponse>(`${environment.apiUrl}/tx`, req);
  }
}
