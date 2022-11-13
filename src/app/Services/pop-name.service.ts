import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IpopName } from '../Model/IpopName';

@Injectable({
  providedIn: 'root'
})
export class PopNameService {
  baseUrl = `${environment.apiUrl}PopName`;
  
  constructor(private http: HttpClient) { }

  getPopName(PageNumber :number , PageSize :number , searchValue:string ,sortcolumn:string,sortcolumndir:string){
    let params = new HttpParams();
    if(PageNumber !== null && PageSize !== null ){
      params = params.append('pageNumber' , PageNumber.toString());
      params = params.append('pageSize' , PageSize.toString());
      params = params.append('searchValue' , searchValue.toString());
      params = params.append('sortcolumn' , sortcolumn.toString());
      params = params.append('sortcolumndir' , sortcolumndir.toString());
    }
    return this.http.get<any>(`${this.baseUrl}`  , {observe:'response' , params}).pipe(
      map(response => {
         return response.body ;
      })
    )
  }

  getRequests(): Observable<IpopName[]>{
    return this.http.get<IpopName[]>(`${this.baseUrl}`);
  }

  GePopNameById(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/GePopNameById`, id);
  }
  
  insertPopName(data:IpopName ):Observable<any>
  {
   return this.http.post<any>(`${this.baseUrl}/AddPopName`,data);  
  }
  updatePopName(data:IpopName ):Observable<any>
  {
   return this.http.post<any>(`${this.baseUrl}/UpdatePopName`,data);  
  }

  deletePopName(id:number):Observable<any>
  {
   return this.http.post<any>(`${this.baseUrl}/DeletePopName`,id) ; 
  }

  nameIsalreadysign(name:string,id:number ):Observable<any>
  {
   return this.http.get<any>(`${this.baseUrl}/NameIsAlreadySigned/`+name+`/`+id);  
  }
}
