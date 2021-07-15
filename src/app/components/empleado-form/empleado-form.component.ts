import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Area } from 'src/app/models/area';
import { Empleado } from 'src/app/models/empleado';
import { Rol } from 'src/app/models/rol';
import { AreaService } from 'src/app/services/area.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { RolService } from 'src/app/services/rol.service';

@Component({
  selector: 'app-empleado-form',
  templateUrl: './empleado-form.component.html',
  styleUrls: ['./empleado-form.component.css']
})
export class EmpleadoFormComponent implements OnInit {

  rol1Value = 0
  rol2Value = 0
  rol3Value = 0
  rol1Check: boolean = false
  rol2Check: boolean = false
  rol3Check: boolean = false
  rol!: Rol[] 
  rolesResponse!: Rol []
  messageOK = ''
  messageError = ''
  accionOK = false
  errorAccion = false
  change = false
  boletinValue = 1
  form!: FormGroup
  selected!: number
  id!: number
  editing = false
  empleado: Empleado = {
    id: 0,
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
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private rolService: RolService) {
    this.areaService.index().subscribe( (data:any)=>{
      this.areas = data.data
      this.empleado.area_id = this.areas[0].id
    }, (error)=>{
      //this.snackBarService.message(error.message)
    })
    
    this.rolService.index().subscribe( (data:any)=>{
      this.rolesResponse = data.data
    }, (error)=>{
      console.log(error.message)
    })
    

    this.id = this.activatedRoute.snapshot.params['id']
    if(this.id){
      this.editing = true
      this.empleadoService.show(this.id).subscribe( (data:any)=>{
        this.empleado = data.data
        this.rol = data.data.roles
        this.setFormControl()
      }, (error)=>{
        console.log(error.message)
      })
    }

    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      sexo: ['M', Validators.required],
      area_id: [0, Validators.required],
      boletin: [0, Validators.required],
      descripcion: ['', Validators.required],
      roles: new FormArray([])
    })
   }
  isSelectRol(){
    if(this.rol1Value != 0 || this.rol2Value != 0 || this.rol3Value != 0){
      return true
    }
    else{
      return false
    }
  }
  isRol(value: any){
    var response = false
    for(let step = 0; step < this.rol.length; step++){
      if(value == this.rol[step].id){
        response =  true
      }
    }
    return response
  }
  isSexo(value: string){
      if(this.form.value['sexo'] == value){
        return true
      }
      else{
        return false
      }
   }
   changeInput(){
     this.change = true
   }

   setFormControl(){
     this.form.setValue({
       nombre: this.empleado.nombre+'',
       email: this.empleado.email+'',
       sexo: this.empleado.sexo+'',
       area_id: this.empleado.area_id,
       boletin: this.empleado.boletin,
       descripcion: this.empleado.descripcion+'',
       roles: []
     })
   }

   update(){     
     this.empleado = this.form.value
     this.empleado.id = this.id
     this.empleadoService.update(this.empleado).subscribe( (data:any)=>{
       this.accionOK = true
       this.messageOK = "Se ha actualizado exitosamente"
       setTimeout(() => { 
        this.accionOK = false
       }, 5000)
     }, (error)=>{
       this.errorAccion = true
       this.messageError = "Ha ocurrido un error al actualizar los cambios"
       setTimeout(() => { 
        this.errorAccion = false
       }, 5000)
     })
     this.change = false
   }

   save(){
     this.empleado = this.form.value     
     this.empleadoService.store(this.empleado).subscribe((data:any)=>{
      this.accionOK = true
       this.messageOK = "Se ha agregado exitosamente"
       setTimeout(() => { 
        this.accionOK = false
       }, 5000)
       this.form.reset()
     }, (error)=>{
      this.messageError = "Ha ocurrido un error al guardar los cambios - "
      if(error.error.errors['nombre']){
        this.messageError += error.error.errors['nombre'] + " - "
      }
      if(error.error.errors['email']){
        this.messageError += error.error.errors['email'] + " - "
      }
      if(error.error.errors['sexo']){
        this.messageError += error.error.errors['sexo'] + " - "
      }
      if(error.error.errors['area_id']){
        this.messageError += error.error.errors['area_id'] + " - "
      }
      if(error.error.errors['boletin']){
        this.messageError += error.error.errors['boletin'] + " - "
      }
      if(error.error.errors['descripcion']){
        this.messageError += error.error.errors['descripcion'] + " - "
      }
      if(error.error.errors['roles']){
        this.messageError += error.error.errors['roles'] + " - "
      }
      this.errorAccion = true
      setTimeout(() => { 
       this.errorAccion = false
      }, 5000)
     })
   }

   onkey(control:number, value: any){
      switch (control){
        case 1:
          this.form.value['sexo'] = value
          break;
        case 2:
          this.form.value['area_id'] = value
          break;
        case 3:
          this.form.value['boletin'] = value
          if(this.boletinValue == 1){
            this.boletinValue = 0
          }
          else{
            this.boletinValue = 1
          }
          break;
        case 4:
          this.form.value['descripcion'] = value
          break;
        case 5:
          this.form.value['roles']  = value
          this.añadirRol(parseInt(value))
          break;
      }
   }

   añadirRol(value: number){
    switch (value){
      case 1:
        this.rol1Value = value
        break
      case 2:
        this.rol2Value = value
        break
      case 3:
        this.rol3Value = value
        break
    }
   }
   changeCheck(value: number){
      switch (value){
        case 1:
          this.rol1Check = !this.rol1Check
          break;
        case 2:
          this.rol2Check = !this.rol2Check
          break;
        case 3:
          this.rol3Check = !this.rol3Check
          break;
      }
      this.limpiarRoles()
   }

   limpiarRoles(){
     if(this.rol1Check == false){
      this.rol1Value = 0     
     }
     if(this.rol2Check == false){
      this.rol2Value = 0
     }
     if(this.rol3Check == false){
      this.rol3Value = 0
     }
   }

   onCheckChange(event: any) {
    const formArray: FormArray = this.form.get('roles') as FormArray;
    if(event.target.checked){
      formArray.push(new FormControl(event.target.value));
    }
    else{
      let i: number = 0  
      formArray.controls.forEach((ctrl: any) => {
        if(ctrl.value == event.target.value) {
          formArray.removeAt(i)
          return;
        }  
        i++
      });
    }
  }

  ngOnInit(): void {
  }

}
