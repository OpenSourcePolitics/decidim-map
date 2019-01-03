import { byteLength } from 'byte-length';
import * as prettyBytes from 'pretty-bytes';

export function textData (
  str: string
): {
  length: number,
  bytes: number,
  size: string
} {
  let bytes = byteLength(str);
  return {
    length: str.length,
    bytes: bytes,
    size: prettyBytes(bytes, {locale: window.DecidimCode.locale || true})
  };
};

export function compressJSON (
  str: string
): string {
  return str.replace(/\s/g, '');
};
