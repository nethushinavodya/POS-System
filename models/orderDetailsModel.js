export default class orderDetailsModel {
    constructor(orderId, date, customerId, quantity, total, status) {
        this._orderId = orderId;
        this._date = date;
        this._customerId = customerId;
        this._quantity = quantity;
        this._total = total;
        this._status = status;
    }
}