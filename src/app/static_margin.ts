export class Margin {
    /**
     * used for tracking last synced value
     */
    lastSyncedVariable: string;

    /**
     * the name of the variable that should preferably be not changed during sync
     * One of the cases is user has recently interacted with this variable
     * and it would not be user-friendly to change it
     */
    strongVariable: string;

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
        this.price = typeof initialVariables.price === 'undefined' ? NaN : initialVariables.price;
        this.margin = typeof initialVariables.margin === 'undefined' ? NaN : initialVariables.margin;
        this.markup = typeof initialVariables.markup === 'undefined' ? NaN : initialVariables.markup;
        this.revenue = typeof initialVariables.revenue === 'undefined' ? NaN : initialVariables.revenue;
        this.profit = typeof initialVariables.profit === 'undefined' ? NaN : initialVariables.profit;
    }

    sync(variable: string) {
        if (this.lastSyncedVariable !== variable) {
            this.strongVariable = this.lastSyncedVariable;
        }
        this.lastSyncedVariable = variable;
        console.log('Priority -> ' + this.strongVariable);
        switch (variable) {
            case 'price': {
                if (this.revenue && this.strongVariable === 'revenue') {
                    this.profit = this.revenue - this.price;
                } else if (this.profit && this.strongVariable === 'profit') {
                    this.revenue = this.price + this.profit;
                } else if (this.margin && this.strongVariable === 'margin') {
                    this.revenue = this.price * 100 / (100 - this.margin);
                    this.profit = this.revenue - this.price;
                    break;
                }

                this.margin = this.profit / this.revenue * 100;
                this.markup = this.profit / this.price * 100;
                break;
            }
            case 'margin': {
                this.markup = 100 * this.margin / (100 - this.margin);
                if (this.price && this.strongVariable === 'price') {
                    this.profit =  this.price * this.markup / 100;
                    this.revenue = this.price + this.profit;
                } else if (this.revenue && this.strongVariable === 'revenue') {
                    this.price = this.revenue * (100 - this.margin) / 100;
                    this.profit = this.revenue - this.price;
                } else if (this.profit && this.strongVariable === 'profit') {
                    this.revenue = this.profit * 100 / this.margin;
                    this.price = this.revenue - this.profit;
                }
                break;
            }
            case 'markup': {
                this.margin = 100 * this.markup / (100 + this.markup);
                if (this.price && this.strongVariable === 'price') {
                    this.profit =  this.price * this.markup / 100;
                    this.revenue = this.price + this.profit;
                } else if (this.revenue && this.strongVariable === 'revenue') {
                    this.price = this.revenue * (100 - this.margin) / 100;
                    this.profit = this.revenue - this.price;
                } else if (this.profit && this.strongVariable === 'profit') {
                    this.revenue = this.profit * 100 / this.margin;
                    this.price = this.revenue - this.profit;
                }
                break;
            }
            case 'revenue': {
                // if (this.price) {
                //     this.profit = this.revenue - this.price;
                // } else if (this.profit) {
                //     this.price = this.revenue - this.profit;
                // }

                if (this.price && this.strongVariable === 'price') {
                    this.profit = this.revenue - this.price;
                } else if (this.profit && this.strongVariable === 'profit') {
                    this.price = this.revenue - this.profit;
                } else if (this.margin && ((this.strongVariable === 'margin') || (this.strongVariable === 'markup'))) {
                    this.price = this.revenue * (100 - this.margin) / 100;
                    this.profit = this.revenue - this.price;
                    break;
                }

                this.margin = this.profit / this.revenue * 100;
                this.markup = this.profit / this.price * 100;
                break;
            }
            case 'profit': {
                /**
                 * #profit -> revenue -> margin, markup
                 */
                if (this.price && this.strongVariable === 'price') {
                    this.revenue = this.price + this.profit;
                } else if (this.revenue && this.strongVariable === 'revenue') {
                    this.price = this.revenue - this.profit;
                }

                this.margin = this.profit / this.revenue * 100;
                this.markup = this.profit / this.price * 100;

                break;
            }
        }
        console.log(this);
    }
}