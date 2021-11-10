<?php
$conn = mysqli_connect('localhost', 'gustavich', 'toledano', 'gastos') or die(mysqli_error($conn));
$str_json = file_get_contents("php://input");
$x = json_decode($str_json);

$array = ['ene21', 'feb21', 'mar21', 'abr21', 'may21', 'jun21', 'jul21', 'ago21', 'sep21', 'oct21', 'nov21', 'dic21', 'ene22', 'feb22', 'mar22', 'abr22', 'may22', 'jun22', 'jul22', 'ago22', 'sep22', 'oct22', 'nov22', 'dic22', 'todos'];
$indexJs = array_search($x->id_mes, $array);
$indexSigMes = $indexJs +1;
$mesSig = $array[$indexSigMes];

$respuesta = mysqli_query($conn, "SELECT cantidad FROM gastoshsbcy WHERE  id_mes = '".$x->id_mes."' OR id_mes = '".$mesSig."'"); /*  OR */
$row = mysqli_fetch_all($respuesta);
echo json_encode($row, JSON_NUMERIC_CHECK);
?>