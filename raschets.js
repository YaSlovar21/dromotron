const HTMLParser = require('node-html-parser');
const {slugify} = require('transliteration');

const path = require('path');
const fs = require('fs');
const { staticRaschet } = require('./raschetStatic');

//регулярка для выцепления номера теплообменника
const pullNumberRegex = /(?<intro>\s№\s{0,})(?<num>.{0,})/;

//регулярка для выцепления модели теплообменника

let data;
const razbegPoMoshnosti = [];
const dataForSitemap = [];

if (!process.env.WEBPACK_SERVE) {
  console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAA');

  //заходим в папку где лежат расчёты
  const templateFiles = fs.readdirSync(path.resolve(__dirname, 'raschets'));

  //конфиг для генератора url-адресов страниц
  slugify.config({
    unknown: '',
    replace: [['.', '-', '№']],
  });

  
  data = templateFiles.map(item => {

      const fileData = fs.readFileSync(path.resolve(__dirname,'raschets', item), 'utf8');
      var root = HTMLParser.parse(fileData);
      let mainTables = Array.from(root.getElementsByTagName('table'));
      let tableAddress = mainTables[2];
      let tableNamePto = mainTables[3];
      let tableSpecif = mainTables[4];

      let name = tableNamePto.getElementsByTagName("b")["0"].textContent;
      let number = tableNamePto.getElementsByTagName("b")["1"].textContent;

      let sreda1 = tableSpecif.getElementsByTagName('tr')["1"].getElementsByTagName('td')["2"].getElementsByTagName('b')["0"].textContent;
      let sreda2 = tableSpecif.getElementsByTagName('tr')["1"].getElementsByTagName('td')["3"].getElementsByTagName('b')["0"].textContent;
      
      //рабочие парамерты сред
      let grSredaParameters = {
        in: tableSpecif.getElementsByTagName('tr')["3"].getElementsByTagName('td')["2"].textContent,
        out: tableSpecif.getElementsByTagName('tr')["4"].getElementsByTagName('td')["2"].textContent,
        consumption: tableSpecif.getElementsByTagName('tr')["5"].getElementsByTagName('td')["2"].textContent,
        pressureLoss: tableSpecif.getElementsByTagName('tr')["6"].getElementsByTagName('td')["2"].textContent,
      }
      let nagrSredaParameters = {
        in: tableSpecif.getElementsByTagName('tr')["3"].getElementsByTagName('td')["3"].textContent,
        out: tableSpecif.getElementsByTagName('tr')["4"].getElementsByTagName('td')["3"].textContent,
        consumption: tableSpecif.getElementsByTagName('tr')["5"].getElementsByTagName('td')["3"].textContent,
        pressureLoss: tableSpecif.getElementsByTagName('tr')["6"].getElementsByTagName('td')["3"].textContent,
      }

      // мощность, единица измерения мощности, площадь теплообмена, запас поверхности
      let moshnostMeasure  = tableSpecif.getElementsByTagName('tr')["14"].getElementsByTagName('td')["1"].textContent;
      let moshnostNumber = tableSpecif.getElementsByTagName('tr')["14"].getElementsByTagName('td')["2"].textContent;
      let sOfHeatexchange = tableSpecif.getElementsByTagName('tr')["15"].getElementsByTagName('td')["2"].textContent;  //всегда в м2
      let zapasPoverhnosti = tableSpecif.getElementsByTagName('tr')["16"].getElementsByTagName('td')["2"].textContent; //всегда в %
      
      let plastinKolich = tableSpecif.getElementsByTagName('tr')["28"].getElementsByTagName('td')["2"].textContent;
      let hodov = tableSpecif.getElementsByTagName('tr')["29"].getElementsByTagName('td')["2"].textContent;

      let massa = tableSpecif.getElementsByTagName('tr')["33"].getElementsByTagName('td')["2"].textContent;

      //ДУ и тип присоединений (фланец,...) по греющей и нагреваемой могут различаться
      let grSredaConnection = {
        du: tableSpecif.getElementsByTagName('tr')["38"].getElementsByTagName('td')["2"].textContent,
        type: tableSpecif.getElementsByTagName('tr')["39"].getElementsByTagName('td')["2"].textContent,
        kanalsNumber: tableSpecif.getElementsByTagName('tr')["30"].getElementsByTagName('td')["2"].textContent,
        kanalsRaskladka: tableSpecif.getElementsByTagName('tr')["31"].getElementsByTagName('td')["2"].textContent,
      }

      let nagrSredaConnection = {
        du: tableSpecif.getElementsByTagName('tr')["38"].getElementsByTagName('td')["3"].textContent,
        type: tableSpecif.getElementsByTagName('tr')["39"].getElementsByTagName('td')["3"].textContent,
        kanalsNumber: tableSpecif.getElementsByTagName('tr')["30"].getElementsByTagName('td')["3"].textContent,
        kanalsRaskladka: tableSpecif.getElementsByTagName('tr')["31"].getElementsByTagName('td')["3"].textContent,
      }


      let naznach;

      if (nagrSredaParameters.out === '65.00') {
        naznach = 'гвс';
      };
      if (nagrSredaParameters.out >= '85.00') {
        naznach = 'отопление';
      };

      let categoryPath = naznach === 'гвс' ? 'goryachee-vodosnabzhenie-gvs' : naznach === 'отопление' ? 'otoplenie' : 'raschets';

      dataForSitemap.push(`${categoryPath}/` + slugify(`teploobmennik${naznach !== '' ? `-${naznach}` : ''}-${parseInt(moshnostNumber)}${moshnostMeasure}${number}`));
      razbegPoMoshnosti.push(Math.round(Number(moshnostNumber)));

      return {
        name: name.slice(0,1) + name.slice(1,).toLowerCase(),
        typeId: sreda1.toLowerCase() !== 'молоко цельное' ? slugify(`${sreda1} ${sreda2}`.split(' ').join('-')) : 'dlya-moloka',
        tiNumberFromTm: number.match(pullNumberRegex).groups.num,
        
        naznach: naznach,
        naznachEN: slugify(naznach),
        sreda1: sreda1.toLowerCase(),
        sreda2: sreda2.toLowerCase(),

        grSredaParameters: grSredaParameters,
        nagrSredaParameters: nagrSredaParameters,

        grSredaConnection: grSredaConnection,
        nagrSredaConnection: nagrSredaConnection,
        
        moshnostMeasure: moshnostMeasure,
        moshnostNumber: parseInt(moshnostNumber),
        sOfHeatexchange: sOfHeatexchange,
        zapasPoverhnosti: zapasPoverhnosti,
        plastinKolich: plastinKolich,
        hodov: hodov === '1' ? 'одноходовой' : 'многоходовой',

        massa,

        path: slugify(`teploobmennik${naznach !== '' ? `-${naznach}` : ''}-${parseInt(moshnostNumber)}${moshnostMeasure}${number}`),
        categoryPath: categoryPath,
        categoryName: naznach === 'гвс' ? 'Теплообменники для горячего водоснабжения' : naznach === 'отопление' ? 'Теплообменники для отопления' : 'Нетиповые примеры расчётов',
      };
    })
    console.log(path.resolve(__dirname, 'raschets'));
    console.log(dataForSitemap.map(item => `/plastinchatye-teploobmenniki/${item}`));
    console.log(razbegPoMoshnosti);
} else {
  data = [].concat(staticRaschet);
  razbegPoMoshnosti.push(50);
};

  module.exports = {
    rawData: data, 
    dataForSitemap,
    razbegPoMoshnosti,
  };

