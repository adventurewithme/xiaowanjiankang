var data = [
    { id: 'o_1', name: '腹部', no_box: true, },
    { id: 'o_2', name: '胸部', no_box: true, },
    { id: 'o_3', name: '背部', no_box: true, },
    { id: 'o_4', name: '肩部', no_box: true, },
    { id: 'o_5', name: '手臂', no_box: true, },
    { id: 'o_6', name: '大腿', no_box: true, },
    { id: 'o_7', name: '小腿', no_box: true, },
    {id: 'o_1_1', name: '开合跳', parent_id: 'o_1', no_box: true, },
    { id: 'o_1_2', name: '仰卧对侧两头起', parent_id: 'o_1', no_box: true, },
    { id: 'o_1_3', name: '抱头对侧摸小腿', parent_id: 'o_1', no_box: true, },
    { id: 'o_1_4', name: '船式静力', parent_id: 'o_1', no_box: true, },
    { id: 'o_1_5', name: '登山式', parent_id: 'o_1', no_box: true, },
    { id: 'o_1_6', name: '蛇式挺身', parent_id: 'o_1', no_box: true, },
    { id: 'o_1_7', name: '爬绳屈腿抬腿', parent_id: 'o_1', no_box: true, },
    { id: 'o_1_1_1', name: '船式静力_12次_女', parent_id: 'o_1_1' ,self:'cs12'}, 
    { id: 'o_1_1_2', name: '船式静力_16次_女', parent_id: 'o_1_1', self: 'cs16' },
    { id: 'o_1_1_3', name: '船式静力_18次_女', parent_id: 'o_1_1', self: 'cs18'},
    { id: 'o_1_1_4', name: '船式静力_20次_女', parent_id: 'o_1_1', self: 'cs20'},
    { id: 'o_1_2_1', name: '三级5', parent_id: 'o_1_2', self: 'sj5'},
    { id: 'o_1_2_2', name: '三级6', parent_id: 'o_1_2', self: 'sj6'},
    { id: 'o_1_3_1', name: '三级7', parent_id: 'o_1_3', self: 'sj7'},
    { id: 'o_1_3_2', name: '三级8', parent_id: 'o_1_3', self: 'sj8'},
    { id: 'o_1_3_3', name: '三级9', parent_id: 'o_1_3', self: 'sj9'},
    { id: 'o_1_3_4', name: '船式静力_20次_女', parent_id: 'o_1_3', self: 'cs20' },
    { id: 'o_1_3_5', name: '三级11', parent_id: 'o_1_3', self: 'sj11'},
    { id: 'o_1_3_6', name: '三级12', parent_id: 'o_1_3', self: 'sj12'},
    { id: 'o_2_1', name: '二级多选2-1', parent_id: 'o_2', no_box: true },
    { id: 'o_2_2', name: '二级多选2-2', parent_id: 'o_2'},
    { id: 'o_2_3', name: '二级多选2-3', parent_id: 'o_2' },
    { id: 'o_2_1_1', name: '船式静力_12次_女', parent_id: 'o_2_1', self: 'cs12' },
    { id: 'o_2_1_2', name: '三级2', parent_id: 'o_2_1', self: 'sj2'},
    { id: 'o_2_1_3', name: '三级3', parent_id: 'o_2_1', self: 'sj3'},
];

var defaults = ['cs20','sj7'];

