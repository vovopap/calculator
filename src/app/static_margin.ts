export class Margin {
    price: number;
    /**
     * @percentage
     */
    margin: number;
    /**
     * @percentage
     */
    markup: number;
    revenue: number;
    profit: number;

    constructor(initialVariables: any) {
        this.price = initialVariables.price;
        this.margin = initialVariables.margin;
        this.markup = initialVariables.markup;
        this.revenue = initialVariables.revenue;
        this.profit = initialVariables.profit;
    }

    sync(variable: string) {
        switch (variable) {
            case 'price': {
                /**
                 * #price -> revenue -> margin, markup
                 */
                this.revenue = this.price + this.profit;

                this.margin = this.profit / this.revenue * 100;
                this.markup = this.profit / this.price * 100;

                break;
            }
            case 'margin': {
                /**
                 * #margin -> markup -> profit -> price
                 */
                this.markup = 100 * this.margin / (100 - this.margin);

                this.profit = this.margin * this.revenue / 100;

                this.price = this.revenue - this.profit;

                break;
            }
            case 'markup': {
                /**
                 * #markup -> margin -> profit -> price
                 */
                this.margin = 100 * this.markup / (100 + this.markup);

                this.profit = this.margin * this.revenue / 100;

                this.price = this.revenue - this.profit;

                break;
            }
            case 'revenue': {
                /**
                 * #revenue -> (price .. profit) -> margin, markup
                 */
                if (this.price) {
                    this.profit = this.revenue - this.price;
                } else if (this.profit) {
                    this.price = this.revenue - this.profit;
                }

                this.margin = this.profit / this.revenue * 100;
                this.markup = this.profit / this.price * 100;

                break;
            }
            case 'profit': {
                /**
                 * #profit -> revenue -> margin, markup
                 */
                if (this.price) {
                    this.revenue = this.price + this.profit;
                } else if (this.revenue) {
                    this.price = this.revenue - this.profit;
                }

                this.margin = this.profit / this.revenue * 100;
                this.markup = this.profit / this.price * 100;

                break;
            }
        }
    }
}