# react-webpack-boilerplate
[![Build Status](http://img.shields.io/travis/srn/react-webpack-boilerplate.svg?style=flat-square)](https://travis-ci.org/srn/react-webpack-boilerplate) [![Build Status](http://img.shields.io/coveralls/srn/react-webpack-boilerplate.svg?style=flat-square)](https://coveralls.io/r/srn/react-webpack-boilerplate) [![Dependency Status](http://img.shields.io/gemnasium/srn/react-webpack-boilerplate.svg?style=flat-square)](https://gemnasium.com/srn/react-webpack-boilerplate)

Simple production-ready boilerplate for [React](http://facebook.github.io/react/) and [Webpack](http://webpack.github.io/) (SASS and React hot reloading)

## Install

```sh
# Clone repository
$ git clone https://github.com/srn/react-webpack-boilerplate.git && cd react-webpack-boilerplate

# Install dependencies
$ npm install
```

## Development

```sh
$ node index
```

Go to [http://localhost:3001](http://localhost:3001) and see the magic happen.

## Add entry point

* Create new file in `/client/entryPoints`
* Add a new view file in `/views`
* Add a new entry in `webpack.config.js`
* Restart the development server (required whenever you make changes to webpack.config.js)

## Production

Run this command to output the current environment:

```sh
export | grep NODE_ENV
```

If you want to run the project in production, set the `NODE_ENV` environment variable to `production`.

```sh
export NODE_ENV=production
```

Run this command to generate the required bundles for production:

```sh
npm run-script bundle
```

Run this command to switch back to development environment:

```sh
export NODE_ENV=development
```

## Tests

```sh
$ npm test
```

## License

MIT © [Søren Brokær](http://srn.io)
