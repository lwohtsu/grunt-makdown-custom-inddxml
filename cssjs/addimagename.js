$(function(){
	$('img').each(function(){
		var t = $(this);
		t.after('<p class="caption">図■：'+ t.attr('alt') + '</p>');
		var s = t.attr('src');
		//srcにクエリ文字が入っている？
		if(s.indexOf('?')>=0){
			//クエリ文字抜きでファイル名を表示
			t.before('<p>（'+ s.substring(0, s.lastIndexOf('?')) + '）</p>');
			//クエリ分割
			var q = s.substr(s.indexOf('?')+1).split('&');
			q.sort();	//clip→zoomの文字順にする
			//先に拡大縮小
			var z = 1;
			for(var i=q.length-1; i>=0; i--){
				if(q[i].indexOf('zoom')>=0){
					z = zoomImage(t, q[i].substr(q[i].indexOf('=')+1));
				}else if(q[i].indexOf('clip')>=0){
					imageClipping(t, q[i].substr(q[i].indexOf('=')+1), z);
				}
			}
		} else {
			t.before('<p>（'+ s.substr(s.lastIndexOf('/')+1) + '）</p>');
		}
	});
	/*prettiprintを使うときの設定*/
	// $('code').each(function(){
	// 	var c = $(this).attr('class');
	// 	var p = $(this).parent('pre');
	// 	p.addClass('prettyprint');
	// 	p.addClass(c);
	// 	//p.addClass('linenums')
	// });
});

function zoomImage(targ, qry){
	var contwidth = targ[0].naturalWidth;
	var contheight = targ[0].naturalHeight;
	var z = parseFloat(qry) / 100;
	targ.width(contwidth * z);
	targ.height(contheight * z);
	return z;
}

function imageClipping(targ, qry, zoom){
	var param = qry.split('+');
	var repelem = $('<div class="trimbase"></div>');
	var contwidth = targ[0].naturalWidth * zoom;
	var contheight = targ[0].naturalHeight * zoom;

	param[0] *= zoom;
	param[1] *= zoom;
	param[2] *= zoom;
	param[3] *= zoom;

	repelem.css({
		backgroundImage: 'url(' + targ.attr('src') +')',
		'background-position': -param[0] + 'px ' + -param[1] + 'px',
		'background-size': contwidth + 'px '+contheight+'px', 
		width: param[2], height: param[3],
		'background-repeat': 'no-repeat'
	});
	targ.replaceWith(repelem);
}