!function(i){var o={};function n(e){if(o[e])return o[e].exports;var t=o[e]={i:e,l:!1,exports:{}};return i[e].call(t.exports,t,t.exports,n),t.l=!0,t.exports}n.m=i,n.c=o,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(i,o,function(e){return t[e]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,i){"use strict";i.r(t);window.vlPlayer=function(e){var l,i,o,a,s,r,g={},p=25,u=e.brandLogo,n="//assets."+e.baseDomain+"/plugins/vlPlayer",c=function(){s.querySelector(".videoAdUiSkipContainer").addEventListener("click",function(){g.hidden()})},t=function(){var e=(s=k()).getElementById(r);e.appendChild(S()),o=s.getElementById("viVideoContent"),google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.INSECURE),google.ima.settings.setDisableCustomPlaybackForIOS10Plus(!0),google.ima.settings.setNumRedirects(5),(i=new google.ima.AdDisplayContainer(e,o)).initialize(),v(),d(e)},d=function(e){if("outstream"==g.type&&!g.volumeControl){document.body.addEventListener("click",function e(){g.issetClick=!0,document.body.removeEventListener("click",e)}),e.addEventListener("mouseover",function(){1==g.issetClick&&l&&l.setVolume(1)}),e.addEventListener("mouseout",function(){l&&l.setVolume(0)})}if(g.volumeControl){var t=s.getElementById("vi_toggleVolume");t.addEventListener("click",function(){0==l.getVolume()?(l.setVolume(1),t.classList.remove("sound_off"),t.classList.add("sound_on")):(l.setVolume(0),t.classList.remove("sound_on"),t.classList.add("sound_off")),g.adsVolumeChange(l.getVolume())})}},v=function(){var e=new google.ima.AdsRequest;e.forceNonLinearFullSlot=!0,e.vastLoadTimeout=g.vastLoadTimeout,e.adTagUrl=g.vastUrl,e.adsResponse=g.vastXML,e.linearAdSlotWidth=g.adWidth,e.linearAdSlotHeight=g.adHeight-p,e.nonLinearAdSlotWidth=g.adWidth,e.nonLinearAdSlotHeight=g.adHeight-p;var t=new google.ima.AdsLoader(i);t.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,m,!1),t.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR,b,!1),e.setAdWillAutoPlay(!1),e.setAdWillPlayMuted(0===g.defaultVolume),t.requestAds(e)},m=function(e){var t=new google.ima.AdsRenderingSettings;t.loadVideoTimeout=g.loadVideoTimeout,(l=e.getAdsManager(o,t)).setVolume(g.defaultVolume),l.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR,b),l.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,E),l.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,A),l.addEventListener(google.ima.AdEvent.Type.ALL_ADS_COMPLETED,x),l.addEventListener(google.ima.AdEvent.Type.LOADED,y),l.addEventListener(google.ima.AdEvent.Type.STARTED,y),l.addEventListener(google.ima.AdEvent.Type.COMPLETE,h),l.addEventListener(google.ima.AdEvent.Type.IMPRESSION,f);try{l.init(g.adWidth,g.adHeight-p,google.ima.ViewMode.NORMAL),l.start()}catch(e){b(e)}},f=function(){g.impression()},y=function(e){var t=e.getAd();switch(e.type){case google.ima.AdEvent.Type.LOADED:var i=s.getElementById("vlMessage");if(t.getSkipTimeOffset()<0&&"outstream"!=g.type){var o=s.querySelector("#vi_adwrapper"),n=document.createElement("div");n.innerHTML='<div class="videoAdUi" style="pointer-events: auto; cursor: pointer; z-index: 9998; position: absolute; right: 1px; bottom: 20px; background: rgb(0, 0, 0); display: block; padding: 0px; margin: 0px;"><div class="videoAdUiTopBar videoAdUiTopBarWithGradients" style="display: block;"></div><div class="videoAdUiBottomBar"><div class="videoAdUiSkipWidgetV2 noTextSkipButton raisedSkipButton"><div class="videoAdUiPreSkipContainer" style="opacity: 0.9;"><div class="videoAdUiPreSkipButton" tabindex="0"><div class="videoAdUiPreSkipText" style="opacity: 0.9; padding: 12px 15px; color: #fff; text-align: center; font-size: 14px;min-width:16px;cursor: default; font-family: Arial" aria-label="Skip Ad Countdown">5</div></div></div><div class="videoAdUiSkipContainer html5-stop-propagation" style="display:none;"><button style="cursor: pointer;min-width: 180px; border: 1px solid #ccc; padding: 10px 15px; color: #fff; background-color: #000;" class="videoAdUiSkipButton videoAdUiAction videoAdUiRedesignedSkipButton" aria-label="Skip Ad"><div class="videoAdUiSkipButtonExperimentalText" style="display:inline-block; font-size:18px;">Skip Ad</div><div class="videoAdUiSkipIcon" style="display:inline-block"><svg xmlns="http://www.w3.org/2000/svg" fill="white" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1.4rem" height="1.4rem" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);margin-bottom: -0.3rem" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M16 18h2V6h-2M6 18l8.5-6L6 6v12z"></path></svg></div></button></div></div></div></div><style>@media only screen and (max-width: 576px){.videoAdUiPreSkipText{font-size: 11px !important;padding:12px !important} .videoAdUiSkipButtonExperimentalText{font-size: 16px !important;} .videoAdUiSkipIcon svg{width: 1.2rem !important; height: 1.2rem !important;} .videoAdUiSkipButton{padding: 10px !important; min-width: 120px !important;}}</style>',o.appendChild(n),function(){var e=s.querySelector(".videoAdUiSkipContainer"),t=s.querySelector(".videoAdUiPreSkipText");if(t){var i=5;t.innerHTML=i;var o=setInterval(function(){i<=1?(t.style.display="none",t.style.opacity="0",e.style.display="block",clearInterval(o)):(i--,t.innerHTML=i)},1e3)}c()}()}i&&(i.style.display="block");break;case google.ima.AdEvent.Type.STARTED:if("instreamBanner"==g.type&&l.setVolume(g.defaultVolume),w(),g.start(),"instream"!=g.type)return;if(t.isLinear()){s.getElementById("vlMessageBox").style.display="none";var d=s.createElement("div");d.setAttribute("style","position:absolute;height:25px;background:#e5bb00;width:0%"),d.setAttribute("id","progress"),s.getElementById("vlMessage").appendChild(d);var r=l.getRemainingTime(),a=function(o){var e,t,i,n;i=n=t=0;var d={time:r,stepPerSecond:20,bgCorver:"#002b50",bgMain:"#009cff"};function a(e){var t,i;i="#progress",(t=o.querySelector(i))&&(t.style.width=e+"%")}function l(){++t>i?clearTimeout(e):(a(t*n),e=setTimeout(l,1e3/d.stepPerSecond))}return{init:function(e){var t;t=e,d=Object.assign(d,t),i=d.time*d.stepPerSecond,n=100/i},run:function(){l()}}}(s);a.init({time:r,stepPerSecond:20}),a.run()}}},h=function(){g.complete()},x=function(){},b=function(e){g.error(e.getError().getErrorCode()),l&&l.destroy()},E=function(){},A=function(){g.hidden()},w=function(){a.style.background="#000",g.volumeControl&&(s.getElementById("vi_toggleVolume").style.display="block")},k=function(){var e=new Date;a=g.adElement?g.adElement:document.getElementById(g.divID);var t="ifr_"+g.type+"_"+e.getTime(),i='<iframe id="'+t+'" SRC="about:blank" FRAMEBORDER="0" SCROLLING="no" MARGINHEIGHT="0" MARGINWIDTH="0" TOPMARGIN="0" LEFTMARGIN="0" ALLOWTRANSPARENCY="true" style="border: 0px; vertical-align: bottom;width:100%;height:100%"></iframe>';a.style.cssText="z-index: 9998; position: absolute; width: 100%; height: 100%; top: 0; left: 0; background: "+("instream"===g.type?"#000":"transparent")+"; display:block;padding:0;margin:0",a.innerHTML=i;var o=a.querySelector("#"+t),n=o.contentWindow||o.contentDocument;n.document&&(n=n.document),g.adWidth=g.adWidth?g.adWidth:a.offsetWidth,g.adHeight=g.adHeight?g.adHeight:a.offsetHeight;var d="<style>#vi_adwrapper{position:relative;width:100%;height:"+(g.adHeight-p)+"px;display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex;-ms-flex-pack:center;-webkit-justify-content:center;justify-content:center;-ms-flex-align:center;-webkit-align-items:center;align-items:center}#vlMessage{position:relative;height:"+p+'px;display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-webkit-flex;display:flex;-ms-flex-align:center;-webkit-align-items:center;align-items:center;width:100%;border-top:1px solid #aaa;background:#000}#vlMessageBox{padding-left:5px;color:#999;font-family:Arial;font-size:10pt}#vlueimpression{position:absolute;z-index:10;top:2px;right:0;background-image:url("//'+u+'");background-repeat:no-repeat;width:85px;height:22px;background-size:82px}#vi_toggleVolume{position:absolute;z-index:9999; left:10px;bottom:6px;cursor:pointer}.sound_on .vi__muted{display:none}.sound_off .vi__volume{display:none}</style>';return d+='<div id="vi_adwrapper">',d+='<div id="'+r+'" style="width:100%;height:100%"></div>',g.volumeControl&&(d+='<div id="vi_toggleVolume" class="'+(0===g.defaultVolume?"sound_off":"sound_on")+'" style="display: none">',d+='<div class="vi__muted"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="1.3em" height="1.3em" viewBox="0 0 124.625 124.625" style="enable-background:new 0 0 124.625 124.625;" xml:space="preserve"> <g> <path d="M6,92.404h23.1l25.6,19.3c4,3,9.601,0.2,9.601-4.8v-89.2c0-4.9-5.701-7.8-9.601-4.8l-25.6,19.3H6c-3.3,0-6,2.7-6,6v48.301 C0,89.704,2.7,92.404,6,92.404z" fill="#dddddd"></path> <path d="M122.4,40.604c-2.7-2.7-7.2-2.7-9.9,0l-11.8,11.8l-11.8-11.8c-2.7-2.7-7.2-2.7-9.9,0c-2.699,2.7-2.699,7.2,0,9.9 l11.801,11.8L79,74.104c-2.699,2.7-2.699,7.2,0,9.9c1.4,1.399,3.2,2.1,5,2.1c1.801,0,3.6-0.7,5-2.1l11.801-11.801L112.6,84.004 c1.4,1.399,3.201,2.1,5,2.1c1.801,0,3.601-0.7,5-2.1c2.701-2.7,2.701-7.2,0-9.9l-12-11.8l11.801-11.8 C125.1,47.804,125.1,43.304,122.4,40.604z" fill="#dddddd"></path> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg></div>',d+='<div class="vi__volume"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="1.3em" height="1.3em" viewBox="0 0 115.3 115.3" style="enable-background:new 0 0 115.3 115.3;" xml:space="preserve"> <g> <path d="M47.9,14.306L26,30.706H6c-3.3,0-6,2.7-6,6v41.8c0,3.301,2.7,6,6,6h20l21.9,16.4c4,3,9.6,0.2,9.6-4.8v-77 C57.5,14.106,51.8,11.306,47.9,14.306z" fill="#dddddd"></path> <path d="M77.3,24.106c-2.7-2.7-7.2-2.7-9.899,0c-2.7,2.7-2.7,7.2,0,9.9c13,13,13,34.101,0,47.101c-2.7,2.7-2.7,7.2,0,9.899 c1.399,1.4,3.199,2,4.899,2s3.601-0.699,4.9-2.1C95.8,72.606,95.8,42.606,77.3,24.106z" fill="#dddddd"></path> <path d="M85.1,8.406c-2.699,2.7-2.699,7.2,0,9.9c10.5,10.5,16.301,24.4,16.301,39.3s-5.801,28.8-16.301,39.3 c-2.699,2.7-2.699,7.2,0,9.9c1.4,1.399,3.2,2.1,4.9,2.1c1.8,0,3.6-0.7,4.9-2c13.1-13.1,20.399-30.6,20.399-49.2 c0-18.6-7.2-36-20.399-49.2C92.3,5.706,87.9,5.706,85.1,8.406z" fill="#dddddd"></path> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg></div>',d+="</div>"),d+="</div>","instream"===g.type&&(d+='<div id="vlMessage" style="display: none;">',d+="<div id='vlMessageBox'>"+g.loadingText+"</div><div id='vlueimpression'></div>",d+="</div>"),n.open(),n.write(d),n.close(),n},S=function(){var e=s.createElement("video"),t=s.createElement("source");t.type="video/mp4",t.src=n+"/static/vid.mp4",e.appendChild(t);var i=s.createElement("source");i.type="video/webm",i.src=n+"/static/vid.webm",e.appendChild(i);var o=s.createElement("source");return o.type="video/ogg",o.src=n+"/static/vid.ogv",e.appendChild(o),e.setAttribute("style","position: absolute;z-index: -1;width: 100%;height: 100%;display:none"),e.setAttribute("id","viVideoContent"),e.setAttribute("playsinline",""),e};return{play:function(e){if(g.type=e.type||"instream",g.vastUrl=e.vastUrl||null,g.vastXML=e.vastXML||null,g.adWidth=e.adWidth||null,g.adHeight=e.adHeight||null,g.divID=e.divID||null,g.adElement=e.adElement||null,g.issetClick=e.issetClick||null,g.loadingText=e.loadingText||null,g.start=e.start||function(){},g.complete=e.complete||function(){},g.error=e.error||function(){},g.impression=e.impression||function(){},g.hidden=e.hidden||function(){},g.volumeControl=e.volumeControl||!1,g.vastLoadTimeout=e.vastLoadTimeout||2e4,g.loadVideoTimeout=e.loadVideoTimeout||6e4,g.adsVolumeChange=e.adsVolumeChange||function(){},(g.vastUrl||g.vastXML)&&(g.divID||g.adElement)){switch(g.type){case"instream":g.defaultVolume=void 0!==e.volume?e.volume:1,r="vlAdcontainer_instream";break;case"outstream":p=0,g.defaultVolume=void 0!==e.volume?e.volume:0,r="vlAdcontainer_outstream";break;case"instreamBanner":p=0,g.defaultVolume=void 0!==e.volume?e.volume:0,r="vlAdcontainer_instreamBanner"}return t(),{pause:function(){l&&l.pause()},resume:function(){l&&l.resume()},resize:function(e,t,i){i="FULLSCREEN"==i?google.ima.ViewMode.FULLSCREEN:google.ima.ViewMode.NORMAL,l&&l.resize(e,t,i),s&&(s.getElementById("vi_adwrapper").style.height=t+"px")},skip:function(){l&&l.skip()},setVolume:function(e){l&&l.setVolume(e)}}}}}}}]);