export interface Participant {
  nome: string;
  email: string;
  evento: string;
  status: "Pago" | "Pendente" | "Cancelado";
}
