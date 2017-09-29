<section>
    <!--bloc-->
    <div class='well'>
        <!--champs cachés quis seront remplis transmis avec le formulaire-->
        <input type='hidden' id='step_$id$_content' name='step_$id$_content'>
        <!--bouton pour supprimer le block-->
        <a class='btn btn-danger btn-del-blc' data-type='step'>
            <i class='fa fa-remove'></i> | Suprimer l'étape $id$
        </a>

        <div class='blc blc-step'>
            <div class='blc-heading'>
                <h1>
                    <i class='fa fa-flag'></i>
                    <input class='size10' id='step_$id$_id' name='step_$id$_id' placeholder='Etape $id$'>
                    <input class='size10' id='step_$id$_name' name='step_$id$_name' placeholder='Titre'>
                </h1>
            </div>
            <!--div editable qui remplira le champs caché 'step_$id$_content'-->
            <div id='edit_step_$id$_content' class='blc-body' contenteditable='true'></div>
        </div>
    </div>
</section>