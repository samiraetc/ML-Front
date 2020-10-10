const defaultresponse = require('./response');

const express = require('express'),
  router = express.Router(),
  request = require('request'),
  app = express();

function imageIdProducts(_products) {
  var products = _products,
    images_id = [];

  products.forEach(function (_product) {
    images_id.push(imageIdProduct(_product));
  });

  return images_id;
}
function imageIdProduct(_product) {
  var image_id = _product.thumbnail;
  image_id = image_id.substr(0, image_id.length - 6);
  image_id = image_id.split('/').pop();

  return image_id;
}
function merge(_products, _images, _breadcrumb) {
  _products.forEach(function (_product) {
    var image_id = imageIdProduct(_product),
      image_url;

    _images.forEach(function (_image) {
      if (_image.id === image_id) {
        _product['imageProduct'] = _image.variations[1].url;
      }
    });
  });

  return { products: _products, breadcrumb: _breadcrumb };
}
function sortBySize(_a, _b) {
  return _a.size > _b.size;
}
function fetchBreadcrumb(_filters) {
  var breadcrumb = [];

  _filters.forEach(function (_filter) {
    if (_filter.id === 'category') {
      _filter.values[0].path_from_root.forEach(function (_category) {
        breadcrumb.push(_category.name);
      });
    }
  });

  if (breadcrumb.length > 0) {
    return breadcrumb.join(' > ');
  } else {
    return null;
  }
}

router.get('/items/:item_id', (req, res) => {
  var param = req.params.item_id ? req.params.item_id : '',
    product,
    picture,
    breadcrumb;

  request.get(
    'https://api.mercadolibre.com/items/' + param,
    (_err, _res, _data) => {
      picture = JSON.parse(_data).pictures;
      picture = picture[0];

      product = JSON.parse(_data);
      product['imageProduct'] = picture.url;

      request.get(
        'https://api.mercadolibre.com/items/' + param + '/description',
        (_err, _res, _data) => {
          var description = JSON.parse(_data);

          if (description.plain_text == '') {
            product['textDescription'] = description.text;
          } else {
            product['textDescription'] = description.plain_text;
          }

          request.get(
            'https://api.mercadolibre.com/categories/' + product.category_id,
            function (_err, _res, _data) {
              breadcrumb = JSON.parse(_data);
              breadcrumb = breadcrumb.path_from_root
                .map(function (_category) {
                  return _category.name;
                })
                .join(' > ');

              return res.json({
                product: product,
                breadcrumb: breadcrumb,
                defaultresponse,
              });
            },
          );
        },
      );
    },
  );
});

router.get('/items', (req, res) => {
  var param = req.query.q ? req.query.q : '',
    products,
    pictures,
    breadcrumb;

  request.get(
    'https://api.mercadolibre.com/sites/MLA/search?limit=4&q=' + param,
    (_err, _res, _data) => {
      var data = JSON.parse(_data);
      products = data.results;
      pictures = imageIdProducts(products);
      breadcrumb = fetchBreadcrumb(data.filters);

      request.get(
        'https://api.mercadolibre.com/pictures?ids=' + pictures.join(),
        (_err, _res, _data) => {
          pictures = JSON.parse(_data);

          products = merge(products, pictures, breadcrumb, defaultresponse);

          return res.json(products);
        },
      );
    },
  );
});

module.exports = router;
