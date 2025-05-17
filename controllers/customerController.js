import {customersArray} from "../db/db.js";
import customerModel from "../models/customerModel.js";

//load all customers
function loadAllCustomers() {
    $("#customerTableBody").empty();

    customersArray.map((customer) => {
        let customerId = customer._customerId;
        let name = customer._name;
        let address = customer._address;
        let telephone = customer._telephone;

        let data = `<tr>
                        <td>${customerId}</td>
                        <td>${name}</td>
                        <td>${address}</td>
                        <td>${telephone}</td>
                        <td>
                            <button class="btn btn-sm btn-danger " id="deleteCustomer"><i class="fas fa-trash"></i></button>
                        </td>
                    </tr>`;
        $("#customerTableBody").append(data);
    });
}

//delete customer
$(document).on("click", "#deleteCustomer",(e) => {
    console.log("adsadsadsdsadsadsadsadasd")

    let customerId = $(e.target).closest("tr").find("td").eq(0).text();
    let index = customersArray.findIndex((customer) => customer._customerId === customerId);
    customersArray.splice(index, 1);
    loadAllCustomers();

    Swal.fire({
        title: 'success',
        text: 'Customer deleted successfully',
        icon: 'success',
        confirmButtonText: 'OK'
    });
});

//save customer
$("#customerSave").on("click", () => {
    console.log("clicked");
    let customerId = $("#customerId").val();
    let name = $("#name").val();
    let address = $("#address").val();
    let telephone = $("#telephone").val();

    if (customerId === "" || name === "" || address === "" || telephone === "") {
        Swal.fire({
            title: 'error',
            text: 'All fields are required',
            icon: 'error',
            confirmButtonText: 'OK'
        })
    } else {
        let customer = new customerModel(customerId, name, address, telephone);
        customersArray.push(customer);
        console.log(customersArray);
        loadAllCustomers();
        clearText();

        Swal.fire({
            title: 'success',
            text: 'Customer added successfully',
            icon: 'success',
            confirmButtonText: 'OK'
        });
    }
});
//update customer
$("#customerUpdate").on("click", () => {
    let customerId = $("#customerId").val();
    let name = $("#name").val();
    let address = $("#address").val();
    let telephone = $("#telephone").val();

    if (customerId === "" || name === "" || address === "" || telephone === "") {
        Swal.fire({
            title: 'error',
            text: 'All fields are required',
            icon: 'error',
            confirmButtonText: 'OK'
        })
    } else {
        let customer = customersArray.find((customer) => customer._customerId === customerId);
        customer._name = name;
        customer._address = address;
        customer._telephone = telephone;
        loadAllCustomers();
        clearText();

        Swal.fire({
            title: 'success',
            text: 'Customer updated successfully',
            icon: 'success',
            confirmButtonText: 'OK'
        });
    }
});
//set customer
$("#customerTableBody").on("click", 'tr', function () {
    let customerId = $(this).find("td").eq(0).text();
    let customer = customersArray.find((customer) => customer._customerId === customerId);
    $("#customerId").val(customer._customerId);
    $("#name").val(customer._name);
    $("#address").val(customer._address);
    $("#telephone").val(customer._telephone);
});

//clear text
function clearText() {
    $("#customerId").val("");
    $("#name").val("");
    $("#address").val("");
    $("#telephone").val("");
}

//validate customers
$("#customerId").on("input", function() {
    let customerId = $(this).val();
    let customerIdError = "";
    if (customerId === "") {
        customerIdError = "Customer ID is required";
    } else if (!/^C\d{3,}$/.test(customerId)) {
        customerIdError = "Invalid customer ID format (e.g. C001)";
    }
    $("#customerIdError").text(customerIdError);
});

$("#name").on("input", function() {
    let name = $(this).val();
    let nameError = "";
    if (name === "") {
        nameError = "Name is required";
    } else if (!/^[a-zA-Z ]{4,}$/.test(name)) {
        nameError = "Name should be at least 4 characters";
    }
    $("#nameError").text(nameError);
});

// Validate address
$("#address").on("input", function() {
    let address = $(this).val();
    let addressError = "";
    if (address === "") {
        addressError = "Address is required";
    } else if (!/^[a-zA-Z\s]{5,}$/.test(address)) {
        addressError = "Invalid address format (e.g. Colombo)";
    }
    $("#addressError").text(addressError);
});

// Validate telephone
$("#telephone").on("input", function() {
    let telephone = $(this).val();
    let telephoneError = "";
    if (telephone === "") {
        telephoneError = "Contact is required";
    } else if (!/^\d{10}$/.test(telephone)) {
        telephoneError = "Contact number should be 10 digits (e.g. 0712345678)";
    }
    $("#telephoneError").text(telephoneError);
});
/*
//set customer contact to the drop down search
const loadCustomerContact = () => {
    $("#customerContactSelect").empty();
    $("#customerContactSelect").append('<option value=" ">Select Contact</option>');
    customersArray.map((customer) => {
        let data = `<option value="${customer._telephone}">${customer._telephone}</option>`
        $("#customerContactSelect").append(data);
    });
};
//search customer
$(document).on("click", "#customerSearch", () => {
    console.log("clicked");
    let customerContact = $("#customerContactSelect").val();
    let customer = customersArray.find((customer) => customer._telephone === customerContact);
    $("#customerId").val(customer._customerId);
    $("#name").val(customer._name);
    $("#address").val(customer._address);
    $("#telephone").val(customer._telephone);
});
*/
