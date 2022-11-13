import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IremedyAction } from '../Model/IremedyAction';

@Injectable({
  providedIn: 'root'
})
export class RemedyActionService {

  baseUrl = `${environment.apiUrl}RemedyAction`;

  constructor(private http: HttpClient) { }

  getRemedyAction(PageNumber :number , PageSize :number , searchValue:string ,sortcolumn:string,sortcolumndir:string){
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
  getRequests(): Observable<IremedyAction[]>{
    return this.http.get<IremedyAction[]>(`${this.baseUrl}`);
  }
  
  insertRemedyAction(data:IremedyAction ):Observable<any>
  {
   return this.http.post<any>(`${this.baseUrl}/AddRemedyAction`,data);  
  }
  updateRemedyAction(data:IremedyAction ):Observable<any>
  {
   return this.http.post<any>(`${this.baseUrl}/UpdateRemedyAction`,data);  
  }

  deleteRemedyAction(id:number):Observable<any>
  {
   return this.http.post<any>(`${this.baseUrl}/DeleteRemedyAction`,id) ; 
  }
  nameIsalreadysign(name:string,id:number ):Observable<any>
  {
   return this.http.get<any>(`${this.baseUrl}/NameIsAlreadySigned/`+name+`/`+id);  
  }
}
