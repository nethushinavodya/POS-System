import placeOrderModel from "../models/placeOrderModel.js";
import orderDetailsModel from "../models/orderDetailsModel";
import {customersArray, itemsArray, ordersArray, orderDetailsArray} from "../db/db";

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
        setItemId();
        clearText();

        Swal.fire({
            title: 'success',
            text: 'Order deleted successfully',
            icon: 'success',
            confirmButtonText: 'OK'
        });
    });
}
//set customer id
const setCustomerId = () => {
    $("#customerSelect").empty();
    customersArray.map((customer) => {
        let customerId = customer._customerId;
        let customerName = customer._name;
        let data = `<option value="${customerId}">${customerName}</option>`;
        $("#customerSelect").append(data);

        $("#customerSelect").on("change", () => {
            let customerId = $("#customerSelect").val();
            let customer = customersArray.find((customer) => customer._customerId === customerId);
            $("#customerInfo").val(customer._name, customer._address, customer._telephone);
        });
    });
}

//set item id
const setItemId = () => {
    $("#itemSelect").empty();
    itemsArray.map((item) => {
        let itemId = item._itemId;
        let itemName = item._name;
        let data = `<option value="${itemId}">${itemName}</option>`;
        $("#itemSelect").append(data);
    });

    $("#itemSelect").on("change", () => {
        let itemId = $("#itemSelect").val();
        let item = itemsArray.find((item) => item._itemId === itemId);
        $("#itemPrice").val(item._unitPrice);
        $("#stockQty").val(item._quantity);
    });
}
//save order
$(document).on("click", "#orderSave", () => {
    let orderId = $("#orderId").val();
    let customerId = $("#customerId").val();
    let itemId = $("#itemId").val();
    let description = $("#itemName").val();
    let unitPrice = $("#unitPrice").val();
    let quantity = $("#quantity").val();
    let total = $("#total").val();

    let order = new placeOrderModel(orderId, customerId, itemId, description, unitPrice, quantity, total);
    ordersArray.push(order);
    loadAllOrders();
    setCustomerId()
    setItemId()
    clearText();

    Swal.fire({
        title: 'success',
        text: 'Order added successfully',
        icon: 'success',
        confirmButtonText: 'OK'
    });
});

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