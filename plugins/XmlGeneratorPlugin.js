const fs = require('fs');
const path = require('path');
const _ = require('lodash');

class XmlGeneratorPlugin {
  constructor(options) {
    this.options = {
      filename: 'output.xml',
      template: null,       // Шаблон в виде строки или пути к файлу
      data: {},             // Данные для шаблона
      ...options,
    };
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync('XmlGeneratorPlugin', (compilation, callback) => {
      let xmlContent;

      if (this.options.template) {
        // Если шаблон — это путь к файлу
        if (fs.existsSync(path.resolve(__dirname, `../plugins-templates/${this.options.template}`))) {
          const templateFile = fs.readFileSync(path.resolve(__dirname, `../plugins-templates/${this.options.template}`), 'utf-8');
          const templateFileWoComments = templateFile.replace(/<!--[\s\S]*?-->/g, '');
          const compiled = _.template(templateFileWoComments);
          xmlContent = compiled(this.options.data);
        } 
        // Если шаблон — строка
        else {
          const compiled = _.template(this.options.template);
          xmlContent = compiled(this.options.data);
        }
      } 
      // Генерация XML без шаблона (простой вариант)
      else {
        xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
        <root>
        <title>${this.options.data.title || 'Default'}</title>
        ${(this.options.data.items || []).map(item => `<item>${item}</item>`).join('\n')}
        </root>`;
      }

      // Добавляем файл в сборку
      compilation.assets[this.options.filename] = {
        source: () => xmlContent,
        size: () => xmlContent.length,
      };

      callback();
    });
  }
}

module.exports = XmlGeneratorPlugin;