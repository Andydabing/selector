/**
 * Created by admin on 2016/11/23.
 */
var URL= "http://www.qcj168.com";

//获取省份
function getData(obj) {
    var defer=$.Deferred();
    $.ajax({
        url : URL + "/reputationBase/getProvinceV",
        type: 'get',
        success: function(res) {
            if(res.length){
                var str1='',
                    str2='',
                    str3='';
                for(var i=0 ;i<res.length; i++){
                    var area =res[i].dictareas;
                    if(area.length){
                        str1+=['<a href="javascript:;">'+res[i].firstWord+'</a>'].join('');
                        str2+=[
                            '<dl>',
                            '<dt>'+res[i].firstWord+'</dt>',
                            '</dl>'
                        ].join('');
                        for(var t=0 ;t<area.length ;t++){
                            str3+=['<dd data-letter="'+res[i].firstWord+'">',
                                '<a href="javascript:void(0);" onClick="getCity(\''+area[t].province+'\',$(this))">'+area[t].abbreviation+'</a>',
                                '</dd>'
                            ].join('')
                        }
                    }
                }
                str2+=['<dl class="lcl-hidden">'+str3+'</dl>'].join('');
                obj.parent().find('.tlt-en-select').html(str1).end().find('.tsc-scroll').eq(0).html(str2);
                defer.resolve()
            }
        }
    })
    return defer.promise()
}
//获取城市
function getCity(province,obj) {
    obj.parents('.selector-list').find('.tsc-scroll:eq(1)').html('');
    $.ajax({
        url : URL + "/reputationBase/getCityV",
        type: 'get',
        data:{province:province},
        success: function(res) {
            if(res.length){
                var str='';
                for(var i=0 ;i<res.length; i++){
                    var area =res[i].dictareas;
                    if(area.length){
                        str+=['<dl>',
                            '<dt>'+res[i].firstWord+'</dt>',
                            '</dl>'
                        ].join('');
                        for(var t=0 ;t<area.length ;t++){
                            str+=['<dl>',
                                '<dd>',
                                '<a href="javascript:void(0);" onClick="getDistrict('+area[t].code+',$(this))">'+area[t].abbreviation+'</a>',
                                '</dd>',
                                '</dl>'
                            ].join('')
                        }
                    }
                }
                obj.parents('.selector-list').find('.tsc-scroll').eq(1).html(str);
            }
        }
    })
}
//获取地区
function getDistrict(districtCode,obj) {
    obj.parents('.selector-list').find('.tsc-scroll:eq(2)').html('');
    $.ajax({
        url: URL + '/reputationBase/getDistrict',
        type: 'get',
        data: {code: districtCode},
        success: function (res) {
            if (res.length) {
                var str = '';
                for (var i = 0; i < res.length; i++) {
                    str+=['<dl>',
                        '<dd>',
                        '<a href="javascript:void(0);">'+res[i].abbreviation+'</a>',
                        '</dd>',
                        '</dl>'
                    ].join('')
                }
                obj.parents('.selector-list').find('.tsc-scroll').eq(2).html(str);
            }
        }
    })
}