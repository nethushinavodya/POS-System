import placeOrderModel from "../models/placeOrderModel.js";
import cartModel from "../models/cartModel.js";
import orderDetailsModel from "../models/orderDetailsModel.js";
import {customersArray, itemsArray, ordersArray, cartArray, orderDetailsArray} from "../db/db.js";

//load all orders
function loadAllOrders() {
    $("#cartItems").empty();
    cartArray.map((order) => {
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

    //total amount
    let total = 0;
    cartArray.forEach(order => {
        console.log(order);
        total += order._total;
    });
    console.log(total," ggggggggggggg")
    $("#cartTotal").text('Rs. ' + total.toFixed(2));

    //cash paid
    $("#cashPaid").on("input", () => {
        let cashPaid = $("#cashPaid").val();
        let balance = total - cashPaid;
        $("#balance").val('Rs. ' + balance.toFixed(2));
    });
}

//delete order
$("#deleteOrder").on("click", () => {
    let orderId = $(this).closest("tr").find("td").eq(0).text();
    let index = cartArray.findIndex((order) => order._orderId === orderId);
    cartArray.splice(index, 1);
    loadAllOrders();
    clearText();

    Swal.fire({
        title: 'success',
        text: 'Order deleted successfully',
        icon: 'success',
        confirmButtonText: 'OK'
    });
});
//clear text
function clearText() {
    $("#orderID").val('');
    $("#customerIdSelect").val('');
    $("#selectItem").val('');
    $("#customerInfo").val('');
    $("#itemPrice").val('');
    $("#stockQty").val('');
    $("#orderQty").val('');
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
    $("#customerInfo").val(`Name: ${customer._name}\nAddress: ${customer._address}\nContact: ${customer._telephone}`);
});

$(document).ready(() => {
    $("#placeOrderNav").on("click", function () {
    console.log("clicked");
    $("#orderID").val("ORD0" + cartArray.length + 1);
    console.log(cartArray.length);
    $("#orderDate").val(new Date().toISOString().split('T')[0]);
    loadAllOrders();
    loadItems();
    loadCustomers();
    });
})


//add to cart
$("#addToCart").on("click",() => {
    let orderId = $("#orderID").val();
    let customerId = $("#customerIdSelect").val();
    let itemId = $("#selectItem").val();
    let item = itemsArray.find((item) => item._itemId === itemId);
    let description = item._name;
    let unitPrice = $("#itemPrice").val();
    let quantity = $("#orderQty").val();
    let total = unitPrice * quantity;
    console.log(orderId, customerId, itemId, description, unitPrice, quantity, total);

    if (orderId === "" || customerId === "" || itemId === "" || description === "" || unitPrice === "" || quantity === "" || total === "") {
        Swal.fire({
            title: 'error',
            text: 'All fields are required',
            icon: 'error',
            confirmButtonText: 'OK'
        })
    } else {
        let cart = new cartModel(orderId, customerId, itemId, description, unitPrice, quantity, total);
        console.log(cart);
        cartArray.push(cart);

        let item = itemsArray.find((item) => item._itemId === itemId);
        item._quantity -= quantity;
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

//place order
$("#placeOrder").on("click", () => {
    let orderId = $("#orderID").val();
    let customerId = $("#customerIdSelect").val();
    let total = $("#total").val();

    if (total === "") {
        Swal.fire({
            title: 'error',
            text: 'All fields are required',
            icon: 'error',
            confirmButtonText: 'OK'
        })
    } else {
        let order = new placeOrderModel(orderId, customerId, total);
        ordersArray.push(order);
        //cart map
        cartArray.map((cart) => {
            let orderId = cart._orderId;
            let date = cart._date;
            let customerId = cart._customerId;
            let quantity = cart._quantity;
            let total = cart._total;

            let order = new orderDetailsModel(orderId, date, customerId, quantity, total, "Completed");
            orderDetailsArray.push(order);
        })
        loadAllOrders();
        clearText();

        Swal.fire({
            title: 'success',
            text: 'Order placed successfully',
            icon: 'success',
            confirmButtonText: 'OK'
        });
    }
});
