<?php
require_once "model/clara.php";
?>
<section class="last-sujet-list">
    <h2>Tous les sujets</h2>
    <div class="box_row">
      <?php
      $tab = model\clara::get_list_all_sujet();
      for ($i = 2; $i < count($tab); ++$i): ?>
          <div class="box box-s">
              <a><?php echo $tab[$i] ?></a>
          </div>
      <?php endfor; ?>
    </div>
</section>