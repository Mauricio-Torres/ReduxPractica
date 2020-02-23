export class IngresoEgreso {
  description: string;
  monto: number;
  tipo: string;
  uid?: string;

  constructor(obj: ObjInput) {
    this.description = obj && obj.description || null;
    this.monto = obj && obj.monto || 0;
    this.tipo = obj && obj.tipo || null;
  }
}

interface ObjInput {
  description: string;
  monto: number;
  tipo: string;
  uid?: string;
}
