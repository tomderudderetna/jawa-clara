<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>CLARA</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="css/styles.css">
    <style>
        .green:hover,
        .green {
            background-color: #4b6c53 !important;
        }

        .grey:hover,
        .grey {
            background-color: #62626c !important;
        }

        .orange:hover,
        .orange {
            background-color: #6f644c !important;
        }

        .red:hover,
        .red {
            background-color: #684343 !important;
        }

        .blue:hover,
        .blue {
            background-color: #474d6a !important;
        }

        .bloc-lg {
            padding-left: 50px !important;
            padding-right: 50px !important;
        }

        /*.bloc-lg:hover {*/
        /*padding: 0 10px 0 10px!important;*/
        /*}*/
    </style>
</head>
<body>
<!-- header -->
<?php include_once "src/header_menu.html" ?>
<!-- baner tool menu -->
<?php include_once "src/banner_tool_menu.html" ?>
<!-- baner tool menu -->
<?php include_once "src/banner_blocks_menu.html" ?>
<!-- section page -->
<?php include_once "src/section_page.php" ?>
<!-- overlay section preview -->
<?php include_once "src/section_preview.html" ?>
<footer>
    <script src="js/overlay.js"></script>
</footer>
</body>
</html>