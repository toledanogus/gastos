<?php
$conn = mysqli_connect('localhost', 'gustavich', 'toledano', 'gastos') or die(mysqli_error($conn));
$str_json = file_get_contents("php://input");
$x = json_decode($str_json);

$respuesta = mysqli_query($conn, "SELECT cantidad FROM gastoshsbcy WHERE id_mes = '".$x->id_mes."'");
$rowcount = mysqli_num_rows($respuesta);
if (!$rowcount > 0) {
    mysqli_query($conn, "INSERT INTO gastoshsbcy (cantidad, id_mes) VALUES ('".$x->cantidad."', '".$x->id_mes."')");
}else {
    mysqli_query($conn, "UPDATE gastoshsbcy SET cantidad = '".$x->cantidad."' WHERE id_mes = '".$x->id_mes."'");
}
?>