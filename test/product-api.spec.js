const assert = require("assert");
const request = require(`request`);

describe(`Product API`, () => {
  const hostUrl = `http://localhost:3000`;
  const productsApiPath = `/api/products`;
  const testProduct = {
    name: "Apple Macbook Pro 2015",
    price: {
      amount: 2000,
      currency: "USD"
    }
  };
  let createdProduct = null;

  beforeEach(done => {
    // Always create a new Product record.
    const product = testProduct;

    const params = {
      method: "POST",
      uri: `${hostUrl}${productsApiPath}`,
      body: product,
      json: true
    };

    // Call create product API
    request(params, (err, response) => {
      assert.equal(err, null);
      createdProduct = response.body;
      // console.log(`[DEBUG] -<beforeEach> createdProduct: \n`, createdProduct);
      done();
    });
  });

  afterEach(done => {
    const params = {
      method: "DELETE",
      uri: `${hostUrl}${productsApiPath}/${createdProduct._id}`,
      json: true
    };

    // Call delete product API
    request(params, (err, response) => {
      assert.equal(err, null);
      createdProduct = null;
      // console.log(`[DEBUG] -<afterEach> response.body: \n`, response.body);
      done();
    });
  });

  it(`creates a new Product`, (done) => {
    // console.log(`[DEBUG] -<createNewProductTest> createdProduct: \n`, createdProduct);
    assert.ok(createdProduct);
    assert.equal(createdProduct.name, testProduct.name);
    assert.equal(createdProduct.price.amount, testProduct.price.amount);
    assert.equal(createdProduct.price.currency, testProduct.price.currency);
    assert.ok(createdProduct._id);
    done();
  });

  it(`gets all products`, (done) => {
    const params = {
      method: "GET",
      uri: `${hostUrl}${productsApiPath}`,
      json: true
    };

    request(params, (err, response) => {
      const products = response.body;
      // console.log(`[DEBUG] - products: \n`, products);
      assert.equal(err, null);
      assert.ok(Array.isArray(products));
      assert.ok(products.length > 0);
      const product = products[0];

      assert.equal(product.name, createdProduct.name);
      assert.equal(product.price.amount, createdProduct.price.amount);
      assert.equal(product.price.currency, createdProduct.price.currency);
      assert.equal(product._id, createdProduct._id);
      done();
    });
  });

  it(`gets a product`, (done) => {
    const params = {
      method: "GET",
      uri: `${hostUrl}${productsApiPath}/${createdProduct._id}`,
      json: true
    };

    request(params, (err, response) => {
      const product = response.body;
      // console.log(`[DEBUG] - products: \n`, product);
      assert.equal(err, null);

      assert.equal(product.name, createdProduct.name);
      assert.equal(product.price.amount, createdProduct.price.amount);
      assert.equal(product.price.currency, createdProduct.price.currency);
      assert.equal(product._id, createdProduct._id);
      done();
    });
  });

  it(`updates a product`, (done) => {
    const newPrice = 1500;
    createdProduct.price.amount = newPrice;

    const params = {
      method: "PUT",
      uri: `${hostUrl}${productsApiPath}/${createdProduct._id}`,
      body: createdProduct,
      json: true
    };

    request(params, (err, response) => {
      const updatedProduct = response.body;

      assert.equal(err, null);

      assert.equal(updatedProduct.name, createdProduct.name);
      assert.equal(updatedProduct.price.amount, newPrice);
      assert.equal(updatedProduct.price.currency, createdProduct.price.currency);
      assert.equal(updatedProduct._id, createdProduct._id);
      done();
    });
  });

  it(`deletes a product`, (done) => {
    const targetId = createdProduct._id;

    const params = {
      method: "DELETE",
      uri: `${hostUrl}${productsApiPath}/${targetId}`,
      json: true
    };

    request(params, (err, response) => {
      const empty = response.body;

      assert.equal(err, null);
      assert.deepStrictEqual(empty, {});
      done();
    });
  });
});
