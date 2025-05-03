export default class ItemModel {
    constructor(itemId, name, unitPrice, quantity) {
        this._itemId = itemId;
        this._name = name;
        this._unitPrice = unitPrice;
        this._quantity = quantity;
    }

    get itemId() {
        return this._itemId;
    }

    set itemId(value) {
        this._itemId = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
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
}