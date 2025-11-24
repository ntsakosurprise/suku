function Components(sandbox) {
	
	this.sb = sandbox
	this.componentname = ''
	
}

Components.prototype.init = function(){
	
	 this.listens()
	 this.emit({type:'get-component-name',data: ''})

}


Components.prototype.listens = function(){
	
	var sb = this.sb 
	var name = 'render-component-'+name
	sb.sb_notifyListen({
		
		 'request-query-success' : this.handleRQS.bind(this),
		  name : this.handleComponentRender.bind(this),
		  'take-component-name': this.handleTakeComponentName.bind(this),
		 'component-resource-creation-done': this.handleComponentCreationDone.bind(this)
		
	},sb.moduleMeta.moduleId,sb.moduleMeta.modInstId)
}

Components.prototype.emit = function(eNotifs){
	
      	var sb = this.sb 
	
		    sb.sb_notifyEvent({
		
		      type: eNotifs.type,
		      data: eNotifs.data
		
	     },)
		

}


Components.prototype.handleRQS = function(eventInfo){
	  
	  this.evt.data.name()
	
}

Render.prototype.handleTakeComponentName = function(data){
	
	var sb = this.sb 
	
	
	this.componentname = data.data
		

}

Render.prototype.handleComponentCreationDone = function(data){
	
	var sb = this.sb 
	
	sb.sb_appendChild(sb.view,data.data)
	this.emit({type:'stop-preloader',data:''})

}

Components.prototype.handleComponentRender = function(evt ){
	  
	  this.evt.data.name()
	  

}

Components.prototype.messenger = function(data){
	  
	  this.emit({type: 'retrieve-data',data: data })
	
}


Components.prototype.cart = function(){
	  
	  var sb = this.sb
	  var cart = sb.sb_jsonTojs(localStorage.cart)
	  
	  var ol = sb.sb_createElement('ul')
	
	  for(var p = 0; p < cart.length; p++){
	  	
	  	   var ol = sb.sb_createElement('li')
	  	   
	  	   ol.innerHTML = cart[p].producName 
	  	   
	  	   sb.sb_appendChild(ol,ul) 
	  	   this.messenger({
	  	   	
	  	   	  url: 'www.google.com',
	  	   	  data: 'adwords',
	  	   	  success: function(data){ 
	  	   	  
	  	   	    console.log(data)
	  	   	    	 this.emit({type: 'component-render-success',data: 'Your component has rendered'})
	  	   	   },
	  	   	    
	  	   	  fail: function(data){
	  	   	  	
	  	   	  	this.emit({
	  	   	  		
	  	   	  		type: 'log-error',
	  	   	  		data: data
	  	   	  		
	  	   	  	})
	  	   	  	
	  	   	  		 this.emit({type: 'component-render-fail',data: 'Your component has rendered'})
	  	   	  	  
	  	   	  }
	  	   	
	  	   	
	  	   })
	  	
	  }
	  
	 
	  
	 sb.sb_appendChild(sb.view,ul)

	 
	
}

Components.prototype.catalogue = function(){
	  
	var sb = this.sb

		var catlist = sb.sb_createElement('article')
		var menulist = sb.sb_createElement('article')
		var url = 'https://smarfoapi.herokuapp.com/smarfo/menu' 


		this.messenger({url: url,data:'data',success: success,fai: fail})
	


	// this.emit({type: 'create-list',data:{

	// 	type: 'regular',
	// 	image: true,
	// 	url: '/menu',
	// 	parent: catlist,
	// 	options: {

	// 	}
		
	// }})
	function success(data){

		this.emit({type: 'create-list',data:{

			type: 'regular',
			data: data,
			parent:  menulist
	
		}})

	}
	

	function fail(data){

		console.log('OH,GOOD GOD, THERE GOES A CATASTROPHIC FAIL')

	}
	
	
}

Components.prototype.dashboard = function(){
	  
	var sb = this.sb
	var menulist = sb.sb_createElement('article')
	var url = 'https://smarfoapi.herokuapp.com/smarfo/menu' 

	this.messenger({url: url,data:'data',success: success,fai: fail})



// this.emit({type: 'create-list',data:{

// 	type: 'regular',
// 	image: true,
// 	url: '/menu',
// 	parent: catlist,
// 	options: {

// 	}
	
// }})
function success(data){

	this.emit({type: 'create-list',data:{

		type: 'regular',
		data: data,
		parent:  menulist

	}})

}


function fail(data){

	console.log('OH,GOOD GOD, THERE GOES A CATASTROPHIC FAIL')

}




}