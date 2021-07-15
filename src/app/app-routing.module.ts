import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EmpleadoFormComponent } from './components/empleado-form/empleado-form.component';
import { EmpleadoIndexComponent } from './components/empleado-index/empleado-index.component';

const routes: Routes = [
  { path: '', redirectTo: 'listar-empleados', pathMatch: 'full' },
  { path: 'listar-empleados', component: EmpleadoIndexComponent },
  { path: 'agregar-empleado', component: EmpleadoFormComponent },
  { path: 'editar-empleado/:id', component: EmpleadoFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
