let {
  laudos,
  consultasFinalizadas,
  consultorio,
  idLaudo,
  idConsulta,
} = require("../database/bancodedados");
const laudosDasConsultas = (req, res) => {
  const { consulta } = req;
  return res.status(200).json(consulta);
};

const finalizarConsulta = (req, res) => {
  const { textoMedico } = req.body;
  const { consultaFind } = req;

  let medico = consultorio.medicos.find(
    (medicos) => medicos.especialidade === consultaFind.tipoConsulta
  );

  consultaFind.finalizada = true;

  let novaConsultaFinalizada = {
    identificador: consultaFind.identificador,
    identificadorConsulta: idConsulta++,
    identificadorMedico: medico.identificador,
    finalizada: true,
    identificadorLaudo: idLaudo++,
    valorConsulta: consultaFind.valorConsulta,
    paciente: consultaFind.paciente,
  };

  consultasFinalizadas.push(novaConsultaFinalizada);

  let novoLaudo = {
    identificador: consultaFind.identificador,
    identificadorConsulta: novaConsultaFinalizada.identificador,
    identificadorMedico: medico.identificador,
    textoMedico,
    paciente: consultaFind.paciente,
  };

  laudos.push(novoLaudo);

  return res.status(204).send();
};

module.exports = {
  finalizarConsulta,
  laudosDasConsultas,
};
