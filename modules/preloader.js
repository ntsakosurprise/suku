function Preloader(sandbox) {
	
	this.sb = sandbox
	
}

Preloader.prototype.init = function(){
	
	 this.runPreloader()
	 this.listens()
	
}

Preloader.prototype.runPreloader = function(){
	
	var sb = this.sb 
	
	console.log('The preloader is running')
	sb.sb_toggleClass(sb.view,'d-none')
	
}

Preloader.prototype.listens = function(){
	
	var sb = this.sb 
	sb.sb_notifyListen({
		
		 'stop-preloader' : this.handleStopPreloader.bind(this)
		
	})
}

Preloader.prototype.stopPreloader = function(){
	
	var sb = this.sb 
	
	sb.sb_toggleClass(sb.view,'d-none')
	
}

Preloader.protoype.handleStopPrelaoder = function(eventInfo){
	  
	  this.stopPreloader()
	
}