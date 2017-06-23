import {Business} from "./business";
import {Margin} from "./static_margin";
describe('Business - nothing set initially', () => {
    let margin: Margin;

    beforeEach(() => {
        margin = new Business().margin();
    });

    it('all variables must be NaN', () => {
        expect([margin.price, margin.margin, margin.markup, margin.revenue, margin.profit]).toEqual([NaN, NaN, NaN, NaN, NaN]);
    });

    it('setting #price should not change anything', () => {
        margin.price = 100;
        margin.sync('price');
        expect([margin.margin, margin.markup, margin.revenue, margin.profit]).toEqual([NaN, NaN, NaN, NaN]);
    });

    it('setting #margin should not change anything expect for #markup', () => {
        margin.margin = 10;
        margin.sync('margin');
        expect([margin.price, margin.revenue, margin.profit]).toEqual([NaN, NaN, NaN]);
        expect(margin.markup).toBeDefined('markup defined');
    });

    it('setting #markup should not change anything expect for #margin', () => {
        margin.markup = 10;
        margin.sync('markup');
        expect([margin.price, margin.revenue, margin.profit]).toEqual([NaN, NaN, NaN]);
        expect(margin.margin).toBeDefined('margin defined');
    });

    it('setting #revenue should not change anything', () => {
        margin.revenue = 110;
        margin.sync('revenue');
        expect([margin.price, margin.margin, margin.markup, margin.profit]).toEqual([NaN, NaN, NaN, NaN]);
    });

    it('setting #profit should not change anything', () => {
        margin.profit = 110;
        margin.sync('profit');
        expect([margin.price, margin.margin, margin.markup, margin.revenue]).toEqual([NaN, NaN, NaN, NaN]);
    });

    it('#lastSyncedVariable', () => {
        margin.price = 100;
        margin.sync('price');
        expect(margin.lastSyncedVariable).toBe('price');
    });
});