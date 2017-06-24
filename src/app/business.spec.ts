import {Business} from './business';
import {Margin} from './static_margin';
describe('Business - nothing set initially', () => {
    let margin: Margin;

    beforeEach(() => {
        margin = new Business().margin();
    });

    it('all variables must be NaN', () => {
        let variables = [margin.price, margin.margin, margin.markup, margin.revenue, margin.profit];
        expect(variables).toEqual([NaN, NaN, NaN, NaN, NaN], 'not all variables equal to NaN');
    });

    it('setting #price should not change anything', () => {
        margin.price = 100;
        margin.sync('price');
        let variables = [margin.margin, margin.markup, margin.revenue, margin.profit];
        expect(variables).toEqual([NaN, NaN, NaN, NaN], 'setting price changed some');
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

    it('#strongVariable should be previously synced distinct variable', () => {
        margin.price = 100;
        margin.sync('price');
        expect(margin.strongVariable).toBeUndefined('#strongVariable undefined');
        margin.price = 200;
        margin.sync('price');
        expect(margin.strongVariable).toBeUndefined('#strongVariable still undefined');
        margin.margin = 20;
        margin.sync('margin');
        expect(margin.strongVariable).toBe('price', '#strongVariable price');
    });

    it('#strongVariable should be `price` and not change', () => {
        let priceValue = 100;
        margin.price = priceValue;
        margin.sync('price');
        margin.revenue = priceValue + 10;
        margin.sync('revenue');
        expect(margin.strongVariable).toBeUndefined('#strongVariable undefined');
    });
});

describe('', () => {

});