import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Ioperator } from '../Model/Ioperator';
import { PaginationService } from './pagination.service';

@Injectable({
  providedIn: 'root'
})
export class OperatorService {
  private headers = new HttpHeaders();
  baseUrl = `${environment.apiUrl}Operator`;
  constructor(private http: HttpClient , private paginationService: PaginationService
    ) {
      this.headers = this.headers.set('content-type', 'application/json');
      this.headers = this.headers.set('Accept', 'application/json');
    }
    getOperator(PageNumber :number , PageSize :number , searchValue:string ,sortcolumn:string,sortcolumndir:string){
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

  // getRequests(): Observable<Ioperator[]>{
  //   return this.http.get<Ioperator[]>(`${this.url}`);
  // }
  
  insertOperator(data:Ioperator ):Observable<any>
  {
   return this.http.post<any>(`${this.baseUrl}/AddOperator`,data);  
  }
  updateOperator(data:Ioperator ):Observable<any>
  {
   return this.http.post<any>(`${this.baseUrl}/UpdateOperator`,data);  
  }

  deleteOperator(id:number):Observable<any>
  {
   return this.http.post<any>(`${this.baseUrl}/DeleteOperator`,id) ; 
  }
  nameIsalreadysign(name:string,id:number ):Observable<any>
  {
   return this.http.get<any>(`${this.baseUrl}/NameIsAlreadySigned/`+name+`/`+id);  
  }
}
