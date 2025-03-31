const path = require('path'); // подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 
const SitemapPlugin = require('sitemap-webpack-plugin').default;
const HttpsProxyAgent = require('https-proxy-agent');
const fetch1 = require('node-fetch');

const canonicalURL = 'https://www.dromotron.ru'

const { paths } = require('./sitemap');

const { ROUTES } = require('./constants');



function generateRaschetHtmlPlugins(isDevServer) {
    return rawData.map(ptoData => {
      return new HtmlWebpackPlugin({
        title: ptoData.title ? ptoData.title:  `Какой то расчёт`,
        template: "./src/abstract-raschet-page.html", // шаблон
        filename: `plastinchatye-teploobmenniki/${ptoData.naznach === 'гвс' ? 'goryachee-vodosnabzhenie-gvs' : ptoData.naznach === 'отопление' ? 'otoplenie' : 'raschets'}/${ptoData.path}.html`,
        templateParameters: {...ptoData, isDevServer},
        razbegPoMoshnosti,
        chunks: ["blogSpecPage", "all", "map"],
      })
    })
};

function generateTisHtmlPlugins(isDevServer) {
  return tis.concat(foodtis).map(ptoData => {
    return new HtmlWebpackPlugin({
      ...ptoData,
      templateParameters: {
        ...ptoData.templateParameters,
        isDevServer
      }
    })
  })
}

function generateSpecPagesHtmlPlugins(isDevServer) {
  return specPages.map(articleData => {
    return new HtmlWebpackPlugin({
      ...articleData, 
      templateParameters: {
        isDevServer,
        ...articleData.templateParameters,
        specPages, 
        upsubtitle: specPagesTypes[articleData.type]
      }
    })
  })
}

const dateNow = (new Date()).toString();
let generatedPaths = [];

function generateBlogPagesHtmlPlugins(articles, isDevServer) {
  return articles.map(article => {
    generatedPaths.push(
      {
        path: `${ROUTES.blog}${article.staticPage}`,
        lastmod: dateNow,
        priority: 0.7,
        changefreq: 'monthly'
      }
    )
    return new HtmlWebpackPlugin({
      templateParameters: {
        isDevServer,
        canonicalURL: canonicalURL,
        upsubtitle: article.type.includes('news') ? blogThemesDict['news'] : blogThemesDict[article.type[0]],
        isGkh: article.type.includes('gkh'),
        articleFile: `${article.articleInnerFile}.html`,
        customPoster: article.type.includes('news') ? `${article.articleInnerFile}.png` : '',
        /*relevanceArticles: [
          {
            name: "Теплобоменник для отопления частного дома",
            link: "/blog-proizvodstva/teploobmenniki-otopleniya-chastnogo-doma.html",
          },
        ],*/
      },
      title: article.seoTitle,
      heading: article.h1,
      meta: {
        keywords: article.seoKeywords,
        description: article.seoDesc,
      },
      template: "./src/blog-page-abstract.html",
      filename: `blog-proizvodstva/${article.staticPage}`,
      chunks: ["blogPage", "all", "map", "popupImage"],
    })
  })
}
//function generateConfig(infoBlogData, isDevServer) {
function generateConfig(isDevServer, categories, uslugiList, refs) {
  //const htmlRaschetPlugins = generateRaschetHtmlPlugins(isDevServer);
  //const htmlArticlesPlugins = generateBlogPagesHtmlPlugins(infoBlogData, isDevServer);
  //const htmlSpecPagesPluginst = generateSpecPagesHtmlPlugins(isDevServer);
  console.log(refs);
  return {
    entry: {
      index: "./src/pages/index.js",
      form: "./src/pages/form.js",
      cta: "./src/pages/cta-reaction.js"
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "js/[name].js",
      assetModuleFilename: "images/[hash][ext]",
      //publicPath: ''
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
        title: "Комплектующие для теплообменников | Производство",
        meta: {
          keywords: "российское производство",
          description: ``,
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
        },
        title: "Пластины, уплотнения, плиты и другие комплектующие к теплообменникам",
        meta: {
          keywords: "российское производство",
          description: ``,
        },
        filename: "komplektuyushchie-dlya-teploobmennikov/index.html",
        template: "./src/_kompl.html", // путь к файлу index.html
        chunks: ["index", "cta", "form"],
      }),
      new HtmlWebpackPlugin({
        templateParameters: { 
          canonicalURL,
          ROUTES,
          refs,
          isDevServer,
        },
        title: "О производстве пластинчатых теплообменников в компании Дромотрон",
        meta: {
          keywords: "российское производство",
          description: ``,
        },
        filename: "about/index.html",
        template: "./src/_about.html", // путь к файлу index.html
        chunks: ["index"],
      }),
      new HtmlWebpackPlugin({
        templateParameters: { 
          canonicalURL,
          ROUTES,
          isDevServer,
        },
        title: "Теплообменники для пищевой промышленности",
        meta: {
          keywords: "российское производство",
          description: ``,
        },
        filename: `${ROUTES.ptoFood.split('/')[1]}/index.html`,
        template: "./src/_food.html", // путь к файлу index.html
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
          keywords: "российское производство",
          description: ``,
        },
        filename: "uslugi/index.html",
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
          keywords: "российское производство",
          description: ``,
        },
        filename: "contacts/index.html",
        template: "./src/contacts.html", // путь к файлу index.html
        chunks: ["index"],
      }),
  

      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: "[name].css",
      }),
      new SitemapPlugin({ base: canonicalURL, paths: paths.concat(generatedPaths).sort((a,b)=> b.priority - a.priority) }),
    ]//.concat(htmlRaschetPlugins)//, htmlTisPlugins, htmlArticlesPlugins,htmlSpecPagesPluginst),
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

module.exports = () => {
  const isDevServer = process.env.WEBPACK_SERVE;
  console.log(isDevServer);
  return new Promise((resolve, reject) => {
      Promise.all([
          //data[0] - categories
          fetch1('https://api.dromotron.ru/data/categories', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjIjoiZHJvbW90cm9uIiwiaWF0IjoxNzQyMjAxMjE0fQ.uDGcewQnXnfoc64I7tiTcvo6hpeblN-5QN2xc0MUz0k'
            },
          }).then(res => res.json()), 

          //data[1] - uslugi
          fetch1('https://api.dromotron.ru/data/uslugi', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjIjoiZHJvbW90cm9uIiwiaWF0IjoxNzQyMjAxMjE0fQ.uDGcewQnXnfoc64I7tiTcvo6hpeblN-5QN2xc0MUz0k'
            },
          }).then(res => res.json()), 


           //data[2] - refs
           fetch1('https://api.dromotron.ru/data/refs', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjIjoiZHJvbW90cm9uIiwiaWF0IjoxNzQyMjAxMjE0fQ.uDGcewQnXnfoc64I7tiTcvo6hpeblN-5QN2xc0MUz0k'
            },
          }).then(res => res.json()), 

        ])
        .then((data) => {
          resolve(generateConfig(isDevServer, categoriesMapper(data[0]), categoriesMapper(data[1]), refsMapper(data[2]) ));
        })
     
  });
}