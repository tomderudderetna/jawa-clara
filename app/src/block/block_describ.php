<section>
    <!--bloc-->
    <div class='well'>
        <!--champs cachés quis seront remplis transmis avec le formulaire-->
        <input type='hidden' id='describ_$id$_name' name='describ_$id$_name'>
        <input type='hidden' id='describ_$id$_content' name='describ_$id$_content'>
        <!--div editable qui remplira le champs caché 'describ_$id$_name'-->
        <div class='form-group'><label><i class='fa fa-book'></i> | sous nom description<sup>*</sup></label>
            <div id='edit_describ_$id$_name' class='form-control input' contenteditable='true'>
                saisir un titre
            </div>
        </div>
        <!--div editable qui remplira le champs caché 'describ_$id$_content'-->
        <div class='form-group'>
            <label> <i class='fa fa-book'></i> | description description<sup>*</sup> </label>
            <div id='edit_describ_$id$_content' class='form-control multi input' contenteditable='true'>
                saisir un contenu
            </div>
        </div>
        <!--bouton pour supprimer le block-->
        <a class='btn btn-danger btn-del-blc' data-type='describ'>
            <i class='fa fa-remove'></i> | Suprimer l'étape $id$
        </a>
    </div>
</section>