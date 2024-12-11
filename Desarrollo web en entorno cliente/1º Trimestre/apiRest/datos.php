<?php
    require_once("inc/conexion.php");
    $consulta = "SELECT * FROM cursosdb";
    $sentencia = $conexion->prepare($consulta);
    $sentencia->execute();
    $resultados = $sentencia->fetchAll(PDO::FETCH_ASSOC); // Devuel un array asociativo

    echo json_encode($resultados); //Codifica los datos en un json
    // echo "<pre>";
    // var_dump($resultados);
    // echo "</pre>";

?>