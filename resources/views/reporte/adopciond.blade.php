<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <table  align="center"  border="0" width="100%" style="border-collapse:collapse;">
        <tr>
           {{--  <td style="width: 150px;height: 100px;"> <img src="/assets/image/logoSOS.png" className="w-32" alt="tailus logo"/></td> --}}
            <td style="text-align: center;">REGISTRO DE ADOPCION</td>
        </tr>
        <tr>
            <td {{-- colspan="2" --}} style="width: 500px;text-align: center; height: 100px;">Adoptar es una responsabilidad que dura muchos años, al hacerlo debe estar seguro y<br/>
                comprometido ya que es una vida inocente que tomará en sus manos que dependerá
                <br/>COMPLETAMENTE de usted.</td>
        </tr>
    </table>


    <table align="center"  border="1" width="100%" style="border-collapse:collapse;">
        <tr>
            <td style="font-size: 12px;height: 38px;"> <strong>FECHA ADOPCION</strong>  <br/>{{$adopcion->fecha}} </td>
            <td colspan="3" style="font-size: 12px;border-bottom:white 0px solid;"></td>

        </tr>
        <tr>
            <td style="font-size: 12px;height: 38px;"> <strong>NOMBRE MASCOTA</strong>  <br/>{{$adopcion->nombre_mascota}} </td>
            <td style="font-size: 12px;"><strong>ESPECIE</strong>  <br/>{{$adopcion->tipo_animal}} </td>
            <td style="font-size: 12px;"><strong>RAZA</strong> <br/> {{$adopcion->raza}}</td>
            <td style="font-size: 12px;"><strong>COLOR</strong>  <br/> {{$adopcion->color}}</td>
        </tr>
        <tr>
            <td style="font-size: 12px;height: 38px;"><strong>GENERO</strong> <br/> {{$adopcion->genero}}</td>
            <td style="font-size: 12px;height: 38px;"> <strong>REFUGIO</strong>  <br/>{{$adopcion->refugio}}</td>
            <td colspan="2" style="font-size: 12px;height: 38px;"><strong>DESCRIPCION</strong>  <br/>{{$adopcion->descripcion_mascota}}</td>

        </tr>
        <tr>
            <td colspan="4" style="height: 20px;"></td>
        </tr>
        <tr>
            <td colspan="2" style="font-size: 12px;height: 38px;"><strong>PERSONA ADOPTANTE</strong><br/>{{$adopcion->nombre_adoptante}} {{$adopcion->apellidos_adoptante}}</td>

            <td colspan="2" style="font-size: 12px;height: 38px;"><strong>CI</strong><br/> {{$adopcion->ci_adoptante}}</td>
      
        </tr>
        <tr>
            <td colspan="2" style="font-size: 12px;height: 38px;"><strong>CELULAR</strong><br/>{{$adopcion->celular_adoptante}}</td>

            <td colspan="2" style="font-size: 12px;height: 38px;"><strong>DIRECCION</strong><br/> {{$adopcion->direccion_adoptante}}</td>
        </tr>
        
    </table>
    <br>
    <br>

    <table  align="center"  border="0" width="100%" style="border-collapse:collapse;">
        <tr>
            <tr>
                <td style="width: 320px;color: white">dsd</td>
                <td style="text-align: center;">
                    <p>...............................</p> 
                    <p style="font-size: 11px;">{{$adopcion->nombre_adoptante}} {{$adopcion->apellidos_adoptante}}</p>
                    <p style="font-size: 11px;">CI: {{$adopcion->ci_adoptante}}</p>
                </td>
            </tr>
        </tr>
    </table>
</body>
</html>