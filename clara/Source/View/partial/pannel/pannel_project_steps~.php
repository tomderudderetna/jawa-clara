<?php
$nb_steps = isset($_POST['nb_steps']) ? $_POST['nb_steps'] : 0;
for ($i = 1; $i <= $nb_steps; $i++):?>
        <div class="panel panel-default">
            <div class="panel-heading">
                <i class="fa fa-flag"></i>
                <h4><?php echo $_POST['step_' . $i . '_id'] ?></h4>
                <p><?php echo $_POST['step_' . $i . '_name'] ?></p>
            </div>
            <div class="panel-body">
                <?php echo $_POST['step_' . $i . '_content'].PHP_EOL ?>
            </div>
        </div>
<?php endfor; ?>