const { readFileSync, writeFileSync } = require('fs');
const { uniq } = require('lodash');

const file = JSON.parse(readFileSync('./swagger.json', { encoding: 'utf8' }));

Object.keys(file.components.schemas).forEach((key) => {
  const { properties, required = [] } = file.components.schemas[key];

  if (!properties) {
    return;
  }

  const propertyKeys = Object.keys(properties);
  const notNullable = propertyKeys.filter((propertykey) => !properties[propertykey].nullable);

  file.components.schemas[key].required = uniq([...required, ...notNullable]);
});

writeFileSync('./swagger.json', JSON.stringify(file, null, 2));
