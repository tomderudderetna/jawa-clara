<?php
/**
 * Created by PhpStorm.
 * User: jawa_tom
 * Date: 03/10/2017
 * Time: 10:36
 */
require_once __DIR__ . "/../../model/sujet.php";

use model\sujet;

$id = isset($_GET['id']) ? $_GET['id'] : false;
if ($id) {
    sujet::delete($id);
    echo "[sujet delete]";
}
header("Location: /jawa-clara/clara/index.php");
exit;