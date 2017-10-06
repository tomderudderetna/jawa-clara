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

class bdd
{

    static function connect()
    {
        try {
            $db = new PDO('mysql:host=localhost;dbname=clara;charset=utf8', 'root', '');
        } catch (Exception $e) {
            return NULL;
        }
        return $db;

    }

    static function new_sujet()
    {
        if (!\model\bdd::get_new_sujet_is_create()) {

            $db = self::connect();
            $db->exec('INSERT INTO `sujet` (`id`, `name`, `path`) VALUES (NULL, \'Document sans titre\', \'path\');');
            $last_id = $db->lastInsertId();
            $db->exec("UPDATE `conf` SET `null_sujet_id` = '{$last_id}' WHERE `conf`.`id` = 0;");
            self::set_sujet_existe(1);
            return $last_id;
        }
    }

    static function get_null_sujet_id()
    {
        $db = self::connect();
        if ($db != NULL) {
            $response = $db->query('SELECT `null_sujet_id` FROM `conf` WHERE `id` = 0');
            return $response->fetch()['null_sujet_id'];
        }
    }

    static function get_new_sujet_is_create()
    {
        $db = self::connect();
        if ($db != NULL) {
            $response = $db->query('SELECT `null_sujet_exist` FROM `conf`');
            return $response->fetch()['null_sujet_exist'];
        }
    }

    static public function get_list_all_sujet()
    {
        $db = self::connect();
        $response = $db->query('SELECT `name`, `path` FROM `sujet`');
        return $response->fetchAll();
    }

    static public function get_list_recent_sujet()
    {
        $db = self::connect();
        if ($db != NULL) {
            $response = $db->query('SELECT `name`, `id` FROM sujet ORDER BY id DESC LIMIT 10');
            return $response->fetchAll();
        }
    }

    static function set_sujet_existe($state)
    {
        $db = self::connect();
        $db->exec("UPDATE `conf` SET `null_sujet_exist` = {$state} WHERE `conf`.`id` = 0;");
    }

    static function set_sujet_name($id, $name)
    {
        $db = self::connect();
        $db->exec("UPDATE `sujet` SET `name` = '{$name}' WHERE `sujet`.`id` = {$id}");
        self::set_sujet_existe(0);
    }

    static function get_sujet_name($id)
    {
        $db = self::connect();
        $response=$db->query("SELECT `name` FROM `sujet` WHERE `id` = {$id}");
        return $response->fetch()['name'];
    }

    static function delete_sujet($id)
    {
        $db = self::connect();
        $db->exec("DELETE FROM `sujet` WHERE `sujet`.`id` = {$id} ");
        self::set_sujet_existe(0);
    }
}