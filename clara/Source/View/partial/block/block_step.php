<div class='blc blc-step'>
    <div class='blc-heading'>
        <a class='btn btn-danger btn-del-blc' data-type='danger'>
            <i class='fa fa-remove'></i> | Supprimer ce bloc
        </a>
        <h1>
            <i class='fa fa-fan'></i>
            <input class='size10' id='step_$id$_id' name='step_$id$_id' placeholder='Etape $id$'>
            <input class='size10' name='blc_$id$_name' placeholder='Titre'>
        </h1>
    </div>
    <input type='hidden' id='blc_$id$_content' name='blc_$id$_content'>
    <div id='edit_blc_$id$_content' class='blc-body' contenteditable='true'>
        <p>votre texte</p>
    </div>
    <input type='hidden' name='blc_$id$_type' value='default'>
</div>