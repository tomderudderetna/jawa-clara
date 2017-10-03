<?php
require_once __DIR__ . "/../../model/sujet.php";
?>
<header class="header-bar">
    <a href="index.php" id="logo">
        <div class="logo">
            <div></div>
            <div></div>
            <div></div>
        </div>
        <h1><b>Etna</b> - Clara</h1>
    </a>
    <div class="db-lign">
        <input id="sujet_name"
               placeholder="Document sans titre"
               value="<?php echo \model\sujet::get_name($_GET["id"]) ?>"
               title="Renommer">
        <?php include_once "views/menu/main.html" ?>
    </div>
</header>