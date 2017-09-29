<?php
$nb_infos = isset($_POST['nb_infos']) ? $_POST['nb_infos'] : 0;
for ($i = 1; $i <= $nb_infos; $i++):?>
    <div class="panel panel-info">
        <div class="panel-heading">
            <i class="fa fa-info"></i>
            <h3><?php echo $_POST['info_' . $i . '_name'] ?></h3>
        </div>
        <div class="panel-body">
          <?php echo $_POST['info_' . $i . '_content'] ?>
        </div>
    </div>
<?php endfor; ?>