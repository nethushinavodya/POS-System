export default class PlaceOrderModel {
    constructor(orderId, customerId, total) {
        this._orderId = orderId;
        this._customerId = customerId;
        this._total = total;
    }
}