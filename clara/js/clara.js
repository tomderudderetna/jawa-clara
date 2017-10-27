/*
(function($) {
  $.fn.gis = function()
  {
    this.each(function() {
      $(this).wrap('<b><i><u></u></i></b>');
    });
    return this;
  };
})(jQuery);
*/

/*
 * Fonction:        make
 * Description:     envoie le formulaire serialisé et génére le fichier
 */
function make(callback) {
    $('.blc_content').each(function () {
        $(this).val($(this).next('.edit_blc_content').html());
        // console.log($(this).next('.edit_blc_content').html());
    });
    // $('#blocks').children().each(function () {
    //     var content = $($(this).find("div")[1]).html();
    //     // console.log(content);
    //     $(this).find("input:hidden").val(content);
    //     console.log($(this).find("input:hidden").val());
    // });
    form_serial = $('form').serialize();
    // console.log(form_serial);
    //console.log(form_serial);
    for (var i = 1; i <= nb_blocs; i++) {
        form_serial = form_serial.replace(/step_%24id%24_id/, "step_" + i + "_id");
        form_serial = form_serial.replace(/blc_%24id%24_type/, "blc_" + i + "_type");
        form_serial = form_serial.replace(/blc_%24id%24_name/, "blc_" + i + "_name");
        form_serial = form_serial.replace(/blc_%24id%24_content/, "blc_" + i + "_content");
    }
    //console.log(form_serial);


    var oldaction = $('form')[0].action;
    var newaction = oldaction.replace("incluator", "make_sujet");
    var newaction = "http://localhost/generate";
    $('form').attr("action", newaction);
    download(rendering(form_serial), "sujet.html", "text/plain");
    // make();
    /*$.post($('form')[0].action, form_serial)
        .done(function (data) {
            console.log(data);
            var newaction = "http://localhost/jawa-clara/clara/views/render/index.php";
            $('form').attr("action", newaction);
            if (callback)
                callback();

            // $('#blocks').html(html);
        });*/
    callback();
}

/*
 * Fonction:        commande
 * Description:     applique une action passer en paramétre sur une div editable
 */
function commande(nom, argument) {
    typeof argument === 'undefined' ? argument = '' : null;
    // console.log(nom + ' ' + argument);
    document.execCommand(nom, false, argument);
}

/*
 * Fonction:        allowDrop
 * Actif:           lorsque un bloc peux etre deposer dans une zone de drop.
 * Description:     la zone de drop devient verte.
 */
function allowDrop(ev, id) {
    ev.preventDefault();
    // $(id).addClass('green');
    $(id).addClass('drop_hover');
}

/*
 * Fonction:        drag
 * Actif:           lorsqu'on prend un bloc pour le deplacer.
 * Description:     on recupére le type de bloc est on le stock dans une GLOBAL.
 */
function drag(ev) {
    type = $(ev.srcElement).data('type');
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
                return pnl_proj_warnings(id);
                break;
            case 'danger':
                return pnl_proj_dangers(id);
                break;
            case 'info':
                return pnl_proj_infos(id);
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
                    //console.log(cmd_arg);
                    commande(cmd, cmd_arg);
                    break;
                default:
                    commande(cmd, cmd_arg);
            }
            //evenement - click:    cliquer sur le bouton de mise en forme du texte
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
            //$("#file-download")[0].click();
        });
    })
});

function table(x, y) {
    var str = "<table class='table table-hover'><tbody>";
    // alert("x = " + x + ", y = " + y);
    for (i = 0; i < x; i++) {
        str += "<tr>";
        for (j = 0; j < y; j++)
            str += "<td>" + i + "-" + j + "</td>";
        str += "</tr>";
    }
    str += "</tbody></table>";
    return str;
}

function submitForm() {
    document.form.target = "myActionWin";
    window.open("myActionWin", "myActionWin", "width=800,height=800,toolbar=0");
    document.form.submit();
}

function save_sujet() {
    var url = "http://localhost/jawa-clara/clara/actions/change_state.php";
    $.post(url)
        .done(function (data) {
            //console.log(data);
        });
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
            //console.log(data);
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
    var text = ($("#data-danger").attr("data-html"));
    return text;
}

function pnl_proj_infos(id) {
    var text = ($("#data-info").attr("data-html"));
    return text;
}

function pnl_proj_warnings(id) {
    var text = ($("#data-warning").attr("data-html"));
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
    make(function () {
        $("#page2 > iframe").attr("src", "sujet");
        document.getElementById(id).style.display = "block";
    });
}

function overlay_hide(id) {
    document.getElementById(id).style.display = "none";
}

function rendering() {
    var pannel_type = {
        "param": "primary",
        "describ": "project",
        "": ""
    };
    var fa_type = {
        "param": "cogs",
        "describ": "book",
        "": ""
    };
    var obj = generator();
    var code = `<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title></title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.5.0/styles/monokai-sublime.min.css">
        <link rel="stylesheet" href="https://dl.etna-alternance.net/css/sujet-etna.css">
    </head>
    <body>`;
    obj.forEach(function (e) {
        code += `<div class="panel panel-` + pannel_type[e.type] + `">
		<div class="panel-heading">
			<i class="fa fa-` + fa_type[e.type] + `"></i>
			<h3>` + e.name + `</h3>
		</div>
		<div class="panel-body">` + e.content + `</div>
	</div>`;
    });
    return code += `<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.5/ace.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.6.0/highlight.min.js"></script>
        <script>
            $(function () {
                $("code").each(function (i, block) {
                    hljs.highlightBlock(block);
                });
                const ids = $(".coding");
                var jqPre = $(".ace");
                for (var idi = 0; idi < ids.length; idi++) {
                    var id = ids[idi],
                        editor = ace.edit(id),
                        jqEditor = $(id),
                        mode = jqEditor.attr("data-mode"),
                        fontSize = 12,
                        lineHeight = 16,
                        lines = editor.session.getLength();
                    editor.getSession().setMode("ace/mode/" + mode);
                    editor.setTheme("ace/theme/monokai");
                    editor.setReadOnly(true);
                    editor.setHighlightActiveLine(true);
                    editor.setShowPrintMargin(false);
                    jqEditor.css({
                        "font-size": fontSize + "px",
                        "line-height": lineHeight + "px",
                        "height": ( lineHeight * lines ) + "px"
                    });
                }
                jqPre.css("background-color", "#272822")
            });
        </script>
    </body>
</html>`;
}

function generator() {
    var blcs = [];
    $(".blc").each(function () {
        var blc = {};
        blc.type = $(this).data("type");
        blc.name = $($(this).find("[data-name*='blc_name']")[0]).val();
        blc.content = $($(this).find("[data-name*='blc_content']")[0]).html();
        blcs.push(blc);
    });
    return blcs;
}