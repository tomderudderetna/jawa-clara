<section>
    <!--bloc-->
    <div class='well'>
        <!--champs cachés quis seront remplis transmis avec le formulaire-->
        <input type='hidden' id='warning_$id$_content' name='warning_$id$_content'>
        <!--bouton pour supprimer le block-->
        <a class='btn btn-danger btn-del-blc' data-type='warning'>
            <i class='fa fa-remove'></i> | Supprimer ce bloc
        </a>

        <div class='blc blc-warning'>
            <div class='blc-heading'>
                <h1>
                    <i class='fa fa-exclamation-triangle'></i>
                    <input class='size10' id='warning_$id$_name' name='warning_$id$_name' placeholder='Attention !'>
                </h1>
            </div>
            <!--div editable qui remplira le champs caché 'warning_$id$_content'-->
            <div id='edit_warning_$id$_content' class='blc-body' contenteditable='true'></div>
        </div>
    </div>
</section>