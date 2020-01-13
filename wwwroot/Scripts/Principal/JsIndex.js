
$(document).ready(function () {
    let tbl_edicion;
    const _tbl_usuario = "#tbl_usuario";
    const _tbl_direccion = "#tbl_direccion";
    const _frm_usuario = "form[name = frm_usuario]";
    const _frm_direccion = "form[name=frm_direccion]";
    $(_frm_usuario + " .btn-danger").hide();
    $(_frm_direccion + " .btn-danger").hide();
    $(_frm_direccion).hide();
    $("#btn_elimina").off();

    $.getScript(`${CONFIG_GLOBAL.url_scripts}/Principal/JsUsuario.js`);
    $.getScript(`${CONFIG_GLOBAL.url_scripts}/Principal/JsDireccion.js`);

    $("#tbl_usuario tbody").on('click', 'tr', function () {
        tbl_edicion = "#tbl_usuario";
        $(_frm_direccion).hide();
        $(_tbl_direccion).show();

        const sel_row = $(this);
        const tbl_usuario = $(_tbl_usuario).DataTable();
        const id_direccion = tbl_usuario.row(sel_row).data().id_direccion;
        const id_usuario = tbl_usuario.row(sel_row).data().id_usuario;
        console.log(id_direccion);
        $(_frm_direccion + " input[name=id_direccion]").val(id_direccion);
        $(_frm_direccion + " input[name=id_usuario]").val(id_usuario);

        if (!id_direccion)
            $(_frm_direccion).show();

        enlazaDireccion(id_direccion?id_direccion:0);

    });
    $(_frm_usuario + " .btn-danger").on('click', function (e) {
        $(_frm_direccion).hide();
    });
    $(_frm_direccion+ " .btn-danger").on('click', function (e) {
        $(_frm_direccion).hide();
    });

    $("#tbl_direccion tbody").on('click', 'tr', function () {
        tbl_edicion = "#tbl_direccion";
    });

    //evento de boton para confirmación de eliminacion de usuario
    $("#btn_elimina").on('click', function (e) {

        const id_usuario = $("#id_reg_sel").val();
        const controller = tbl_edicion === "#tbl_direccion" ? "Direccion" : "Usuario";
        let user_data = $(_frm_usuario).serializeObject();
        $.ajax({
            url: `${CONFIG_GLOBAL.url}/${controller}/Delete/${id_usuario}`,
            method: "POST",
            headers: {
                "RequestVerificationToken": user_data.__RequestVerificationToken
            },
            contentType: "application/json; charset=utf-8"
        })
            .done(showSuccess)//elemento creado
            .fail(showError);//error en el servidor
        $('#modal-delete').modal('hide');
    });


    function enlazaDireccion(id_direccion) {
        
            $(_tbl_direccion).DataTable()
                .column(0)
                .search(id_direccion)
                .draw();
        
        
    }
    function showSuccess() {

        $(_frm_usuario).clearForm();
        $(_tbl_usuario).DataTable().ajax.reload();
        $(_tbl_direccion).DataTable().ajax.reload();
        
        alert("Registro actualizado");

    }
    function showError(e) {
        alert("Hubo un problema!!");
    }
});