import {ComponentFixture, TestBed, async} from '@angular/core/testing';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {Business} from './business';
import {FormsModule} from '@angular/forms';

describe('App Component', () => {
    let comp: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let business: Business;
    let spyOnBusiness: jasmine.Spy;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [BrowserModule, FormsModule],
            declarations: [AppComponent],
            providers: [Business],
        }).compileComponents(); // compile template and css
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        comp = fixture.componentInstance;
        business = fixture.debugElement.injector.get(Business);
        spyOnBusiness = spyOn(business, 'margin');
    });
    it('#marginCalc should be defined', () => {
        expect(comp.marginCalc).toBeDefined();
    });
});
