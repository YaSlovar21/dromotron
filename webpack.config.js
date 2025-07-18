const path = require('path'); // подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 
const SitemapPlugin = require('sitemap-webpack-plugin').default;
const HttpsProxyAgent = require('https-proxy-agent');
const fetch1 = require('node-fetch');

const canonicalURL = 'https://www.dromotron.ru'

const { paths } = require('./sitemap');

const { ROUTES, sequence, dict } = require('./constants');

const {slugify} = require('transliteration');
  //конфиг для генератора url-адресов страниц
  slugify.config({
    unknown: '',
    replace: [['.', '-', '№']],
  });

let generatedPaths = [];
const patchArr = []

const dateNow = (new Date()).toString();

function generatePtoPage(ptoFoodCard, isDevServer, oprosFiles, ptoFoodCards) {
  const { capacity, desc, h1, heatent, max_pressue, id, naznach, pto_frame,refrigerant,title,type_of_proccess } = ptoFoodCard;
  const textId = slugify(title);
  patchArr.push ({
    id,
    textId,
    
  })
  generatedPaths.push(
    {
      path: `${ROUTES.ptoFood}${textId}.html`,
      lastmod: dateNow,
      priority: 0.8,
      changefreq: 'monthly'
    }
  )

  return new HtmlWebpackPlugin({
    template: "./src/_food_item.html", // шаблон
    filename: `${ROUTES.ptoFood}${textId}.html`,
    templateParameters: {
      ...ptoFoodCard, 
      foodCardsRelativeByNaznach: ptoFoodCards.filter(i=> i.id!==id && i.naznach===naznach),
      foodCardsRelativeByProccess: ptoFoodCards.filter(i=> i.id!==id && i.type_of_proccess===type_of_proccess),
      isDevServer,
      canonicalURL,
      oprosFiles,
      ROUTES
    },
    chunks: ["index", "cta", "form"],
  })
}

function generatePtoCategoryHtmlPlugin(ptoCategory, ptoFoodCards, oprosFiles, isDevServer, galleryCards) {
  const {seo_desc, id, textId, h1, desc, title_sm, seo_title} = ptoCategory;
  generatedPaths.push(
    {
      path: `${ROUTES.ptoFood}${textId}/`,
      lastmod: dateNow,
      priority: 0.8,
      changefreq: 'monthly'
    }
  )
  return new HtmlWebpackPlugin({
    template: "./src/_food_category.html", // шаблон
    filename: `${ROUTES.ptoFood}${textId}/index.html`,
    templateParameters: {
      ...ptoCategory, 
      foodCardsInCategory: ptoFoodCards.filter(i=> i.categoryTextId===textId),
      isDevServer,
      canonicalURL,
      oprosFiles,
      galleryCards,
      ROUTES
    },
    chunks: ["index", "category", "routerfilter"],
  })
}


function ptoFoodHtmlPlugins(ptoFoodCards, isDevServer, oprosFiles) {
  return ptoFoodCards.map(c => generatePtoPage(c, isDevServer, oprosFiles, ptoFoodCards));
}

function ptoCatsHtmlPlugins(ptoCategories, ptoFoodCards, oprosFiles, isDevServer, galleryCards) {
  return ptoCategories.map(c => generatePtoCategoryHtmlPlugin(c,  ptoFoodCards, oprosFiles, isDevServer, galleryCards))
}



