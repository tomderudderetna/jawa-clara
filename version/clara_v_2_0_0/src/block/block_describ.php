<section>
    <!--bloc-->
    <div class='well'>
        <!--champs cachés quis seront remplis transmis avec le formulaire-->
        <input type='hidden' id='describ_$id$_content' name='describ_$id$_content'>
        <!--bouton pour supprimer le block-->
        <a class='btn btn-danger btn-del-blc' data-type='describ'>
            <i class='fa fa-remove'></i> | Supprimer ce bloc
        </a>

        <div class='blc blc-project'>
            <div class='blc-heading'>
                <h1>
                    <i class='fa fa-book'></i>
                    <input class='size10' id='describ_$id$_name' name='describ_$id$_name' placeholder='Projet'>
                </h1>
            </div>
            <!--div editable qui remplira le champs caché 'describ_$id$_content'-->
            <div id='edit_describ_$id$_content' class='blc-body' contenteditable='true'></div>
        </div>
    </div>
    </div>
</section>
