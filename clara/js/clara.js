/*
 ***********************************************************************************************************************
 Plugin Jawa Clara
 ***********************************************************************************************************************
 */

(function ($) {
    /*
    ********************************************************************************************************************
    Fonctions
    ********************************************************************************************************************
    */

    /*
    * Fonction:        commande
    * Description:     applique une action passer en paramétre sur une div editable
    */
    $.fn.commande = function (nom, argument) {
        typeof argument === 'undefined' ? argument = '' : null;
        document.execCommand(nom, false, argument);
        return this;
    };


    /*
    ********************************************************************************************************************
    Evenements
    ********************************************************************************************************************
    */

    /*
     * Evenement:
     * Actif:           lorsqu'on prend un bloc pour le deplacer.
     * Description:     on recupére le type de bloc est on le stock dans une GLOBAL.
     */
    $(".tool[draggable*='true']")
        .on('dragstart', function (ev) {
            type = $(this).data('type');
        });
    /*
     * Evenement:
     * Actif:           lorque l'on survole la zone de drop
     * Description:     on ajoute une classe sur la zone de drop.
     */
    $("#target_drop")
        .on('dragover', function (ev) {
            ev.preventDefault();
            $(this).addClass('drop_hover');
        });
})(jQuery);


/*
 * Fonction:        make
 * Description:     envoie le formulaire serialisé et génére le fichier
 */
function make(callback) {
    $('.blc_content').each(function () {
        $(this).val($(this).next('.edit_blc_content').html());
    });
    form_serial = $('form').serialize();
    // console.log(form_serial);
    //console.log(form_serial);
    for (var i = 1; i <= nb_blocs; i++) {
        form_serial = form_serial.replace(/step_%24id%24_id/, "step_" + i + "_id");
        form_serial = form_serial.replace(/blc_%24id%24_type/, "blc_" + i + "_type");
        form_serial = form_serial.replace(/blc_%24id%24_name/, "blc_" + i + "_name");
        form_serial = form_serial.replace(/blc_%24id%24_content/, "blc_" + i + "_content");
    }
    var oldaction = $('form')[0].action;
    var newaction = oldaction.replace("incluator", "make_sujet");
    var newaction = "http://localhost/generate";
    $('form').attr("action", newaction);
    download(rendering("render"), "sujet.html", "text/plain");
    // download(rendering(form_serial), "sujet.html", "text/plain");
    callback();
}


/*
 * Fonction:        drop
 * Actif:           lorsqu'un bloc est deposer dans une zone de drop.
 * Description:     on rajoute les evenement lier a ce bloc (ex: suppression).
 */
function drop(ev, id) {
    ev.preventDefault();
    // $('.target_drop').removeClass('green');
    $('.target_drop').removeClass('drop_hover');
    tmp = null;
    $('#blocks').append(function () {
        $('#nb_blocs').val(++window.nb_blocs);
        id = nb_blocs;
        switch (type) {
            case 'describ':
                return pnl_proj_descriptions(id);
                break;
            case 'step':
                return pnl_proj_steps(id);
                break;
            case 'warning':
                return ($("#data-warning").attr("data-html"));
                // return pnl_proj_warnings(id);
                break;
            case 'danger':
                return ($("#data-danger").attr("data-html"));
                // return pnl_proj_dangers(id);
                break;
            case 'info':
                return ($("#data-info").attr("data-html"));
                // return pnl_proj_infos(id);
                break;
            default:
        }
    });
    blind();
}

$(function () {

    /*
     * Evenement:
     * Actif:           lorque la page est correctement charger.
     * Description:     on initie les compteurs de block à 0, on blind les evenements.
     */
    nb_describs = 0;
    nb_steps = 0;
    nb_dangers = 0;
    nb_warnings = 0;
    nb_infos = 0;
    nb_blocs = 1;
    tmp = null;
    form_serial = null;
    blind();
    $('#blocks').sortable({
        cancel: ':input,button,.blc-body',
        placeholder: "ui-sortable-placeholder"
    });
    /*
     * evenements liés aux bouton de mise en forme du texte
     */
    $('.btn-css')
        .on('click', function (ev) {
            var cmd = $(this).attr('data-cmd');
            var cmd_arg = $(this).attr('data-cmd-arg');
            switch (cmd) {
                case "insertHTML":

                    cmd_arg = table(cmd_arg.charAt(0), cmd_arg.charAt(2));
                    $('.btn-css').commande(cmd, cmd_arg);
                    break;
                default:
                    $('.btn-css').commande(cmd, cmd_arg);
            }
        });
    /*
     * evenements liés aux bouton de validation du formulaire
     */
    $('#btn-valid-form').click(function resultat() {
        /*
         * Event:
         * Actif:       lorsqu'on clique sur le bouton cree.
         * Description: on rempli les champs cachées du formulaire par le contenu des div editable.
         */
        make();
    });
    $('#btn-download').click(function () {
        make(function () {
        });
    })
});

function table(x, y) {
    var str = "<table class='table table-hover'>\n              <tbody>";
    for (i = 0; i < x; i++) {
        str += "\n                  <tr>";
        for (j = 0; j < y; j++)
            str += "\n                      <td>" + i + "-" + j + "</td>";
        str += "\n                 </tr>";
    }
    str += "\n             </tbody>\n               </table>";
    return str;
}

