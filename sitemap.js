//const { ROUTES_SITEMAP } = require("./constants");
const { dataForSitemap } = require("./raschets");
const dateNow = (new Date()).toString();

module.exports.paths = [
    {
      path: '/',
      lastmod: dateNow,
      priority: 1,
      changefreq: 'monthly'
    },
     
].concat( dataForSitemap.map((item)=>{
  return {
    //в ${item} содержится подкатегория гвс или отопление или спец расчёт(пищевой на данный момент): подкатегория/слаг названия расчёта.html
    path: `/plastinchatye-teploobmenniki/${item}.html`,
    lastmod: dateNow,
    priority: 0.7,
    changefreq: 'monthly'
  }
}))/*.concat(dataTisForSitemap, dataSpecPagesForSitemap).concat(Object.keys(ROUTES_SITEMAP).map(i => ({
  path: ROUTES_SITEMAP[i],
  lastmod: dateNow,
  priority: 0.9,
  changefreq: 'monthly'
})));*/