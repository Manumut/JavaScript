<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php
        $conexion = new mysqli ('Localhost'. 'root', '','examen_biblio');

        require_once("./class.php");

        if(isset($_POST["enviar"])){
            $libr = new copias_libros($conexion, $idLibro, 0, $fecha);

        }else{
            ?>
            <form action="" method="post" enctype="multipart/form-data">

                <?php $libr->seleccLibro(); ?>
            <input type="submit" name="enviar" value="enviar">


                
            </form>
        
    <?php }?>
    

    
</body>
</html>






















