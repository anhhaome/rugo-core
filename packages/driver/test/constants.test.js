/* eslint-disable */

import { COLLECTION, DRIVER } from "../src/constants.js";

describe('Constant test', () => {
  it('should run default driver', async () => {
    DRIVER.getCollection();
    DRIVER.close();
  });

  it('should run default collection', async () => {
    COLLECTION.id();
    COLLECTION.get();
    COLLECTION.count();
    COLLECTION.list();
    COLLECTION.create();
    COLLECTION.patch();
    COLLECTION.remove();
  });
});