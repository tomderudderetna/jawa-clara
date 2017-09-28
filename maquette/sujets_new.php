<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>CLARA</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="css/styles.css">
    <style>
        #overlay_preview {
            position: fixed; /* Sit on top of the page content */
            display: none; /* Hidden by default */
            width: 100%; /* Full width (cover the whole page) */
            height: 100%; /* Full height (cover the whole page) */
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5); /* Black background with opacity */
            z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
            cursor: pointer; /* Add a pointer on hover */
        }

        #text {
            position: absolute;
            top: 50%;
            left: 50%;
            font-size: 50px;
            color: white;
            transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
        }
    </style>
</head>
<body>
<!-- header -->
<?php include_once "src/header_menu.html" ?>
<!-- baner tool menu -->
<?php include_once "src/banner_tool_menu.html" ?>
<!-- baner tool menu -->
<?php include_once "src/banner_tool_menu.html" ?>
<!-- section page -->
<?php include_once "src/section_page.html" ?>
<!-- overlay section preview -->
<?php include_once "src/section_preview.php" ?>
<script>
    function overlay_show(id) {
        document.getElementById(id).style.display = "block";
    }

    function overlay_hide(id) {
        document.getElementById(id).style.display = "none";
    }
</script>
</body>
</html>