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
        this.price = initialVariables.price;
        this.margin = initialVariables.margin;
        this.markup = initialVariables.markup;
        this.revenue = initialVariables.revenue;
        this.profit = initialVariables.profit;
    }

    sync(variable: string) {
        if(this.lastSyncedVariable !== variable) {
            this.strongVariable = this.lastSyncedVariable;
        }
        this.lastSyncedVariable = variable;
        console.log('----------------------------------------------');
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
                // this.markup = this.profit / this.price * 100;
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
                if (this.price) {
                    this.profit = this.revenue - this.price;
                } else if (this.profit) {
                    this.price = this.revenue - this.profit;
                }

                if (this.price && this.strongVariable === 'price') {
                    this.profit = this.revenue - this.price;
                } else if (this.profit && this.strongVariable === 'profit') {
                    this.price = this.revenue - this.profit;
                } else if (this.margin && this.strongVariable === 'margin') {
                    this.revenue = this.price * 100 / (100 - this.margin);
                    this.profit = this.revenue - this.price;
                    break;
                }

                this.margin = this.profit / this.revenue * 100;
                // this.markup = this.profit / this.price * 100;
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