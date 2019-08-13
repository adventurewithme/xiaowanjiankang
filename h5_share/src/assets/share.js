import axios from 'axios';

import wx from 'weixin-js-sdk';


// const pings = "http://ecosystemwan.com:8081";
const pings = "http://testh5.ecosystemwan.com";
var imgurls, titles, descs;

function weixinshare(imgurl, title, desc) {
    
    var href = window.location.href;
    imgurls = imgurl;
    titles = title;
    descs = desc;
    const that = this;
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    var params = new URLSearchParams();
    params.append('url', href)
    axios({
        method: 'post',
        url: process.env.NODE_ENV === "production"
            ? pings + "/share/v1/tool/shareinfo/"
            : "/share/v1/tool/shareinfo/",
        data: params
    })
        .then(res => {
            wxshare(res.data, "");
        });


}
function wxshare(data, url) {
    console.log(data,'data')
    var url = window.location.href; //分享的文章地址
    var appId = data.data.appid;
    var timestamp = data.data.timestamp;
    var nonceStr = data.data.nonceStr;
    var signature = data.data.signature;
    console.log(imgurls, titles, descs)
    console.log(appId, 'app')
    wx.config({
        beta: true,
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: appId, // 必填，公众号的唯一标识
        timestamp: timestamp, // 必填，生成签名的时间戳
        nonceStr: nonceStr, // 必填，生成签名的随机串
        signature: signature, // 必填，签名，见附录1
        // jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline']
    });

    wx.ready(function () {

        //分享朋友圈
        wx.onMenuShareTimeline({
            title: titles, // 分享标题
            desc: descs, // 分享描述
            link: window.location.href, // 分享链接
            imgUrl: imgurls, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        // 分享好友
        wx.onMenuShareAppMessage({
            title: titles, // 分享标题
            desc: descs, // 分享描述
            link: url, // 分享链接
            imgUrl: imgurls, // 分享图标
            type: "", // 分享类型,music、video或link，不填默认为link
            dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
    });
}
// var weixinshare = weixinshare();



export default weixinshare
// export default {weixinshare:weixinshare()}}}