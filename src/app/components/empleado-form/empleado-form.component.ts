import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Area } from 'src/app/models/area';
import { Empleado } from 'src/app/models/empleado';
import { AreaService } from 'src/app/services/area.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-empleado-form',
  templateUrl: './empleado-form.component.html',
  styleUrls: ['./empleado-form.component.css']
})
export class EmpleadoFormComponent implements OnInit {

  empleado: Empleado = {
    nombre: '',
    email: '',
    sexo: 'M',
    area_id: 0,
    boletin: 0,
    descripcion: ''
  }
  areas!: Area[]

  constructor(private areaService: AreaService,
              private empleadoService: EmpleadoService,
              private snackBarService: SnackBarService,
              private snakcBar: MatSnackBar) {
    this.areaService.index().subscribe( (data:any)=>{
      this.areas = data.data
      this.empleado.area_id = this.areas[0].id
    }, (error)=>{
      this.snackBarService.message(error.message)
    })
   }

   save(){
     this.empleadoService.store(this.empleado).subscribe((data:any)=>{
      this.snakcBar.open("Empleado creado con exito", '', {
        duration: 1500,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      })
      alert("usuario creado con exito")
     }, (error)=>{
      this.snackBarService.message("Hubo un error al crear el empleado "+ error.message)
     })
   }

   onkey(control:number, value: any){
      switch (control){
        case 1:
          this.empleado.nombre = value
          break;
        case 2:
          this.empleado.email = value
          break;
        case 3:
          this.empleado.sexo = value
          break;
        case 4:
          this.empleado.area_id = value
          break;
        case 5:
          this.empleado.boletin = value
          break;
        case 6:
          this.empleado.descripcion = value
          break;
      }
   }

  ngOnInit(): void {
  }

}
