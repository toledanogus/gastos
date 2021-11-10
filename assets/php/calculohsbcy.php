<?php
$conn = mysqli_connect('localhost', 'gustavich', 'toledano', 'gastos') or die(mysqli_error($conn));
$str_json = file_get_contents("php://input");
$x = json_decode($str_json);

$consultar = mysqli_query($conn, "SELECT cantidad FROM aportesYan WHERE id_mes = '" . $x->id_mes . "'");
$rowcount = mysqli_num_rows($consultar);
if (!$rowcount > 0) {
    mysqli_query($conn, "INSERT INTO aportesYan (cantidad, id_mes) VALUES ('" . $x->cantidad . "', '" . $x->id_mes . "')");
} else {
    mysqli_query($conn, "UPDATE aportesYan SET cantidad = '".$x->cantidad."' WHERE id_mes = '".$x->id_mes."'");
}

$respuesta = mysqli_query($conn, "SELECT cantidad FROM aportesYan WHERE id_mes = '".$x->id_mes."'");
$row = mysqli_fetch_assoc($respuesta);
echo json_encode($row);
