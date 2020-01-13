
$(document).ready(function () {
    const _frm_usuario = "form[name = frm_usuario]";
    const _tbl_usuario = "#tbl_usuario";
    //usuario seleccionado de tabla
    let sel_usuario;

    //genera DataTable para mostrar datos
    const tbl_usuarios = CONFIG_GLOBAL.configDataTable({
        id_table: _tbl_usuario, tbl_columns: [
            {
                data: "id_usuario",
                visible:false
            },
            { data: "nombre" },
            { data: "paterno" },
            { data: "materno" },
            { data: "edad" },
            {
                data: "id_direccion",
                visible:false
            }, {
                data: "editar",
                render: function (data, type, row) {

                    //const btn_agregar = "<a class='btn btn-primary btn-xs' ><i class='fa fa-pencil'></i> Agregar </a>";
                    const btn_actualizar = "<a class='btn btn-info btn-xs' ><i class='fa fa-pencil'></i> Editar </a>";
                    const btn_eliminar = "<a class='btn btn-danger btn-xs' ><i class='fa fa-pencil'></i> Eliminar </a>";

                    return btn_actualizar+" "+ btn_eliminar;
                    

                }
            }
        ], action: "Usuario\\Details"
    });
    
    //limpia el formulario
    $(_frm_usuario + " .btn-danger").on('click', function (e) {
        e.preventDefault();
        $(_frm_usuario).clearForm();

        btn_cancelar = $(this);
        btn_cancelar.hide();
        $(_frm_usuario).attr("action", "Create");
    });
    //CREA O EDITA USUARIO
    $(_frm_usuario).submit(function (e) {
        e.preventDefault();
        const frm_usuario = $(_frm_usuario);

        let user_data = frm_usuario.serializeObject();
        //accion a realizar puede ser Edit/Create
        const action = frm_usuario.attr('action');

        $.ajax({
            url: `${CONFIG_GLOBAL.url}\\Usuario\\${action}`,
            data: JSON.stringify(user_data),
            method: "POST",
            headers: {
                "RequestVerificationToken": user_data.__RequestVerificationToken
            },
            contentType: "application/json; charset=utf-8"
        })
            .done(showSuccess)//elemento creado
            .fail(showError);//error en el servidor
        $(_frm_usuario).attr("action", "Create");
        $(_frm_usuario+" .btn-danger").hide();

    });


    $(_tbl_usuario + " tbody").on('click', 'a.btn-info', function () {

        const row_sel = $(this).parents("tr");

        const usr_data = tbl_usuarios.row(row_sel).data();
        $(_frm_usuario + " :input").each(function () {
            const input = $(this);
            if (usr_data[input.attr("name")])
            input.val(usr_data[input.attr("name")]);
        });
        $(_frm_usuario + " .btn-danger").show();
        $(_frm_usuario).attr("action", "Edit");
    });



    //evento registro usuario eliminar
    $(_tbl_usuario+" tbody").on('click', 'a.btn-danger', function () {
        
        $('#modal-delete').modal('show');

        const row_sel = $(this).parents("tr");

        sel_usuario = tbl_usuarios.row(row_sel).data();

        $("#id_reg_sel").val(sel_usuario.id_usuario);
    });

    //tbl_usuarios.ajax.reload();
    function showSuccess() {

        $(_frm_usuario).clearForm();
        tbl_usuarios.ajax.reload();
        alert("Registro actualizado");
        
    }
    function showError(e) {
        alert("Hubo un problema!!");
    }
});