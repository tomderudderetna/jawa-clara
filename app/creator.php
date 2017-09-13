<?php
function get_include_contents($filename) {
  if (is_file($filename)) {
    ob_start();
    include $filename;
    $contents = ob_get_contents();
    ob_end_clean();
    return $contents;
  }
  return FALSE;
}

$data = get_include_contents('incluator.php');
file_put_contents("sujet.html", $data);
?>
<a href="sujet.html" download>download file</a>