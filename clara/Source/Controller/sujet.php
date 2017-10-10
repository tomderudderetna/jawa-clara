<?php
/**
 * Created by PhpStorm.
 * User: tom
 * Date: 08/10/2017
 * Time: 00:11
 */
$file = str_replace("Controller", "View", __FILE__);
$file = str_replace(".php", "/sujet.html", $file);
include_once $file;
exit;