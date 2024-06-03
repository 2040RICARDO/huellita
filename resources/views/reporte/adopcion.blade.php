
<!DOCTYPE html>
<html lang="es-ES">
<head>
  <meta charset="utf-8">
  <title></title>
  <style type="text/css">
  body{
    font-family: Arial;
  }

  #main-container{
    margin: 20px auto;
 
  }

  table{
    background-color: white;
    text-align: left;
    border-collapse: collapse;
    width: 100%;
  }

  th, td{
    padding: 10px;
  }



  tr:nth-child(even){
    background-color: #ddd;
  }

  .flex-container {
    display: flex;
    justify-content: flex-start; 
  }

</style>
</head>
<body>
  <div id="main-container">
    <div class="flex-container">
        <div>
          <p align="center" style="font-size: 14px;font-family:Copperplate; letter-spacing:2.5px;"><b>ANIMALES SOS<br>
            <span style="font-size: 14px;">LLALLAGUA</span><br>
          Llallagua - Bolivia</b></p>
        </div>
        <div> 
          <p style="font-size: 12px; float: right;">

          </p>
        </div>
      </div>

      <table align="center"  width="100%">
        <thead>
          <tr align="center">
              <td colspan="" style="font-size: 120%; font-weight: bold;">ADOPCIONES</strong></td>
          </tr>
        </thead>
      </table>   
      <br>

      <table align="center"  border="1" >
        <thead>
          
          <tr style="background-color: #CACFD2; color: black;font-weight: bold; font-size: 15px;" class='content' id="cabeza">
            <th style="font-size: 85%;" align="center">N°</th>
            <th style="font-size: 85%;" align="center">ADOPTANTE</th>
            <th style="font-size: 85%;" align="center">MASCOTA</th>
            <th style="font-size: 85%;" align="center">CI</th>
            <th style="font-size: 85%;" align="center">CELULAR</th>
            <th style="font-size: 85%;" align="center">DIRECCION</th>
            <th style="font-size: 85%;" align="center">FECHA ADOPCION</th>
            <th style="font-size: 85%;" align="center">ESTADO</th>
          </tr>
        </thead>  
        <tbody>
            @php($count=1)
            @foreach ($adopciones as  $value)
                <tr class='content'>
                    <td style="font-size: 80%;">{{$count++}}</td>
                    <td style="font-size: 80%;">{{$value->nombre_adoptante}} {{$value->apellidos_adoptante}}</td>
                    <td style="font-size: 80%;">{{ isset($value->nombre_mascota)?($value->nombre_mascota):'' }}</td>
                    <td style="font-size: 80%;">{{$value->ci_adoptante}}</td>
                    <td style="font-size: 80%;" align="center">{{$value->celular_adoptante}}</td>
                    <td style="font-size: 80%;" align="center">{{$value->direccion_adoptante}}</td>
                    <td style="font-size: 80%;width: 100px" align="center">{{$value->fecha}}</td>
                    <td style="font-size: 80%;" align="center">
                        @if($value->estado_adopcion == 0)
                        PENDIENTE
                        @elseif($value->estado_adopcion == 1)
                        ADOPTADO
                        @elseif($value->estado_adopcion == 2)
                        RECHAZADO
                        @endif
               
                    </td>
                </tr>
            @endforeach
        </tbody>
      </table>

      <footer>
        <br>
        <span style="font-size: 12px;float: right;">impresion : {{ date('Y-m-d')  }}</span><br>
      </footer>
    </body>
  </div>
</html>








































