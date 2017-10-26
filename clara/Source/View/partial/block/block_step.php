<div class='blc blc-step'>
    <div class='blc-heading'>
        <a class='btn btn-danger btn-del-blc' data-type='danger'>
            <i class='fa fa-remove'></i>
        </a>
        <h1>
            <i class='fa fa-flag'></i>
            <input class='size10' id='step_$id$_id' name='step_$id$_id' placeholder='Etape'>
            <input class='size10' name='blc_$id$_name' placeholder='Titre'>
        </h1>
    </div>
    <input type='hidden' class='blc_content' name='blc_$id$_content'>
    <div id='edit_blc_$id$_content' class='blc-body edit_blc_content' contenteditable='true'>
        <p>votre texte</p>
    </div>
    <input type='hidden' name='blc_$id$_type' value='step'>
</div>