<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>CLARA</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="css/styles.css">
    <style>
        section.return {
            padding: 0 100px 0 100px;
        }

        .btn-cur {
            display: flex;
            margin-top: 5px;
        }

        .btn-cur:active {
            position: relative;
            top: 1px;
        }

        .cur {
            width: 0;
            height: 0;
            margin-top: 2px;
            border-top: 13px solid transparent;
            border-bottom: 13px solid transparent;
            border-right: 13px solid #553982;
            /*border-right: 13px solid #3f2a60;*/
            /*display: none;*/
        }

        .cur-text {
            background-color: #553982;
            /*border: 1px #3f2a60 solid;*/
            height: 30px;
            line-height: 25px;
            padding: 0 15px 0 10px;
            color: #fff;
            position: relative;
            left: -1px;
            border-radius: 4px;
            border-top-left-radius: 7px 4px;
            border-bottom-left-radius: 7px 4px;
            box-shadow: 2px 2px 2px #aaa;
        }
    </style>
</head>
<body>
<!-- header -->
<?php include_once "src/header_simple.html" ?>
<!-- retour -->
<section class="return">
    <div class="btn-cur">
        <div class="cur"></div>
        <div class="cur-text">
            <a href="sujets_new.php">retour</a>
        </div>
    </div>
</section>
<!-- sectiob recents sujets -->
<?php include_once "src/section_recents_sujets.html" ?>
<!-- section all sujets -->
<?php include_once "src/section_all_sujets.html" ?>
</body>
</html>