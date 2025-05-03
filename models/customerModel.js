// why is this created ? this is a model class that is used to store the data of the customer object and is used to store the data of the customer object

export default class CustomerModel {
    constructor(customerId, name, address, telephone) {
        this._customerId = customerId;
        this._name = name;
        this._address = address;
        this._telephone = telephone;
    }
    get customerId() {
        return this._customerId;
    }

    set customerId(value) {
        this._customerId = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get address() {
        return this._address;
    }

    set address(value) {
        this._address = value;
    }

    get telephone() {
        return this._telephone;
    }

    set telephone(value) {
        this._telephone = value;
    }
}