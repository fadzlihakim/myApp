import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the PeopleProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PeopleProvider {

  private apigender = "";
  private apiUrl = "https://randomuser.me/api/?results=20";
  constructor(public http: HttpClient) {
    console.log('Hello PeopleProvider Provider');
  }

  getPeopleFromApi()
  {
    return this.http.get(this.apiUrl)
  }

  getPeopleFilterGender(genderType: String, page: number)
  {
    this.apigender = "https://randomuser.me/api/?page=" + page + "&gender=" + genderType + "&results=20"
    console.log(this.apigender)
    return this.http.get(this.apigender)
  }
}
