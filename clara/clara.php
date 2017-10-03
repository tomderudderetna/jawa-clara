<?php
require_once "model/bdd.php";
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>CLARA</title>
    <!-- CDN -->
    <!--<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">-->
    <!-- LOCAL -->
    <link rel="stylesheet" href="../vendor/font-awesome.min.css">
    <link rel="stylesheet" href="css/clara.css">
</head>
<body>
<!-- header -->
<?php include_once "views/header/index.php" ?>
<!-- baner tool menu -->
<?php include_once "views/menu/tool.html" ?>
<!-- section page -->
<?php include_once "views/workspace/index.html" ?>
<!-- overlay section preview -->
<?php include_once "views/preview/index.html" ?>
<!-- overlay section open -->
<?php include_once "views/open/index.php" ?>
<footer>
    <!-- CDN -->
    <!--<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>-->
    <!-- LOCAL -->
    <script src="../vendor/jquery-3.2.1.min.js"></script>
    <script src="asset/js/overlay.js"></script>
    <script src="asset/js/pannel_project_steps.js"></script>
    <script src="asset/js/pannel_project_descriptions.js"></script>
    <script src="asset/js/pannel_project_warnings.js"></script>
    <script src="asset/js/pannel_project_dangers.js"></script>
    <script src="asset/js/pannel_project_infos.js"></script>
    <script src="asset/event.js"></script>
    <script src="asset/blind.js"></script>
</footer>
</body>
</html>