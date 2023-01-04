import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { tap, map } from 'rxjs/operators';

import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  opts=[]
  constructor(private http : HttpClient) { }
  configUrl = 'http://localhost:3000';

getConfig() {
  return this.http.get<any>(this.configUrl +'/user/list');
}

getbytitle(title : String){
  console.log(title)
  return this.http.get<any>(this.configUrl + `/${title}`);
}

postConfig(userdata){
  return this.http.post<any>(this.configUrl +'/user/add',userdata);
}

patchConfig(userdata)
{
  return this.http.patch<any>(this.configUrl +'/user/update' +`/${userdata.MovieName}`,userdata);
}

getData(){
  return this.http.get(this.configUrl +'/user/list')
    .pipe(
      map((response:[]) => response.map(item => item['MovieName']))
    )
}

mdelete(title : string)
{
  return this.http.delete(this.configUrl + '/delete'+ `/${title}`)
}
getByG(title : string)
{
  console.log(title)
  return this.http.get<any>(this.configUrl + '/Gener' + `/${title}`)
}

}
