<?php
/**
 * Created by PhpStorm.
 * User: jawa_tom
 * Date: 02/10/2017
 * Time: 17:22
 */

namespace model;


use Exception;
use PDO;

class bdd {

  static function connect() {
    try {
      $db = new PDO('mysql:host=localhost;dbname=clara;charset=utf8', 'root', '');
    } catch (Exception $e) {
      die('Erreur : ' . $e->getMessage());
    }
    return $db;

  }

  static function new_sujet() {
    $db = self::connect();
    $db->exec('INSERT INTO `sujet` (`id`, `name`, `path`) VALUES (NULL, \'Document sans titre\', \'path\');');
    $db->exec('UPDATE `conf` SET `null_sujet_exist` = 1 WHERE `conf`.`id` = 0;');
  }

  static function get_new_sujet_is_create() {
    $db = self::connect();
    $response = $db->query('SELECT `null_sujet_exist` FROM `conf`');
    return $response->fetch()['null_sujet_exist'];
  }

  static public function get_list_all_sujet() {
    $db = self::connect();
    $response = $db->query('SELECT `name`, `path` FROM `sujet`');
    return $response->fetchAll();
  }

  static public function get_list_recent_sujet() {
    $db = self::connect();
    $response = $db->query('SELECT `name`, `path` FROM sujet ORDER BY id DESC LIMIT 10');
    return $response->fetchAll();
  }
}