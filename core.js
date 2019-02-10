



function CORE(){



	this.modules = {};


}// End of the CORE class



CORE.prototype.createModule = function(module,moduleId,modInstId){

	var modules = this.modules;


	if(Object.keys(modules).length > 0){



		for(mod in modules){

			//console.log(modules[mod]);

			if(mod === moduleId){

				
				 this.modules[moduleId][modInstId] = module;

			}else{



				this.modules[moduleId] = {};
				this.modules[moduleId][modInstId] = module;

			}


		}// End of for loop



	}else{


		this.modules[moduleId] = {};
		this.modules[moduleId][modInstId] = module;


	}// End of ifesleif test

	




}// End of store modules method

CORE.prototype.dom = {


	queryCont: function(contModId,contModInstId){

			
			var cont = {};
			

			
		
			var modViews = SUKU.getAllBy_attribute(contModId);

				for(var modV=0; modV < modViews.length; modV++){

					 var attribs = SUKU.get_element_attributes(modViews[modV]);


					 if(attribs.length > 0){


							for(var a=0; a < attribs.length; a++){

								var attName = attribs[a].name;

								if(attName === contModId){

									var attValue = attribs[a].value;

									if(attValue === contModInstId){


										cont = modViews[modV];
										break;
									}
								}

							}

						}// End of check attributes length if statement



				}



				
				cont.queryChildById = function(selector){


						return SUKU.getChildby_id(this,selector);



				}

				cont.queryChildByClass = function(selector){


						return SUKU.getChildby_class(this,selector);



				}

				cont.queryAllChildByClass = function(selector){


						return SUKU.getAllChildby_class(this,selector);



				}

				cont.queryChildByAttribute = function(attrib){


						return SUKU.getChildby_attribute(this,attrib);



				}

				cont.queryAllChildByAttribute = function(attrib){


						return SUKU.getAllChildby_attribute(this,attrib);



				}



			

			return cont;



	},// End of query container method


	createElement: function(selector){


		var el = SUKU.create_element(selector);

		return el;


	},


	queryById: function(selector){


			return SUKU.getby_id(selector);



	},

	queryByAttribute: function(attrib){


		return SUKU.getAllBy_attribute(attrib)



	},



	queryNodeType: function(node){

			var type_of_node = SUKU.get_type_of_node(node);

			return type_of_node;

	

	},

	addProperty: function(el,attrib,attribValue){


		SUKU.set_element_attribute(el,attrib,attribValue);


	},

	removeProperty: function(el,attrib){

		SUKU.remove_element_attribute(el,attrib);
	},

	insertInner: function(el,content){


		SUKU.insert_content_inner(el,content);


	},

	addChild: function(parent,child){


		SUKU.append_child(parent,child);


	},

	getClasses: function(element){


		return SUKU.get_class_list(element);


	},

	addClass: function(classlist,classname){


		 SUKU.add_class(classlist,classname);


	},

	removeClass: function(classlist,classname){


		 SUKU.remove_class(classlist,classname);


	},

	toggleClass: function(classlist,classname){


		 SUKU.toggle_class(classlist,classname);


	},

	hasClass: function(classlist,classname){


		 return SUKU.has_class(classlist,classname);


	},

	getStyles: function(element){


		 return SUKU.get_computed_styles(element);


	},

	getAttributes: function(element){


		 return SUKU.get_element_attributes(element);


	},
	getParent: function(child){


		return SUKU.get_parent(child);


   }













}; // End of CORE DOM MANIPULATION object

CORE.prototype.events = {


			addEventHandler: function(el,ev,handler){


				SUKU.ev_addHandler(el,ev,handler);


			},// End of addEventHandler() method

			removeEventHandler: function(el,ev,handler){


				SUKU.ev_removeHandler(el,ev,handler);


			},// End of addEventHandler() method

			getEvent: function(ev){


				return SUKU.getEvent(ev);


			},// End of addEventHandler() method

			getTarget: function(ev){


				return SUKU.getTarget(ev);


			},// End of addEventHandler() method

			preventNormal: function(ev){


				SUKU.preventDefault(ev);


			},// End of addEventHandler() method

			stopEventBubble: function(ev){


				SUKU.stopPropagation(ev);


			},// End of addEventHandler() method






};// End of CORE EVENTS manipulation object



CORE.prototype.ajax = {


			get: function(url,data,success,failure,type){



				SUKU.ajax_get(url,data,success,failure,type);



			},// End of ajax get() method

			post: function(url,data,success,failure,type){



				SUKU.ajax_post(url,data,success,failure,type);



			},// End of ajax post() method
		
		



};// End of CORE AJAX manipulation object



CORE.prototype.validator = {


	validate: function(data){


		var result = SUKU.validator(data);

		return result;

	}

}

/*

	The methods immediately after this method will be used for module inter communication, which is
	a way that modules communicate with each other indirectly.
	

*/

CORE.prototype.registerEvents = function(evts,module_id,mod_inst_id){


	if(evts && module_id && mod_inst_id){


		if(this.modules[module_id][mod_inst_id]){
			
			this.modules[module_id][mod_inst_id].events = evts;
			


		}


	}






}// End of registerEvents method


CORE.prototype.triggerEvent = function(evt){

	
	

	var moduId = null;

	if(evt){

		// console.log('Event contains data')
		for(moduId in this.modules){

			// console.log('Modules contains modules')

			if(this.modules.hasOwnProperty(moduId)){

				// console.log('given module belongs to modules object')
				moduId = this.modules[moduId];

				for(modInst in moduId){

					// console.log('Instances of a given moduleS')
					// console.log(moduId[modInst].events.type)
					// console.log(evt.type)
					
					if(moduId[modInst].events && moduId[modInst].events[evt.type]){

						moduId[modInst].events[evt.type](evt.data);

					}// End of inner if statement


				}

			}


		}// End of for in statement

	}// End of outer evt object check






}// End of triggerEvent method


CORE.prototype.startModule = function(moduleId,modInstId){




		var moduleID = moduleId;

		if(this.modules[moduleID][modInstId]){


			this.modules[moduleID][modInstId].init();
		}

}// End of startModule() core method



CORE.prototype.startAllModules = function(){


	for(modu in this.modules){

		var modSuper = this.modules[mod];

		for(modInstId in modSuper){



			try{


				this.modules[modSuper][modInstId].init();


			}catch(e){


				console.log(e);


			}// End of try catch




		}

		
		


	}


}// End of startAllModules() core method


CORE.prototype.stopModule = function(moduleId,modInstId){


		var moduleID = moduleId;

		if(this.modules[moduleID][modInstId]){


			this.modules[moduleID][modInstId].destroy();
		}

}// End of stopModule() core method


CORE.prototype.stopAllModules = function(){


	for(modu in this.modules){


		var modSuper = this.modules[mod];

		for(modInstId in modSuper){



			try{


				this.modules[modSuper][modInstId].destroy();


			}catch(e){


				console.log(e);


			}// End of try catch




		}

		


	}


}// End of stopAllModules() core method



CORE.prototype.converts = {


		jsToJson: function(jsObject){


			return SUKU.js_to_json(jsObject);
		},

		jsonToJs: function(json){


			return SUKU.json_to_js(json);

		}




}






	

