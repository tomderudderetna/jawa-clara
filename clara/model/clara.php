<?php
/**
 * Created by PhpStorm.
 * User: tom
 * Date: 01/10/2017
 * Time: 21:32
 */

namespace model;


class clara {

  static public function get_root_directory() {
    return realpath(__DIR__ . "/../../") . "/";
  }

  static public function get_list_all_sujet() {
    $str = realpath(self::get_root_directory() . "files");
    $tab = scandir($str);
    return $tab;
  }

}