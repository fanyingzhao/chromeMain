(function () {
	$('.tag-container').find('input').on('keypress', function(){
		if (event.keyCode == '13' || event.keyCode == '32') {
			// 生成标签
			createTag($(this).val());
			$('.tag-container').find('input').val("");
		}
	});
	$('.tag-container').find('input').focus(function(){
		promptIsShow(false);
	});
	$('.tag-container').find('input').blur(function(){
		promptIsShow(true);
	});

	$('.right-slider .recommand-tag .tag').on('click', tagClick);
	$('.right-slider .bottom').find('span').on('click', collectionClick);
})();

function tagClick(event) {
	// 先判断是否已经添加
	if ($(this).attr('isSel') == 'true') {
		labelDis($('.tag-container').find('label[tag=' + $(this).text() + ']'));
		return;
	}

	$(this).css('background', 'gray');
	promptIsShow(false);
	createTag($(this).text());
	$(this).attr('isSel', 'true');
}

function collectionClick(){
	var data = [];
	$('.tag-container').find('label').each(function() {
		data.push($.trim($(this).text()));
	});

	// 对参数进行检验
	console.log(data);

	$.ajax({  
	    type:'post',  
	    traditional :true,  
	    url:'http://127.0.0.1:5000/api/images/add',  
	    data:{imgUrl: $('.left-slider').find('img')[0].src, pageUrl:window.location.href, linkUrl:"http://oi7yis5b9.bkt.clouddn.com/Flt4vJTpXudXKn2WIYtLn7UHHz8c", title: document.title, tagList: data},  
	    success:function(data){  
	        if (data['status']['code'] == 000) {
		   		// 添加图片成功，关闭界面
		   		window.close();
			}else {
			    alert('添加图片失败');
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){

		}  
	});
}

function createTag(tag) {
	var $label = $("<label class=\'tag\' tag=\'" + tag + "\'></label>").text(tag).on('click', function(){
		labelDis(this);
	});

	$('.tag-container .input-container').append($label);
}

function promptIsShow(isShow) {
	if (isShow) {
		if (!$('.tag-container').find('label').size()) {
			$('.tag-container .prompt').show();
		}
	}else {
		$('.tag-container .prompt').hide();
	}
}

function labelDis(label){
	$('.right-slider .recommand-tag').find('[tag=' + $(label).text() + ']').css('background', 'transparent').attr('isSel', 'false');
	$(label).remove();
	promptIsShow(true);
}