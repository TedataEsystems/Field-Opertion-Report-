import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Iloginview } from '../Model/Iloginview';
import { Iuser } from '../Model/Iuser';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = `${environment.apiUrl}account`;

  constructor(private http: HttpClient) { }

  login(data: Iloginview): Observable<Iuser> {
    return this.http.post<Iuser>(`${this.baseUrl}/login`, data);
  }


  logout(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Logout`);
  }
}
