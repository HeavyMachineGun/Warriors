let data_table = {

    languaje: {
        sSearch: "Buscar:",
        oPaginate: {
            sFirst: "Primera Pagina", // This is the link to the first page
            sPrevious: "Anterior", // This is the link to the previous page
            sNext: "Siguiente", // This is the link to the next page
            sLast: "Última Página" // This is the link to the last page
        },
        sLengthMenu: "Mostrar _MENU_ registros",
        sZeroRecords: "No se ha encrontrado.",
        sInfo: "Página _PAGE_ de _PAGES_ . Numero de registros: _TOTAL_",
        sInfoEmpty: "No hay registros disponibles",
    },
    initTable: function (options) {
        var data_tbl = $(options["id_table"]).DataTable({
            ajax: {
                url: `${CONFIG_GLOBAL.url}\\${options["action"]}`,
                method: "GET",
                contentType: "application/json; charset=utf-8",
                dataType:"json",
                dataSrc: "",
                error: function (xhr, error, code) {
                    console.log(xhr);
                    console.log(error);

                    console.log(code);
                }
            },
            responsive: true,
            columns: options["tbl_columns"],
            select: {
                style: 'single'
            },
            responsive: true,
            oLanguage: data_table["languaje"]
        });
        return data_tbl;
    }
}
var CONFIG_GLOBAL = {
    url: "https://localhost:44389",
    url_scripts: "https://localhost:44389/Scripts",
    loadBody: function (view) {
        $("#bodyContent").load(`${this.url}\\${view}`);
    },
    /**
     * 
     * @param {any} options
     * id_table
     * tbl_columns
     * action -> llamada get para cargar datos tabla
     */
    configDataTable: function (options) {
        return data_table.initTable(options);
    }

};
$.fn.clearForm = function () {
    frm_name=$(this)[0].name;

    $(`form[name=${frm_name}] :input`).each(function () {
        let input = $(this);
        if (input.attr("name") !== "__RequestVerificationToken") {
            input.val('');
        }
    });
}
$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};