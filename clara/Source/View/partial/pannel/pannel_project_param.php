<div class="panel panel-primary">
            <div class="panel-heading">
                <i class="fa fa-cogs"></i>
                <h2><?php echo $_POST['project_name'] ?></h2>
<!--                (--><?php //echo $_POST['project_code'] ?><!-- - --><?php //echo $_POST['module_code'] ?><!--)</h2>-->
            </div>
        <?php if (isset($_POST['param_project']) && $_POST['param_project'] != ""): ?>
    <div class="panel-body">
                <?php echo $_POST['param_project'].PHP_EOL ?>
            </div>
        <?php endif; ?>
</div>