//function generateConfig(infoBlogData, isDevServer) {
function generateConfig(isDevServer, categories, uslugiList, refs , oprosFiles , ptoFoodCards1, galleryCards, ptoCategories, platesData) {
  const ptoFoodCards = ptoFoodCards1.map(i=> ({...i, textId: slugify(i.title)}));
  const htmlPtoPlugins = ptoFoodHtmlPlugins(ptoFoodCards, isDevServer, oprosFiles);
  const htmlPtoCatsPlugins = ptoCatsHtmlPlugins(ptoCategories, ptoFoodCards, oprosFiles, isDevServer, galleryCards)
  //const htmlArticlesPlugins = generateBlogPagesHtmlPlugins(infoBlogData, isDevServer);
  //const htmlSpecPagesPluginst = generateSpecPagesHtmlPlugins(isDevServer);
  console.log(generatedPaths.map(i=>i.path));
  return {
    entry: {
      index: "./src/pages/index.js",
      form: "./src/pages/form.js",
      cta: "./src/pages/cta-reaction.js",
      category: './src/pages/category.js',
      routerfilter: './src/pages/router-filter.js'
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "js/[name][hash].js",
      assetModuleFilename: "images/[hash][ext]",
      publicPath: '/'
    },
    // добавили режим разработчика
    mode: "development",
    devServer: {
      static: path.resolve(__dirname, "./dist"), // путь, куда "смотрит" режим разработчика
      compress: true, // это ускорит загрузку в режиме разработки
      port: 8081, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт
      open: true, // сайт будет открываться сам при запуске npm run dev
    },
    module: {
      rules: [
        // rules — это массив правил
        // добавим в него объект правил для бабеля
        {
          // регулярное выражение, которое ищет все js файлы
          test: /\.js$/,
          // при обработке этих файлов нужно использовать babel-loader
          use: "babel-loader",
          // исключает папку node_modules, файлы в ней обрабатывать не нужно
          exclude: "/node_modules/",
        },
        {
          test: /\.(mp4)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "videos",
              },
            },
          ],
        },
        {
          test: /favicon\.svg/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "",
              },
            },
          ],
        },

        {
          // регулярное выражение, которое ищет все файлы с такими расширениями
          test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf|webm)$/,
          type: "asset/resource",
          exclude: [
            path.resolve(__dirname, "./src/images/favicon.svg"),
            path.resolve(__dirname, "./src/blog-images/"),
            path.resolve(__dirname, "./src/api-images/"),
          ],
        },
        {
          // регулярное выражение, которое ищет все файлы с такими расширениями
          test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf|webm)$/,
          type: "asset/resource",
          include: [
            path.resolve(__dirname, "./src/api-images/"),
          ],
          generator: {
            filename: (pathData) => {         
              return `api-images/[name][ext]`;
          },
       
          }
        },
        /*{
          // Прогрузка картинок в блог в обход лоадера
          // Для сохранения имени, которое указывалось в отдельном файлике (прогруз через fs)
          test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
          use: [
            { loader: "file-loader",
              options: { name: "[name].[ext]",  outputPath: "blog-images",},
            }],
          include: [path.resolve(__dirname, "./src/blog-images/")],
        },*/
        {
          // регулярное выражение, которое ищет все файлы с такими расширениями
          // загрузка документов в docu/
          test: /\.(doc|pdf)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "docu",
              },
            },
          ],
          exclude: [path.resolve(__dirname, "./src/btp-examples/")],
        },
        {
          test: /\.(doc|pdf)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "blochnye-teplovye-punkty",
              },
            },
          ],
          include: [path.resolve(__dirname, "./src/btp-examples/")],
        },

        {
          test: /robots\.txt/,
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
          },
        },

        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              // добавьте объект options
              options: { importLoaders: 1 },
            },
            // Добавьте postcss-loader 
            "postcss-loader",
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        templateParameters: { 
          canonicalURL,
          ROUTES,
          isDevServer,
          uslugiList,
          refs,
          newsData: [], //infoBlogData.filter(i=> i.type.includes('news')).toSorted((a,b) => b.id - a.id),
        },
        title: "Производство комплектующих для пластинчатых теплообменников",
        meta: {
          keywords: "российское производство комплектующих для пластинчатых теплообменников",
          description: `Комплектующие для теплообменников, пластины и уплотнения пластинчатых теплообменников. Теплообменники для пищевой промышленности в сборе.`,
        },
        template: "./src/index.html", // путь к файлу index.html
        chunks: ["index", "form"],
      }),
      new HtmlWebpackPlugin({
        templateParameters: { 
          canonicalURL,
          ROUTES,
          isDevServer,
          kompls: categories,
          isTemplate: false,
        },
        title: "Пластины, уплотнения, плиты и другие комплектующие к теплообменникам",
        meta: {
          keywords: "пластины и уплотнения к пластинчатым теплообменникам, комплектующие для теплообменников",
          description: `Комплектующие (пластины, уплотнения, плиты, станины, облицовка из нержавеющей стали) к пластинчатым теплообменникам от производителя`,
        },
        filename: "komplektuyushchie-dlya-teploobmennikov/index.html",
        template: "./src/_kompl.html", // путь к файлу index.html
        chunks: ["index", "cta", "form"],
      }),

      //-----ПЛАСТИНЫ--------------
      new HtmlWebpackPlugin({
        templateParameters: { 
          canonicalURL,
          ROUTES,
          isDevServer,
          kompls: categories,
          isTemplate: false,
          platesData,
          dictDataObj: {
            dict,
            sequence
          }
        },
        title: "Пластины для пластинчатых теплообменников | прайс на пластины",
        meta: {
          keywords: "пластины  к пластинчатым теплообменникам, прайслист 100 видов пластин",
          description: `Комплектующие пластины к пластинчатым теплообменникам от производителя`,
        },
        filename: "komplektuyushchie-dlya-teploobmennikov/plates/index.html",
        template: "./src/_kompl_plates.html", // путь к файлу index.html
        chunks: ["index", "cta", "form"],
      }),
       //пробная сборка template
        new HtmlWebpackPlugin({
        templateParameters: { 
          canonicalURL,
          ROUTES,
          isDevServer,
          kompls: categories,
          isTemplate: true,
        },
        title: "Пластины, уплотнения, плиты и другие комплектующие к теплообменникам",
        meta: {
          keywords: "российское производство",
          description: ``,
        },
        filename: "templates/komplektuyushchie-dlya-teploobmennikov.html",
        template: "!!html-loader!./src/_kompl.html", // путь к файлу index.html
        chunks: ["index", "cta", "form"],
      }),
      new HtmlWebpackPlugin({
        templateParameters: { 
          canonicalURL,
          ROUTES,
          refs: galleryCards.filter(c => c.consumersIds.includes('refs')),
          isDevServer,
        },
        title: "О производстве пластинчатых теплообменников в компании Дромотрон",
        meta: {
          keywords: "российское производство пластин и уплотнений, производство пищевых теплообменников",
          description: `ООО «Дромотрон» - компания, собравшая специалистов по производству комплектующих для теплообменных аппаратов. Компания также специализируется на производстве и сборке пищевых теплообменников любой сложности`,
        },
        filename: `${ROUTES.about.split('/')[1]}/index.html`,
        template: "./src/_about.html", // путь к файлу index.html
        chunks: ["index"],
      }),
      new HtmlWebpackPlugin({
        templateParameters: { 
          canonicalURL,
          ROUTES,
          isDevServer,
          oprosFiles,
          ptoFoodCards,
          galleryCards
        },
        title: "Теплообменники для пищевой промышленности",
        meta: {
          keywords: "российское производство пищевых пластинчатых теплобоменников",
          description: `На базе собственных комплектущих и опыте подбора и расчёта пищевых пластинчатых теплобоменников, мы предлагаем пищевые пластинчатые теплообменные аппараты любой сложности.`,
        },
        filename: `${ROUTES.ptoFood.split('/')[1]}/index.html`,
        template: "./src/_food.html", // путь к файлу index.html
        chunks: ["index", "routerfilter"],
      }),
      new HtmlWebpackPlugin({
        templateParameters: { 
          canonicalURL,
          ROUTES,
          isDevServer,
          oprosFiles
        },
        title: "Опросные листы для подбора пищевого пластинчатого теплобменника",
        meta: {
          keywords: "российское производство пищевых пластинчатых теплобоменников",
          description: `Подобрать пищевой пластинчатый теплообменник по опросному листу для различных отраслей: молочные теплообменники, теплообменники для пива и сусла, пароводяные подогреватели. Скачать опросный лист на теплообменник для подбора.`,
        },
        filename: `${ROUTES.ptoFoodOpros}/index.html`.substring(1),
        template: "./src/_food_opros.html", // путь к файлу index.html
        chunks: ["index"],
      }),
      new HtmlWebpackPlugin({
        templateParameters: { 
          canonicalURL,
          ROUTES,
          isDevServer,
          uslugiList,
        },
        title: "Услуги по лазерной резке, гибке металла в Барнауле",
        meta: {
          keywords: "услуги завода",
          description: `Парк оборудования ООО «Дромотрон» позволяет оказывать услуги по резке и гибке металла, фрезерной и токарной обработке. По оптимальной цене с привлечением квалифицированных специалистов.`,
        },
        filename: `${ROUTES.uslugi.split('/')[1]}/index.html`,
        template: "./src/_uslugi.html", // путь к файлу index.html
        chunks: ["index", "cta", "form"],
      }),
      new HtmlWebpackPlugin({
        templateParameters: { 
          canonicalURL,
          ROUTES,
          isDevServer
        },
        title: "Контакты ООО Дромотрон",
        meta: {
          keywords: "контакты",
          description: `Контакты ООО Дромотрон, адрес производства и режим работы завода`,
        },
        filename: `${ROUTES.contacts.split('/')[1]}/index.html`,
        template: "./src/contacts.html", // путь к файлу index.html
        chunks: ["index"],
      }),
  

      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: "[name].css",
      }),
      new SitemapPlugin({ base: canonicalURL, paths: paths.concat(generatedPaths).sort((a,b)=> b.priority - a.priority) }),
    ].concat(htmlPtoCatsPlugins, htmlPtoPlugins)//, htmlTisPlugins, htmlArticlesPlugins,htmlSpecPagesPluginst),
  }
};

