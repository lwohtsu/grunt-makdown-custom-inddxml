grunt-markdown-custom-inddxml
====================

もともとはgrunt-markdownをちょっと変更する目的で始めましたが、
Just Right用のSJIS変換や、InDesign読み込み用のXML変換と分割しにくくなったので、統合しました。
CS4でしかテストしていませんが、他でも動きそうです。

##利用方法
grunt本来のインストール方法と違っているのですが、grunt-cliのグローバルインストールを済ませた後、このプロジェクトをダウンロードして解凍します。できあがったフォルダ内にMarkdownの原稿を入れて、コマンドラインから「grunt」「grunt xml」「grunt sjis」のいずれかを実行します。

あまりよくわからないという人は以下を参照してください。

https://github.com/lwohtsu/grunt-makdown-custom/blob/master/doc/how-to-workflow.md

##コマンド
###grunt
デフォルトのgruntを実行すると、MarkdownをHTML変換し、watchによって自動更新します。普段の原稿編集用に使うモードです。Shift-JIS変換とXML変換は重いので最初の一回だけ行い、watchによる更新時はHTML変換のみ行います。

この部分については、たぶん以下の記事そのままだと思います。
http://www.backlog.jp/blog/2013/10/markdown-preview.html

###grunt sjis
文字校用のJust RightがシフトJISのHTMLしか校正してくれないので、SJIS変換したHTMLを生成します。「kousei-sjis」というフォルダを作成し、その中にHTMLファイルを保存します。
重いのでwatchによる自動更新はしません。

###grunt xml
HTMLをInDesignで読み込み可能なXMLに変換します。重いのでwatchによる自動更新はしません。InDesignに読み込む直前に実行してください。

##XML用スクリプトについて
InDesignにインストールして使う補助用のスクリプトです。XMLをInDesignに読み込んだ後、「画像をまとめてリサイズ」「テーブルタグをInDesignの表へ変換」「preタグやcodeタグをInDesignの表へ変換」という処理を行います。
スクリプトパネルを右クリックすると保存場所を開けるので、そこにjsxファイルをコピーしておきます。

なお、これらのスクリプトは［フレームからタグを取り除く］を実行してXMLタグを取り除いてしまった後は使えません。また、構造パネルにXMLのツリーが複数ある場合は、最初の1つしか見ません。

###genXMLCode2Table.jsx
codelistタグ（独自タグです）で囲まれた範囲を、InDesignの表に変換してから、指定した表スタイルを設定して整えます。表スタイルに「ヘッダースタイル」と「フッタースタイル」を指定しておくと、自動的に表の1行目と最終行にセルスタイルを設定します。
※本来のヘッダー／フッタースタイルの使い方と異なるので、ヘッダー行／フッター行の設定は不要です。また、表がページをまたいだ場合も、ヘッダー行が追加されることはありません。

###genXMLTable.jsx
tableタグで囲まれた範囲を表に変換します。genXMLCode2Table.jsxと使い方はほとんど同じで、ヘッダースタイル／フッタースタイルを表の1行目と最終行にセルスタイルを設定します。

###resizeXMLImage.jsx
XMLから読み込んだ直後の画像は原寸サイズで非常に大きいので、画像をまとめてリサイズします。また、独自拡張のトリミングやリサイズ指定をしていた場合は、それを反映させます。


```
独自拡張のリサイズ・トリミング指定
![キャプションなし](img/c3d-c2-01-01.png?zoom=50&clip=0+0+1154+450)
```

genXMLCode2TableやgenXMLTableはその時点での親フレームの幅一杯の表に変換しますが、テキストがあふれ状態だと幅がすごく小さくなってしまいます。先にresizeXMLImageで画像サイズを調整してあふれ状態を解消してから、表への変換を行うことをおすすめします。

詳しい使い方はhttp://arinoth.hatenablog.com/entry/2014/10/13/065953


---

##grunt-markdownの変更部分（古いドキュメント）

how to add SCSS support to grunt-markdown

いずれ不要になるかもしれないですが、[grunt-markdown](https://github.com/treasonx/grunt-markdown)に含まれるhightlight.jsの7.3.0ではSass（scss）をサポートしていないのでそれを足す方法と、ついでにcsファイルでUnity用のクラスを着色する方法のメモです。

### 1.set visible node_modules folder
gurnt-markdownをインストールした後、不可視になっているnode_moduleフォルダーを可視化します。

### 2.Add scss.js
以下のコマンドで最新のhighlight.jsを別のフォルダにインストールし、こちらのnode_modulesフォルダも可視化します。
```bash
npm install highlight.js
```
node_modules -> highlight.js -> lib -> languagesフォルダ内からscss.jsをコピーして、grunt-markdownフォルダー内のhighlight.js内に移動します。

https://github.com/lwohtsu/grunt-makdown-custom/commit/96e3ca8a8d118bf9d226c7fbc1bd170d5f3a7e6c

### 3.edit highlight.js
highlight.jsに「this.CSS_NUMBER_MODE」と「hljs.LANGUAGES['scss']」を追加します。

https://github.com/lwohtsu/grunt-makdown-custom/commit/3491334b92c794f3fc2e42ea22dd6e1779839a39

### 4.edit cs.js
csファイルでUnity用のクラスが着色されるようにするには、
最初のkeywordsの部分を以下のように修正して、クラス名を列挙します。

https://github.com/lwohtsu/grunt-makdown-custom/commit/9cdabc16471c0ba50a8b17201c8e5d3faa8b0dea


### 5.grunt-utf8tosjisの調整
UTF-8からSjift JISファイルへの変換時に、変換不可能な記号があると停止してしまうようです。「mode_modules/tasks/utf8tosjis.js」を開いて、次のようにコードを変更すると、変換不可能な記号を適当なものに置き換えて書き出してくれます。

```
var conv   = new Iconv('UTF-8', 'SHIFT-JIS//TRANSLIT//IGNORE');
```

## swiftにも対応
古いhighlight.jsに「this.PHRASAL_WORDS_MODE」「TITLE_MODE」「IDENT_RE」を移植？　テスト中
