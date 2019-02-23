

var activator = (function(){

	return {


				activate: function (){
						
					var pageModules = this.getPageModules(this.getCurrentPage(),this.getModules())
					this.build(pageModules)
				
				
				},// End of activate

				getPageModules: function(page,modules){
				
					
				
					for(modu in modules){
				
						if(modu === page){
				
							// console.log('The current page modules: '+ page)
							// console.log(modules[modu])
							return modules[modu]
						}
						
					}
				
				
				
				},

				getModules: function(){

					return {
				
						app: [Preloader,Requery,Messenger,Component,Render,List,Cart,Navigata],
						dashboard: [Preloader,Requery,Messenger,Component,Render,List,Cart,Navigata],
						menulist: [Preloader,Requery,Messenger,Component,Render,List,Cart,Navigata],
						detail: [Preloader,Requery,Messenger,Component,Render,List,Accordion,Modal,Cart,Navigata],
						bargain: [Preloader,Requery,Messenger,Component,Render,Accordion,Modal,Cart,Navigata],
						register: [Requery,Messenger,Render,Register],
						login: [Requery,Messenger,Render,Login],
						uprofile: [Preloader,Requery,Messenger,Component,Render]


					}
				},
				
				
				
				
				
				getCurrentPage: function(){
				
					return window.location.href.split('/').pop().split('.')[0]
				},
				
				
			

				build: function(modulesList){



					var appCore = new CORE(),
					appSandbox = new SANDBOX(appCore),
			
					
						modulesList = modulesList;
						
						for(var modu=0; modu < modulesList.length; ++ modu){
					
					
							this.createInstances(appCore,appSandbox,modulesList,modu)
					
					
						}// End of module existence test on a given context(page)*/
					
									
					
					
						
			



				}, // End of build

				createInstances: function(appCore,appSandbox,modulesList,modu){

				
					var moduId = modulesList[modu].name.toLowerCase();
					var modulesObj = SUKU.getAllBy_attribute('data-'+moduId);
					// console.log('The modulesobject')
					// console.log(modulesObj)			
					
					if(modulesObj.length !== 0){
										
					
					
						for(var mOb=0; mOb < modulesObj.length; mOb++){
	
							var attribs = SUKU.get_element_attributes(modulesObj[mOb]);
							var modInstId = '';
	
							if(attribs.length > 0){
	
	
								for(var a=0; a < attribs.length; a++){
	
									var attName = attribs[a].name;
	
									if(attName === 'data-'+moduId){
	
										var attValue = attribs[a].value;
	
										modInstId = attValue;
	
	
											
										break;
									}
	
								}
	
							}// End of check attributes length if statement
	
						
	
							
							appCore.createModule(
	
								new modulesList[modu](appSandbox.create(moduId,modInstId)),
								moduId,modInstId
	
							);
	
							appCore.startModule(moduId,modInstId);
	
	
						}// End of loop through module instances
	
						
	
					
						
	
	
					}else{

						   var modInstId = moduId
						   
						   console.log('Executing module without view')

							appCore.createModule(
		
								new modulesList[modu](appSandbox.create(moduId,null)),
								moduId,modInstId
	
							);
	
							appCore.startModule(moduId,modInstId);
	
	
					}



				}// End of createInstances

		
			
				
				
	}// End of return


})()




