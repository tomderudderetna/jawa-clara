/*
 * Fonction:        commande
 * Description:     applique une action passer en paramétre sur une div editable
 */
function commande(nom, argument) {
    typeof argument === 'undefined' ? argument = '' : null;
    document.execCommand(nom, false, argument);
}

/*
 * Fonction:        allowDrop
 * Actif:           lorsque un bloc peux etre deposer dans une zone de drop.
 * Description:     la zone de drop devient verte.
 */
function allowDrop(ev, id) {
    ev.preventDefault();
    $(id).addClass('green');
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
    $('.target_drop').removeClass('green');
    tmp = null;
    $('#blocks').after(function () {
        switch (type) {
            case 'describ':
                $('#nb_describs').val(++nb_describs);
                return pnl_proj_descriptions(nb_describs);
                break;
            case 'step':
                $('#nb_steps').val(++nb_steps);
                return pnl_proj_steps(nb_steps);
                break;
            case 'warning':
                $('#nb_warnings').val(++nb_warnings);
                return pnl_proj_warnings(nb_warnings);
                break;
            case 'danger':
                $('#nb_dangers').val(++nb_dangers);
                return pnl_proj_dangers(nb_dangers);
                break;
            case 'info':
                $('#nb_infos').val(++nb_infos);
                return pnl_proj_infos(nb_infos);
                break;
            default:
        }
    });
    blind();
}

$(document).ready(function () {
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
    tmp = null;
    blind();
    /*
     * evenements liés aux bouton de mise en forme du texte
     */
    $('.btn-css')
        .on('click', function (ev) {
            //evenement - click:    cliquer sur le bouton de mise en forme du texte
            commande($(this).attr('data-cmd'));
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
        $('#param_project').val($('#edit_param_project')[0].innerHTML);
        for (i = 1; i <= nb_steps; i++) {
            $('#step_' + i + '_id').val($('#edit_step_' + i + '_id')[0].innerHTML);
            $('#step_' + i + '_name').val($('#edit_step_' + i + '_name')[0].innerHTML);
            $('#step_' + i + '_content').val($('#edit_step_' + i + '_content')[0].innerHTML);
        }
        for (i = 1; i <= nb_describs; i++) {
            $('#describ_' + i + '_name').val($('#edit_describ_' + i + '_name')[0].innerHTML);
            $('#describ_' + i + '_content').val($('#edit_describ_' + i + '_content')[0].innerHTML);
        }
        for (i = 1; i <= nb_warnings; i++) {
            $('#warning_' + i + '_name').val($('#edit_warning_' + i + '_name')[0].innerHTML);
            $('#warning_' + i + '_content').val($('#edit_warning_' + i + '_content')[0].innerHTML);
        }
        for (i = 1; i <= nb_dangers; i++) {
            $('#danger_' + i + '_name').val($('#edit_danger_' + i + '_name')[0].innerHTML);
            $('#danger_' + i + '_content').val($('#edit_danger_' + i + '_content')[0].innerHTML);
        }
        for (i = 1; i <= nb_infos; i++) {
            $('#info_' + i + '_name').val($('#edit_info_' + i + '_name')[0].innerHTML);
            $('#info_' + i + '_content').val($('#edit_info_' + i + '_content')[0].innerHTML);
        }
        $('form').submit();
    });
});