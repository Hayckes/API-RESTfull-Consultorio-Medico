let { consultas } = require("../database/bancodedados");

const atualizarDadosPaciente = (req, res) => {
  const { nome, cpf, dataNascimento, celular, email, senha } = req.body;
  let { paciente } = req;

  paciente.paciente = {
    nome,
    cpf,
    dataNascimento,
    celular,
    email,
    senha,
  };

  return res.status(204).send();
};

module.exports = {
  atualizarDadosPaciente,
};
