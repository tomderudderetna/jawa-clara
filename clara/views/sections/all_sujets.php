<?php
require_once "model/clara.php";
require_once "model/bdd.php";
?>
<section class="last-sujet-list">
    <h2>Tous les sujets</h2>
    <div class="box_row">
      <?php
      $tab = model\bdd::get_list_all_sujet();
      for ($i = 0; $i < count($tab); ++$i): ?>
          <div class="box box-s op<?php echo -$i + count($tab) ?>0">
              <a><?php echo $tab[$i]['name'] ?></a>
          </div>
      <?php endfor; ?>
    </div>
</section>