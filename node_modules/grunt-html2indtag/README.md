# grunt-html2indtag

grunt-markdownで生成したhtmlファイル決め打ちのコンバートプラグインです。

InDesign（CS4以降）で読み込むのに都合がいいxmlファイルを生成します。

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

npmに上げてないのでコマンド入れてもインストールできません。

```shell
npm install grunt-html2indtag --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-html2indtag');
```

## The "html2indtag" task

### Overview
In your project's Gruntfile, add a section named `html2indtag` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  html2indtag: {
    dist: {
      expand: true,
      src: ['test/**.html'],
      //dest: 'tmp/',
      ext: '.xml'
    },
    options: {
      //見出しが目立ちにくい場合は、trueにすると記号が入る
      midashialert: true
    }
  }
});
```

### Options

#### options.midashialert
Type: `boolean`
Default value: `false`

trueにすると、見出しの前に「h1」などの記号が付いて目立ちやすくなります。



## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
