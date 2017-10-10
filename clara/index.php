<?php
$file = substr($_SERVER['REQUEST_URI'], 1);
switch ($file) {
    case "":
        $file = "homepage";
}
$file = 'Source/Controller/' . $file . '.php';

if (file_exists(__DIR__ . '/' . $file))
    include_once $file;
else
    include_once 'Source/View/error/404.php';

//FUNCTIONS
function partial($view_name)
{
    include_once __DIR__ . "/Source/View/partial/{$view_name}/index.php";
}


