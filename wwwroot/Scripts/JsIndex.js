
$(document).ready(function () {
    'use strict'
    $("#lnkPrincipal").click(function () {
        CONFIG_GLOBAL.loadBody("Usuario");
    });

    $("body").addClass("fixed");
    $("body").addClass("skin-red");

});