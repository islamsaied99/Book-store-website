import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DemoService {

  URL = 'http://localhost:3000/products';
  URLProgramming = 'http://localhost:3000/programming';
  private URL_DB = " http://localhost:3000/authors";
  constructor(private client:HttpClient) { }
  getProducts() {
    return this.client.get(this.URL)
  }
  getProgramming() {
    return this.client.get(this.URLProgramming)
  }
  getAllauthor(){
    return this.client.get(this.URL_DB);
  }

  getauthorByID(id:number){
    return this.client.get(this.URL_DB+"/"+id);
  }
}
