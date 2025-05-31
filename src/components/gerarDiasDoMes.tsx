import { format, getDaysInMonth, getDay, addDays } from "date-fns";
import { setDefaultOptions } from "date-fns/setDefaultOptions";
import { ptBR } from "date-fns/locale";

export interface DiaDoMes {
  day: string;
  weekDay: string;
  month: string;
  date: Date;
}

export function gerarDiasDoMes(mes: number, ano: number): DiaDoMes[] {
  const dataInicio = new Date(ano, mes - 1, 1);
  const diasNoMes = getDaysInMonth(dataInicio);

  const dias: DiaDoMes[] = [];

  const diasDaSemana = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];
  setDefaultOptions({ locale: ptBR });
  for (let i = 0; i < diasNoMes; i++) {
    const dataAtual = addDays(dataInicio, i);
    const diaFormatado = format(dataAtual, "dd");
    const diaDaSemana = diasDaSemana[getDay(dataAtual)];
    const mesFormatado = format(dataAtual, "MMMM");

    dias.push({
      day: diaFormatado,
      weekDay: diaDaSemana,
      month: mesFormatado,
      date: dataAtual,
    });
  }

  return dias;
}
