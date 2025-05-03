import orderDetailsModel from "../models/orderDetailsModel.js";
import {customersArray, itemsArray, ordersArray , orderDetailsArray} from "../db/db.js";


$(document).ready(() => {
    $("#orderDetailsNav").on("click", function () {
        console.log("clicked");
        loadCustomerIds();
        });
});

const loadCustomerIds = () => {
    console.log("load customers");
    console.log("customersArray length:", customersArray.length);
    $("#searchCustomerId").empty();
    $("#searchCustomerId").append('<option value=" ">Select Customer</option>');
    customersArray.map((customer) => {
        console.log(customer._customerId);
        let data = `<option value="${customer._customerId}">${customer._customerId}</option>`
        $("#searchCustomerId").append(data);
    });
}

//search customer
$(document).on("click", "#searchOrders", () => {

})