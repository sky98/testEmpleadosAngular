import { Rol } from "./rol";

export interface Empleado{
    id?: number;
    nombre: string;
    email: string;
    sexo: string;
    area?: string;
    area_id: number;
    boletin: number;
    descripcion: string;
    roles?: Rol [];
}