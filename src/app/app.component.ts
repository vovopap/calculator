import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
  <div *ngFor="let friend of friends" class="wrapper">
      <messenger friend="{{friend}}"></messenger>
  </div>
`,
})
export class AppComponent  {
  friends : string[] = ['Ross', 'Rachel', 'Joey', 'Phoebe', 'Monica', 'Chandler'];
}
