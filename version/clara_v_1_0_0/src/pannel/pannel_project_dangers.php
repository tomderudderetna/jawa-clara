<?php
$nb_dangers = isset($_POST['nb_dangers']) ? $_POST['nb_dangers'] : 0;
for ($i = 1; $i <= $nb_dangers; $i++):?>
    <div class="panel panel-danger">
        <div class="panel-heading">
            <i class="fa fa-ban"></i>
            <h3><?php echo $_POST['danger_' . $i . '_name'] ?></h3>
        </div>
        <div class="panel-body">
            <?php echo $_POST['danger_' . $i . '_content'] ?>
        </div>
    </div>
<?php endfor; ?>