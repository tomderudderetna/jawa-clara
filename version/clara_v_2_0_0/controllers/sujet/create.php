<?php
/**
 * Created by PhpStorm.
 * User: jawa_tom
 * Date: 03/10/2017
 * Time: 10:09
 */
require_once __DIR__ . "/../../model/bdd.php";

use model\bdd;

bdd::new_sujet();
$id = bdd::get_null_sujet_id();
var_dump($id);
header("Location: http://localhost/jawa-clara/clara/clara.php?id=" . $id);
exit;