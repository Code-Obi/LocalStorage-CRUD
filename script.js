"use strict";
let inputBox = document.querySelector("#inputBox");
let addBtn = document.querySelector("#addBtn");
let msg = document.querySelector("#middlePart");
let tbody = document.querySelector("#root");
let idNum = null;
document.addEventListener("DOMContentLoaded", loadData);
addBtn.addEventListener("click", () => {
    let inputText = inputBox.value;
    if (inputText === "") {
        msg.innerHTML = "Please Enter The Value First !";
    } else {
        if (idNum === null) {
            let arr = getData();
            if (arr === null) {
                setData([inputText]);
            } else {
                arr.push(inputText);
                setData(arr);
            }
        } else {
            let arr = getData();
            arr[idNum] = inputBox.value;
            setData(arr);
            loadData();
            addBtn.value = "Add Data";
            inputBox.value = "";
            msg.innerHTML = "Record Edited Sucessfully !";
            setTimeout(() => {
                msg.innerHTML = "";
            }, 1500);
            return;
        };
        inputBox.value = "";
        msg.innerHTML = "Record Added Sucessfully !";
    };
    setTimeout(() => {
        msg.innerHTML = "";
    }, 1500);
    loadData();
});


function getData() {
    let data = JSON.parse(localStorage.getItem("crud"));
    return data;
};
function setData(sendData) {
    localStorage.setItem("crud", JSON.stringify(sendData));
};


function loadData() {
    let display = getData() || [];

    let html = "";
    let sNo = 1;
    if (display !== null) {
        display.forEach((info, k) => {
            html += `
        <tr>
            <td>${sNo++}</td>
            <td>${info}</td>
            <td>
            <a href="javascript:void(0)" onclick="editData(${k})" class="editBtn">Edit</a>&nbsp;&nbsp;
            <a href="javascript:void(0)" onclick="deleteData(${k})" class="deleteBtn">Delete</a>
            </td>
        </tr>`;
        });
        tbody.innerHTML = html;
    }
};
function deleteData(rid) {
    let data = getData();
    data.splice(rid, 1);
    setData(data);
    loadData();
};
function editData(rid) {
    idNum = rid;
    let data = getData();
    inputBox.value = data[rid];
    addBtn.value = "Edit Data";
}; 
