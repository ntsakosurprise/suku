function Render(sandbox){
	
	this.sb = sandbox
	this.componentname = ''
	
}

Render.prototype.init = function(){
	
	 
	 this.listens()
	 this.emit({type:'get-component-name',data: ''})
	 this.emit({type: 'render-component-'+componentname,data: 'none' })
	
}


Render.prototype.listens = function(){
	
	var sb = this.sb 
	sb.sb_notifyListen({
		
		
		 'component-render-done': this.handleComponentRenderDone.bind(),
		 'take-component-name': this.handleTakeComponentName.bind(this)
		 
		
	})
}

Render.prototype.emit = function(eNotifs){
	
	var sb = this.sb 
	
	
		
		    sb.sb_notifyEvent({
		
		      type: eNotifs.type,
		      data: eNotifs.data
		
	     })
		
}

Render.prototype.handleTakeComponentName = function(data){
	
	var sb = this.sb 
	
	
	this.componentname = data.data
		

}





