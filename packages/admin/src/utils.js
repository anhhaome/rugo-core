import pluralize from 'pluralize';
import htmlToText from 'html-to-text';

const MAX_TEXT_LENGTH = 80;

export const formatName = name => {
  name = pluralize.singular(name);
  return name[0].toUpperCase() + name.substring(1);
}

export const formatValueWithSchema = (value, fieldSchema) => {
  switch (fieldSchema.type){
    case 'password':
      return '<span class="tracking-wider">●●●●●●●●<span>'
  }

  if (value === undefined || value === null || value === NaN){
    return `<code class="bg-gray-200 text-gray-500 rounded px-2 py-0.5 text-xs">${value}</code>`
  }

  value = htmlToText.convert(value.toString(), { wordwrap: false }).trim();

  if (value.length > MAX_TEXT_LENGTH)
    value = value.substring(0, MAX_TEXT_LENGTH - 3) + '...';

  return value;
}