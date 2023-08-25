const express = require("express");
const {
  verificarCamposInformadosBody,
  dadosPassadoParaFinalizar,
  verificarTamanhoTextoMedico,
  verificarSeSenhaEIdForamPassados,
  verificarIdMedico,
} = require("../middlewares/middlewares.js");
const {
  verificarSenhaCnesDoQuery,
  validarSenhaCnesDoQuery,
  validarTipoDeConsulta,
  validarIdConsulta,
  consultaFinalizada,
  validarIdDeConsultaBody,
  verificaSeConsultaFinalizada,
  validarIdDeConsultaQuery,
  verificaValorConsultaNumber,
} = require("../middlewares/consultasMiddleware.js");
const {
  verificarCPF,
  verificarCamposPacienteBody,
  verificarCpfEmailCadastrado,
  validarSenhaPacienteLaudoQuery,
} = require("../middlewares/pacientesMiddleware.js");

const {
  consultaAgendada,
  agendarConsulta,
  cancelarConsulta,
  consultasPorMedico,
} = require("../controllers/consultasController.js");

const {
  finalizarConsulta,
  laudosDasConsultas,
} = require("../controllers/laudosController.js");

const {
  atualizarDadosPaciente,
} = require("../controllers/pacientesController.js");

const route = express();

route.get(
  "/consultas",
  verificarSenhaCnesDoQuery,
  validarSenhaCnesDoQuery,
  consultaAgendada
);

route.post(
  "/consulta",
  verificarCamposInformadosBody,
  verificaValorConsultaNumber,
  verificarCPF,
  validarTipoDeConsulta,
  agendarConsulta
);

route.put(
  "/consulta/:identificadorConsulta/paciente",
  verificarCamposPacienteBody,
  validarIdConsulta,
  verificarCpfEmailCadastrado,
  consultaFinalizada,
  atualizarDadosPaciente
);

route.delete(
  "/consulta/:identificadorConsulta",
  validarIdConsulta,
  cancelarConsulta
);

route.post(
  "/consulta/finalizar",
  dadosPassadoParaFinalizar,
  validarIdDeConsultaBody,
  verificaSeConsultaFinalizada,
  verificarTamanhoTextoMedico,
  finalizarConsulta
);

route.get(
  "/consulta/laudo",
  verificarSeSenhaEIdForamPassados,
  validarIdDeConsultaQuery,
  validarSenhaPacienteLaudoQuery,
  laudosDasConsultas
);

route.get("/consultas/medico", verificarIdMedico, consultasPorMedico);

module.exports = route;
