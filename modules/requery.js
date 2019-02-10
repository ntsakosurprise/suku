 function Requery(sandbox){this.sb = sandbox; this.query = null}


Requery.prototype.init = function(){
	
	var sb = this.sb 
	
	this.listens()
	 this.parseQuery()
	
}

Requery.prototype.listens = function(){
	
	var sb = this.sb 
	sb.sb_notifyListen({
		
		 'get-component-name' : this.handleGetComponentName.bind(this)
		
	},sb.moduleMeta.moduleId,sb.moduleMeta.modInstId)
}

Requery.prototype.parseQuery = function(){
	
	  var sb = this.sb 
	  
	  var query = this.getQuery(this.getCurrentPage)
	  
	  if(query.data){
	  

		this.query = query
	    //query.success = 'success'
	  	this.unsetQuery(this.getCurrentPage())
	    //  this.done(query)
	  
	  }else{

		this.query = this.getCurrentPage()

	  }
	
}

Requery.prototype.getQuery = function(page){
	
   var sb = this.sb 
	 var query = sb.sb_jsonToJs(localStorage.getItem(page))
	 
	 return query
	
}

Requery.prototype.unsetQuery = function(){
	
	
   var sb = this.sb 
   localStorage.removeItem(page)
	 
	
}

Requery.prototype.getCurrentPage = function(){
	
	 return window.location.href.split('/').pop()
	
}

Requery.prototype.handleGetComponentName = function(data){
	
	this.getComponentName(data)
   
}

Requery.prototype.getComponentName = function(data){
	
	var query = this.query
	this.emit({type: 'take-component-name',data: query})
   
}



Requery.prototype.done = function(data){
	
	var sb = this.sb 
	
	data.sucess ? this.sucesss(data) : this.fail(data)
	
}


Requery.prototype.success = function(data){ 

 var sb = this.sb 
	
	sb.sb_notifyEvent({
		
		type: 'request-query-success',
		data: data
		
	})

}
Requery.prototype.fail = function(data){ 

 var sb = this.sb 
	
	sb.sb_notifyEvent({
		
		type: 'request-query-fail',
		data: data
		
	})

}