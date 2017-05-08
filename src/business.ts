import {Injectable} from '@angular/core';
import {Margin} from './static_margin';

@Injectable()
export class Business {
    margin(variables: any): Margin {
        return new Margin(variables);
    }
}