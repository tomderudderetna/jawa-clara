<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Clara</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css">
    <link rel="stylesheet" href="../asset/css/style.css">
</head>
<body>
<!--barre latérale droite-->
<nav id="right_nav" class="full-container">
    <!--fonctions de mise en forme du texte-->
    <div class="panel panel-default">
        <div class="panel-heading">
            <h4>Fonctions</h4>
        </div>
        <div class="panel-body">
            <div class="form-group">
                <a data-cmd="bold" class="btn btn-default btn-css"><i class="fa fa-bold"></i></a>
                <a data-cmd="italic" class="btn btn-default btn-css"><i class="fa fa-italic"></i></a>
                <a data-cmd="underline" class="btn btn-default btn-css"><i class="fa fa-underline"></i></a><br>
                <a data-cmd="justifyleft" class="btn btn-default btn-css"><span class="glyphicon glyphicon-align-left"></a>
                <a data-cmd="justifycenter" class="btn btn-default btn-css"><span class="glyphicon glyphicon-align-center"></a>
                <a data-cmd="justifyright" class="btn btn-default btn-css"><span class="glyphicon glyphicon-align-right"></a>
                <a data-cmd="justifyfull" class="btn btn-default btn-css"><span class="glyphicon glyphicon-align-justify"></a><br>
                <a data-cmd="insertUnorderedList" class="btn btn-default btn-css"><span class="glyphicon glyphicon-list"></a>
                <a data-cmd="insertOrderedList" class="btn btn-default btn-css"><span class="glyphicon glyphicon-list"></a><br>
                <a data-cmd="formatBlock" data-cmd-arg="<h1>" class="btn btn-default btn-css"><span class="glyphicon glyphicon-header">1</a>
                <a data-cmd="formatBlock" data-cmd-arg="<h2>" class="btn btn-default btn-css"><span class="glyphicon glyphicon-header">2</a>
                <a data-cmd="formatBlock" data-cmd-arg="<h3>" class="btn btn-default btn-css"><span class="glyphicon glyphicon-header">3</a>
                <a data-cmd="formatBlock" data-cmd-arg="<h4>" class="btn btn-default btn-css"><span class="glyphicon glyphicon-header">4</a>
                <a data-cmd="formatBlock" data-cmd-arg="<h5>" class="btn btn-default btn-css"><span class="glyphicon glyphicon-header">5</a>
                <a data-cmd="formatBlock" data-cmd-arg="<h6>" class="btn btn-default btn-css"><span class="glyphicon glyphicon-header">6</a>
                <a data-cmd="formatBlock" data-cmd-arg="<p>" class="btn btn-default btn-css"><span class="glyphicon glyphicon-">Normal</a><br>
                <a data-cmd="insertImage" data-cmd-arg="<p>" class="btn btn-default btn-css"><span class="glyphicon glyphicon-picture"></a><br>
            </div>
        </div>
        <!--blocs drag & drop-->
        <div class="panel-footer panel-heading">
            <h4>Bloc</h4>
        </div>
        <div class="panel-body">
            <!--bloc descriptif-->
            <div class="form-group" draggable="true" ondragstart="drag(event)" data-type="describ">
                <a id="btn_add_describ" class="btn btn-add btn-success"><i class="fa fa-book"></i> bloc descriptif</a>
            </div>
            <!--bloc d'etape-->
            <div class="form-group" draggable="true" ondragstart="drag(event)" data-type="step">
                <a id="btn_add_step" class="btn btn-add btn-step"><i class="fa fa-flag"></i> bloc étape</a>
            </div>
            <!--bloc de mise en garde-->
            <div class="form-group" draggable="true" ondragstart="drag(event)" data-type="warning">
                <a id="btn_add_warning" class="btn btn-add btn-warning">
                    <i class="fa fa-exclamation-triangle"></i> bloc attention</a>
            </div>
            <!--bloc d'interdiction-->
            <div class="form-group" draggable="true" ondragstart="drag(event)" data-type="danger">
                <a id="btn_add_danger" class="btn btn-add btn-danger"><i class="fa fa-ban"></i> bloc interdiction</a>
            </div>
            <!--bloc d'information-->
            <div class="form-group" draggable="true" ondragstart="drag(event)" data-type="info">
                <a id="btn_add_info" class="btn btn-add btn-info"><i class="fa fa-info"></i> bloc d'information</a>
            </div>
        </div>
    </div>
