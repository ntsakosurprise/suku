function Navigata(sandbox){this.sb = sandbox}

 Navigata.prototype.init = function(){

	

	var links = this.getLinks()

}

Navigata.prototype.getLinks = function(){

	 var sb = this.sb

	 var links = sb.sb_getByAttribute('data-navigata')
	 console.log('The Links object')
	 console.log(links)

	
	
		for(var i = 0;i < links.length;i++){

			console.log('The element attribute')
			var attribs = sb.sb_getByAttributes(links[i])
			console.log(attribs)


		}
		
	 
}

Navigata.prototype.AddLinkEvents = function(product,sb){

	 
	 
}

 

Navigata.prototype.openLink = function(product,sb){

	 
	 
}

 