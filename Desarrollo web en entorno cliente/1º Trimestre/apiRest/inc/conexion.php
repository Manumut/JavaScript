<?php
    $host = "localhost";
    $username = "root";
    $password = "";
    $dbname = "escueladb";

    try{
        $conexion = new PDO("mysql: host=".$host.";dbname=".$dbname.";charset=UTF8", $username, $password);
        // Damos la posibilidad de que se vean las tildes
        // $conexion->set_charset("utf8");
    }catch(PDOException $e){
        echo "Ha ocurrido el error: ".$e->getMessage();
    }
?>