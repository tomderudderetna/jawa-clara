<?php
/**
 * Created by PhpStorm.
 * User: tom
 * Date: 07/10/2017
 * Time: 16:14
 * Desrciption: get homepage.php
 */
$file = str_replace("Controller", "View", __FILE__);
$file = str_replace(".php", "/index.php", $file);
include_once $file;
exit;