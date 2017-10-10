<?php
//require_once __DIR__ . "/../../model/clara.php";
?>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title><?php echo $_POST['module_code'] ?? NULL;
            echo isset($_POST['project_code']) ? ' - ' . $_POST['project_code'] : NULL ?></title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.5.0/styles/monokai-sublime.min.css">
        <link rel="stylesheet" href="https://dl.etna-alternance.net/css/sujet-etna.css">
<!--        <link rel="stylesheet" href="Resource/vendor/css/sujet-etna.css">-->
    </head>
    <body>
        <?php
        /**
         * remplissage du cours avec les données du formulaire
         */
        var_dump($_POST);
        $types = ["param", "blc"];
        foreach ($types as $type) {
            $file = __DIR__ . "/../pannel/pannel_project_$type.php";
            include $file;
        }
//        $file = __DIR__ . "/../pannel/pannel_project_test.php";
//        include $file;
        ?>
        <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.5/ace.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.6.0/highlight.min.js"></script>
        <script>
            $(function () {
                $("code").each(function (i, block) {
                    hljs.highlightBlock(block);
                });
                const ids = $(".coding");
                var jqPre = $(".ace");
                for (var idi = 0; idi < ids.length; idi++) {
                    var id = ids[idi],
                        editor = ace.edit(id),
                        jqEditor = $(id),
                        mode = jqEditor.attr("data-mode"),
                        fontSize = 12,
                        lineHeight = 16,
                        lines = editor.session.getLength();
                    editor.getSession().setMode("ace/mode/" + mode);
                    editor.setTheme("ace/theme/monokai");
                    editor.setReadOnly(true);
                    editor.setHighlightActiveLine(true);
                    editor.setShowPrintMargin(false);
                    jqEditor.css({
                        "font-size": fontSize + "px",
                        "line-height": lineHeight + "px",
                        "height": ( lineHeight * lines ) + "px"
                    });
                }
                jqPre.css("background-color", "#272822")
            });
        </script>
    </body>
</html>