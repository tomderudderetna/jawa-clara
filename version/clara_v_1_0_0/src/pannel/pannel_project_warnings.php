<?php
$nb_warnings = isset($_POST['nb_warnings']) ? $_POST['nb_warnings'] : 0;
for ($i = 1; $i <= $nb_warnings; $i++):?>
    <div class="panel panel-warning">
        <div class="panel-heading">
            <i class="fa fa-exclamation-triangle"></i>
            <h3><?php echo $_POST['warning_' . $i . '_name'] ?></h3>
        </div>
        <div class="panel-body">
            <?php echo $_POST['warning_' . $i . '_content'] ?>
        </div>
    </div>
<?php endfor; ?>