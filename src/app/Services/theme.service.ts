import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Theme} from "../Models/theme";
import {DataService} from "./data.service";
const  APIUrl ="http://localhost:8088/api/theme";

@Injectable({
  providedIn: 'root'
})
export class ThemeService extends DataService{
  constructor(http : HttpClient) {
    super(APIUrl,http);
  }
}
