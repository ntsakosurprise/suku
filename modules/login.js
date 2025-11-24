function Login(sandbox){
	
	this.sb = sandbox
	
}

Login.prototype.init = function(){
	
	 this.setUpLogin()
	
}

Login.prototype.emit = function(){
	
}

Login.prototype.messenger = function(data){
	
	this.emit({type: 'retrieve-data',data: data })
  
}


Login.prototype.setUpLogin = function(){
	
	 
	var sb = this.sb
	
	var loginT = sb.sb_getChildById('#login')
	
	sb.sb_addEvent(loginT,'click',this.handleLogin.bind(this))

	
}

Login.prototype.handleLogin = function(ev){
	
	 this.getLoginData()
	
	
}


Login.prototype.getLoginData = function(){
	
	var sb = this.sb
  
  var login = sb.sb_getChildById('#login-data')
  
   var loginData = {
   	
   	    username: login.user_name,
   	    password: login.password
   	
   }
   
   loginData = sb.sb_jsToJson(loginData)
   var url = 'http://localhost:3000/smarfo/login'

   success = this.sucess 
   fail = this.fail
   type = 'json'
   method = 'post'
   
   this.messenger({url: url,data:loginData,success: success.bind(this),fail: fail.bind(this),type: type,method:method})
   
	 
	
	
}


Login.prototype.sucess = function(data){
	
	var sb = this.sb 
	
	var response = sb.sb_jsonToJs(data)

	
	if(response.registered){
		
		console.log('Successful registration')
		this.setLogin(response)


	}else{
		
		// this.respondRegister(data)

		console.log('Register')
		console.log(data)
		console.log('An issue has occured')
		
	}
	
	 
	
}

Login.prototype.fail = function(data){
	
	var sb = this.sb 
	
  
	 
	  var resEl = sb.sb_getChildById('#response')
	  
	    resEl.innerHTML = 'An error occured,request could not be completed,please try again'
	    
	    // this.emit({type: 'log-error',data: data})
		

}

Login.prototype.redirect = function(){
	  
	  
	  window.location.href = "dashboard.html"

}

Login.prototype.setLogin = function(data){
	  
	  var login = {
	  	
	     	username: data.username
	  	
	  }
	  
	  localStorage.setItem('login',sb.sb_jsToJson(login))
	  this.redirect()


}


Login.prototype.respondLogin = function(data){
	  
	  
	  var resEl = sb.sb_getChildById('#response')
	  
	    resEl.innerHTML = data.message
	  	

}