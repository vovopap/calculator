import {ComponentFixture, TestBed, async} from '@angular/core/testing';
import {By, BrowserModule} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {AppComponent} from './app.component';
import {Business} from "./business";
import {FormsModule} from "@angular/forms";

describe('App Component', () => {
    let comp: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let de: DebugElement;
    let el: HTMLElement;
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

        de = fixture.debugElement.query(By.css('h1'));
        el = de.nativeElement;
    });
    it('no title in the DOM until manually calling `detectChanges`', () => {
        expect(el.textContent).toEqual('');
    });
    it('should display original title', () => {
        fixture.detectChanges();
        expect(el.textContent).toContain(comp.title);
    });

    it('should display a different title', () => {
        comp.title = 'Test title';
        fixture.detectChanges();
        expect(el.textContent).toContain('Test title')
    });
});