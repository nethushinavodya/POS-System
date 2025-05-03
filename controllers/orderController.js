import placeOrderModel from "../models/placeOrderModel.js";
import orderDetailsModel from "../models/orderDetailsModel.js";
import {customersArray, itemsArray, ordersArray} from "../db/db.js";

//load all orders
function loadAllOrders() {
    $("#cartItems").empty();
    ordersArray.map((order) => {
        let orderId = order._orderId;
        let customerId = order._customerId;
        let itemId = order._itemId;
        let description = order._description;
        let unitPrice = order._unitPrice;
        let quantity = order._quantity;
        let total = order._total;

        let data = `<tr>
                        <td>${orderId}</td>
                        <td>${customerId}</td>
                        <td>${itemId}</td>
                        <td>${description}</td>
                        <td>${unitPrice}</td>
                        <td>${quantity}</td>
                        <td>${total}</td>
                        <td>
                            <button class="btn btn-sm btn-danger" id="deleteOrder"><i class="fas fa-trash"></i></button>
                        </td>
                    </tr>`;
        $("#cartItems").append(data);
    });

    //delete order
    $(document).on("click", "#deleteOrder", () => {
        let orderId = $(this).closest("tr").find("td").eq(0).text();
        let index = ordersArray.findIndex((order) => order._orderId === orderId);
        ordersArray.splice(index, 1);
        loadAllOrders();
        clearText();

        Swal.fire({
            title: 'success',
            text: 'Order deleted successfully',
            icon: 'success',
            confirmButtonText: 'OK'
        });
    });
}
//clear text
function clearText() {
    $("#orderId").val('');
    $("#customerId").val('');
    $("#itemId").val('');
    $("#description").val('');
    $("#unitPrice").val('');
    $("#quantity").val('');
    $("#total").val('');
}
//load items
const loadItems = () => {
    console.log("load items");
    console.log("itemsArray length:", itemsArray.length);
    $("#selectItem").empty();
    $("#selectItem").append('<option value=" ">Select Item</option>');
    itemsArray.map((item) => {
        console.log(item._itemId);
        let data = `<option value="${item._itemId}">${item._itemId}</option>`
        $("#selectItem").append(data);
    });
}
$("#selectItem").on("change", () => {
    let itemId = $("#selectItem").val();
    let item = itemsArray.find((item) => item._itemId === itemId);
    $("#itemPrice").val(item._unitPrice);
    $("#stockQty").val(item._quantity);
});

//load customers
const loadCustomers = () => {
    console.log("load customers");
    console.log("customersArray length:", customersArray.length);
    $("#customerIdSelect").empty();
    $("#customerIdSelect").append('<option value=" ">Select Customer</option>');
    customersArray.map((customer) => {
        console.log(customer._customerId);
        let data = `<option value="${customer._customerId}">${customer._customerId}</option>`
        $("#customerIdSelect").append(data);
    });
}

$("#customerIdSelect").on("change", () => {
    let customerId = $("#customerIdSelect").val();
    let customer = customersArray.find((customer) => customer._customerId === customerId);
    $("#customerInfo").val(`Name: ${customer._name}, Address: ${customer._address}, Contact: ${customer._telephone}`);
});
$(document).ready(() => {
    $("#placeOrderNav").on("click", function () {
    console.log("clicked");
    loadAllOrders();
    loadItems();
    loadCustomers()
    });
})
//add to cart
$(document).on("click", "#addToCart", () => {
    let orderId = $("#orderId").val();
    let customerId = $("#customerId").val();
    let itemId = $("#selectItem").val();
    let description = $("#description").val();
    let unitPrice = $("#unitPrice").val();
    let quantity = $("#quantity").val();
    let total = $("#total").val();

    if (orderId === "" || customerId === "" || itemId === "" || description === "" || unitPrice === "" || quantity === "" || total === "") {
        Swal.fire({
            title: 'error',
            text: 'All fields are required',
            icon: 'error',
            confirmButtonText: 'OK'
        })
    } else {
        let order = new placeOrderModel(orderId, customerId, itemId, description, unitPrice, quantity, total);
        ordersArray.push(order);
        loadAllOrders();
        loadItems();
        clearText();

        Swal.fire({
            title: 'success',
            text: 'Order added successfully',
            icon: 'success',
            confirmButtonText: 'OK'
        });
    }
});