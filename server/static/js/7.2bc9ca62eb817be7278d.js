webpackJsonp([7],{JtKa:function(t,e){},lO7g:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n("SVz2"),l={name:"Home",components:{Header:n("GgDs").a},data:function(){return{userinfo:{},sysName:"中医妇科临床流调数据中心",collapsed:!0}},methods:{logout:function(){var t=this;this.$confirm("确认退出吗?","提示",{type:"warning"}).then(function(){t.$router.push("/login")}).catch(function(){})},collapse:function(){this.collapsed=!this.collapsed},enterPrj:function(t,e){var n=this;console.log(e.linkurl);var l={linkurl:e.linkurl};Object(r.d)(l).then(function(t){n.$router.push(e.linkurl+"table")}).catch()}},created:function(){this.userinfo=JSON.parse(sessionStorage.getItem("userinfo"))}},o={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-row",{staticClass:"container"},[n("Header",{on:{headerEvent:function(e){return t.collapsed=e}}}),t._v(" "),n("el-col",{attrs:{span:23}},[n("el-table",{staticStyle:{width:"100%"},attrs:{data:t.userinfo.myprojects,"highlight-current-row":"",border:""}},[n("el-table-column",{attrs:{prop:"name",label:"项目名称"}}),t._v(" "),n("el-table-column",{attrs:{prop:"status",label:"状态"}}),t._v(" "),n("el-table-column",{attrs:{prop:"linkurl",label:"进入项目"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"btn-info",size:"small"},on:{click:function(n){return t.enterPrj(e.$index,e.row)}}},[t._v("进入")])]}}])}),t._v(" "),n("el-table-column",{attrs:{prop:"description",label:"项目描述"}})],1)],1)],1)},staticRenderFns:[]};var a=n("C7Lr")(l,o,!1,function(t){n("JtKa")},"data-v-72e24d42",null);e.default=a.exports}});
//# sourceMappingURL=7.2bc9ca62eb817be7278d.js.map