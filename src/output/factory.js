import TimestampOutput from './timestamp.js';
import ISOOutput from './iso.js';
import GregorianDateOutput from './gregorian.js';
import JalaliDateOutput from './jalali.js';
import HijriDateOutput from './hijri.js';

export function createOutputAdapter(type) {
  switch (type) {
    case 'timestamp':
      return new TimestampOutput();
    case 'iso':
      return new ISOOutput();
    case 'gregorian':
      return new GregorianDateOutput();
    case 'jalali':
      return new JalaliDateOutput();
    case 'hijri':
      return new HijriDateOutput();
    default:
      throw new Error(`Unknown output format: ${type}`);
  }
}
