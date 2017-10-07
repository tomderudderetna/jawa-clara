<div id="overlay_open" class="overlay">
    <div class="overlay-body">
        <!-- retour -->
        <section class="return">
            <div class="btn-cur">
                <div class="cur"></div>
                <div class="cur-text">
                    <a onclick="overlay_hide('overlay_open')">retour</a>
                </div>
            </div>
        </section>
        <!-- sectiob recents sujets -->
      <?php include_once "views/sections/recents_sujets.php" ?>
        <!-- section all sujets -->
      <?php include_once "views/sections/all_sujets.php" ?>
    </div>
</div>