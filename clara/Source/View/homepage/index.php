<?php
/**
 * Created by PhpStorm.
 * User: tom
 * Date: 07/10/2017
 * Time: 17:45
 */
?>
<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="UTF-8">
        <title>CLARA</title>
        <link rel="stylesheet" href="Resource/vendor/css/font-awesome.min.css">
        <link rel="stylesheet" href="Resource/clara/css/clara.css">
    </head>
    <body>
        <?php partial('header'); ?>
        <?php partial('menu/tool'); ?>
        <?php partial('workspace'); ?>
        <?php partial('preview'); ?>
        <?php partial('open'); ?>
        <footer>
            <script src="Resource/vendor/js/jquery-3.2.1.min.js"></script>
            <script src="Resource/vendor/js/jquery-ui.min.js"></script>
            <script src="Resource/clara/js/clara.js"></script>
            <script src="Resource/clara/js/overlay.js"></script>
<!--            <script src="Resource/clara/js/pannel_project_steps.js"></script>-->
<!--            <script src="Resource/clara/js/pannel_project_descriptions.js"></script>-->
<!--            <script src="Resource/clara/js/pannel_project_warnings.js"></script>-->
<!--            <script src="Resource/clara/js/pannel_project_dangers.js"></script>-->
<!--            <script src="Resource/clara/js/pannel_project_infos.js"></script>-->
<!--            <script src="Resource/clara/js/pannel.js"></script>-->
            <script src="Resource/clara/js/blind.js"></script>
        </footer>
    </body>
</html>