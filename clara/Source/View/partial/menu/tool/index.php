<?php
/**
 * Created by PhpStorm.
 * User: tom
 * Date: 08/10/2017
 * Time: 18:01
 */
?>
<nav class="tool-menu tooltip">
    <div data-cmd="undo" class="tool btn-css">
        <i class="fa fa-undo"></i>
        <span class="tooltiptext">Annuler</span>
    </div>
    <div data-cmd="redo" class="tool btn-css">
        <i class="fa fa-repeat"></i>
        <span class="tooltiptext">Rétablir</span>
    </div>
    <span class="sep"></span>
<!--    <div data-cmd="" class="tool btn-css red">-->
<!--        <i class="fa fa-search"></i>-->
<!--        <span class="tooltiptext">Zoomer</span>-->
<!--    </div>-->
<!--    <span class="sep"></span>-->
<!--    <div data-cmd="fontName" class="tool btn-css red">-->
<!--        Arial-->
<!--        <span class="tooltiptext">Police</span>-->
<!--    </div>-->
<!--    <span class="sep"></span>-->
<!--    <div data-cmd="" class="tool btn-css red">-->
<!--        11-->
<!--        <span class="tooltiptext">Taille de Police</span>-->
<!--    </div>-->
<!--    <span class="sep"></span>-->
    <div data-cmd="bold" class="tool btn-css">
        <i class="fa fa-bold"></i>
        <span class="tooltiptext">Gras</span>
    </div>
    <div data-cmd="italic" class="tool btn-css">
        <i class="fa fa-italic"></i>
        <span class="tooltiptext">Italique</span>
    </div>
    <div data-cmd="underline" class="tool btn-css">
        <i class="fa fa-underline"></i>
        <span class="tooltiptext">Souligner</span>
    </div>
    <div data-cmd="strikeThrough" class="tool btn-css">
        <i class="fa fa-strikethrough"></i>
        <span class="tooltiptext">Barrer</span>
    </div>
<!--    <span class="sep"></span>-->
<!--    <div data-cmd="createLink" class="tool btn-css red">-->
<!--        <i class="fa fa-chain"></i>-->
<!--        <span class="tooltiptext">Insérer un lien</span>-->
<!--    </div>-->
<!--    <span class="sep"></span>-->
<!--    <div data-cmd="" class="tool btn-css red">-->
<!--        <i class="fa fa-comment"></i>-->
<!--        <span class="tooltiptext">Commenter</span>-->
<!--    </div>-->
<!--    <span class="sep"></span>-->
    <div data-cmd="justifyLeft" class="tool btn-css">
        <i class="fa fa-align-left"></i>
        <span class="tooltiptext">Aligner à gauche</span>
    </div>
    <div data-cmd="justifyCenter" class="tool btn-css">
        <i class="fa fa-align-center"></i>
        <span class="tooltiptext">Aligner au centre</span>
    </div>
    <div data-cmd="justifyRight" class="tool btn-css">
        <i class="fa fa-align-right"></i>
        <span class="tooltiptext">Aligner à droite</span>
    </div>
    <div data-cmd="justifyFull" class="tool btn-css">
        <i class="fa fa-align-justify"></i>
        <span class="tooltiptext">Justifier</span>
    </div>
    <span class="sep"></span>
    <div data-cmd="insertHTML" data-cmd-arg="4-5" class="tool btn-css">
        <i class="fa fa-table"></i>
        <span class="tooltiptext">Tableau</span>
    </div>
    <span class="sep"></span>
    <div data-cmd="insertOrderedList" class="tool btn-css">
        <i class="fa fa-list-ol"></i>
        <span class="tooltiptext">Liste numérotée</span>
    </div>
    <div data-cmd="insertUnorderedList" class="tool btn-css">
        <i class="fa fa-list-ul"></i>
        <span class="tooltiptext">Liste à puces</span>
    </div>
    <span class="sep"></span>
    <div data-cmd="outdent" class="tool btn-css">
        <i class="fa fa-outdent"></i>
        <span class="tooltiptext">Diminuer le retrait</span>
    </div>
    <div data-cmd="indent" class="tool btn-css">
        <i class="fa fa-indent"></i>
        <span class="tooltiptext">Augmenter le retrait</span>
    </div>
    <span class="sep"></span>
    <div data-cmd="cut" class="tool btn-css">
        <i class="fa fa-cut"></i>
        <span class="tooltiptext">Couper</span>
    </div>
    <div data-cmd="copy" class="tool btn-css">
        <i class="fa fa-copy"></i>
        <span class="tooltiptext">Copier</span>
    </div>
    <div data-cmd="paste" class="tool btn-css red">
        <i class="fa fa-clipboard"></i>
        <span class="tooltiptext">Coller</span>
    </div>
    <div data-cmd="insertText" class="tool btn-css red">
        <i class="fa fa-clipboard"></i>
        <span class="tooltiptext">Coller sans la mise ne forme</span>
    </div>
    <span class="sep"></span>
    <div class="tool bloc-lg green" draggable="true" ondragstart="drag(event)" data-type="describ">
        <i class="fa fa-book"></i>
        <span class="tooltiptext">bloc descriptif</span>
    </div>
    <div class="tool bloc-lg grey" draggable="true" ondragstart="drag(event)" data-type="step">
        <i class="fa fa-flag"></i>
        <span class="tooltiptext">bloc d'etape</span>
    </div>
    <div class="tool bloc-lg orange" draggable="true" ondragstart="drag(event)" data-type="warning">
        <i class="fa fa-exclamation-triangle"></i>
        <span class="tooltiptext">bloc de mise en garde</span>
    </div>
    <div class="tool bloc-lg red" draggable="true" ondragstart="drag(event)" data-type="danger">
        <i class="fa fa-ban"></i>
        <span class="tooltiptext">bloc d'interdiction</span>
    </div>
    <div class="tool bloc-lg blue" draggable="true" ondragstart="drag(event)" data-type="info">
        <i class="fa fa-info"></i>
        <span class="tooltiptext">bloc d'information</span>
    </div>
<!--    <div class="tool bloc-lg" draggable="true" ondragstart="drag(event)" data-type="test">-->
<!--        <i class="fa fa-file"></i>-->
<!--        <span class="tooltiptext">bloc de test</span>-->
<!--    </div>-->
</nav>
