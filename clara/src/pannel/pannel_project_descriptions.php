<?php
$nb_describs = isset($_POST['nb_describs']) ? $_POST['nb_describs'] : 0;
for ($i = 1; $i <= $nb_describs; $i++):?>
    <div class="panel panel-project">
        <div class="panel-heading">
            <i class="fa fa-book"></i>
            <h2><?php echo $_POST['describ_' . $i . '_name'] ?></h2>
        </div>
        <div class="panel-body">
            <?php echo $_POST['describ_' . $i . '_content'] ?>
        </div>
    </div>
<?php endfor; ?>
