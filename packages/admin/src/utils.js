import pluralize from 'pluralize';

export const formatName = name => {
  name = pluralize.singular(name);
  return name[0].toUpperCase() + name.substring(1);
}