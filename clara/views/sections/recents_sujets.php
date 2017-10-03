<?php
require_once "model/bdd.php";
?>
<section class="last-sujet-list">
    <h2>Sujet récents</h2>
    <div class="box_row">
        <!--      --><?php //for ($i = 0; $i < 5; ++$i): ?>
        <!--          <div class="box box-s">-->
        <!--              <a>SUJETS</a>-->
        <!--          </div>-->
        <!--      --><?php //endfor; ?>
      <?php
      $tab = model\bdd::get_list_recent_sujet();
      for ($i = 0; $i < count($tab); ++$i): ?>
          <div class="box box-s op<?php echo (10 - $i) + 4 ?>0">
              <a href="clara.php?id=<?php echo $tab[$i]['id'] ?>"><?php echo $tab[$i]['name'] ?></a>
          </div>
      <?php endfor; ?>
    </div>
</section>