const proxyAgent = new HttpsProxyAgent.HttpsProxyAgent('http://10.10.14.14:3128');

function articleDateMapper(newsArr) {
  return newsArr
            .map((item) => {
              const date = new Date(item.date);
              const month = date.getMonth() + 1;
              return {
                ...item,
                type: JSON.parse(item.type),
                formattedDate: item.date ? `${date.getDate()}.${month < 10 ? '0' : ''}${month}.${date.getFullYear()}` : ''
              }
            })
}

function categoriesMapper(cats) {
  return cats.map(c => ({...c, images: JSON.parse(c.images)}));
}

function refsMapper(items) {
  return items.map(i => ({
    ...i, 
    tags: JSON.parse(i.tags),
    poster: `refs/${i.poster}`
  }))
}

function galleryMapper(images) {
  return images.map(c => ({...c, consumersIds: JSON.parse(c.consumersIds)}));
}

function ptoFoodItemMapper(cards) {
  return cards.map(c=> ({
    ...c,
    poster: `${c.n_sect}sect13.png` //-----------------------------------------КОСТЫЛЬ!!!!!!!!!-----------------------------------------------
  }))
}

const initFetchObj = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  agent: proxyAgent
}

module.exports = () => {
  const isDevServer = process.env.WEBPACK_SERVE;
  console.log(isDevServer);
  return new Promise((resolve, reject) => {
      Promise.all([
          //data[0] - categories
          fetch1('https://api.dromotron.ru/data/categories', initFetchObj).then(res => res.json()), 

          //data[1] - uslugi
          fetch1('https://api.dromotron.ru/data/uslugi', initFetchObj).then(res => res.json()), 


           //data[2] - refs
           fetch1('https://api.dromotron.ru/data/refs', initFetchObj).then(res => res.json()), 

          //data[3] - oprosnie listy
          fetch1('https://api.dromotron.ru/data/oprosnye-listy', initFetchObj).then(res => res.json()), 

          //data[4] - пищевые теплообменники карточки
          fetch1('https://api.dromotron.ru/data/pto_products', initFetchObj).then(res => res.json()),

          //data[5] - gallery
          fetch1('https://api.dromotron.ru/gallery', initFetchObj).then(res => res.json()),

          //data[6] - пищевые теплообменники карточки
          fetch1('https://api.dromotron.ru/data/pto_categories', initFetchObj).then(res => res.json()),

          //data[7] - пластины
          fetch1('https://api.dromotron.ru/data/price_catalog', initFetchObj).then(res => res.json()),
        ])
        .then((data) => {
          resolve(generateConfig(isDevServer, categoriesMapper(data[0]), categoriesMapper(data[1]), refsMapper(data[2]), data[3] , ptoFoodItemMapper(data[4]), galleryMapper(data[5]), data[6], data[7] ));
        })
     
  });
}