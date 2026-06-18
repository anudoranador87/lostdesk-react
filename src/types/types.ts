export type EstadoObjeto = 'pendiente' | 'reclamado' | 'entregado';

export interface LostItem {
  id: string;
  nombre: string;
  habitacion: string;
  fecha: string;
  estado: EstadoObjeto;
  comentario?: string;
  foto_url?: string;
  registrado_por: string;
  reclamado_por?: string;
  email_cliente?: string;
  booking_cliente?: string;
  created_at?: string;
}
