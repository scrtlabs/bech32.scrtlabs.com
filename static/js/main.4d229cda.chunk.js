(this["webpackJsonpbech32-converter"]=this["webpackJsonpbech32-converter"]||[]).push([[0],{171:function(e,t,a){e.exports=a(300)},176:function(e,t,a){},178:function(e,t,a){},300:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(35),c=a.n(r),l=(a(176),a(159)),s=a(139),i=a(140),u=a(158),h=a(160),d=a(314),m=a(312),p=a(313),v=a(37),g=a(20),f=a.n(g),w=(a(177),a(178),function(e){Object(h.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).state={input:"",from:"",to:""},n}return Object(i.a)(a,[{key:"render",value:function(){var e=this,t=function(e){e=e||"enigma";try{return"Paste any text you want on the left side and it will be shown converted on the right side, for example:\n"+JSON.stringify({wallet:f.a.encode(e,f.a.decode("enigma1pnsceh64jyrsfwjd2k865eetmsgg5grw8sma87").words),valoper:f.a.encode("".concat(e,"valoper"),f.a.decode("enigmavaloper1qx5pppsfrqwlnmxj7prpx8rysxm2u5vzqwv3ly").words),pub:f.a.encode("".concat(e,"pub"),f.a.decode("enigmapub1addwnpepqgauy23vhvvr8uezgczuzh7lj64r9ahd4vsshz5fksezk5lw5k6swjskux6").words),valconspub:f.a.encode("".concat(e,"valconspub"),f.a.decode("enigmavalconspub1zcjduepqj7ygd0gulz2qa03hgzf3ye40pmeyen2z64xjvpkw8mfhuu7j2vcqk6lgcu").words)},null,4)}catch(t){return t.message}}(this.state.from);return o.a.createElement("div",null,o.a.createElement(d.a,{style:{display:"flex",height:"4em"}},o.a.createElement(m.a,{value:this.state.from,placeholder:"convert from prefix: enigma",style:{padding:"0.4%",flex:1},onChange:function(t,a){var n=a.value;return e.setState({from:n.toLowerCase()})}}),o.a.createElement(m.a,{value:this.state.to,placeholder:"convert to prefix: secret",style:{padding:"0.4%",flex:1},onChange:function(t,a){var n=a.value;return e.setState({to:n.toLowerCase()})}})),o.a.createElement(d.a,{style:{display:"flex",height:"calc(100vh - (4em + 1.35em))"}},o.a.createElement(p.a,{onChange:function(t,a){var n=a.value;return e.setState({input:n})},placeholder:t,style:{margin:"0.2% 0.4% 0.6% 0.4%",resize:"none"}}),o.a.createElement(p.a,{value:y(this.state.input,this.state.from,this.state.to),placeholder:y(t,this.state.from,this.state.to),style:{margin:"0.2% 0.4% 0.6% 0.4%",resize:"none"}})),o.a.createElement("div",{style:{height:"1.35em",width:"100%",backgroundColor:"#e7e7e7",color:"black",textAlign:"center",position:"fixed",left:0,bottom:0}},"Made with ",o.a.createElement(v.a,{style:{color:"red"},name:"heart"}),"by Team Enigma"," ",o.a.createElement("a",{href:"https://github.com/enigmampc/bech32.enigma.co",target:"_blank",rel:"noopener noreferrer",style:{color:"black"}},o.a.createElement(v.a,{name:"github"}))))}}]),a}(o.a.Component)),b={};function y(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1?arguments[1]:void 0,a=arguments.length>2?arguments[2]:void 0;a=a||"secret",b[t=t||"enigma"]||(b[t]=new RegExp("".concat(t,"(pub|valoper|valoperpub|valcons|valconspub)?1[02-9ac-hj-np-z]{6,}\\b"),"g"));var n,o=b[t],r=e,c=e.match(o)||[],s=Object(l.a)(c);try{for(s.s();!(n=s.n()).done;){var i=n.value;try{var u=f.a.decode(i,1023),h=u.prefix.replace(t,a),d=f.a.encode(h,u.words,1023);r=r.replace(new RegExp(i,"g"),d)}catch(m){r=r.split(i).join("||| ".concat(i," ||| <-- ERROR CONVERTING THIS ADDRESS: ").concat(m.message)),console.error(m)}}}catch(p){s.e(p)}finally{s.f()}return r}var x=w;Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(x,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[171,1,2]]]);
//# sourceMappingURL=main.4d229cda.chunk.js.map