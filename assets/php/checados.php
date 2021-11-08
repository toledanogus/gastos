<?php
$conn = mysqli_connect('localhost', 'gustavich', 'toledano', 'gastos') or die(mysqli_error($conn));

$str_json = file_get_contents("php://input");
$x = json_decode($str_json);

$respuesta = mysqli_query($conn, "SELECT concepto FROM pagogenerales WHERE id_mes = '".$x->id_mes."'");
$row = mysqli_fetch_all($respuesta);
echo json_encode($row);
?>