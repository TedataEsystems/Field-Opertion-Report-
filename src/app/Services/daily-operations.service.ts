import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IdailyOperations } from '../Model/IdailyOperations';
import { IdailyOperationsSearch } from '../Model/IdailyOperationsSearch';
import { PaginatedResult, Pagination } from '../Model/pagination';

@Injectable({
  providedIn: 'root'
})
export class DailyOperationsService {
   baseUrl = `${environment.apiUrl}DailyOperation`;
  paginatedResult : PaginatedResult<IdailyOperations[]> =new PaginatedResult<IdailyOperations[]>();

  headers = new HttpHeaders({
    'Accept': 'application/json',
    'zumo-api-version': '2.0.0',

});
  constructor(private http: HttpClient) { }

  getDaily(PageNumber :number , PageSize :number , searchValue:string ,sortcolumn:string,sortcolumndir:string){
    let params = new HttpParams();
    if(PageNumber !== null && PageSize !== null ){
      params = params.append('pageNumber' , PageNumber.toString());
      params = params.append('pageSize' , PageSize.toString());
      params = params.append('searchValue' , searchValue.toString());
      params = params.append('sortcolumn' , sortcolumn.toString());
      params = params.append('sortcolumndir' , sortcolumndir.toString());
    }
    console.log(this.baseUrl)
    return this.http.get<any>(`${this.baseUrl}` + '/GetDailyOpertion'  , {observe:'response' , params}).pipe(
      map(response => {
         return response.body ;
      })
    )
  }
  getAllDaily(PageNumber :number , PageSize :number , searchValue:string ,sortcolumn:string,sortcolumndir:string){
    let params = new HttpParams();
    if(PageNumber !== null && PageSize !== null ){
      params = params.append('pageNumber' , PageNumber.toString());
      params = params.append('pageSize' , PageSize.toString());
      params = params.append('searchValue' , searchValue.toString());
      params = params.append('sortcolumn' , sortcolumn.toString());
      params = params.append('sortcolumndir' , sortcolumndir.toString());
    }
    return this.http.get<any>(`${this.baseUrl}` + '/GetAll' , {observe:'response' , params}).pipe(
      map(response => {
         return response.body ;
      })
    )
  }
  getDailyOperationById(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/GetDailyOperationsById`, id);
  }
  insertDailyOperation(data: IdailyOperations): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/AddDailyOperations`, data);
  }
  updateDailyOperation(data: IdailyOperations): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/UpdateDailyOperations`, data);
  }

  deleteDailyOperation(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/DeleteDailyOperations`, id);
  }

  getListsForCreate(): Observable<any> {

    return this.http.get<any>(`${this.baseUrl}` + `/getListForCreate`);
  }

  ExportEmptyExcel():Observable<Blob>{
    return this.http.get(`${this.baseUrl}/DownloadEmptyExcel`,{responseType: 'blob',headers: this.headers});

  }

public addFromFile(file : any)
{
  return this.http.post<any>(this.baseUrl + '/AddExcelFile' , file , {headers : this.headers});
}

ExportExcelWithData():Observable<Blob>{
  return this.http.get(`${this.baseUrl}/DownloadAllDataOfExcel`,{responseType: 'blob',headers: this.headers});
}

DownloadAllDisplayDataOfExcel():Observable<Blob>{
  return this.http.get(`${this.baseUrl}/DownloadAllDisplayDataOfExcel`,{responseType: 'blob',headers: this.headers});
}

ExportExcelWithselectData(ids:string[]):Observable<Blob>{

  return this.http.post(`${this.baseUrl}/DownloadSelectDataOfExcel`,ids,{responseType: 'blob',headers: this.headers});
}

GetZoneName (popNameId : number): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/GetZoneNameByPopNameId`, popNameId );
}

GetPopNameByZoneId (zoneId : number): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/GetPopNameByZoneId`, zoneId );
}

chartData():Observable<any>
{
 return this.http.get<any>(`${this.baseUrl}/GetflowChartData`) ;
}

AdvancedSearch(data: IdailyOperationsSearch): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/AdvancedSearch`, data);
}
IsNameValid(assignTo: IdailyOperations): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/IsNameValid/`,assignTo);
}
}
