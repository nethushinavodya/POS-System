export default class PlaceOrderModel {
    constructor(orderId, customerId, total) {
        this._orderId = orderId;
        this._customerId = customerId;
        this._total = total;
    }

    get orderId() {
        return this._orderId;
    }

    set orderId(value) {
        this._orderId = value;
    }

    get customerId() {
        return this._customerId;
    }

    set customerId(value) {
        this._customerId = value;
    }

    get total() {
        return this._total;
    }

    set total(value) {
        this._total = value;
    }
}