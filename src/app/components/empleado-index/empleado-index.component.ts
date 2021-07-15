import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-empleado-index',
  templateUrl: './empleado-index.component.html',
  styleUrls: ['./empleado-index.component.css']
})
export class EmpleadoIndexComponent implements OnInit {

  empleados!: Empleado[]

  constructor(private empleadoService: EmpleadoService){
    this.empleadoService.index().subscribe( (data:any)=>{
      this.empleados = data.data  
    }, (error)=>{
      console.log(error.message)
    })
  }

  delete(empleado: Empleado){
    this.empleadoService.delete(empleado).subscribe((data:any)=>{
      
      //alert("usuario eliminado con exito")
      window.location.reload()
    }, (error)=>{
      alert("Ha ocurrido un error")
    })
  }

  ngOnInit(): void {
  }

}
