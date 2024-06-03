
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
            {{-- fecha de reporte:  --}}
          </p>
        </div>
      </div>

      <table align="center"  width="100%">
        <thead>
          <tr align="center">
              <td colspan="" style="font-size: 120%; font-weight: bold;">MASCOTAS</strong></td>
          </tr>
        </thead>
      </table>   
      <br>


      <table align="center"  border="1" >
        <thead>
          
          <tr style="background-color: #CACFD2; color: black;font-weight: bold; font-size: 15px;" class='content' id="cabeza">
            <th style="font-size: 85%;" align="center">N°</th>
            <th style="font-size: 85%;" align="center">MASCOTA</th>
            <th style="font-size: 85%;" align="center">EDAD</th>
            <th style="font-size: 85%;" align="center">GENERO</th>
            <th style="font-size: 85%;" align="center">TIPO</th>
            <th style="font-size: 85%;width: 100px;" align="center">DESCRIPCION</th>
            <th style="font-size: 85%;" align="center">ADOPTADO</th>
            <th style="font-size: 85%;" align="center">ESTADO</th>
            <th style="font-size: 85%;" align="center">REFIGIO</th>
          </tr>
        </thead>  
        <tbody>
            @php($count=1)
            @foreach ($mascotas as  $value)
                <tr class='content'>
                    <td style="font-size: 80%;">{{$count++}}</td>
                    <td style="font-size: 80%;">{{$value->nombre}}</td>
                    <td style="font-size: 80%;">{{$value->edad}}</td>
                    <td style="font-size: 80%;">
                        {{$value->genero}}
                    </td>
   
                    <td style="font-size: 80%;">{{$value->tipo}}</td>
                    <td style="font-size: 80%;">{{$value->descripcion}} sdcs asdsa sadsa asdasd asdasd</td>
                    <td style="font-size: 80%;">{{$value->adoptado == true?'ADOPTADO':'NO ADOPTADO'}}</td>
                    <td style="font-size: 80%;">{{$value->estado_vida == true?'VIVO':'MUERTO'}}</td>
                    <td style="font-size: 80%;">{{$value->refugio}}</td>
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








































