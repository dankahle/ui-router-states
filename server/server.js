
/*
html5 server:
Not sure there's any nice way of doing this, i.e. there will be files requested that don't
exist that need to return 404 not index.html which is what a catchall at the end would
do, in lieu of that, then have to look for appropriate paths. This sucks as well, but
not sure any way around it really. How else do you return index.html for some paths and
404 for others?
*/
var express = require('express'),
   path = require('path');

var app = express();

/*
   app.use(function(req, res, next) {
   console.log(req.url);
   next()
})
*/
app.use(express.static('..')); // for node_modules and bower_components
app.use(express.static('../public')); // for app

app.use('/api/*', function(req, res) {// api
   res.send('api');
})

app.get('*', function(req, res) { // index.html for html5 routing
   var found = false;
   // express.static serves up index.html automatically for '/' so won't log that
   var acceptableExactPaths = ['/', '/about'];
   acceptableExactPaths.forEach(function(v) {
      if(req.url.toLowerCase() === v.toLowerCase())
         found = true;
   })
   var acceptableStartingPaths = ['/user'];
   acceptableStartingPaths.forEach(function(v) {
      if(req.url.toLowerCase().indexOf(v.toLowerCase()) === 0)
         found = true;
   })

   if(found) {
      console.log('index.html for:', req.url)
      // need path.resolve here, cause ".." in path is considered malicious
      res.sendFile(path.resolve(__dirname + '/../public/index.html'));
   }
   else {
      console.log(404, req.url);
      res.status(404).end();
   }
})

var port = 3003;
app.listen(port, function () {
   console.log('server started on ' + port)
})


