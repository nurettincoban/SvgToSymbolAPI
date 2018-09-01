var express     = require('express'),
    router      = express(),
    SVGSpriter  = require('svg-sprite');

// Configuration
var config = {
    'log': 'verbose',
    'mode': {
        'symbol': {
        'bust': false,
        'inline': true,
        'example': true
        }
    }
};

// Convert SVG to Symbol
router.post('/convert', function(req, res) {
    if(!req.body.svgData)
        res.json({ error: true, message: "Please send a SVG image(code)"});
    else {
        var spriter = new SVGSpriter(config);
        var name = `svg-${Math.random()}.svg`;
        spriter.add(`./${name}`, `${name}`, req.body.svgData);
        spriter.compile(function(error, result) {
          if (error) {
            res.status(503).send(error);
            return;
          }
          var data = result.symbol.sprite._contents.toString();
          data = data
            .replace(/></g, '>\n<')
            .replace(/id=""/g, '')
            .replace(/\s{2,}/gm, '')
            .replace(/"(?:\s{1,})/gm, '" ');
          res.type('json').status(200).send({
            error:false,
            symbol: data,
            input: req.body.svgData
          });
        });
    }
});

module.exports = router;