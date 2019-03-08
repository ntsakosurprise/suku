

function SANDBOX(appCore){


	this.core = appCore;



}// End of SANDBOX

SANDBOX.prototype.create = function(moduleID,modInstId){

	var sb_core = this.core;

	// console.log('The value of Instance Id')
	// console.log(modInstId)

	if(modInstId){

		// console.log('The module has a view')

		var CONTAINER = this.core.dom.queryCont('data-'+moduleID, modInstId);
	
		var meta = {
			moduleId: moduleID,
			modInstId: modInstId
		}

		

	}else{

		// console.log('The module has no view')
		var meta = {
			moduleId: moduleID,
			modInstId: moduleID
		}

	}
	




	return {


			// DOM manipulations

			view: CONTAINER,
			moduleMeta: meta,

			sb_getChildById: function(selector){
					
					if(CONTAINER){

						return CONTAINER.queryChildById(selector);

					}
				



			},
			sb_getChildByClass: function(selector){
					
				if(CONTAINER){

					return CONTAINER.queryChildByClass(selector);
				}
			
					



			},


			sb_getAllChildByClass: function(selector){
					
					if(CONTAINER){

						return CONTAINER.queryAllChildByClass(selector);


					}
				


			},

			sb_getById: function(selector){
				
					
					return sb_core.dom.queryById(selector);



			},

			sb_getByTag: function(parent,selector){
				
					
				return sb_core.dom.queryByTag(parent,selector);



		},

			sb_getByAttribute: function(attrib){
				
					
				return sb_core.dom.queryByAttribute(attrib);



			},


			sb_getAllChildByAttribute: function(attrib){
					
					return CONTAINER.queryAllChildByAttribute(attrib);



			},

			sb_getChildByAttribute: function(attrib){
					
					return CONTAINER.queryChildByAttribute(attrib);



			},



			sb_getNodeType: function(node){
					
					

				return sb_core.dom.queryNodeType(node);



			},


			sb_createElement: function(selector){
					
					
				var el = sb_core.dom.createElement(selector);

				return el;


			},

			sb_copyDeep: function(el){
					
					
				var el = sb_core.dom.copyDeep(el);

				return el;


			},

			sb_copyShallow: function(el){
					
					
				var el = sb_core.dom.copyShallow(el);

				return el;


			},

			sb_addProperty: function(el,attrib,attribValue){


				sb_core.dom.addProperty(el,attrib,attribValue);

			},

			sb_removeProperty: function(el,attrib){


				sb_core.dom.removeProperty(el,attrib);

			},

			sb_insertInner: function(el,content){


				sb_core.dom.insertInner(el,content);

			},

			sb_addChild: function(parent,child){


				sb_core.dom.addChild(parent,child);


			},

			sb_getClasses: function(element){


				return sb_core.dom.getClasses(element);


			},

			sb_addClass: function(classlist,classname){


		 		sb_core.dom.addClass(classlist,classname);


			},

			sb_removeClass: function(classlist,classname){


				 sb_core.dom.removeClass(classlist,classname);


			},

			sb_toggleClass: function(classlist,classname){


				 sb_core.dom.toggleClass(classlist,classname);


			},

			sb_hasClass: function(classlist,classname){


				 return sb_core.dom.hasClass(classlist,classname);


			},

			sb_getStyles: function(element){


				 return sb_core.dom.getStyles(element);


			},

			sb_getAttributes: function(element){


				 return sb_core.dom.getAttributes(element);


			},

			sb_getParent: function(child){


				return sb_core.dom.getParent(child);


		   },





			// EVENTS manipulations

			sb_addEvent: function(el,ev,handler){
					
					
					sb_core.events.addEventHandler(el,ev,handler);



			},

			sb_removeEvent: function(el,ev,handler){
					
					
					sb_core.events.addEventHandler(el,ev,handler);


			},


			sb_getEvent: function(ev){


				return sb_core.events.getEvent(ev);


			},// End of addEventHandler() method

			sb_getTarget: function(ev){


				return sb_core.events.getTarget(ev);


			},// End of addEventHandler() method


			sb_preventNormal: function(ev){
					
					
					sb_core.events.preventNormal(ev);


			},

			sb_stopEventBubble: function(ev){
					
					
				sb_core.events.stopEventBubble(ev);


		},






			// AJAX communications
			


			sb_ajaxGet: function(url,data,success,failure,type){
					
					
				sb_core.ajax.get(url,data,success,failure,type);



			},

			sb_ajaxPost: function(url,data,success,failure,type){
					
					
				sb_core.ajax.post(url,data,success,failure,type);



			},


			// MODULE communications


			sb_notifyListen: function(evts,moduleID,modInstId){

				// console.log('The notifyListen event has been successfuly invoked')
				sb_core.registerEvents(evts,moduleID,modInstId);

			},// End of notifyListen() for events to listen to


			sb_notifyEvent: function(evt){

					// console.log('The notify event has been successfuly invoked')
					sb_core.triggerEvent(evt);





			},// end of notifyEvent() occurence

			sb_validate: function(data){


				var validateResult = sb_core.validator.validate(data);

				return validateResult;


			},

			sb_jsToJson: function(jsObject){


				return sb_core.converts.jsToJson(jsObject);
			},

			sb_jsonToJs: function(json){

				
				return sb_core.converts.jsonToJs(json);
			}


			
			
			




	}// End OF return



	

}// End of SANDBOX create() method

