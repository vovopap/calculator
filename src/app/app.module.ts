import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import {MessengerComponent} from "./messenger.component";

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, MessengerComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
