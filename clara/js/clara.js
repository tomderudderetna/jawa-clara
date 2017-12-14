/*
 ***********************************************************************************************************************
 Plugin Tab
 ***********************************************************************************************************************
 */
(function ($) {
    $.fn.tabParent = function () {
        return $(this.parents("table")[0]);
    };
    $.fn.tbodyParent = function () {
        return $(this.parents("tbody")[0]);
    };
    $.fn.rowParent = function () {
        return $(this.parent()[0]);
    };
    $.fn.createTr = function (length) {
        var str = "<tr>";
        for (var i = 0; i < length; i++) {
            str += "<td></td>";
        }
        return str + "</tr>";
    };
    $.fn.tabWith = function () {
        return this.rowParent().children().length
    };
    $.fn.tabHeigth = function () {
        return this.tbodyParent().children().length
    };
    $.fn.insertRowBefor = function () {
        $(this).tbodyParent()[0].insertBefore($($().createTr($(this).tabWith()))[0], $(this).rowParent()[0]);
    };
    $.fn.insertRowAfter = function () {
        $(this).tbodyParent()[0].insertBefore($($().createTr($(this).tabWith()))[0], $(this).rowParent()[0].nextSibling);
    };
    $.fn.insertColumnBefor = function () {
        this.tabParent().find("tr td:nth-child(" + ($(this).index() + 1) + ")").each(function () {
            $(this).before('<td></td>')
        });
    };
    $.fn.insertColumnAfter = function () {
        this.tabParent().find("tr td:nth-child(" + ($(this).index() + 1) + ")").each(function () {
            $(this).after('<td></td>')
        });
    };
    $.fn.removeRow = function () {
        console.log(this.tabHeigth());
        if (this.tabHeigth() <= 1) {
            this.removeTable();
        }
        this.rowParent().remove();
    };
    $.fn.removeColumn = function () {
        if (this.tabWith() <= 1) {
            this.removeTable();
        }
        console.log("width", $(this).tabWith());
        var str = "tr td:nth-child(" + ($(this).index() + 1) + ")";
        str += ", tr th:nth-child(" + ($(this).index() + 1) + ")";
        this.tabParent().find(str).each(function () {
            $(this).remove();
        });
    };
    $.fn.removeTable = function () {
        this.tabParent().remove();
    };
})(jQuery);
/*
 ***********************************************************************************************************************
 Plugin Jawa-Clara
 ***********************************************************************************************************************
 */
