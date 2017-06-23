import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { CalculatorModule } from './calculator_module';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports:      [ BrowserModule, FormsModule, CalculatorModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
