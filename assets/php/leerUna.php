<?php
$conn = mysqli_connect('localhost', 'gustavich', 'toledano', 'gastos') or die(mysqli_error($conn));
$str_json = file_get_contents("php://input");
$x = json_decode($str_json);

$respuesta = mysqli_query($conn, "SELECT concepto, cantidad, id_mes FROM hsbc WHERE id_mes = '".$x->id_mes."' AND unaExhibicion = 1");
$row = mysqli_fetch_all($respuesta);
echo json_encode($row, JSON_NUMERIC_CHECK);
?>