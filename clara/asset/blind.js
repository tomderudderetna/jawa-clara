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
            switch ($(this).attr("data-type")) {
                case 'describ':
                    $('#nb_describs').val(--window.nb_describs);
                    break;
                case 'step':
                    $('#nb_steps').val(--window.nb_steps);
                    break;
                case 'warning':
                    $('#nb_warnings').val(--window.nb_warnings);
                    break;
                case 'danger':
                    $('#nb_dangers').val(--window.nb_dangers);
                    break;
                case 'info':
                    $('#nb_infos').val(--window.nb_infos);
                    break;
                default:
            }
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