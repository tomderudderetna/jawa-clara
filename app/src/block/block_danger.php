<section>
    <!--bloc-->
    <div class='well'>
        <!--champs cachés quis seront remplis transmis avec le formulaire-->
        <input type='hidden' id='danger_$id$_name' name='danger_$id$_name'>
        <input type='hidden' id='danger_$id$_content' name='danger_$id$_content'>
        <!--div editable qui remplira le champs caché 'danger_$id$_name'-->
        <div class='form-group'>
            <label><i class='fa fa-ban'></i> | sous nom etape<sup>*</sup></label>
            <div id='edit_danger_$id$_name' class='form-control input' contenteditable='true'>
                saisir un titre
            </div>
        </div>
        <!--div editable qui remplira le champs caché 'danger_$id$_content'-->
        <div class='form-group'>
            <label>
                <i class='fa fa-ban'></i> | description etape<sup>*</sup>
            </label>
            <div id='edit_danger_$id$_content' class='form-control multi input' contenteditable='true'>
                saisir un contenu
            </div>
        </div>
        <!--bouton pour supprimer le block-->
        <a class='btn btn-danger btn-del-blc' data-type='danger'>
            <i class='fa fa-remove'></i> | Suprimer l'étape $id$
        </a>
    </div>
</section>