import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as queryString from 'query-string';
import { TxRequest, TxResponse, TxSearchRequest, TxSearchResponse } from '../_model/tx.model';

@Injectable({
  providedIn: 'root',
})
export class TxService {
  constructor(private http: HttpClient) {}

  add(req: TxRequest): Observable<TxResponse> {
    return this.http.post<TxResponse>(`${environment.apiUrl}/tx`, req);
  }

  search(payload: TxSearchRequest) {
    const query = queryString.stringify({...payload});
    return this.http.get<TxSearchResponse[]>(`${environment.apiUrl}/tx/records?${query}`);
  }
}
