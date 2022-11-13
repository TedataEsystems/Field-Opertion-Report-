import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ItechName } from '../Model/ItechName';

@Injectable({
  providedIn: 'root'
})
export class TechNameService {
  baseUrl = `${environment.apiUrl}TechName`;
  constructor(private http: HttpClient) { }


  getTechName(PageNumber :number , PageSize :number , searchValue:string ,sortcolumn:string,sortcolumndir:string){
    let params = new HttpParams();
    if(PageNumber !== null && PageSize !== null){
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
  getRequests(): Observable<ItechName[]>{
    return this.http.get<ItechName[]>(`${this.baseUrl}`);
  }
  
  insertTechName(data:ItechName ):Observable<any>
  {
   return this.http.post<any>(`${this.baseUrl}/AddTechName`,data);  
  }
  updateTechName(data:ItechName ):Observable<any>
  {
   return this.http.post<any>(`${this.baseUrl}/UpdateTechName`,data);  
  }

  deleteTechName(id:number):Observable<any>
  {
   return this.http.post<any>(`${this.baseUrl}/DeleteTechName`,id) ; 
  }

  nameIsalreadysign(name:string,id:number ):Observable<any>
  {
   return this.http.get<any>(`${this.baseUrl}/NameIsAlreadySigned/`+name+`/`+id);  
  }
}
