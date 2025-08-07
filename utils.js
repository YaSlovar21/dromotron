function parseImageFiles(images) {
    const regex = /^plast-(?<category>ti\d+(?:\.\d+)?)-(?<holes>\d{4})-(?<pattern>[A-Z])\.png$/i;
  
    return images.map(filename => {
      const match = filename.match(regex);
      
      if (!match) {
        return null;
      }
  
      return {
        filename,
        pattern: match.groups.pattern,
        holes: match.groups.holes,
        // Дополнительно можно извлечь категорию, если нужно:
        // category: match.groups.category // например, "ti18"
      };
    }).filter(Boolean);
}

function plateSubcategoriesMapper(plates) {
    return plates.map(c=> ({
        ...c,
        images: parseImageFiles(c.images), // JSON.parse отрабатывает images в первоначальной проходке после забора с сервера
        pattern_array: JSON.parse(c.pattern_array),
        thinkness_array: JSON.parse(c.thinkness_array),
        steel_mark_array: JSON.parse(c.steel_mark_array),
    }))
}

module.exports ={
    parseImageFiles,
    plateSubcategoriesMapper
}