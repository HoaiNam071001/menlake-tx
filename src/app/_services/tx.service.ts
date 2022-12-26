import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as queryString from 'query-string';
import { TxRequest, TxResponse, TxSearchRecordsRequest, TxSearchRequest } from '../_model/tx.model';

@Injectable({
  providedIn: 'root',
})
export class TxService {
  constructor(private http: HttpClient) { }

  add(req: TxRequest): Observable<TxResponse> {
    return this.http.post<TxResponse>(`${environment.apiUrl}/tx`, req);
  }

  addBridge(req: TxRequest): Observable<TxResponse> {
    return this.http.post<TxResponse>(`${environment.apiUrl}/bridge`, req);
  }

  records(payload: TxSearchRecordsRequest) {
    const query = queryString.stringify({ ...payload });
    return this.http.get<TxResponse[]>(`${environment.apiUrl}/tx/records?${query}`);
  }

  search(payload: TxSearchRequest) {
    const query = queryString.stringify({ ...payload });
    return this.http.get<TxResponse[]>(`${environment.apiUrl}/tx/search?${query}`);
  }

  searchBridge(payload: TxSearchRequest) {
    const query = queryString.stringify({ ...payload });
    return this.http.get<TxResponse[]>(`${environment.apiUrl}/bridge?${query}`);
  }
}
