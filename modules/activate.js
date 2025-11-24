

function processModules(modulesList){



	var appCore = new CORE(),
		appSandbox = new SANDBOX(appCore),


	modulesList = modulesList;


	for(var modu=0; modu < modulesList.length; ++ modu){


				var moduId = modulesList[modu].name.toLowerCase();
				var modulesObj = SUKU.getAllBy_attribute('data-'+moduId);

				

					


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


					}

					

				
					


				}// End of module existence test on a given context(page)*/

				


	}// End of for loop statement




}// End of process modules function





