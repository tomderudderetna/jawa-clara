<?php
/**
 * Created by PhpStorm.
 * User: jawa_tom
 * Date: 03/10/2017
 * Time: 10:36
 */
require_once __DIR__ . "/../../model/sujet.php";

use model\sujet;

echo sujet::generate() ? "[sujet generate]" : "[erreur]";
exit;