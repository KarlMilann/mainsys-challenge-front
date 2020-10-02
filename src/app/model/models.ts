/**
 * All models sent to Database
 **/
export class User {
  public id: number;
  public username: string;
  public totalProfit: number;
  public sales: Sale[];
}
export class Sale {
  public id: number;
  public productName: string;
  public productProfit: number;
  public date: Date;
  public user: User;

  constructor(productName: string, productProfit: number, date: Date, user: User) {
    this.productName = productName;
    this.productProfit = productProfit;
    this.date = date;
    this.user = user;
  }
}
