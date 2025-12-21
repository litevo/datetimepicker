import OutputAdapter from './output.interface.js';

export default class ISOOutput extends OutputAdapter {

  format(timestamp) {
    return new Date(timestamp).toISOString();
  }
}
