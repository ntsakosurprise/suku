function(sandbox) Error{
	
	this.sb = sandbox
	
}

Error.prototype.init = function(){
	
	 
	 this.listens()
	 
	
}


Error.prototype.listens = function(){
	
	var sb = this.sb 
	sb.sb_notifyListen({
		
		 'render-error' : this.handleErrorOccured.bind(this),
		 
		
	})
}

Error.prototype.emit = function(eNotifs){
	
	var sb = this.sb 
	
	
		
		    sb.sb_notifyEvent({
		
		      type: eNotifs.type,
		      data: eNotifs.data
		
	     })
		

}

Error.prototype.handleErrorOccured = function(evInfo){
	
	var sb = this.sb 
	
	 
	  this.emit({type: 'render-error',data: data })
	
}

Error.prototype.handleMessengerDone = function(eventInfo){
	  
	  
	  this.messengerDone(eventInfo)

}