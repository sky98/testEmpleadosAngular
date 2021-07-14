import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-empleado-index',
  templateUrl: './empleado-index.component.html',
  styleUrls: ['./empleado-index.component.css']
})
export class EmpleadoIndexComponent implements OnInit {

  empleados!: Empleado[]

  constructor(private empleadoService: EmpleadoService,
              private snackBar: MatSnackBar){
    this.empleadoService.index().subscribe( (data:any)=>{
      this.empleados = data.data  
    }, (error)=>{
      console.log(error.message)
    })
  }

  delete(empleado: Empleado){
    this.empleadoService.delete(empleado).subscribe((data:any)=>{
      this.snackBar.open("Usuario Eliminado con exito", '', {
        duration: 1500,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      })
      //alert("usuario eliminado con exito")
      window.location.reload()
    }, (error)=>{
      alert("Ha ocurrido un error")
    })
  }

  ngOnInit(): void {
  }

}
