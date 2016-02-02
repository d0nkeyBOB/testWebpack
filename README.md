## Test App for Kinvey


Clone repo, then
```
npm install
```
After installing node modules
```
gulp watch
```

Test that site is working with 'Hello Dashboard' text visible.

Now, stop gulp and then:

```
npm i kinvey-angular --save
```

Add the module within your 'app.js' file.

```
var Kinvey = require('kinvey-angular');
```
The run Gulp watch again
```
gulp watch
```