var html = '';
var _tnTreebox = function () { };
var _tnTreebox_id = 0; _tnTreebox.prototype = {
    data: null,
    dom_id: null,
    name: null,
    old_selected: null,
    width: 0,
    init: function (dom_id, name, data, selected) {
        this.dom_id = dom_id;
        this.data = data;
        this.name = name;
        this.old_selected = selected;
    },
    makeHtml: function () {
        var _data = {};
        for (var i in this.data) {
            var d = this.data[i];
            if (!d.hasOwnProperty('parent_id')) { d.parent_id = 0; }
            if (typeof (_data[d.parent_id]) != 'object') {
                _data[d.parent_id] = [d];
            } else {
                _data[d.parent_id].push(d);
            }
        }
        var html = "";
        for (var parent_id in _data) {
            var list = _data[parent_id];
            var html_list = "";
            for (var j in list) {
                var item = list[j];
                if (this.old_selected && $.inArray(item.id, this.old_selected) != -1) {
                    var checked = " checked='checked'";
                } else {
                    var checked = "";
                }
                if (checked == '') {
                    try {
                        if (item.is_select) {
                            checked = " checked='checked'";
                        }
                    } catch (err) { }
                }
                var _class = "";
                if (typeof (_data[item.id]) == 'object') {
                    _class += " children";
                }
                try {
                    if (item.is_hidden) {
                        _class += " hide2";
                    }
                } catch (err) { }
                _class += item.no_box ? '' : ('canselect');
                if (_class) {
                    _class = " class='" + _class + "'";
                }
                _tnTreebox_id++;
                var id = 'treebox_' + _tnTreebox_id;
                var box = "<input" + checked + " type='checkbox' id='" + id + "' name='" + this.name + "' value='" + item.id + "' />";
                try {
                    if (item.no_box) {
                        box = '';
                    }
                } catch (err) { }
                // var box_flag = item.no_box ? '' : ('<em>' + box + '</em>' );
               
                // html_list += "<li" + _class + " v=" + item.id + "><em>" + box + "</em><label>" + item.name + "</label></li>";
                // html_list += "<li" + _class + " v=" + item.id + ">" + box_flag + "<label>" + item.name + "</label></li>";
                html_list += "<li" + _class + " v=" + item.id + " self="+item.self+"><label v=" + item.self +">" + item.name + "</label></li>";
            }
            var _class = 'box';
            if (parent_id === '0') {
                _class += " root";
            } else if (parent_id.length == 3) {
                _class += " hide second";
            } else { _class += " hide third"; }
            if (_class) {
                _class = " class='" + _class + "'";
            }
            html_list = "<div parent_id=" + parent_id + _class + "><ul>" + html_list + "</ul></div>"; html += html_list;
        }
        html = "<div class='header'></div><div class='list'>" + html + "</div>";
        $("#" + this.dom_id).addClass('tntreebox').html(html);
        this.width = $("#" + this.dom_id).width();
        var that = this;
        $("#" + this.dom_id + " .children").on('click', function () {
            that.showChildren(this);
        });
        $("#" + this.dom_id + " .canselect").on('click', function (e) {
                that.showChecked(e);
            var value=e.currentTarget.innerText;
            for (var i = 0; i < $('.third ul li').length;i++){
                if (value == $('.third ul li')[i].innerText){
                    $('.third ul li:eq(' + i + ')').toggleClass('cur')
                }
            }

        });
        that.showChecked('');
        that.firsrchecked();
    }, 
    firsrchecked:function(){
        var that=this;
        for (var j = 0; j < defaults.length; j++){
            var text,id;
            for (var i = 0; i < $('.third ul li').length; i++){
                if ($('.third ul li')[i].attributes.self.value == defaults[j]) {
                    $('.third ul li:eq(' + i + ')').addClass('cur');
                    text = $('.third ul li')[i].innerText;
                    id = $('.third ul li')[i].attributes.self.value;
                }
            }
            html = "<div class='" + id + "'>" + text + "<span v=" + id + ">x</span></div>";
            $("#" + this.dom_id + " .header").prepend(html)
        }
        that.showChecked('');
    },
    showChildren: function (e) {
        var li = $(e); li.parent().find('.cur').removeClass('cur');
        li.addClass('cur');
        if (li.parent().parent().attr('class') == "box root") {
            // console.log('first')
            var liV = li.attr("v");
            li.siblings().removeClass('selected');
            $(".list").find(':checkbox').prop('checked', false);
        }
        var id = li.attr('v');
        var col = li.parent().parent().attr('col');
        if (!col) { col = 0; }
        var _col = col;
        while (1) {
            _col++;
            var o = $("#" + this.dom_id + " div[col=" + _col + "]");
            if (o.size() > 0) {
                o.hide();
            } else { break; }
        }
        $("#" + this.dom_id + " div[parent_id=" + id + "]").attr('col', col * 1 + 1).removeClass('hide').show();
    },

    showChecked: function (e) {
        var html='',id;
        if(e){
            var text = e.currentTarget.innerText;
            id = e.currentTarget.attributes.self.value;
            html = "<div class='" + id + "'>" + text + "<span v=" + id + ">x</span></div>";
            console.log(html.indexOf(html),'sfdf')
        }
        if (($('.header a').length==0)) { html += " <a>清空</a>"; }
        $("#" + this.dom_id + " .header div").hasClass(id) ? ($("#" + this.dom_id + " .header ."+id+"").remove()) : ($("#" + this.dom_id + " .header").prepend(html));
        $("#" + this.dom_id + " .header span").on('click', function () {
            console.log('sss')
            var obj = $(this);
            var id = obj.attr('v');
            if (obj.parent().parent().find('div').size() < 2) {
                obj.parent().parent().find('a').remove();
            }
            for(var i=0;i<$('.cur').length;i++){
                var cur_v=$('.cur')[i].attributes.v.value;
                if (cur_v == e.currentTarget.attributes.v.value){
                    console.log(i)
                    $('.cur:eq(' + i + ')').removeClass('cur')
                    console.log($("#" + this.dom_id +'.cur:eq('+i+')'))
                }
            }
            // var p = obj.parent().parent().next(".list").find(':checkbox[value=' + id + ']').prop('checked', false);
            obj.parent().remove();
        });
        var that = this;
        $("#" + this.dom_id + " .header a").on('click', function () {
            console.log($("#" + this.dom_id + " .header div"));
            // $("#" + this.dom_id + " .header").empty();
            var obj = $(this); 
            // obj.parent().next('.list').find(':checkbox').prop('checked', false);
            obj.parent().html(''); 
            $("#" + that.dom_id + " .cur").removeClass('cur');
        });
        $("#" + this.dom_id + " .selected").removeClass('selected');
        $("#" + this.dom_id + " input:checked").each(function () { that.selected($(this).parent().parent()); });
    }, selected: function (obj) {
        $(obj).addClass('selected');
        var top_div = $(obj).parent().parent();
        var parentid = top_div.attr('parent_id');
        if (parentid) {
            this.selected("#" + this.dom_id + " li[v=" + parentid + "]");
        }
    }
};
function tnTreeBox(id, name, data, selected) {
    var obj = new _tnTreebox();
    obj.init(id, name, data, selected);
    obj.makeHtml();
};
