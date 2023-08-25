let {
  consultas,
  consultasFinalizadas,
  idPaciente,
} = require("../database/bancodedados");
const { valorConsultaNum } = require("../helpers/valorNumerico.js");

const consultaAgendada = (req, res) => {
  if (consultas.length > 0) {
    return res.json(consultas);
  }
  return res.status(204).send();
};

const agendarConsulta = (req, res) => {
  const {
    valorConsulta,
    tipoConsulta,
    paciente: { nome, cpf, dataNascimento, celular, email, senha },
  } = req.body;

  const { especialidade } = req;

  valorConsultaNum(valorConsulta);

  consultas.push({
    identificador: idPaciente++,
    tipoConsulta,
    identificadorMedico: especialidade.identificador,
    finalizada: false,
    valorConsulta,
    paciente: {
      nome,
      cpf,
      dataNascimento,
      celular,
      email,
      senha,
    },
  });

  return res.status(204).send();
};

const cancelarConsulta = (req, res) => {
  const { paciente } = req;

  if (paciente.finalizada) {
    return res.status(400).json({
      mensagem: "A consulta não pode ser cancelada póis ja foi finalizada",
    });
  }

  let indicePaciente = consultas.findIndex(
    (pacienteInd) => pacienteInd.identificador === paciente.identificador
  );

  consultas.splice(indicePaciente, 1);

  return res.status(204).send();
};

const consultasPorMedico = (req, res) => {
  const { identificador_medico } = req.query;

  let consultasDoMedico = consultasFinalizadas.filter(
    (consultas) =>
      consultas.identificadorMedico === Number(identificador_medico)
  );

  if (!consultasDoMedico) {
    return res.status(400).json({
      mensagem: "O medico informado não realizou consulta",
    });
  }

  return res.status(200).json(consultasDoMedico);
};

module.exports = {
  consultaAgendada,
  agendarConsulta,
  cancelarConsulta,
  consultasPorMedico,
};
