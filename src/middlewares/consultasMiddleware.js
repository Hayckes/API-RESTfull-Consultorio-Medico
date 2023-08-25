let {
  consultorio,
  consultas,
  consultasFinalizadas,
  laudos,
} = require("../database/bancodedados");

const verificarSenhaCnesDoQuery = (req, res, next) => {
  const { cnes_consultorio, senha_consultorio } = req.query;

  if (!cnes_consultorio || !senha_consultorio) {
    return res
      .status(400)
      .json({ mensagem: "É necessário informar o cnes e a senha" });
  }
  return next();
};
const validarSenhaCnesDoQuery = (req, res, next) => {
  const { cnes_consultorio, senha_consultorio } = req.query;

  if (
    cnes_consultorio !== consultorio.cnes ||
    senha_consultorio !== consultorio.senha
  ) {
    return res.status(401).json({ mensagem: "Cnes ou senha inválidos!" });
  }

  return next();
};
const verificaValorConsultaNumber = (req, res, next) => {
  const { valorConsulta } = req.body;

  if (valorConsulta !== Number(valorConsulta)) {
    return res.status(400).json({
      mensagem: "O valor da consulta tem que ser do tipo number",
    });
  }

  return next();
};
const validarTipoDeConsulta = (req, res, next) => {
  const { tipoConsulta } = req.body;

  let especialidade = consultorio.medicos.find(
    (medicos) => medicos.especialidade === tipoConsulta
  );

  if (!especialidade) {
    return res
      .status(400)
      .json({ mensagem: "Não temos medicos para o tipo de consulta desejado" });
  }

  req.especialidade = especialidade;
  req.tipoConsulta = tipoConsulta;

  return next();
};
const validarIdConsulta = (req, res, next) => {
  const { identificadorConsulta } = req.params;

  let paciente = consultas.find(
    (paciente) => paciente.identificador === Number(identificadorConsulta)
  );

  if (!paciente) {
    return res.status(400).json({
      mensagem: "O id informado não pertence a nenhum paciente cadastrado",
    });
  }

  req.paciente = paciente;

  return next();
};
const consultaFinalizada = (req, res, next) => {
  const { paciente } = req;
  if (paciente.finalizada) {
    return res
      .status(400)
      .json({ mensagem: "A consulta desse paciente ja foi finalizada" });
  }

  return next();
};
const validarIdDeConsultaBody = (req, res, next) => {
  const { identificadorConsulta } = req.body;

  let consultaFind = consultas.find(
    (id) => id.identificador === Number(identificadorConsulta)
  );

  if (!consultaFind) {
    return res.status(400).json({
      mensagem: "O identificador informado não pertence a nehuma consulta",
    });
  }

  req.consultaFind = consultaFind;

  return next();
};
const verificaSeConsultaFinalizada = (req, res, next) => {
  const { consultaFind } = req;

  if (consultaFind.finalizada) {
    return res.status(400).json({
      mensagem: "Essa consulta ja foi finalizada",
    });
  }

  let consultaFim = consultasFinalizadas.find(
    (consulta) => consulta.identificador === consultaFind.identificador
  );

  if (consultaFim) {
    return res.status(400).json({
      mensagem: "Essa consulta ja foi finalizada",
    });
  }

  return next();
};
const validarIdDeConsultaQuery = (req, res, next) => {
  const { identificador_consulta } = req.query;

  let consultaNãoFinalizada = consultas.find(
    (consulta) => consulta.identificador === Number(identificador_consulta)
  );

  if (!consultaNãoFinalizada.finalizada) {
    return res.status(400).json({
      mensagem: "Essa consulta medica ainda não tem laudo",
    });
  }

  let consulta = laudos.find(
    (x) => x.identificadorConsulta === Number(identificador_consulta)
  );

  if (!consulta) {
    return res.status(400).json({
      mensagem: "Consulta médica não encontrada!",
    });
  }

  req.consulta = consulta;

  return next();
};

module.exports = {
  verificarSenhaCnesDoQuery,
  validarSenhaCnesDoQuery,
  validarTipoDeConsulta,
  validarIdConsulta,
  consultaFinalizada,
  validarIdDeConsultaBody,
  verificaSeConsultaFinalizada,
  validarIdDeConsultaQuery,
  verificaValorConsultaNumber,
};
