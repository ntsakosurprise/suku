

function processModules(componenetList){



	var appCore = new CORE(),
		appSandbox = new SANDBOX(appCore),


	modulesList = modulesList;


	for(var modu=0; modu < modulesList.length; ++ modu){


				var moduId = modulesList[modu].name.toLowerCase();
				var moduleObj = SUKU.getby_id(moduId);



				if(moduleObj != null){

					appCore.createModule(

						new modulesList[modu](appSandbox.create(moduId)),
						moduId

					);

				
					appCore.startModule(moduId);


				}// End of module existence test on a given context(page)*/

				


	}// End of for loop statement




}// End of process modules function





