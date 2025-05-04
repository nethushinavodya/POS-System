export default class CartModel {
    constructor(orderId, customerId, itemId, description, unitPrice, quantity, total) {
        this._orderId = orderId;
        this._date = new Date();
        this._customerId = customerId;
        this._itemId = itemId;
        this._description = description;
        this._unitPrice = unitPrice;
        this._quantity = quantity;
        this._total = total;
    }
}