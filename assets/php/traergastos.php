<?php
$conn = mysqli_connect('localhost', 'gustavich', 'toledano', 'gastos') or die(mysqli_error($conn));

$str_json = file_get_contents("php://input");
$x = json_decode($str_json);

$respuesta = mysqli_query($conn, "SELECT comida, garrafones, despensa, ahorro, gas, luz, psic, agua, taxis FROM gastosgenerales WHERE tipomes= '".$x->tipo."'");
$row = mysqli_fetch_assoc($respuesta);
//echo $row;
echo json_encode ($row, JSON_NUMERIC_CHECK);
?>