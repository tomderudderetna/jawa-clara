<section>
    <!--bloc-->
    <div class='well'>
        <!--champs cachés quis seront remplis transmis avec le formulaire-->
        <input type='hidden' id='step_$id$_id' name='step_$id$_id'>
        <input type='hidden' id='step_$id$_name' name='step_$id$_name'>
        <input type='hidden' id='step_$id$_content' name='step_$id$_content'>
        <!--div editable qui remplira le champs caché 'step_$id$_id'-->
        <div class='form-group'>
            <label> <i class='fa fa-flag'></i> | nom etape<sup>*</sup> </label>
            <div id='edit_step_$id$_id' class='form-control input' contenteditable='true'> Etape$id$
            </div>
        </div>
        <!--div editable qui remplira le champs caché 'step_$id$_name'-->
        <div class='form-group'><label><i class='fa fa-flag'></i> | sous nom etape<sup>*</sup></label>
            <div id='edit_step_$id$_name' class='form-control input' contenteditable='true'>
                saisir un titre
            </div>
        </div>
        <!--div editable qui remplira le champs caché 'step_$id$_content'-->
        <div class='form-group'>
            <label> <i class='fa fa-flag'></i> | description etape<sup>*</sup> </label>
            <div id='edit_step_$id$_content' class='form-control multi input' contenteditable='true'>
                saisir un contenu
            </div>
        </div>
        <!--bouton pour supprimer le block-->
        <a class='btn btn-danger btn-del-blc' data-type='step'>
            <i class='fa fa-remove'></i> | Suprimer l'étape $id$
        </a>
    </div>
</section>