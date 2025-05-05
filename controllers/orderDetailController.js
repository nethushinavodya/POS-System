import orderDetailsModel from "../models/orderDetailsModel.js";
import {customersArray, itemsArray, ordersArray , orderDetailsArray} from "../db/db.js";


function setTable() {
$("#orderDetailTableBody").empty();
    orderDetailsArray.map((orderDetail) => {
        if (orderDetail._customerId === cId) {
            console.log(orderDetail._customerId,  "  ggggggkk")
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
            $("#orderDetailTableBody").append(data);
        }
    });
}
//search customer
/*$("#searchOrders").on("click", () => {
    console.log("clicked");

    let customerId = $("#searchCustomerId").val();
    let orderDetail = orderDetailsArray.find((orderDetail) => orderDetail._customerId === customerId);
    $("#orderId").val(orderDetail._orderId);
    $("#date").val(orderDetail._date);
    $("#customerId").val(orderDetail._customerId);
    $("#quantity").val(orderDetail._quantity);
    $("#total").val(orderDetail._total);
    $("#status").val(orderDetail._status);
})*/

$(document).ready(() => {
    $("#orderDetailsNav").on("click", function () {
        console.log("clicked");
        loadCustomerIds();
        setTable();
    });
});
/*const loadCustomerIds = () => {
    console.log("load customers");
    console.log("customersArray length:", customersArray.length);
    $("#searchCustomerId").empty();
    $("#searchCustomerId").append('<option value=" ">Select Customer</option>');
    customersArray.map((customer) => {
        console.log(customer._customerId);
        let data = `<option value="${customer._customerId}">${customer._customerId}</option>`
        $("#searchCustomerId").append(data);
    });
}*/

/*
$("#searchCustomerId").on("change", function (){
    let cId = $("#searchCustomerId").val();
    $("#orderDetailTableBody").empty();
    console.log(cId, "  ggfdss")
    console.log(orderDetailsArray.length,"   gggggg")

    orderDetailsArray.map((orderDetail) => {

        if (orderDetail._customerId === cId) {
            console.log(orderDetail._customerId,  "  ggggggkk")
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
            $("#orderDetailTableBody").append(data);
        }
    });
});
*/
