(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{1012:function(t,e,n){var content=n(1073);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(143).default)("2a772f29",content,!0,{sourceMap:!1})},1072:function(t,e,n){"use strict";n(1012)},1073:function(t,e,n){var r=n(142)((function(i){return i[1]}));r.push([t.i,".continuous-values-card-body[data-v-5e448063]{height:300px;overflow-y:scroll;position:relative}",""]),r.locals={},t.exports=r},1081:function(t,e,n){"use strict";n.r(e);n(14),n(11),n(18),n(19),n(15);var r=n(3),o=(n(9),n(12),n(81));function c(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function l(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?c(Object(n),!0).forEach((function(e){Object(r.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var d={props:{activeCategory:{type:String,required:!0}},name:"ContinuousTable",data:function(){return{exampleFields:["preview","rawValue","missingValue"],uiText:{instructions:"Review the age harmonization",missingValueButton:"Mark as missing",saveButton:"Save Annotation",dropDownExplanationText:"Please select the format of age values in this column*"}}},computed:l({},Object(o.c)(["getHarmonizedPreview","getHeuristic","getColumnsForCategory","getTransformOptions","getUniqueValues"])),methods:l(l({},Object(o.d)(["changeMissingStatus","setHeuristic","updateAnnotationCount"])),{},{columnValidationItems:function(t){var e=this,n=this.getUniqueValues(this.activeCategory),r=[];return n[t].forEach((function(n){r.push({preview:e.getHarmonizedPreview(t,n),rawValue:n})})),r},selectHeuristic:function(t){var e=t.columnName,n=t.heuristic;this.setHeuristic({columnName:e,heuristic:n}),this.updateAnnotationCount()}})},f=(n(1072),n(114)),component=Object(f.a)(d,(function(){var t=this,e=t._self._c;return e("b-card",{staticClass:"annotation-card",attrs:{"no-body":""}},[e("b-card-header",[t._v(t._s(t.uiText.instructions))]),t._v(" "),e("b-card-body",{staticClass:"continuous-values-card-body"},[e("b-tabs",{attrs:{"content-class":"mt-3"}},t._l(t.getColumnsForCategory(t.activeCategory),(function(n,r){return e("b-tab",{key:n,attrs:{active:0===r,title:n}},[e("b-row",[e("b-col",{attrs:{cols:"8"}},[e("b-table",{attrs:{hover:"",striped:"",id:"annotation-table","data-cy":"dataTable-"+n,fields:t.exampleFields,items:t.columnValidationItems(n)},scopedSlots:t._u([{key:"cell(missingValue)",fn:function(r){return[e("b-button",{attrs:{"data-cy":"missingValueButton_"+r.index,variant:"danger"},on:{click:function(e){return t.changeMissingStatus({column:n,value:r.item.rawValue,markAsMissing:!0})}}},[t._v("\n                                    "+t._s(t.uiText.missingValueButton)+"\n                                ")])]}}],null,!0)})],1),t._v(" "),e("b-col",{attrs:{cols:"4"}},[t._v("\n                        "+t._s(t.uiText.dropDownExplanationText)+"\n                        "),e("br"),t._v(" "),e("v-select",{attrs:{placeholder:"Select the type of age","data-cy":"selectTransform_"+n,options:t.getTransformOptions(t.activeCategory),value:t.getHeuristic(n)},on:{input:function(e){return t.selectHeuristic({columnName:n,heuristic:e})}}})],1)],1)],1)})),1)],1)],1)}),[],!1,null,"5e448063",null);e.default=component.exports}}]);