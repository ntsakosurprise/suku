function Messenger(sandbox) {
	
	this.sb = sandbox
	
}

Messenger.prototype.init = function(){
	
	 
	 this.listens()
	
}

Messenger.prototype.send = function(url,data,success,fail){
	
	var sb = this.sb 
	
	sb.sb_ajaxPost(url,data,success,fail)
	
}

Messenger.prototype.listens = function(){
	
	var sb = this.sb 
	sb.sb_notifyListen({
		
		 'request-query-success' : this.handleRQS.bind(this),
		 'retrieve-data': this.handleRetrieveData.bind(this)
		
	},sb.moduleMeta.moduleId,sb.moduleMeta.modInstId)
}

Messenger.prototype.emit = function(eNotifs){
	
	var sb = this.sb 
	
	
		
		    sb.sb_notifyEvent({
		
		      type: eNotifs.type,
		      data: eNotifs.data
		
	     })
		

}

Messenger.prototype.formatRQ = function(evInfo){
	
	var sb = this.sb 
	
	var url = evInfo.url 
	if(evInfo.data.data){
		
		var data = evInfo.data.data 
		
		this.send(url,data,this.success,this.fail)
	}else{
		
		this.send(url,'',this.success,this.fail)
		
	}
	
}

Messenger.prototype.handleRQS = function(eventInfo){
	  
	  this.formatRQ(eventInfo)
	
}

Messenger.prototype.handleRetrieveData = function(data){
	  
	this.RetrieveData(data)
  
}

Messenger.prototype.RetrieveData = function(data){
	  
	this.formatRQ(data)
  
}


Messenger.prototype.success = function(data){
	  
	  this.emit({type: 'messenger-done',data: data })
	
}

Messenger.prototype.fail = function(data){
	  
	  this.emit({type: 'messenger-inturrupted ',data: data })
	
}