</nav>
<!--entête du site-->
<div class="container">
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3>Formulaire de création de sujet</h3>
        </div>
    </div>
</div>
<!--partie static formulaire, contenant les elements basic d'un sujet (titre du  module, paramètres du  module, css:prep'/alternant, etc...)-->
<div class="container">
    <form class="form" action="creator.php" method="post">
        <div class="panel panel-default">
            <div class="panel-body">

                <!--champs cachés quis seront remplis transmis avec le formulaire-->
                <input type="hidden" id="param_project" name="param_project">

                <!--div editable qui remplira le champs caché 'module_code'-->
                <div class="form-group">
                    <label><i class="fa fa-cogs"></i> | code UV<sup>*</sup></label>
                    <input type="text" class="form-control input" id="module_code" name="module_code">
                </div>
                <!--div editable qui remplira le champs caché 'project_code'-->
                <div class="form-group">
                    <label><i class="fa fa-cogs"></i> | projet code <sup>*</sup></label>
                    <input type="text" class="form-control input" id="project_code" name="project_code">
                </div>
                <!--div editable qui remplira le champs caché 'project_name'-->
                <div class="form-group">
                    <label><i class="fa fa-cogs"></i> | nom projet <sup>*</sup></label>
                    <input type="text" class="form-control input" id="project_name" name="project_name">
                </div>
                <!--div editable qui remplira le champs caché 'param_project'-->
                <div class="form-group">
                    <label><i class="fa fa-cogs"></i> | paramètres du projet</label>
                    <div id="edit_param_project" class="form-control input multi" contentEditable></div>
                </div>

            </div>
        </div>
        <!--partie dynamique du formulaire, contenant les blocs d'un sujet (bloc d'interdiction, bloc d'etape, etc...)-->
        <div class="panel panel-default">
            <div class="panel-body">
                <!--champs cachés utilisé comme compteur de blocks-->
                <input type="hidden" id="nb_describs" name="nb_describs"
                       value="0">
                <input type="hidden" id="nb_steps" name="nb_steps" value="0">
                <input type="hidden" id="nb_warnings" name="nb_warnings"
                       value="0">
                <input type="hidden" id="nb_dangers" name="nb_dangers"
                       value="0">
                <input type="hidden" id="nb_infos" name="nb_infos" value="0">
                <!--zone de drop-->
                <div id="target_drop" class="target_drop"
                     ondrop="drop(event,'#target_drop')"
                     ondragover="allowDrop(event,'#target_drop')">
                    <a class="btn btn-default"><i class="fa fa-plus"></i></a>
                    &nbsp;deplace un bloc de la lists à droite de ton ecran ici.
                </div>
                <!--point de reférnce pour l'ajout de bloc de saisie-->
                <div id="blocks"></div>
            </div>
            <!--validation du formulaire-->
            <div class="panel-footer">
                <a id="btn-valid-form" class="btn btn-primary" target="_blank">Crée</a>
            </div>
        </div>
    </form>
</div>
<!--divs contenants les modèles de blocs de saisie-->
<div>
    <!--describ-->
    <div id="data-describ"
         data-html="<?php include "./src/block/block_describ.php"; ?>"></div>
    <!--step-->
    <div id="data-step"
         data-html="<?php include "./src/block/block_step.php"; ?>"></div>
    <!--warning-->
    <div id="data-warning"
         data-html="<?php include "./src/block/block_warning.php"; ?>"></div>
    <!--danger-->
    <div id="data-danger"
         data-html="<?php include "./src/block/block_danger.php"; ?>"></div>
    <!--info-->
    <div id="data-info"
         data-html="<?php include "./src/block/block_info.php"; ?>"></div>
</div>
<script src="https://code.jquery.com/jquery-3.1.0.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.5/ace.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.6.0/highlight.min.js"></script>
<script src="../asset/js/pannel_project_steps.js"></script>
<script src="../asset/js/pannel_project_descriptions.js"></script>
<script src="../asset/js/pannel_project_warnings.js"></script>
<script src="../asset/js/pannel_project_dangers.js"></script>
<script src="../asset/js/pannel_project_infos.js"></script>
<script src="../asset/event.js"></script>
<script src="../asset/blind.js"></script>
</body>
</html>