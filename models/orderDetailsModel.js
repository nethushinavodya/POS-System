export default class orderDetailsModel {
    constructor(orderId, date, customerId, quantity, total, status) {
        this._orderId = orderId;
        this._date = new Date();
        this._customerId = customerId;
        this._quantity = quantity;
        this._total = total;
        this._status = status;
    }

    get orderId() {
        return this._orderId;
    }

    set orderId(value) {
        this._orderId = value;
    }

    get date() {
        return this._date;
    }

    set date(value) {
        this._date = value;
    }

    get customerId() {
        return this._customerId;
    }

    set customerId(value) {
        this._customerId = value;
    }

    get quantity() {
        return this._quantity;
    }

    set quantity(value) {
        this._quantity = value;
    }

    get total() {
        return this._total;
    }

    set total(value) {
        this._total = value;
    }

    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
    }
}