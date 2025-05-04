import orderDetailsModel from "../models/orderDetailsModel.js";
import {customersArray, itemsArray, ordersArray , orderDetailsArray} from "../db/db.js";


$(document).ready(() => {
    $("#orderDetailsNav").on("click", function () {
        console.log("clicked");
        loadCustomerIds();
        setTable();
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

function setTable() {
    $("#orderDetailsTableBody").empty();

    orderDetailsArray.map((orderDetail) => {
        let orderId = orderDetail._orderId;
        let date = orderDetail._date;
        let customerId = orderDetail._customerId;
        let quantity = orderDetail._quantity;
        let total = orderDetail._total;
        let status = orderDetail._status;

        let data = `<tr>
                        <td>${orderId}</td>
                        <td>${date}</td>
                        <td>${customerId}</td>
                        <td>${quantity}</td>
                        <td>${total}</td>
                        <td>${status}</td>
                        <td>
                            <button class="btn btn-sm btn-info view-order">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn btn-sm btn-secondary print-order">
                                <i class="fas fa-print"></i>
                            </button>
                        </td>
                    </tr>`;
        $("#orderDetailsTableBody").append(data);
    });
}
//search customer
$(document).on("click", "#searchOrders", () => {
    console.log("clicked");

})