let { consultorio } = require("../database/bancodedados");

const verificarCamposInformadosBody = (req, res, next) => {
  const {
    tipoConsulta,
    valorConsulta,
    paciente: { nome, cpf, dataNascimento, celular, email, senha },
  } = req.body;

  if (!tipoConsulta || !valorConsulta) {
    return res
      .status(400)
      .json({ mensagem: "É necessario informar o tipo de consulta e o valor" });
  }
  if (!nome || !cpf || !dataNascimento || !celular || !email || !senha) {
    return res
      .status(400)
      .json({ mensagem: "É necessario informar todos os dados do paciente" });
  }

  return next();
};

const dadosPassadoParaFinalizar = (req, res, next) => {
  const { identificadorConsulta, textoMedico } = req.body;

  if (!identificadorConsulta || !textoMedico) {
    return res.status(400).json({
      mensagem: "O identificador de consulta e texto medico devem ser passados",
    });
  }

  return next();
};

const verificarTamanhoTextoMedico = (req, res, next) => {
  const { textoMedico } = req.body;

  if (textoMedico.length < 1 || textoMedico.length > 200) {
    return res.status(400).json({
      mensagem: "O tamanho do textoMedico não está dentro do esperado",
    });
  }

  return next();
};

const verificarSeSenhaEIdForamPassados = (req, res, next) => {
  const { identificador_consulta, senha } = req.query;

  if (!identificador_consulta || !senha) {
    return res.status(400).json({
      mensagem: "O identificador de consulta e senha devem ser passados",
    });
  }

  return next();
};

const verificarIdMedico = (req, res, next) => {
  const { identificador_medico } = req.query;

  let medico = consultorio.medicos.find(
    (medicos) => medicos.identificador === Number(identificador_medico)
  );

  if (!identificador_medico) {
    return res.status(400).json({
      mensagem: "É necessario informar o identificador do medico",
    });
  }

  if (!medico) {
    return res.status(400).json({
      mensagem: "O medico informado não existe",
    });
  }

  return next();
};

module.exports = {
  verificarCamposInformadosBody,
  dadosPassadoParaFinalizar,
  verificarTamanhoTextoMedico,
  verificarSeSenhaEIdForamPassados,
  verificarIdMedico,
};
