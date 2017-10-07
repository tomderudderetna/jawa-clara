<section>
    <!--bloc-->
    <div class='well'>
        <!--champs cachés quis seront remplis transmis avec le formulaire-->
        <input type='hidden' id='info_$id$_content' name='info_$id$_content'>
        <!--bouton pour supprimer le block-->
        <a class='btn btn-danger btn-del-blc' data-type='info'>
            <i class='fa fa-remove'></i> | Supprimer ce bloc
        </a>

        <div class='blc blc-info'>
            <div class='blc-heading'>
                <h1>
                    <i class='fa fa-info'></i>
                    <input class='size10' id='info_$id$_name' name='info_$id$_name' placeholder='Informations'>
                </h1>
            </div>
            <!--div editable qui remplira le champs caché 'info_$id$_content'-->
            <div id='edit_info_$id$_content' class='blc-body' contenteditable='true'></div>
        </div>
    </div>
</section>