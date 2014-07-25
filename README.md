how to custom grunt-makdown
====================

how to add SCSS support to grunt-markdown

いずれ不要になるかもしれないですが、[grunt-markdown](https://github.com/treasonx/grunt-markdown)に含まれるhightlight.jsの7.3.0ではSass（scss）をサポートしていないのでそれを足す方法と、ついでにcsファイルでUnity用のクラスを着色する方法のメモです。

## 1.set visible node_modules folder
gurnt-markdownをインストールした後、不可視になっているnode_moduleフォルダーを可視化します。

## 2.Add scss.js
以下のコマンドで最新のhighlight.jsを別のフォルダにインストールし、こちらのnode_modulesフォルダも可視化します。
```bash
npm install highlight.js
```
node_modules -> highlight.js -> lib -> languagesフォルダ内からscss.jsをコピーして、grunt-markdownフォルダー内のhighlight.js内に移動します。

https://github.com/lwohtsu/grunt-makdown-custom/commit/96e3ca8a8d118bf9d226c7fbc1bd170d5f3a7e6c

## 3.edit highlight.js
highlight.jsに「this.CSS_NUMBER_MODE」と「hljs.LANGUAGES['scss']」を追加します。

https://github.com/lwohtsu/grunt-makdown-custom/commit/3491334b92c794f3fc2e42ea22dd6e1779839a39

## 4.edit cs.js
csファイルでUnity用のクラスが着色されるようにするには、
最初のkeywordsの部分を以下のように修正して、クラス名を列挙します。

https://github.com/lwohtsu/grunt-makdown-custom/commit/9cdabc16471c0ba50a8b17201c8e5d3faa8b0dea


## 5.grunt-utf8tosjisの調整
UTF-8からSjift JISファイルへの変換時に、変換不可能な記号があると停止してしまうようです。「mode_modules/tasks/utf8tosjis.js」を開いて、次のようにコードを変更すると、変換不可能な記号を適当なものに置き換えて書き出してくれます。

```
var conv   = new Iconv('UTF-8', 'SHIFT-JIS//TRANSLIT//IGNORE');
```
