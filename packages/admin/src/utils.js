import pluralize from 'pluralize';

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

  return value;
}