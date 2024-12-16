<?php


    class copias_libros  {
        private $bd;
        public $id_libro;
        public $id_copia;
        public $Fecha_edicion;

        public function __construct($db, int $idl=0, int $idc=0, String $fe=""){
            $this->bd=$db;
            $this->id_libro=$idl;
            $this->id_copia=$idc;
            $this->Fecha_edicion=$fe;
        }


        public function seleccLibro(){
            $consulta = "SELECT id, titulo FROM libros";
            $senten = $this->bd->prepare($consulta);
            $senten->bind_result("is", $this->ID, $this->Titulo,);
            $senten->execute();

            echo "<select name = \"id_libro\">";
            while($senten -> fetch()){
                echo "<option value=\".this->id_libro"\">".$titulo."</option>";
            }
             echo "</select>";
        }

        public function insertarCopia(){
            $consulta = "INSERT INTO copias_libros(id_libro, id_copia, Fecha_edicion) VALUES(?, ?, ?)";
            $senten = $this->bd->prepare($consulta);
            $senten->bind_result("iis", $this->id_libro, $this->id_copia, $this->Fecha_edicion);
            $senten->execute();
        }
    }





    class prestamos{
        private $bd
        private $usuario;
        private $libro;
        private $copia;
        private $fecha_prestamo;
        private $fecha_devolucion;
        private $estado;


        public function __construct($db, String $usus="", int $lib=0, int $cop=0, String $fP="", String $fD="", int $est){
            $this->bd=$db;
            $this->usuario=$usus;
            $this->libro=$lib;
            $this->copia=$cop;
            $this->fecha_prestamo=$fP;
            $this->fecha_devolucion=$fD;
            $this->estado=$est;

        }


        public function tabla(){
            $tituli="";
            $usu="";

            $consulta = "SELECT libros.titulo, usuarios.nombre, prestamos.fecha_prestamo FROM usuarios, libros, prestamos WHERE usuario = DNI AND libro = ID AND  estado=0 AND fecha_devolucion>fecha_prestamo AND  ORDER BY fecha_devolucion ASC";
            
            // Ns bn como hacerlo para pasar la fecha a numero pero lo pasaria a segundos la fecha, eso entre 60 para tenerlo en minutos, eso entre 60 para tenerlo en horas y eso entre 24 para tenerlo en dias y ya lo que tengas lo multiplicas por 1.5€ y ya tendrias lo que tiene q pagar.
            
            $senten = $this->bd->prepare($consulta);
            $senten->bind_result($titulibr, $usu, $this->fecha_prestamo, $this->fecha_devolucion);
            $senten->execute();
            echo "<table>";
            while($senten -> fetch()){
                
                echo "<tr><td>".$titulibr."</td><td>".$usu."</td><td>". $this->fecha_prestamo."</td><td>".$this->fecha_devolucion."</td></tr>";
            }
            echo "</table>";

            
        }
    }
?>