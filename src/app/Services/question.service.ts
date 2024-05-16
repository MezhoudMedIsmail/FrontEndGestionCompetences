import { Injectable } from '@angular/core';
import {DataService} from "./data.service";
import {HttpClient} from "@angular/common/http";
import {Question} from "../Models/question";
import {Reponse} from "../Models/Reponse";
import {TokenService} from "./token.service";
const  APIUrl ="http://localhost:8088/api/question";

@Injectable({
  providedIn: 'root'
})
export class QuestionService extends DataService{

  constructor(http : HttpClient,private httpPrivate : HttpClient,private tokenService : TokenService) {
    super(APIUrl,http);
  }

  getQuestionsByTheme(id : any){
    return this.httpPrivate.get<any>(`${APIUrl}/theme/${id}`);
  }
  createQuestion(themeId : number,question : Question){
    return this.httpPrivate.post(`${APIUrl}/${themeId}`, question);
  }
  getUsersByTheme(themeId : number){
    return this.httpPrivate.get<any>(`http://localhost:8088/api/theme/${themeId}/users`);
  }
  getThemeByDepartment(department : string){
    //query param
    return this.httpPrivate.get<any>(`http://localhost:8088/api/theme/details`,{params : {departement :department}});
  }
  saveReponses(reponses :any){
    const userId = this.tokenService.getUser() as number;
    return this.httpPrivate.post(`${APIUrl}/reponse/${userId}`, reponses)
  }
}
