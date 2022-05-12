/* eslint-disable */

import { expect, assert } from 'chai';
import * as Password from '../src/types/password.js';
import bcrypt from 'bcryptjs';

describe('Password', () => {
  it('should be password', () => {
    const text = 'hello';
    const hash = Password.type(text);
    expect(bcrypt.compareSync(text, hash)).to.be.equal(true);
  });

  it('shoule not be null and undefined', () => {
    // undefined
    try {
      expect(Password.type(undefined)).to.be.equal(undefined);
      assert.fail();
    } catch(err){
      expect(err.message).to.be.eq('"undefined" is not a password');
    }

    // null
    try {
      expect(Password.type(null)).to.be.equal(null);
      assert.fail();
    } catch(err){
      expect(err.message).to.be.eq('"null" is not a password');
    }
  });

  it('shoule be not password', () => {
    const value = { foo: 'bar' };

    try {
      Password.type(value);
    } catch(err){
      expect(err.message).to.be.equal(`"${value}" is not a password`);
      return;
    }
    assert.fail();
  });
});