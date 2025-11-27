export type Abordagem = {
  id: string;
  placa: string;
  observacoes?: string;
  fotoUri?: string;
  latitude?: number;
  longitude?: number;
  criadaEm: string; // ISO string
};
