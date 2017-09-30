<section class="last-sujet-list">
    <h2>Tous les sujets</h2>
    <div class="box_row">
      <?php
      $tab = [];
      $str = realpath(__DIR__ . "/../../../files");
      $tab = scandir($str);
      for ($i = 2; $i < count($tab); ++$i): ?>
          <div class="box box-s">
              <a><?php echo $tab[$i] ?></a>
          </div>
      <?php endfor; ?>
    </div>
</section>