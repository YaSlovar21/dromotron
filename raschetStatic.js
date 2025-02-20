const staticRaschet = {
  name: 'Теплообменник Пластинчатый Разборный : ТИ077-11',
  typeId: 'voda-voda',
  tiNumberFromTm: '077',
  
  naznach: 'гвс',
  naznachEN: 'gvs',
  sreda1: 'вода',
  sreda2: 'вода',

  grSredaParameters: {
    in: '70.00 °C',
    out: '40.00 °C',
    consumption: '1.44 т/ч',
    pressureLoss: '1.47 м.вод.ст.'
  },
  nagrSredaParameters: {
    in: '5 °C',
    out: '65 °C',
    consumption: '0.72 т/ч',
    pressureLoss: '0.37 м.вод.ст.'
  },
  
  grSredaConnection: {
    du: '',
    type: '',
    kanalsNumber: '',
    kanalsRaskladka: '',
  },
  nagrSredaConnection: {
    du: '',
    type: '',
    kanalsNumber: '',
    kanalsRaskladka: '',
  },

  moshnostMeasure: 'кВт',
  moshnostNumber: '50',
  sOfHeatexchange: '0.69 м2',
  zapasPoverhnosti: '12.03%',
  plastinKolich: '11',
  hodov: 'одноходовой',

  massa: '50 / 52 кг',

  path: 'teploobmennik-gvs-50-kvt-no-001s',
  categoryPath: 'goryachee-vodosnabzhenie-gvs',
  categoryName: 'Теплообменники для горячего водоснабжения',
}

module.exports = {
  staticRaschet,
};