import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/service/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  public historial:string[] = [];
  public resultados:string[] = [];

  constructor(private gifsService:GifsService){ }


  //como gifsService tiene una variable privada se usa el get
  get tags():string[]{
  return this.gifsService.tagsHistory;
}

listItem(tag:string){
 this.gifsService.searchTag(tag);
}

deleteHistory(index:number){
   this.gifsService.deletedtag(index);
}

}
