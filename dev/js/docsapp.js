define(["jquery","underscore","backbone","mockup-registry"],function(a,b,c,d){var e=c.Model.extend({defaults:{title:"",description:""},initialize:function(){if(this.set("content",this.getContent()),this.get("attributes")){var a=new g;a.add(this.get("attributes")),this.set("attributes",a)}},getContent:function(){return a("#page_"+this.get("id")).html()}}),f=c.Model.extend({defaults:{attribute:"",type:"",description:"",defaultValue:""},initialize:function(){if(this.get("attributes")){var a=new g;a.add(this.get("attributes")),this.set("attributes",a)}}}),g=c.Collection.extend({model:f}),h=c.Collection.extend({model:e,comparater:function(a){return a.get("title")}}),i=c.View.extend({tagName:"tr",tpl:a("#tpl_attribute").html(),render:function(){var c=this,d="",e={};return c.model.get("attributes")&&(d=a("<div />").append(new j({model:c.model.get("attributes")}).render().$el).html()),e.attrs=d,c.$el.html(b.template(c.tpl,b.extend(e,c.model.toJSON()))),c}}),j=c.View.extend({tagName:"table",className:"table",tpl:a("#tpl_attributes").html(),render:function(){return this.$el.html(b.template(this.tpl,{})),b.each(this.model.models,function(a){var b=new i({model:a});this.$el.find("> tbody").append(b.render().$el)},this),this}}),k=c.View.extend({initialize:function(){this.exampleClass="example-"+this.model.get("id"),this.$examples=a("script."+this.exampleClass)},renderExamples:function(){var c=a("#tpl_example").html(),d="",e=this.buildExamples();return b.each(e,function(a){d+=b.template(c,a)},this),d},buildExamples:function(){var c=this,d=[];return c.$examples.each(function(){var c={title:""};c.html=a(this).html(),c.pre=b.escape(c.html),void 0!==a(this).data().title&&(c.title=a(this).data().title),d.push(c)}),d},render:function(){var c=this,e=a("#tpl_pattern").html(),f=["mockup-patterns-"+c.model.get("id")],g=c.model.get("extras");if(g)for(var h=0;h<g.length;h+=1)f.push("mockup-patterns-"+g[h]);return require(f,function(){c.$el.html(b.template(e,b.extend({examples:c.renderExamples()},c.model.toJSON()))),c.model.get("attributes")&&a(".docs-attributes",c.$el).append(new j({model:c.model.get("attributes")}).render().$el),d.scan(c.$el)}),this}}),l=c.View.extend({className:"media",tpl:a("#tpl_patterns_list_item").html(),render:function(){return this.$el.html(b.template(this.tpl,this.model.toJSON())),this}}),m=c.View.extend({className:"docs-patterns",tpl:a("#tpl_patterns_list").html(),children:[],render:function(){return this.$el.html(b.template(this.tpl,{})),b.each(this.model.models,function(a){var b=new l({model:a});this.children.push(b),this.$el.append(b.render().$el)},this),this},remove:function(){b.each(this.children,function(a){a.remove()}),c.View.prototype.remove.apply(this)}}),n=c.View.extend({render:function(){var c=this,e=a("#tpl_page").html(),f=c.model.toJSON(),g=[];return a.isArray(f.requiredPatterns)&&f.requiredPatterns.length>0&&a.each(f.requiredPatterns,function(a,b){g.push("mockup-patterns-"+b)}),require(g,function(){c.$el.html(b.template(e,f)),d.scan(c.$el)}),this}});App={patterns:new h,pages:new h,initialize:function(){return this.detectUrl(),c.history.start({pushState:!1,root:App.urlRoot}),App},show:function(b){void 0!==this.view&&(this.view.remove(),delete this.view),this.view=b,a("#content").html(this.view.render().$el)},detectUrl:function(){var a=window.location.pathname.split("/"),c="";this.urlRoot||(b.each(a,function(b,d){d<a.length-1&&(c+=b+"/")}),this.urlRoot=c+"index.html")}};var o=c.Router.extend({routes:{"patterns/(:id)":"pattern",patterns:"patterns","":"patterns",":id":"page"},patterns:function(){var a=new m({model:App.patterns});App.show(a)},page:function(a){this.resolve("page",App.pages,a)},pattern:function(a){this.resolve("pattern",App.patterns,a)},resolve:function(a,b,c){var d;d=c?c:"";var e=b.get(d);if(e){var f;f="page"===a?new n({model:e}):new k({model:e}),App.show(f)}}});return b.extend(App,c.Events),App.router=new o,App});