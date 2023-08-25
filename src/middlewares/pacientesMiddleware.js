let {
  consultas,
  consultasFinalizadas,
  laudos,
} = require("../database/bancodedados");

const verificarCPF = (req, res, next) => {
  const {
    paciente: { cpf },
  } = req.body;

  let consultaIgualFalse = Boolean();

  let consultaNF = consultas.filter(
    (consulta) => consulta.paciente.cpf === cpf
  );

  if (consultaNF.length > 0) {
    consultaIgualFalse = consultaNF.some(
      (consultaFalse) => consultaFalse.finalizada === false
    );
  }

  if (consultaIgualFalse) {
    return res.status(400).json({
      mensagem:
        "Já existe uma consulta em andamento com o cpf ou e-mail informado!",
    });
  }

  return next();
};

const verificarCamposPacienteBody = (req, res, next) => {
  const { nome, cpf, dataNascimento, celular, email, senha } = req.body;

  if (!nome || !cpf || !dataNascimento || !celular || !email || !senha) {
    return res
      .status(400)
      .json({ mensagem: "É necessario preencher todos os dados do paciente" });
  }

  return next();
};

const verificarCpfEmailCadastrado = (req, res, next) => {
  const { cpf, email } = req.body;
  const { paciente } = req;

  let pacienteCpfConsulta = consultas.some(
    (cpfPaciente) => cpfPaciente.paciente.cpf === cpf
  );
  let pacienteFinalizadoCpf = consultasFinalizadas.some(
    (cpfPaciente) => cpfPaciente.paciente.cpf === cpf
  );

  let pacienteEmailConsulta = consultas.some(
    (emailPaciente) => emailPaciente.paciente.email === email
  );
  let pacienteFinalizadoEmail = consultasFinalizadas.some(
    (emailPaciente) => emailPaciente.paciente.email === email
  );

  let pacienteCpf = consultas.filter(
    (consultas) => consultas.paciente.cpf === cpf
  );

  let pacienteCpfFalse = pacienteCpf.some(
    (consultaFalse) => consultaFalse.finalizada === false
  );

  if (
    !pacienteCpfFalse &&
    pacienteCpfConsulta &&
    pacienteFinalizadoCpf &&
    !paciente.finalizada
  ) {
    return res.status(400).json({
      mensagem: "O cpf informado ja consta na base",
    });
  }

  let pacienteEmail = consultas.filter(
    (consultas) => consultas.paciente.email === email
  );

  let pacienteEmailFalse = pacienteEmail.some(
    (consultaFalse) => consultaFalse.finalizada === false
  );

  if (
    !pacienteEmailFalse &&
    pacienteEmailConsulta &&
    pacienteFinalizadoEmail &&
    !paciente.finalizada
  ) {
    return res.status(400).json({
      mensagem: "O email informado ja consta na base",
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

const validarSenhaPacienteLaudoQuery = (req, res, next) => {
  const { senha } = req.query;
  const { consulta } = req;

  if (senha !== consulta.paciente.senha) {
    return res.status(400).json({
      mensagem: "A senha iformada está incorreta",
    });
  }

  return next();
};
module.exports = {
  verificarCPF,
  verificarCamposPacienteBody,
  verificarCpfEmailCadastrado,
  validarSenhaPacienteLaudoQuery,
  validarIdDeConsultaQuery,
};
