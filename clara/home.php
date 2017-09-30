<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>CLARA</title>
    <!-- CDN -->
    <!--<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">-->
    <!-- LOCAL -->
    <link rel="stylesheet" href="vendor/font-awesome.min.css">
    <link rel="stylesheet" href="css/clara.css">
    <style>
        section {
            padding: 0 100px 10px 100px;
        }
    </style>
</head>
<body>
<!-- header -->
<?php include_once "views/header/simple.html" ?>
<!-- banner new sujets -->
<?php include_once "views/sections/new_sujets.html" ?>
<!-- sectiob recents sujets -->
<?php include_once "views/sections/recents_sujets.php" ?>
</body>
</html>