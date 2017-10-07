<?php
/**
 * Created by PhpStorm.
 * User: jawa_tom
 * Date: 03/10/2017
 * Time: 10:36
 */
require_once __DIR__ . "/../../model/sujet.php";

use model\sujet;

$id = isset($_POST['id']) ? $_POST['id'] : false;
$name = isset($_POST['name']) ? $_POST['name'] : false;
if ($id && $name) {
    sujet::rename($id, $name);
    echo "[sujet rename]";
}
exit;