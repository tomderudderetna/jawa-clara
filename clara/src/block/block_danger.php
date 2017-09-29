<section>
    <!--bloc-->
    <div class='well'>
        <!--champs cachés quis seront remplis transmis avec le formulaire-->
        <input type='hidden' id='danger_$id$_content' name='danger_$id$_content'>
        <!--bouton pour supprimer le block-->
        <a class='btn btn-danger btn-del-blc' data-type='danger'>
            <i class='fa fa-remove'></i> | Supprimer ce bloc
        </a>

        <div class='blc blc-danger'>
            <div class='blc-heading'>
                <h1>
                    <i class='fa fa-ban'></i>
                    <input class='size10' id='danger_$id$_name' name='danger_$id$_name' placeholder='Interdits !'>
                </h1>
            </div>
            <!--div editable qui remplira le champs caché 'info_$id$_content'-->
            <div id='edit_danger_$id$_content' class='blc-body' contenteditable='true'></div>
        </div>
    </div>
</section>
