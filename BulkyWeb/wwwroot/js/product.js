﻿var dataTable;

$(document).ready(function () {
    loadDataTable();
})

function loadDataTable() {
    dataTable = $('#tblData').DataTable({
        "ajax": { url: '/admin/product/getall' },
        "columns": [
            { data: 'title', "width": "15%" },
            { data: 'isbn', "width": "15%" },
            { data: 'price', "width": "15%" },
            { data: 'author', "width": "10%" },
            { data: 'category.name', "width": "15%" },
            {
                data: 'id',
                "render": function (data) {
                    return       `<div class="w-75 btn-group" role="group">
                    <a href="/admin/product/upsert?id=${data}" class="btn btn-primary rounded-pill mx-2"><i class="bi bi-pencil-square"></i>&nbsp;&nbsp;Edit</a>
                    <a onClick=Delete('/admin/product/delete?id=${data}') class="btn btn-danger rounded-pill mx-2"><i class="bi bi-trash"></i>&nbsp;&nbsp;Delete</a>

                    </div>`
                },
                "width": "20%"
            },
        ]
    });
}

function Delete(url) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: url,
                type: 'DELETE',
                success: function (data) {
                    dataTable.ajax.reload();
                    toastr.success(data.message);
                }
            })
        }
    })
}