<?php
$nb_blc = isset($_POST['nb_blocs']) ? $_POST['nb_blocs'] : 0;
//var_dump($nb_blc, $_POST);
for ($i = 1; $i <= $nb_blc; $i++):?>
    <?php if (!isset($_POST['blc_' . $i . '_type'])) $i++; ?>
        <div class="panel panel-<?php echo isset($_POST['blc_' . $i . '_type']) ?  $_POST['blc_' . $i . '_type'] :''?>">
            <div class="panel-heading">
                <i class="fa fa-file"></i>
                <p><?php echo isset($_POST['blc_' . $i . '_name']) ? $_POST['blc_' . $i . '_name'] : '' ?></p>
            </div>
            <div class="panel-body">
                <?php echo isset($_POST['blc_' . $i . '_content']) ? $_POST['blc_' . $i . '_content'] . PHP_EOL : '' ?>
            </div>
        </div>
<?php endfor; ?>