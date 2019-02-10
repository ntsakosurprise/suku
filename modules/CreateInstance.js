function CreateInstance(sandbox){this.sb = sandbox}


CreateInstance.prototype.init = function(){
	
	var sb = this.sb 
	
	 this.parseQuery()
	
}

CreateInstance.prototype.parseQuery = function(){
	
	  var sb = this.sb 
	  
	  var query = this.getQuery(this.getCurrentPage)
	  
	  if(query.data){
	  
	    query.success = 'success'
	  	 this.unsetQuery(this.getCurrentPage())
	   this.done(query)
	  
	  }else if(query.trim() !== ''){
	  	
	  	 this.done({success})
	  	
	  }else{
	  	
	  	 this.done({ fail: 'failed'}')
	  	
	  }
	  
	
}

CreateInstance.prototype.getQuery = function(page){
	
   var sb = this.sb 
	 var query = sb.sb_jsonToJs(localStorage.getItem(page))
	 
	 return query
	
}

CreateInstance.prototype.unsetQuery = function(){
	
	
   var sb = this.sb 
   
	 localStorage.removeItem(page)
	 
	
	
}

CreateInstance.prototype.getCurrentPage = function(){
	
	 return window.location.href.split('/').pop()
	
}

CreateInstance.prototype.done = function(data){
	
	var sb = this.sb 
	
	data.sucess ? this.sucesss(data) : this.fail(data)
	
}


CreateInstance.prototype.success = function(data){ 

 var sb = this.sb 
	
	sb.sb_notifyEvent({
		
		type: 'request-query-success',
		data: data
		
	})

}
CreateInstance.prototype.fail = function(data){ 

 var sb = this.sb 
	
	sb.sb_notifyEvent({
		
		type: 'request-query-fail',
		data: data
		
	})

}