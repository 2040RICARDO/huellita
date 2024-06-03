
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
              <td colspan="" style="font-size: 120%; font-weight: bold;">REFUGIOS</strong></td>
          </tr>
        </thead>
      </table>   
      <br>


      <table align="center"  border="1" >
        <thead>
          
          <tr style="background-color: #CACFD2; color: black;font-weight: bold; font-size: 15px;" class='content' id="cabeza">
            <th style="font-size: 85%;" align="center">N°</th>
            <th style="font-size: 85%;" align="center">NOMBRE</th>
            <th style="font-size: 85%;" align="center">DIRECCION</th>
            <th style="font-size: 85%;" align="center">UBICACION</th>
            <th style="font-size: 85%;" align="center">TELEFONO/CONTACTO</th>
            <th style="font-size: 85%;" align="center">ESTADO</th>
          </tr>
        </thead>  
        <tbody>
            @php($count=1)
            @foreach ($refugios as  $value)
                <tr class='content'>
                    <td style="font-size: 80%;">{{$count++}}</td>
                    <td style="font-size: 80%;">{{$value->nombre}}</td>
                    <td style="font-size: 80%;">{{$value->direccion}}</td>
                    <td style="font-size: 80%;">{{$value->ubicacion}}</td>
                    <td style="font-size: 80%;" align="center">{{$value->telefono}}</td>
                    <td style="font-size: 80%;" align="center">{{$value->estado == true?'ABIERTO':'CERRADO'}}</td>
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








































