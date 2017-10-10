<div class='blc blc-warning'>
    <div class='blc-heading'>
        <a class='btn btn-danger btn-del-blc' data-type='warning'>
            <i class='fa fa-remove'></i> | Supprimer ce bloc
        </a>
        <h1>
            <i class='fa fa-exclamation-triangle'></i>
            <input class='size10' name='blc_$id$_name' placeholder='Attention !'>
        </h1>
    </div>
    <input type='hidden' id='blc_$id$_content' name='blc_$id$_content'>
    <div id='edit_blc_$id$_content' class='blc-body' contenteditable='true'>
        <p>votre texte</p>
    </div>
    <input type='hidden' name='blc_$id$_type' value='warning'>
</div>