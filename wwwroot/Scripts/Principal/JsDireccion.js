$(document).ready(function () {
    const _frm_direccion = "form[name=frm_direccion]";

    //genera DataTable para mostrar datos
    let tbl_direccion = CONFIG_GLOBAL.configDataTable({
        id_table: "#tbl_direccion", tbl_columns: [
            { data: "id_direccion" },
            { data: "calle" },
            { data: "colonia" },
            { data: "delegacion" },
            { data: "numero" },
            {
                data: "editar",
                render: function (data, type, row) {
                    const btn_actualizar = "<a class='btn btn-info btn-xs' ><i class='fa fa-pencil'></i> Editar </a>";
                    const btn_eliminar = "<a class='btn btn-danger btn-xs' ><i class='fa fa-pencil'></i> Eliminar </a>";

                    return btn_actualizar+" "+btn_eliminar;
                }
            },
        ], action: "Direccion\\Details"
    });


    $(_frm_direccion + " .btn-danger").on('click', function (e) {
        e.preventDefault();

        $(_frm_direccion).clearForm();
        $(_frm_direccion).hide();
        $(_frm_direccion).attr("action", "Create");
    });
    //CREA O EDITA direccion
    $(_frm_direccion).submit(function (e) {
        e.preventDefault();
        const frm_direccion = $(_frm_direccion);

        let user_data = frm_direccion.serializeObject();
        //accion a realizar puede ser Edit/Create
        const action = frm_direccion.attr('action');

        $.ajax({
            url: `${CONFIG_GLOBAL.url}\\Direccion\\${action}`,
            data: JSON.stringify(user_data),
            method: "POST",
            headers: {
                "RequestVerificationToken": user_data.__RequestVerificationToken
            },
            contentType: "application/json; charset=utf-8"
        })
            .done(showSuccess)//elemento creado
            .fail(showError);//error en el servidor
    });


    $("#tbl_direccion tbody").on('click', 'a.btn-info', function () {
        $(_frm_direccion).show();

        const row_sel = $(this).parents("tr");

        const row_data = tbl_direccion.row(row_sel).data();
        $(_frm_direccion + " :input").each(function () {
            const input = $(this);
            if (row_data[input.attr("name")])
            input.val(row_data[input.attr("name")]);
        });
        $(_frm_direccion + " .btn-danger").show();
        $(_frm_direccion).attr("action", "Edit");
    });

    //evento registro direccion eliminar
    $("#tbl_direccion tbody").on('click', 'a.btn-danger', function () {

        $('#modal-delete').modal('show');

        const row_sel = $(this).parents("tr");

        const sel_direccion = tbl_direccion.row(row_sel).data();
        $("#id_reg_sel").val(sel_direccion.id_direccion);
    });

    //tbl_direccion.ajax.reload();
    function showSuccess() {

        $(_frm_direccion).clearForm();
        $(_frm_direccion).hide();
        tbl_direccion.ajax.reload();
        alert("Registro actualizado");

    }
    function showError(e) {
        alert("Hubo un problema!!");
    }
});