<?php
require_once __DIR__ . "/../../model/bdd.php";
?>
<section class="last-sujet-list">
    <h2>Tous les sujets</h2>
    <div class="box_row">
        <?php
        $tab = model\bdd::get_list_all_sujet();
        for ($i = 0; $i < count($tab); ++$i): ?>
            <div class="box box-s">
                <a><?php echo $tab[$i]['name'] ?></a>
            </div>
        <?php endfor; ?>
    </div>
</section>