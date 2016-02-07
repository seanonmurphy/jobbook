root
¦   index.html
¦   page-index.html
¦   contact.php
|   template.html
¦
+---build
¦   ¦   img
¦   +---js
¦   ¦       main.js   (eslint/es2015)
¦   ¦       vendor.js (concat all lib)
¦   +---css
¦   ¦       main.css (sass to css)
¦
¦
+--[dev]
¦   ¦   npm_modules
¦   ¦   gulpconfig.babel.js
¦   ¦
¦   +---src
¦   ¦       scripts (vendors and main.js)
¦   ¦       styles (sass)
|
|
|
|
|
+---[dist]
¦   ¦   index.html 	    (minified)
¦   ¦   page-index.html (minified)
¦   ¦   contact.php  	  (minified)
¦   |   template.html   (minified)
¦   ¦
¦   +---build
¦   ¦     ¦   img
¦   ¦     +---js
¦   ¦     ¦   bundle.min.js (main.js & vendor.js) - ugilified
¦   ¦     +---css
¦   ¦     ¦   main.min.css (compressed,minified)
