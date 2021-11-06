<?php
$conn = mysqli_connect('localhost', 'gustavich', 'toledano', 'gastos') or die(mysqli_error($conn));

$str_json = file_get_contents("php://input");
$x = json_decode($str_json);

$mesBase = mysqli_query($conn, "SELECT id_mes, msi, concepto, cantidad FROM hsbc WHERE unaExhibicion =0");

$array = ['ene21', 'feb21', 'mar21', 'abr21', 'may21', 'jun21', 'jul21', 'ago21', 'sep21', 'oct21', 'nov21', 'dic21', 'ene22', 'feb22', 'mar22', 'abr22', 'may22', 'jun22', 'jul22', 'ago22', 'sep22', 'oct22', 'nov22', 'dic22', 'todos'];
$indexJs = array_search($x->mes, $array);
$mensaje =[];
$arrayClave=[];
foreach ($mesBase as $value) {
    $indexBd = array_search($value['id_mes'], $array);
    $cuantosMeses = $value['msi'];
    if (($cuantosMeses + $indexBd)>=$indexJs) {
        array_push($mensaje, 'Sí entra todavía');
        array_push($arrayClave, $value['concepto'], $value['cantidad'], $value['msi'], $value['id_mes']);
}
    else {
        array_push($mensaje, 'Ya no entra');
    }
}
echo json_encode($arrayClave, JSON_NUMERIC_CHECK);