(function ($) {
    /*
    ********************************************************************************************************************
    * Fonctions
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
     * Fonction:        make
     * Description:     envoie le formulaire serialisé et génére le fichier
     */
    $.fn.make = function (callback) {
        download(rendering("render"), "sujeta.html", "text/plain");
        callback();
    };

    /*
     * Fonction:        drop
     * Actif:           lorsqu'un bloc est deposer dans une zone de drop.
     * Description:     on rajoute les evenement lier a ce bloc (ex: suppression).
     */
    $.fn.drop = function (ev, id) {
        ev.preventDefault();
        $('.target_drop').removeClass('drop_hover');
        tmp = null;
        $('#blocks').append(function () {
            nb_blocs++;
            switch (type) {
                case 'describ':
                    return pnl_proj_descriptions();
                    break;
                case 'step':
                    return pnl_proj_steps();
                    break;
                case 'warning':
                    return ($("#data-warning").attr("data-html"));
                    break;
                case 'danger':
                    return ($("#data-danger").attr("data-html"));
                    break;
                case 'info':
                    return ($("#data-info").attr("data-html"));
                    break;
                default:
            }
        });
        blind();
    };

    /*
     * Fonction:        table
     * Description:     insere une table.
     */
    $.fn.table = function (y, x) {
        var str = "<table class='table table-hover'>";
        for (i = 0; i < x; i++) {
            str += "\n                  <tr>";
            for (j = 0; j < y; j++)
                str += "\n                      <td>" + i + "-" + j + "</td>";
            str += "\n                 </tr>";
        }
        str += "\n               </table>";
        return str;
    };

    /*
     * Fonction:        code
     * Description:     insere un bloc de code.
     */
    $.fn.code = function () {
        return "<pre><code>" + prompt("type function name(type arg1, type arg2);") + "</code></pre>";
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
    $(".cmd-css[draggable*='true']")
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
 ***********************************************************************************************************************
 Global var
 ***********************************************************************************************************************
 */

var td = null;
var nb_steps = 0;
var nb_blocs = 0;
var tmp = null;
// var form_serial = null;

$(function () {

    /*
     * Evenement:
     * Actif:           lorque la page est correctement charger.
     * Description:     on initie les compteurs de block à 0, on blind les evenements.
     */

    blind();
    $('#blocks').sortable({
        cancel: ':input,button,.panel-body',
        placeholder: "ui-sortable-placeholder"
    });
    /*
     * evenements liés aux bouton de mise en forme du texte
     */
    $('.cmd-css')
        .off('click')
        .on('click', function (ev) {
            // console.log(this);
            var cmd = $(this).attr('data-cmd');
            var cmd_arg = $(this).attr('data-cmd-arg');
            switch (cmd) {
                case "table":
                    edit_table(cmd_arg);
                    break;
                case "insertTable":
                    var cmd_arg_x = prompt("largeur ?");
                    var cmd_arg_y = prompt("hauteur ?");
                    if (1 <= cmd_arg_x && cmd_arg_x < 10 && 1 <= cmd_arg_y && cmd_arg_y < 10) {
                        $('.cmd-css').commande("insertHTML", $().table(cmd_arg_x, cmd_arg_y));
                    }
                    else
                        alert("Saisie invalide.");
                    blind();
                    break;
                case "insertCode":
                    $().commande("insertHTML", $().code());
                    // console.log(("code"));
                    break;
                default:
                    $('.cmd-css').commande(cmd, cmd_arg);
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
        $().make();
    });
    $('#btn-download').click(function () {
        download("tom", "sujeta.html", "text/plain");
        // $().make(function () {
        // });
    })
});


function edit_table(cmd_arg) {
    $(td)[cmd_arg]();
    blind();
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

function pnl_proj_steps() {
    var text = ($("#data-step").attr("data-html"));
    return text.replace(/\{1}/g, ++nb_steps);
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
    $(document).mouseup(function (e) {
        var container = $(".table-menu");

        // if the target of the click isn't the container nor a descendant of the container
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            container.hide();
        }
    });
    $("table")
        .off('click')
        .on('click', function (ev) {
            $(".table-menu").show();
        });
    $("td, th")
        .off('click')
        .on('click', function (ev) {
            td = this;
        });

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
            // $('#nb_blocs').val(--window.nb_blocs);
            nb_blocs--;
            // debugger;
        });

    $(".blc > .blc-body, .panel > .panel-body")
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
    $("#overlay_preview > .page").html(rendering());
}

function overlay_hide(id) {
    document.getElementById(id).style.display = "none";
}

function rendering(type) {
    $("#overlay_preview > .page").empty();
    // var type = "preview";
    var pannel_type = {
        "module": "module",
        "project": "project",
        "step": "default",
        "warning": "warning",
        "danger": "forbidden",
        "info": "info"
    };
    var obj = get_form_blcs();
    if (type === "render") {
        var code = `<!DOCTYPE html>
<html>
    <head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>` + obj.param.module + ` - ` + obj.param.projet + `</title>
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css">
		<link rel="stylesheet" href="https://dl.etna-alternance.net/sujets/prism.css">
		<link rel="stylesheet" href="https://dl.etna-alternance.net/sujets/sujet-etna-new.css">
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
    console.log(code);
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
    $(".panel").each(function () {
        var blc = {};
        blc.type = $(this).data("type");
        blc.name = $($(this).find(".panel-heading > input")[0]).val();
        blc.content = $($(this).find(".panel-body")[0]).html();
        blcs.push(blc);
    });
    return {param: param, blcs: blcs};
}

$('#module_input')
    .on("change", function () {
        var pattern = new RegExp('^[A-Z]{3}-[A-Z0-9]{4}$');
        if (!pattern.test(this.value)) {
            // alert("\"" + this.value + "\" n'est pas un saisie valide");
            this.style.color = "red";
        }
        else
            this.style.color = "#fff";
    });