var path = require('path'),
  open = require('opn');

open(path.join(process.cwd(), 'test/index.html'));/* 

var overlay = fs.readFileSync(path.join(process.cwd(), 'index.js'), 'utf-8');

var dom = new jsdom.JSDOM(`
  <!DOCTYPE html>
  <html>
    <head></head>
    <body>
      <a href="https://placehold.it/500x300" data-overlay>
        <img src="https://placehold.it/500x300">
      </a>
      <a href="https://placehold.it/500x300" data-expand>
        <img src="https://placehold.it/500x300">
      </a>
      <script>${overlay}</script>
    </body>
  </html>
`, { runScripts: 'dangerously' });

var w = dom.window,
  d = w.document;
w.overlay({
  selector: '[data-overlay]',
  class: 'content-overlay'
});

o('overlay with default options', function (done) {
  d.querySelector('[data-overlay]').dispatchEvent(new w.MouseEvent('click'));
  o(d.querySelector('.content-overlay')).notEquals(null)('A .content-overlay element should be in the DOM');
  setTimeout(done, 10);
});

o.run(function (results) {
  results.forEach(function (result) {
    var color = result.testError ? '\x1b[33m' : result.pass === true ? '\x1b[32m' : '\x1b[31m';
    console.log(color, result.message);
    console.log('\x1b[37m', '');
    if (result.testError) console.log(result.context, result.testError)
    console.log('\x1b[37m', '');
  })
});

 */