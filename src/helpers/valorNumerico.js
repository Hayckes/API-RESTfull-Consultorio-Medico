function valorConsultaNum(num) {
  if (num !== typeof Number) {
    num = Number(num);
  }

  return num;
}

module.exports = {
  valorConsultaNum,
};
