<?php
$conn = mysqli_connect('localhost', 'gustavich', 'toledano', 'gastos') or die(mysqli_error($conn));
$str_json = file_get_contents("php://input");
$x = json_decode($str_json);

mysqli_query($conn, "INSERT INTO hsbcy (tipo, concepto, cantidad, msi, id_mes, unaExhibicion) VALUES ('extra', '".$x->concepto."', '".$x->cantidad."', 0, '".$x->id_mes."', 1)");

$respuesta = mysqli_query($conn, "SELECT concepto, cantidad, id_mes FROM hsbcy WHERE id_mes = '".$x->id_mes."' AND unaExhibicion = 1");
$row = mysqli_fetch_all($respuesta);
echo json_encode($row, JSON_NUMERIC_CHECK);
?>