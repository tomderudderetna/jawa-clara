<?php
function get_include_contents($filename) {
  ob_start();
  include $filename;
  $contents = ob_get_contents();
  ob_end_clean();
  return $contents;
}
$data = get_include_contents('incluator.php');
file_put_contents("sujet.html", $data);
?>
<a href="sujet.html" download>download file</a>