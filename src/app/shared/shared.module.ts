import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LazyImageComponent } from '../gifs/components/lazy-image/lazy-image.component';



@NgModule({
  declarations: [
    SidebarComponent,
    LazyImageComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    // SharedModule,
    SidebarComponent,
    LazyImageComponent,
  ]
})
export class SharedModule { }
