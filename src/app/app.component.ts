import { Component } from '@angular/core';
import {Business} from '../business';
import {Margin} from '../static_margin';

@Component({
  selector: 'my-app',
  template: `
  <div *ngFor="let friend of friends" class="wrapper">
      {{friend}}
  </div>
`,
})
export class AppComponent  {
  marginCalc: Margin;
  friends: string[] = ['Ross', 'Rachel', 'Joey', 'Phoebe', 'Monica', 'Chandler'];
  constructor(private business: Business) {
    this.marginCalc = business.margin({});
  }
}
