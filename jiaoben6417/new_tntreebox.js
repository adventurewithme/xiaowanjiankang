/*! tn tree box 1.1 author:weiyingbin email:277612909@qq.com
//@ object webiste:http://www.39gs.com/archive/326.html
//@ https://github.com/binwind8/tntreebox
*/
//var defaults = ['开合跳_32分钟','仰卧对侧两头起_10次'];

var _tnTreebox = function(){};
var _tnTreebox_id = 0;
_tnTreebox.prototype = {
	data:null,
	dom_id:null,
	name:null,
	old_selected:null,
	width:0,
	init:function(dom_id,name,data,defaults,selected){
		console.log(dom_id+","+name+","+defaults,'init');
		this.dom_id = dom_id;
		this.data = data;
		this.name = name;
		this.defaults = defaults;
		this.old_selected = selected;
	},
	makeHtml:function(){
		console.log(this.defaults,'makehtml');
		var _data = {};
		for(var i in this.data){
			var d = this.data[i];
			if(!d.hasOwnProperty('parent_id')){
				d.parent_id = 0;
			}
			if(typeof(_data[d.parent_id]) != 'object'){
				_data[d.parent_id] = [d];
			}else{
				_data[d.parent_id].push(d);
			}
		}
		var html= "";
		//console.log(_data);
		for(var parent_id in _data){
			var list = _data[parent_id];
			var html_list = "<li><input type='text' class='search' placeholder='输入文字搜索' /></li>";
			for(var j in list){
				var item = list[j];
				if(this.old_selected&&$.inArray(item.id,this.old_selected)!=-1){
					var checked = " checked='checked'";
				}else{
					var checked = "";
				}
				if(checked==''){
					try{
						if(item.is_select){
							checked = " checked='checked'";
						}
					}catch(err){

					}
				}
				var _class = "";
				if(typeof(_data[item.id]) == 'object'){
					_class+=" children";
				}
				try{
					if(item.is_hidden){
						_class+=" hide2";
					}
				}catch(err){

				}

				if(_class){
					_class = " class='"+_class+"'";
				}

				_tnTreebox_id++;
				var id = 'treebox_'+_tnTreebox_id; //for='"+id+"' for会导致误点 先去掉
				var box = "<input"+checked+" type='checkbox' id='"+id+"' name='"+this.name+"' value='"+item.id+"' />";
				try{
					if(item.no_box){
						box = '';
					}
				}catch(err){

				}
				html_list+="<li"+_class+" v="+item.id+"><em>"+box+"</em><label>"+item.name+"</label><span></span></li>";
			}
			var _class = 'box';
			if(parent_id==='0'){
				_class += " root";
			}else{
				_class += " hide";
			}
			if(_class){
				_class = " class='"+_class+"'";
			}
			html_list = "<div parent_id="+parent_id+_class+"><ul>"+html_list+"</ul></div>";
			html+=html_list;
		}
		html = "<div class='list'>"+html+"</div><div class='header'></div>";
		$("#"+this.dom_id).addClass('tntreebox').html(html);
		this.width = $("#"+this.dom_id).width();
		this.setWidth();
		var that = this;
		$("#"+this.dom_id+" .children").on('click',function(){
			that.showChildren(this);
		});
		$("#"+this.dom_id+" :checkbox").on('change',function(e){
			that.showChecked(this);
			var value=$(this).parent().next().html();
			var isCheck=$(this).is(':checked');
			var isSelected=$(this).parents("li").eq(0).hasClass("selected");
			
			var thisli=$(this).parents("li").eq(0);
            for (var i = 0; i < $('#treebox ul li').length;i++){
                if (value == $('#treebox ul li:eq(' + i + ')').find('label').eq(0).html()){
                	if(isSelected==true){
                		$('#treebox ul li:eq(' + i + ')').not(thisli).addClass('selected');
                	}else{
                		$('#treebox ul li:eq(' + i + ')').not(thisli).removeClass('selected');
                	}
                    $('#treebox ul li:eq(' + i + ') :checkbox').prop('checked',isCheck);
                }
            }
		});

		//搜索
		$("#"+this.dom_id+" .search").on('input',function(){
			var text = $(this).val();
			$(this).parent().siblings("li").removeClass('hide');
			if(text){
				$(this).parent().siblings("li").each(function(){
					var name = $(this).find('label').text();
					if(name.indexOf(text)==-1){
						$(this).addClass('hide');
					}
				});
			}
		});
		that.showChecked();
        that.firsrchecked();
	},
	setWidth:function(){
		console.log(this.defaults,'setWidth');
		var objs = $("#"+this.dom_id+" .box:visible");
		var num = objs.size();
		var w = this.width/num;
		objs.width(w-10);
	},
	firsrchecked:function(){
		console.log(this.defaults,'firsrchecked');
		var defaults=this.defaults;
        for (var j = 0; j < defaults.length; j++){
            var text,id;
            $('#treebox ul li :checkbox').each(function(){
            	if($(this).parent().next().html()==defaults[j]){
            		$(this).parents("li").eq(0).addClass('selected');
            		$(this).prop('checked',true);
            		text = defaults[j];
            		id = $(this).val();
            	}
            })
            html = "<div class='" + id + "'>" + text + "<span v=" + id + ">x</span></div>";
            $("#" + this.dom_id + " .header").prepend(html)
        }
    },
	showChildren:function(e){
		var li = $(e);
		li.parent().find('.cur').removeClass('cur');
		li.addClass('cur');
		var id = li.attr('v');
		var col = li.parent().parent().attr('col');
		if(!col){
			col = 0;
		}
		var _col = col;
		while(1){
			_col++;
			var o = $("#"+this.dom_id+" div[col="+_col+"]");
			if(o.size()>0){
				o.hide();
			}else{
				break;
			}
		}
		$("#"+this.dom_id+" div[parent_id="+id+"]").attr('col',col*1+1).removeClass('hide').show();
		this.setWidth();
	},
	showChecked:function(e){
		var html = '';
		var obj = this;
		
		if(e){
			var text = $(e).parent().next('label').html();
			var id=$(e).val();
			var ids = id.split("_")[2];
			html = "<div class='" + ids + "'>"+text+"<span v="+id+">x</span></div>";
			
		}
		if (($('.header a').length==0)) { html += " <a>清空</a>"; }
		if($("#treebox .header div").hasClass(ids)){
			$("#treebox .header ."+ids+"").remove();
		}else{
			$("#treebox .header").prepend(html);
		}
		if($("#treebox .header").find('div').size()<1){
			$("#treebox .header").find('a').remove();
		}
	       
		//删除选中运动
		$("#"+this.dom_id+" .header span").on('click',function(){
			var obj = $(this);
			var id = obj.attr('v');
			var ids = id.split("_")[2];
			if(obj.parent().parent().find('div').size()<2){
				obj.parent().parent().find('a').remove();
			}
			$("#treebox .list :checkbox").each(function(){
				var groid=$(this).val().split("_")[2];
				if(groid==ids){
					$(this).prop('checked',false);
					$(this).parents("li").eq(0).removeClass('selected');
				}
			})
			/*var p = obj.parent().parent().prev(".list").find(':checkbox[value='+id+']').prop('checked',false);
			obj.parent().parent().prev(".list").find("li[v="+id+"]").eq(0).removeClass('selected');*/
			obj.parent().remove();
		});
		var that = this;
		//清空运动
		$("#"+this.dom_id+" .header a").on('click',function(){
			var obj = $(this);
			obj.parent().prev('.list').find(':checkbox').prop('checked',false);
			obj.parent().html('');
			$("#"+that.dom_id+" .selected").removeClass('selected');
		});
		//选中背景加深
		$("#"+this.dom_id+" .selected").removeClass('selected');

		//复选框的父元素选中
		$("#"+this.dom_id+" input:checked").each(function(){
			that.selected($(this).parent().parent());
		});

		
		//$("#"+this.dom_id+" input:checked").parent().addClass('selected');
	},selected:function(obj){
		$(obj).addClass('selected');
		var top_div = $(obj).parent().parent();
		var parentid = top_div.attr('parent_id');
		/*if(parentid){
			this.selected("#"+this.dom_id+" li[v="+parentid+"]");
		}*/
	}
};

function tnTreeBox(id,name,data,defaults,selected){
	var obj = new _tnTreebox();
	obj.init(id,name,data,defaults,selected);
	obj.makeHtml(id,name,data,defaults,selected);
}