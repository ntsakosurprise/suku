function Modal(sandbox){
	
	this.sb = sandbox
	
}

Modal.prototype.init = function(){
	
	this.listens()
	
}


Modal.prototype.listens = function(){
	
	var sb = this.sb 
	sb.sb_notifyListen({ 
		
		
		 'create-modal': this.handleCreateModal.bind(this)
		 
	},sb.moduleMeta.moduleId,sb.moduleMeta.modInstId)
}

Modal.prototype.emit = function(eNotifs){
	
	var sb = this.sb 

	sb.sb_notifyEvent({
	
		type: eNotifs.type,
		data: eNotifs.data

		})
	

}



Modal.prototype.getParent = function(options){
			
   var sb = this.sb 
   

   var parent = sb.sb_createElement('article')
   sb.sb_addProperty(parent,'classs','modal')
   sb.sb_addProperty(parent,'data-modal','data')
//    if(options.opacity){
   	
//    	   switch(options.opacity){
   	   	
//    	   	  case 1: {
   	   	  	 
//    	   	  	 sb.sb_toggleClass(classList,'modal-op-bt')
   	   	  	
//    	   	  }
//    	   	  break
//    	   	   case 2: {
   	   	  	 
//    	   	  	 sb.sb_toggleClass(classList,'modal-op-bt')
   	   	  	
//    	   	  }
//    	   	  break
   	   	
//    	   }
   	
//    }
   
		return parent
		
	
}


Modal.prototype.createModalHead = function(){
			
			
   var sb = this.sb
   
   var head = sb.sb_createElement('div')
   var btn = sb.sb_createElement('span')
   sb.sb_addProperty(head,'classs','modal-head')
   sb.sb_addChild(head,btn)
  
  text ? 
   sb.sb_addProperty(btn,'classs','modal-close-btn'): sb.sb_addProperty(btn,'classs','modal-close-btn')
   
   
		return {head: head,open: btn}
		
	
}

Modal.prototype.createModalBody = function(content){
	
	 
	 var sb = this.sb
   
   var body = sb.sb_createElement('div')
   sb.sb_addProperty(body,'class','modal-body')
   sb.sb_addChild(body,options.content)
   sb.sb_addChild(body,content)
   
//    switch(options.size){
   	
//    	  case 1:{
   	  	
   	  	 
//    	  }
   	
//    }
	 
	 return body

	
}


Modal.prototype.createModalFoot = function(){
	
	 
	 var sb = this.sb
   
   var foot = sb.sb_createElement('div')
   var btn = sb.sb_createElement('span')
   sb.sb_addProperty(foot,'class','modal-head')
   sb.sb_addChild(foot,btn)
  
	 return {foot: foot,close: btn }

	
}




Modal.prototype.handleCreateModal = function(data){

	console.log('Create Modal event has occured')
	console.log(data)
	this.createModal(data)

}



Modal.prototype.createModal = function(data){

	var sb = this.sb


 var parent = this.getParent()
 if(data.head){ 
     
	var head = this.createModalHead()
	sb.sb_addChild(parent,head.head)
	
	sb.sb_addEvent(head.close,'click',this.closeModal.bind(this,parent))
	
 }
 
  if(data.foot){ 
     
	  var foot = this.createModalFoot()
	  sb.sb_addChild(parent,foot.foot)
	  sb.sb_addEvent(foot.close,'click',this.closeModal.bind(this,parent))
 }
 
	var body = this.createModalBody(data.body)
	
	sb.sb_addChild(parent,body)
	
	sb.sb_addEvent(window,'click',this.closeModal.bind(this,parent))
	sb.sb_addEvent(data.activator,'click',this.openModal.bind(this,parent))
	this.emit({type: 'component-resource-creation-done',data: parent})

}

Modal.prototype.openModal = function(data){

	var sb = this.sb

	sb.sb_toggleClass(data,'d-none')
 
}


Modal.prototype.closeModal = function(data){

	var sb = this.sb 
	
	if(ev.target === data.parent){
		
		sb.sb_toggleClass(data.parent,'d-none')
		
	}else{
		
		sb.sb_toggleClass(data.parent,'d-none')
	}
	
 

}
	

