import {Component} from '@angular/core';
import {Business} from './business';
import {Margin} from './static_margin';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    marginCalc: Margin;
    title: string = 'Holov';
    // constructor(private business: Business) {
    //     this.marginCalc = business.margin({});
    // }
}
