import pluralize from 'pluralize';
import htmlToText from 'html-to-text';
import { Buffer } from 'buffer';

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

// base64url
function padString(input) {
  var segmentLength = 4;
  var stringLength = input.length;
  var diff = stringLength % segmentLength;

  if (!diff) {
    return input;
  }

  var position = stringLength;
  var padLength = segmentLength - diff;
  var paddedStringLength = stringLength + padLength;
  var buffer = Buffer.alloc(paddedStringLength);
  buffer.write(input);

  while (padLength--) {
    buffer.write("=", position++);
  }

  return buffer.toString();
}

function encode(input, encoding) {
  if (encoding === void 0) { encoding = "utf8"; }

  if (Buffer.isBuffer(input)) {
    return fromBase64(input.toString("base64"));
  }

  return fromBase64(Buffer.from(input, encoding).toString("base64"));
}

function decode(base64url, encoding) {
  if (encoding === void 0) { encoding = "utf8"; }

  return Buffer.from(toBase64(base64url), "base64").toString(encoding);
}

function toBase64(base64url) {
  base64url = base64url.toString();

  return padString(base64url)
  .replace(/\-/g, "+")
  .replace(/_/g, "/");
}

function fromBase64(base64) {
  return base64
  .replace(/=/g, "")
  .replace(/\+/g, "-")
  .replace(/\//g, "_");
}

function toBuffer(base64url) {
  return Buffer.from(toBase64(base64url), "base64");
}

export const base64url = {
  encode,
  decode,
  toBase64,
  fromBase64,
  toBuffer
}