export default class PlaceOrderModel {
    constructor(orderId, customerId, itemId, description, unitPrice, quantity, total) {
        this._orderId = orderId;
        this._customerId = customerId;
        this._itemId = itemId;
        this._description = description;
        this._unitPrice = unitPrice;
        this._quantity = quantity;
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

    get itemId() {
        return this._itemId;
    }

    set itemId(value) {
        this._itemId = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get unitPrice() {
        return this._unitPrice;
    }

    set unitPrice(value) {
        this._unitPrice = value;
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
}