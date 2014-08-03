/*
 * grunt-html2indtag
 * https://github.com/ohtsuy1/grunt-html2indtag
 *
 * Copyright (c) 2014 Ohtsu Yuichiro
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('html2indtag', 'conver html to indd tag text.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
        midashialert: false
    });

    //コード以外のHTMLの変換
    var parseHTML = function(src){
      //img関連。画像全体がpで囲まれているのでfigureタグに置き換え
      src = src.replace(/<p>(<img[^>]*>)<\/p>/g, '<figure>$1</figure>');
      //img関連。src=""をhref="file://"に
      src = src.replace(/<img src="([^>]*)>/g, '<img href="file://$1/>');
      //img関連。zoomとclipの指定をimg要素のdata-zoom、data-clip属性に
      src = src.replace(/(<img href="[^\?]*)\?zoom=([0-9]*)/g, '$1" data-zoom="$2" ');
      src = src.replace(/(data-zoom="[0-9]*" )" /g, '$1');
      src = src.replace(/(<img [^\?>]*)\?clip=([0-9\+]*)"/g, '$1" data-clip="$2"');
      src = src.replace(/\&amp;clip=([0-9\+]*)"/g, 'data-clip="$1"');
      //キャプションをfigcaptionに
      src = src.replace(/alt="([^"]*)"\/><\/figure>/, '/></figure>\n<figcaption>$1</figcaption>');
      src = src.replace(/alt="([^"]*)"\/><\/p>/, '/></p>\n<figcaption>$1</figcaption>');
      //brは改行コードに、hrはとりあえず孤立タグに
      src = src.replace(/<br>/g, '\n');
      src = src.replace(/<hr>/g, '<hr/>');
      //編集コメントや図中文字などの独自拡張（div class="***"で指定しているものの処理
      src = src.replace(/<div class="hen">(.*)<\/div>/g, 
          '<div_hen><alert>編集</alert>$1</div_hen>');
      src = src.replace(/<div class="zuchuu">(.*)<\/div>/g, 
          '<div_zuchuu><alert>図中</alert>$1</div_zuchuu>');
      src = src.replace(/<div class="([^"]*)">(.*)<\/div>/g, 
          '<div_$1>$2</div_$1>');
      src = src.replace(/<del>［([^］]*)］<\/del>/g, '<del>Ì$1Ô</del>');
      //テーブルをスクリプト処理しやすいよう単純化（tbody、theadをカット、thはtdに）
      src = src.replace(/<thead>/, '');
      src = src.replace(/<\/thead>/, '');
      src = src.replace(/<tbody>/, '');
      src = src.replace(/<\/tbody>/, '');
      src = src.replace(/<th>/, '<td>');
      src = src.replace(/<\/th>/, '</td>');
      //見出しh1〜h6に<alert>を入れる
      if(options.midashialert == true){
        src = src.replace(/<h1[^>]*>/g, '<h1><alert>h1</alert>');
        src = src.replace(/<h2[^>]*>/g, '<h2><alert>h2</alert>');
        src = src.replace(/<h3[^>]*>/g, '<h3><alert>h3</alert>');
        src = src.replace(/<h4[^>]*>/g, '<h4><alert>h4</alert>');
        src = src.replace(/<h5[^>]*>/g, '<h5><alert>h5</alert>');
        src = src.replace(/<h6[^>]*>/g, '<h6><alert>h6</alert>');
      }
      return src;
    };

    //コード部分の変換
    var parseCode = function (src){
      src = src.replace(/<span class="([^"]*)">([^<]*)<\/span>/g, 
              '<span_$1>$2</span_$1>');
      return '<pre><code>' + src + '</code></pre>';
    };

    this.files.forEach(function(f){

        var srcfile = f.src[0];

        var src = grunt.file.read(srcfile);
        var out = '<?xml version="1.0" encoding="UTF-8"?>';
        out += '<story xmlns:aid5="http://ns.adobe.com/AdobeInDesign/5.0/" '
            + 'xmlns:aid="http://ns.adobe.com/AdobeInDesign/4.0/">';
        var lines = src.split('\n');
        //ヘッダーをスキップ
        for(var i=0; i<lines.length; i++){
          if(lines[i].indexOf('<body') >= 0) {
            break;
          }
        }
        var codemode = false;
        for(; i<lines.length; i++){
          var line = lines[i]; 
          if(codemode == true){
            //コード専用の処理
            //コードが終わったかチェック
            if(line.indexOf('</code></pre>')>=0){
              codemode = false;
              //</code></pre>より前は処理したい
              out += parseCode(line.replace(/(.*)<\/code><\/pre>/, '$1')) + '\n';
              out += '</codelist>' + '\n';
              //表タイプのテーブル
              // if(options.codetable){ 
              //   out += '<tEnd>\n';
              // }
              continue;
            }
            out += parseCode(line) + '\n';
          } else {
            //コード以外の処理
            //コードか否かをチェック
            if(line.indexOf('<pre><code')>=0){
              codemode = true;
              out += '<codelist data-type="'+line.replace(/.*class="lang-([a-z]*)".*/, '$1')+'">\n';
              //pre codeを抜いた部分だけはコードとして処理したい
              lines[i] = line.replace(/<pre><code[^>]*>(.*)/, '$1');
              i--;
              continue;
            }
            //html終了タグが来たら終了
            if(line.indexOf('</html>')>=0) break;
            //1ライン出力
            var htmlline = parseHTML(line.trim());
            //行末がタグなら改行を入れる。タグでなければ詰める
            if(htmlline.charAt(htmlline.length-1) == '>') out += htmlline + '\n';
            else out += htmlline;
          }
        }
        out += '</story>';

        //var dir = path.dirname(f.dest);
        grunt.file.write(f.dest, out);
        //grunt.log.warn(stilelist.paraStyle[0].tagname);
        // Print a success message.
        grunt.log.ok('File "' + f.dest + '" created.');
    });


  });


};
