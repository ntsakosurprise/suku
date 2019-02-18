function Accordion(sandbox){
	
	this.sb = sandbox
	
}

Accordion.prototype.init = function(){
	
	this.listens()
	
}


Accordion.prototype.listens = function(){
	
	var sb = this.sb 
	sb.sb_notifyListens({
		
		
		 'create-accordion': this.handleCreateAccordion.bind(this)
		 
	},sb.moduleMeta.moduleId,sb.moduleMeta.modInstId)
}

Accordion.prototype.emit = function(eNotifs){
	
	var sb = this.sb 

	sb.sb_notifyEvent({
	
		type: eNotifs.type,
		data: eNotifs.data

		})
	

}

Accordion.prototype.getParent = function(){
			
			
   var sb = this.sb
   
   var parent = sb.sb_createElement('div')
   sb.sb_adProperty(parent,'class','accordion accordion--vt-size-fd-bt accordion--bg-secondary accordion--pos-rel accordion--hr-size-fl-md mg-bottom-fd-sm')
   
	return parent
		
	
}


Accordion.prototype.createBar = function(){
			
			
   var sb = this.sb
   
   var bar = sb.sb_createElement('div')
   sb.sb_adProperty(bar,'class','accordion__text')
   
	return bar
		
	
}

Accordion.prototype.createTitle = function(data){
			
   var sb = this.sb
   
   var title = sb.sb_createElement('p')
   sb.sb_adProperty(title,'class','accordion__text-node fg-general-alt font-fd-xx-tn')
   sb.sb_insertInner(data)
   
   return title

}

Accordion.prototype.createController = function(){
			
   var sb = this.sb
   
   var btn  = sb.sb_createElement('button')
   sb.sb_adProperty(btn,'class','accordion__btn--exp-con')
   sb.sb_insertInner(btn,'+')
   
  
   return btn
}





Accordion.prototype.handleCreateAccordion = function(data){

	console.log('Create Modal event has occured')
	console.log(data)
	this.createAccordion(data)

}



Accordion.prototype.createAccordion = function(data){

	var sb = this.sb
	
	if(Object.keys(data).length > 1){

		for(el in data){

			var parent = this.getParent()
			var bar = this.createBar()
			var title = this.createTitle(data[el].title)
			var controller = this.createController()
			
			sb.sb_addChild(parent,bar)
			sb.sb_addChild(parent,title)
			sb.sb_addChild(parent,controller)
			sb.sb_addChild(data[el].parent,parent)
			
			sb.sb_addEvent(controller,'click',this.expand.bind(this,data.content,controller))

			this.emit({type: 'component-resource-creation-done',data: data[p].parent})
		}

	}else{

		var parent = this.getParent()
		var bar = this.createBar()
		var title = this.createTitle(data.title)
		var controller = this.createController()
		
		sb.sb_addChild(parent,bar)
		sb.sb_addChild(parent,title)
		sb.sb_addChild(parent,controller)
		sb.sb_addChild(data.parent,parent)
		
		sb.sb_addEvent(controller,'click',this.expand.bind(this,data.content,controller))
		this.emit({type: 'component-resource-creation-done',data: data.parent})

	}

   
	
	
		
	 


}

Accordion.prototype.expand = function(ev,content,controller){

 var sb = this.sb 
 
 if(controller.innerHTML.trim() === '+'){
 	
 	    controller.innerHTML = '-'
 	
 }else{
 	
  	controller.innerHTML = '+'
 }
 var classList = sb.sb_getClasses(content)
 sb.sb_toggleClass(content,'d-none')
 

}
	

			