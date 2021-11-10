<?php
$conn = mysqli_connect('localhost', 'gustavich', 'toledano', 'gastos') or die(mysqli_error($conn));

$str_json = file_get_contents("php://input");
$x = json_decode($str_json);
$largo= count($x);


for ($i=0; $i < $largo-1; $i++) { 
    $consultar = mysqli_query($conn, "SELECT concepto, id_mes FROM pagogeneralesy WHERE concepto = '".$x[$i+1]."' AND id_mes = '".$x[0]."'");
    $rowcount = mysqli_num_rows($consultar);
    if (!$rowcount > 0) {
        mysqli_query($conn, "INSERT INTO pagogeneralesy (concepto, pagado, id_mes) VALUES ('".$x[$i+1]."' , 1, '".$x[0]."')");
}
}
$respuesta = mysqli_query($conn, "SELECT concepto, id_mes FROM pagogeneralesy WHERE id_mes = '".$x[0]."'");
$row = mysqli_fetch_all($respuesta);
echo json_encode($row);
?>