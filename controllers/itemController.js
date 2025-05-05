import ItemModel from "../models/itemModel.js";
import {itemsArray} from "../db/db.js";

//load items
function loadItems() {
    $("#itemTableBody").empty();

    itemsArray.map((item) => {
        let itemId = item._itemId;
        let name = item._name;
        let unitPrice = item._unitPrice;
        let quantity = item._quantity;

        let data = `<tr>
                        <td>${itemId}</td>
                        <td>${name}</td>
                        <td>${unitPrice}</td>
                        <td>${quantity}</td>
                        <td>
                            <button class="btn btn-sm btn-danger" id="deleteItem"><i class="fas fa-trash"></i></button>
                        </td>
                    </tr>`;
        $("#itemTableBody").append(data);
    });
}
//delete item
$(document).on("click", "#deleteItem", (e) => {
    let itemId = $(e.target).closest("tr").find("td").eq(0).text();
    let index = itemsArray.findIndex((item) => item._itemId === itemId);
    itemsArray.splice(index, 1);
    loadItems();
    setItem();

    Swal.fire({
        title: 'success',
        text: 'Item deleted successfully',
        icon: 'success',
        confirmButtonText: 'OK'
    });
});

//save item
$("#itemSave").on("click", () => {
    let itemId = $("#itemCode").val();
    let name = $("#itemName").val();
    let unitPrice = $("#itemAmount").val();
    let quantity = $("#itemQty").val();

    if (itemId === "" || name === "" || unitPrice === "" || quantity === "") {
        Swal.fire({
            title: 'error',
            text: 'All fields are required',
            icon: 'error',
            confirmButtonText: 'OK'
        })
    } else {
        let item = new ItemModel(itemId, name, unitPrice, quantity);
        itemsArray.push(item);
        loadItems();
        setItem();
        clearText();

        Swal.fire({
            title: 'success',
            text: 'Item added successfully',
            icon: 'success',
            confirmButtonText: 'OK'
        });
    }
});

//update item
$("#itemUpdate").on("click", () => {
    let itemId = $("#itemCode").val();
    let name = $("#itemName").val();
    let unitPrice = $("#itemAmount").val();
    let quantity = $("#itemQty").val();

    if (itemId === "" || name === "" || unitPrice === "" || quantity === "") {
        Swal.fire({
            title: 'error',
            text: 'All fields are required',
            icon: 'error',
            confirmButtonText: 'OK'
        })
    } else {
        let item = itemsArray.find((item) => item._itemId === itemId);
        item._name = name;
        item._unitPrice = unitPrice;
        item._quantity = quantity;
        loadItems();
        setItem();
        clearText();

        Swal.fire({
            title: 'success',
            text: 'Item updated successfully',
            icon: 'success',
            confirmButtonText: 'OK'
        });
    }
});

//set item to lable when clicked on table
$("#itemTableBody").on("click", "tr", function () {
    let itemId = $(this).find("td").eq(0).text();
    let itemSet = itemsArray.find((item) => item._itemId === itemId);
    $("#itemCode").val(itemSet._itemId);
    $("#itemName").val(itemSet._name);
    $("#itemAmount").val(itemSet._unitPrice);
    $("#itemQty").val(itemSet._quantity);
});

//clear text
function clearText() {
    $("#itemCode").val("");
    $("#itemName").val("");
    $("#itemAmount").val("");
    $("#itemQty").val("");
}

//set item to the dropdown
const setItem = () => {
    $("#itemIdSelect").empty();
    $("#itemIdSelect").append('<option value=" ">Select Item</option>');
    itemsArray.map((item) => {
        console.log(item._itemId);
        let data = `<option value="${item._itemId}">${item._name}</option>`
        $("#itemIdSelect").append(data);
    });
}
//search item
$("#itemSearch").on("click", () => {
    let itemId = $("#itemIdSelect").val();
    let item = itemsArray.find((item) => item._itemId === itemId);
    $("#itemCode").val(item._itemId);
    $("#itemName").val(item._name);
    $("#itemAmount").val(item._unitPrice);
    $("#itemQty").val(item._quantity);
})