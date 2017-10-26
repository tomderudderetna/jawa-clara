<?php
function get_fa($type)
{
    switch ($type) {
        case 'step':
            return 'flag';
            break;
        case 'danger':
            return 'ban';
            break;
        case 'warning':
            return 'exclamation-triangle';
            break;
        case 'info':
            return 'info';
            break;
        case 'project':
            return 'book';
            break;
        default:
            break;
    }
    return 'file';
}

function get_type($type)
{
    if ($type == "step")
        return "default";
    return $type;
}

$nb_blc = isset($_POST['nb_blocs']) ? $_POST['nb_blocs'] : 0;
//var_dump($nb_blc, $_POST);
for ($i = 1; $i <= $nb_blc; $i++):?>
    <?php if (!isset($_POST['blc_' . $i . '_type'])) $i++; ?>
    <div class="panel panel-<?php echo get_type($_POST['blc_' . $i . '_type']) ?>">
        <div class="panel-heading">
            <i class="fa fa-<?php echo get_fa($_POST['blc_' . $i . '_type']); ?>"></i>
            <h3><?php echo isset($_POST['blc_' . $i . '_name']) ? $_POST['blc_' . $i . '_name'] : '' ?></h3>
        </div>
        <div class="panel-body">
            <?php echo isset($_POST['blc_' . $i . '_content']) ? $_POST['blc_' . $i . '_content'] . PHP_EOL : '' ?>
        </div>
    </div>
<?php endfor; ?>