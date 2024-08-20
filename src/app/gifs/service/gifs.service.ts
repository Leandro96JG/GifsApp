import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResponse, Gif } from '../interfaces/gifs.interfaces';




@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList:Gif[]=[];
  private _tagsHistory:string[] = [];
  // API
  private apiKey:string = 'TEq0kFy7GFoSXUwahFZOgFwbOCpB4k1i';
  private serviceUrl:string = 'https://api.giphy.com/v1/gifs';



  constructor(private http:HttpClient) {
    this.loadLocalStore();

  } //Para peticiones http es necesario importar antes el modulo en appmodule

  get tagsHistory(){
    return [...this._tagsHistory];
  }

  private organizeHistory(tag:string){
    tag = tag.toLowerCase(); // para poner todo el tag en miniscula

    if(this._tagsHistory.includes(tag)){ // para saber si hay un tag igual
      //Filtra el tag en el arreglo de string
      this._tagsHistory = this._tagsHistory.filter((oldtag)=>oldtag !==tag)
    }
    //lo agrega al principio del arreglo
    this._tagsHistory.unshift(tag);
    //arreglo maximo de 10
    this._tagsHistory = this._tagsHistory.splice(0,10);
    this.saveLocalStorage();
  }

  // Para Guardar el historial en el local storage

  private saveLocalStorage():void{
    localStorage.setItem('history',JSON.stringify(this._tagsHistory))
  }

  private loadLocalStore():void{
    if(!localStorage.getItem('history'))return;
    //guarda info del json en el arreglo de tags
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
    if(this._tagsHistory.length === 0)return;
    this.searchTag(this._tagsHistory[0]);
  }

  async searchTag(tag:string):Promise<void>{

    if(tag.length === 0) return;
    this.organizeHistory(tag);

    //HttpParams ya viene incluido en angular
    //se utiliza para costruir una url
    const param = new HttpParams()
     .set('api_key', this.apiKey)
     .set('limit','10')
     .set('q',tag)

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`,{params:param})
    .subscribe(resp =>{

      this.gifList = resp.data;

    } )


    //('https://api.giphy.com/v1/gifs/search?q=valorant&limit=10&api_key=TEq0kFy7GFoSXUwahFZOgFwbOCpB4k1i')

  }

  deletedtag(index:number){
    this._tagsHistory.splice(index,1);
    this.saveLocalStorage();
  }

}
