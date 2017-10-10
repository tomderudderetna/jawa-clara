<section id="page">
    <form class="form" action="views/render/index.php" method="post" name="form">

        <!--partie static formulaire, contenant les elements basic d'un sujet (titre du  module, paramètres du  module, css:prep'/alternant, etc...)-->
        <!--champs cachés quis seront remplis transmis avec le formulaire-->
        <input type="hidden" id="param_project" name="param_project">

        <div class="blc blc-primary">
            <div class="blc-heading">
                <h1>
                    <i class="fa fa-cogs"></i>
                    <!--div editable qui remplira le champs caché 'project_name'-->
                    <input class="size10" id="project_name" name="project_name" placeholder="Jour01">
                    <!--div editable qui remplira le champs caché 'project_code'-->
                    ( <input class="size3" id="project_code" name="project_code" placeholder="FDI" maxlength="3"> -
                    <!--div editable qui remplira le champs caché 'module_code'-->
                    <input class="size4" id="module_code" name="module_code" placeholder="UNIX" maxlength="4"> )
                </h1>
            </div>
            <!--div editable qui remplira le champs caché 'param_project'-->
            <div id="edit_param_project" class="blc-body" contenteditable="true">
            </div>
        </div>

        <!--partie dynamique du formulaire, contenant les blocs d'un sujet (bloc d'interdiction, bloc d'etape, etc...)-->
        <div class="panel panel-default">
            <div class="panel-body">
                <!--champs cachés utilisé comme compteur de blocks-->
                <input type="hidden" id="nb_describs" name="nb_describs" value="0">
                <input type="hidden" id="nb_steps" name="nb_steps" value="0">
                <input type="hidden" id="nb_warnings" name="nb_warnings" value="0">
                <input type="hidden" id="nb_dangers" name="nb_dangers" value="0">
                <input type="hidden" id="nb_infos" name="nb_infos" value="0">
                <!--zone de drop-->
                <div id="target_drop" class="target_drop" ondrop="drop(event,'#target_drop')"
                     ondragover="allowDrop(event,'#target_drop')" ondragleave="$(this).removeClass('drop_hover')">
                    <a class="btn btn-default"><i class="fa fa-plus"></i></a>&nbsp;deplace un bloc ici.
                </div>
                <!--point de reférnce pour l'ajout de bloc de saisie-->
                <div id="blocks"></div>
            </div>
        </div>

    </form>
</section>
<!--divs contenants les modèles de blocs de saisie-->
<div>
    <!--describ-->
    <div id="data-describ"
         data-html="<?php include __DIR__ . '/../block/block_describ.php'; ?>"></div>
    <!--step-->
    <div id="data-step"
         data-html="<?php include __DIR__ . '/../block/block_step.php'; ?>"></div>
    <!--warning-->
    <div id="data-warning"
         data-html="<?php include __DIR__ . '/../block/block_warning.php'; ?>"></div>
    <!--danger-->
    <div id="data-danger"
         data-html="<?php include __DIR__ . '/../block/block_danger.php'; ?>"></div>
    <!--info-->
    <div id="data-info"
         data-html="<?php include __DIR__ . '/../block/block_info.php'; ?>"></div>
</div>
