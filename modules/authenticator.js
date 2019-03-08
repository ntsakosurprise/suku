function Authenticator (sandbox) {
	
	this.sb = sandbox
	
}

Authenticator.prototype.init = function(){
	
	 
	//  this.listens()
	//  this.emit({type: 'authenticator-component',data:''})

	this.checkAuthenticated()
	
}


Authenticator.prototype.listens = function(){
	
	var sb = this.sb 
	sb.sb_notifyListen({
		
		 'user-authenticated' : this.handleUserAuthenticates.bind(this),
		 
		
	})
}

Authenticator.prototype.emit = function(eNotifs){
	
		var sb = this.sb 
	
	
		
		    sb.sb_notifyEvent({
		
		      type: eNotifs.type,
		      data: eNotifs.data
		
	     })
		

}

Authenticator.prototype.checkAuthenticated = function(){
	
	var sb = this.sb 
	
	 if(localStorage.login){
	 	
	 	  var login = sb.sb_jsonToJs(localStorage.getItem('login'))
	 	 
	 	 if(!login.username){
	 	 	
	 	 	  this.redirect()
	 	 }
	 	 	 
	 	  
	 }else{
	 	 
	 	  this.redirect()
	 	
	 }
	
}

Authenticator.prototype.redirect = function(){
	  
	  
	  window.location.href = "login.html"

}

Authenticator.prototype.handleUserAuthenticated = function(eventInfo){
	  
	  this.messengerDone(eventInfo)

}