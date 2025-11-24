function(sandbox) Order{
	
	this.sb = sandbox
	
}

Order.prototype.init = function(){
	
	 
	 this.listens()
	 
	
}


Order.prototype.listens = function(){
	
	var sb = this.sb 
	sb.sb_notifyListen({
		
		 'process-Order' : this.handleOrderOccured.bind(this),
		 
		
	})
}

Order.prototype.emit = function(eNotifs){
	
	var sb = this.sb 
	
	
		
		    sb.sb_notifyEvent({
		
		      type: eNotifs.type,
		      data: eNotifs.data
		
	     })
		

}

Order.prototype.handleOrderOccured = function(evInfo){
	
	var sb = this.sb 
	
	 
	  this.emit({type: 'render-Order',data: data })
	
}

Order.prototype.handleMessengerDone = function(eventInfo){
	  
	  
	  this.messengerDone(eventInfo)

}