<?php
/**
 * Created by PhpStorm.
 * User: jawa_tom
 * Date: 03/10/2017
 * Time: 10:38
 */


namespace model;
require_once "bdd.php";


class sujet
{
    static function generate()
    {
        $data = self::get_include_contents(__DIR__ . '/../views/render/index.php');
        file_put_contents(__DIR__ . "/../sujet.html", $data);
        return file_exists(__DIR__ . "/../sujet.html");
    }

    static function get_include_contents($filename)
    {
        ob_start();
        include $filename;
        $contents = ob_get_contents();
        ob_end_clean();
        return $contents;
    }

    static function rename($id, $name)
    {
        bdd::set_sujet_name($id, $name);
    }

    static function get_name($id)
    {
        return bdd::get_sujet_name($id);
    }
}