$("#sujet_name").on("change", function () {
    var id = $.urlParam('id');
    var name = $(this).val();
    var url = "http://localhost/jawa-clara/clara/controllers/sujet/rename.php";
    var data = {
        name: name,
        id: id
    };
    $.post(url, data)
        .done(function (data) {
        });
});

$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
};

function pnl_proj_descriptions(id) {
    var text = ($("#data-describ").attr("data-html"));
    return text;
}

function pnl_proj_steps(id) {
    var text = ($("#data-step").attr("data-html"));
    return text;
}

function pnl_proj_dangers(id) {
    // var text = ;
    return text;
}

function pnl_proj_infos(id) {
    // var text = ;
    return text;
}

function pnl_proj_warnings(id) {
    // var text = ;
    return text;
}

/*
 * Fonction:        blind
 * Description:     on ajoute les evenement attaché au html (ex: bouton de suppression).
 */
function blind() {
    /*
     * evenements liés aux divs editables
     */
    $('div.input')
        .off('paste')
        .on('paste', function (event) {
            //evenement - past:    coller un text dans la div editable
            event.preventDefault();
            var text = event.originalEvent.clipboardData.getData("text/plain");
            document.execCommand("insertHTML", false, text.replace(/\n/g, "</br>"));
        })
        .off('drop')
        .on('drop', function (event) {
            event.preventDefault();
            var text = event.originalEvent.dataTransfer.getData("text/plain");
            text = text.replace(/•/g, "");
            text = "<p>" + text + "</p>";
            text = text.replace(/\n/g, "</p><p>");
            $(this).html(text);
        })
        .off('DOMSubtreeModified')
        .on('DOMSubtreeModified', function () {
            //evenement - DOMSubtreeModified:    modifier une div editable
            this.innerHTML !== "" ? $(this).addClass("input-valid") : $(this).removeClass("input-valid");
        })
        .each(function () {
            //fonction - each:  parcourir la selection
            this.innerHTML !== "" ? $(this).addClass("input-valid") : $(this).removeClass("input-valid");
        });
    /*
     * evenements liés aux bouton supprimer d'un bloc de saisie
     */
    $('.btn-del-blc')
        .off('click')
        .on('click', function () {
            //evenement - click:    cliquer sur le bouton supprimer d'un bloc de saisie
            $(this).parent().parent().remove();
            $('#nb_blocs').val(--window.nb_blocs);
        });

    $(".blc > .blc-body")
        .each(function () {
            $(this)
                .off("focus")
                .on("focus", function () {
                    if ($(this).html() == "")
                        $(this).html("<p>votre texte</p>");
                })
                .off("focusout")
                .on("focusout", function () {
                    if ($(this).html() == "<p></p>" || $(this).html() == "<p><br></p>")
                        $(this).html("");
                });
        });
}

function overlay_show(id) {
    document.getElementById(id).style.display = "block";
    $("#" + id + "> .page").html(rendering());
    // $("#" + id + "> .page > iframe").contents("<h1>toto</h1>");
    // console.log($("#" + id + "> .page > iframe").contents());
    // $("#" + id + "> .page > iframe").contents(rendering());
    // debugger;
    // make(function () {
    //     $("#page2 > iframe").attr("src", "sujet");
    // document.getElementById(id).style.display = "block";
    // });
}

function overlay_hide(id) {
    document.getElementById(id).style.display = "none";
}

function rendering(type) {
    // var type = "preview";
    var pannel_type = {
        "param": "module",
        "describ": "project",
        "step": "default",
        "warning": "warning",
        "danger": "forbidden",
        "info": "info"
    };
    var obj = get_form_blcs();
    console.log(obj);
    if (type === "render") {
        // debugger;
        var code = `<!DOCTYPE html>
<html>
    <head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>` + obj.param.module + ` - ` + obj.param.projet + `</title>
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css">
		<link rel="stylesheet" href="https://dl.etna-alternance.net/css/prism.css">
		<link rel="stylesheet" href="https://dl.etna-alternance.net/css/sujet-etna-new.css">
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.8.3/prism.js"></script>
	</head>
    <body>`;
    }
    else {
        var code = ``;
    }

    obj.blcs.forEach(function (e) {
        code += `
    <div class="panel panel-` + pannel_type[e.type] + `">
            <div class="panel-heading">` + e.name + `
            </div>
		    <div class="panel-body">` + e.content + `</div>
	</div>`;
    });
    if (type === "render") {
        return code += `
    </body>
</html>`;
    }
    else {
        return code;
    }
}

function get_form_blcs() {
    var param = {module: $($("[data-name*='module']")[0]).val(), projet: $($("[data-name*='projet']")[0]).val()};
    var blcs = [];
    $(".blc").each(function () {
        var blc = {};
        blc.type = $(this).data("type");
        blc.name = $($(this).find("[data-name*='blc_name']")[0]).val();
        blc.content = $($(this).find("[data-name*='blc_content']")[0]).html();
        blcs.push(blc);
    });
    return {param: param, blcs: blcs};
}