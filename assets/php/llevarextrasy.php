<?php
$conn = mysqli_connect('localhost', 'gustavich', 'toledano', 'gastos') or die(mysqli_error($conn));

$str_json = file_get_contents("php://input");
$x = json_decode($str_json);

mysqli_query($conn, "INSERT INTO gastosextrasy (concepto, cantidad, id_mes) VALUES ('".$x->concepto."', '".$x->cantidad."', '".$x->id_mes."')");

$respuesta = mysqli_query($conn, "SELECT concepto, cantidad, id_mes FROM gastosextrasy WHERE id_mes = '".$x->id_mes."'");
$row = mysqli_fetch_all($respuesta);
echo json_encode($row, JSON_NUMERIC_CHECK);
?>