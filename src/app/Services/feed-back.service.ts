import { Injectable } from '@angular/core';
import {DataService} from "./data.service";
import {HttpClient} from "@angular/common/http";
const  APIUrl ="http://localhost:8088/api/feedback";

@Injectable({
  providedIn: 'root'
})
export class FeedBackService extends DataService{

  constructor(http : HttpClient) {
    super(APIUrl,http);
  }
}
