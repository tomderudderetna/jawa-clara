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
header("Location: http://localhost/jawa-clara/clara/clara.php");
exit;