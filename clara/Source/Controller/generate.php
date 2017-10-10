<?php
/**
 * Created by PhpStorm.
 * User: tom
 * Date: 08/10/2017
 * Time: 00:19
 */
require_once __DIR__ . "/../Model/sujet.php";

use model\sujet;

echo sujet::generate() ? "[sujet generate]" : "[erreur]";
exit;