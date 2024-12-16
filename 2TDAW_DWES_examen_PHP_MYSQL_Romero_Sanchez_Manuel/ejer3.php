<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php
        $conexion = new mysqli ('Localhost', 'root', '','examen_biblio');

        require_once("./class.php");
    $prestam = new prestamos($conexion);

    $prestam->tabla();


        
    ?>
</body>
</html>