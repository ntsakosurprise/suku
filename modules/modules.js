


function Search(sandbox){


	this.sandbox = sandbox;

	

}// End of search module




Search.prototype.init = function(){


		var searchInput = this.sandbox.sb_getChildById('#search-content');
		var searchBtn = this.sandbox.sb_getChildByClass('.search__form-submit-btn');
		var sb = this.sandbox;

		function handler(evt){

			
			var val = searchInput.value;
			sb.sb_ajaxPost('kokapix/user','data',success,failure);
		};

		function success(data){

			window.alert(data);
		};

		function failure(er){

			window.alert('this is the error:'+ er);
		}

		
	
		this.sandbox.sb_addEvent(searchBtn,'click',handler);



		


}

Search.prototype.destroy = function(){


		

}



/*=====================================================================================================



			THe register Module
			


=======================================================================================================*/


function Register(sandbox){


	this.sandbox = sandbox;

	

}// End of search module




Register.prototype.init = function(){


		var formData = this.sandbox.sb_getChildById('#register-form');

		
		var subBtn = this.sandbox.sb_getChildById('#sub');

		this.sandbox.sb_addEvent(subBtn,'click',handler);

		var sb = this.sandbox;

		function handler(evt){

			sb.sb_preventNormal(evt);

			var data = {

				username: 'Victor',
				email: 'Victor@gmail.com',
				password: '1234'
			}

			//window.alert(typeof sb.sb_jsToJson(data));

			//var validateResult = sb.sb_validate('Mashele Surprise, validate');

			sb.sb_ajaxPost('/kokapix/register',sb.sb_jsToJson(data),success,fail,'application/json');

			function fail(err){


				window.alert('FAIL: '+ err);

			}

			function success(data){


				var dataJS = sb.sb_jsonToJs(data);
				window.alert('This is successful callback '+ dataJS.message);


				if(dataJS.linkText){

					var el = sb.sb_getById('register');

					var lk = sb.sb_createElement('a');

					sb.sb_insertInner(lk,'Confirm Account');
					sb.sb_addProperty(lk,'href',dataJS.linkText);
					sb.sb_addChild(el,lk);


				}
				


			}
			
		}

		

		


}

Register.prototype.destroy = function(){


		

}



/*=====================================================================================================



			THe Slider Module
			


=======================================================================================================*/




function Slider(sandbox){


	this.sandbox = sandbox;

	

}// End of search module




Slider.prototype.init = function(){


		var sb = this.sandbox;
		var slides = getSlides();
		var controls = new Array();
		var timer = null;
		var sliderSpeed = 5000;

		sliderOptions();




		timer = setInterval(renderSlides, sliderSpeed);

		sb.sb_addEvent(sb.view,'mouseenter',slidePauseHandler);
		sb.sb_addEvent(sb.view,'mouseleave',slideResumHandler);
		addControlsHandler();


		
		

		// Event Handlers functions

		// Slider handlers

		function slidePauseHandler(){
			clearInterval(timer);

			var arrowControls = getSliderControls('arrows');

			if(arrowControls != null){

				for(var ac=0; ac < arrowControls.length; ac++){

					arrowControls[ac].style.display = 'inline-block';
				}
			}


		}

		function slideResumHandler(){

			timer = setInterval(renderSlides, sliderSpeed);

			var arrowControls = getSliderControls('arrows');

			if(arrowControls != null){

				for(var ac=0; ac < arrowControls.length; ac++){

					arrowControls[ac].style.display = 'none';
				}
			}


		}

		// Slider controls handlers

		function slideControlsHandler(evt){
			
			var targEl = sb.sb_getTarget(evt);
			var evtType = evt.type;

			

			if(evtType === 'mouseenter'){


				renderConrolOptions(targEl);

			}else{

				changeSlides(targEl);

			}
			
			
		}

		

		// Views retrieval functions

		function getSlides(){


			var slides = sb.sb_getAllChildByClass('.slider__item');
			
			return slides;

		}

		function getSliderControls(type){

			var modType = type.substr(0,(type.length -1));

			var controls = sb.sb_getAllChildByClass('.slider__controls-'+modType);

			return controls;

		}

		// Miscellaneous methods


		function addControlsHandler(){


			for(var cs=0; cs < controls.length; cs++){

					for(var c=0; c < controls[cs].length; c++){


						
						sb.sb_addEvent(controls[cs][c],'click',slideControlsHandler);
						sb.sb_addEvent(controls[cs][c],'mouseenter',slideControlsHandler);

					}

					


			}


		}


		function renderSlides(arg){


			if(arg !== undefined){



					if(arg === 'next' || arg === 'prev'){

						manual(arg);

					}else{



						for(var s=0; s < slides.length; s++){


							if(slides[s] === arg){

								renderSlideOptions(slides[s]);
								slides[s].style.display = 'block';

								var rendControls = new Array();

								for(var cs=0; cs < controls.length; cs++){


									for(var c=0; c < controls[cs].length; c++){

										var classList = sb.sb_getClasses(controls[cs][c]);

										if(sb.sb_hasClass(classList,'slider__controls-bubble') || sb.sb_hasClass(classList,'slider__controls-bar')){


											rendControls.push(controls[cs][c]);
										}


									}

								}

								renderConrolOptions(rendControls[s]);
								

							}else{


								slides[s].style.display = 'none';

							}
							
						}
					}
					
					

				


			}else{

					for(var slide = 0; slide < slides.length; slide++){




						var styles = sb.sb_getStyles(slides[slide]);
						

						
						if(styles.display === 'block'){


							slides[slide].style.display = 'none';

							if(slide === (slides.length - 1)){


								renderSlideOptions(slides[0]);
								slides[0].style.display = 'block';

								var rendControls = new Array();

								for(var cs=0; cs < controls.length; cs++){


									for(var c=0; c < controls[cs].length; c++){

										var classList = sb.sb_getClasses(controls[cs][c]);



										if(sb.sb_hasClass(classList,'slider__controls-bubble') || sb.sb_hasClass(classList,'slider__controls-bar')){


											rendControls.push(controls[cs][c]);
										}


									}

								}
								

								renderConrolOptions(rendControls[0]);
								break;

							}else{


								console.log(slide+1);
								renderSlideOptions(slides[slide + 1]);
								slides[slide + 1].style.display = 'block';

								var rendControls = new Array();

								for(var cs=0; cs < controls.length; cs++){


									for(var c=0; c < controls[cs].length; c++){


										var classList = sb.sb_getClasses(controls[cs][c]);



										if(sb.sb_hasClass(classList,'slider__controls-bubble') || sb.sb_hasClass(classList,'slider__controls-bar')){

											rendControls.push(controls[cs][c]);
										}


									}

								}// End of for loop

								renderConrolOptions(rendControls[slide + 1]);
								break;


							}
							


						}else{

							continue;
						}
							
							



						



				
				}// End of for loop


				


			}// End of outter ifelse test
			
			

			function renderSlideOptions(slide){


					var attribs = getAttributes(slide);

						for(var att = 0 ; att < attribs.length; att++){

							var attName = attribs[att].name;

							if(attName === 'data-img-src'){

								var attValue = attribs[att].value;
								slide.style.backgroundImage = 'url('+attValue+')';	
								break;
							}


						}


				}// End of renderSlideOptions()


				function manual(direction){



					if(direction === 'next'){



						for(var s=0; s < slides.length; s++){


							var styles = sb.sb_getStyles(slides[s]);


							if(styles.display === 'block'){


								slides[s].style.display = 'none';

								if(s === (slides.length - 1)){

									renderSlideOptions(slides[0]);
									slides[0].style.display = 'block';
									
									break;

								}else{


									renderSlideOptions(slides[s + 1]);
									slides[s + 1].style.display = 'block';
									
									break;


								}


							}


						}// End of for loop

						
					}else if(direction === 'prev'){

						for(var s=0; s < slides.length; s++){

							
							var styles = sb.sb_getStyles(slides[s]);


							if(styles.display === 'block'){


								slides[s].style.display = 'none';

								if(s === 0){



									renderSlideOptions(slides[slides.length - 1]);
									slides[slides.length - 1].style.display = 'block';

									break;

								}else{


										renderSlideOptions(slides[s - 1]);
										slides[s - 1].style.display = 'block';
										
										break;





								}


							}


						}// End of for loop

					}




				}// End of manual slideschange


				



		}// End of renderSlides



		function changeSlides(currentControl){

			

			var classList = sb.sb_getClasses(currentControl);


			if(sb.sb_hasClass(classList,'slider__controls-arrow')){


				 if(sb.sb_hasClass(classList,'slider__controls-arrow-next')){

					renderSlides('next');

				 }else{

					renderSlides('prev');

				}


			}else{



				for(var cs=0; cs < controls.length; ++cs){






						for(var c=0; c < controls[cs].length; ++c){


							
							if(currentControl === controls[cs][c]){


								for(var s=0; s < slides.length; s++ ){


									if(s === c){

										
										renderSlides(slides[s]);

										break;
									}

								}// End of innermost for loop
								break;

							}





						}
						

					

				}// End of for loop
			

			}
	

			

		}



		function renderConrolOptions(control){


						

						for(var cs = 0 ; cs < controls.length; cs++){


								for(var c = 0 ; c < controls[cs].length; c++){

								
									if(controls[cs][c] === control){

										var classList = sb.sb_getClasses(controls[cs][c]);

										if(sb.sb_hasClass(classList,'slider__controls-bubble')){


											if(!sb.sb_hasClass(classList,'slider__controls-bubble-active')){

												sb.sb_addClass(classList,'slider__controls-bubble-active');

											}


										}else if(sb.sb_hasClass(classList,'slider__controls-bar')){



											if(!sb.sb_hasClass(classList,'slider__controls-bar-active')){

												sb.sb_addClass(classList,'slider__controls-bar-active');

											}


										}

										
										
									}else{


										var classList = sb.sb_getClasses(controls[cs][c]);


										if(sb.sb_hasClass(classList,'slider__controls-bubble')){


												if(sb.sb_hasClass(classList,'slider__controls-bubble-active')){

													sb.sb_removeClass(classList,'slider__controls-bubble-active');


												}else{

													
													continue;
												}




										}else if(sb.sb_hasClass(classList,'slider__controls-bar')){


											
											if(sb.sb_hasClass(classList,'slider__controls-bar-active')){

													sb.sb_removeClass(classList,'slider__controls-bar-active');


											}else{

													
													continue;
											}



										}


										
									}


							}// End of inner for loop




						}// End of outter for loop
						


				}// End of renderSlideOptions()


				function getAttributes(element){

					return sb.sb_getAttributes(element);

				}



				// Slider options processing

				function sliderOptions(){


					var attribs = getAttributes(sb.view);

					if(attribs.length > 0){


						for(var a=0; a < attribs.length; a++){

							var attName = attribs[a].name;
							var attNameArr = attName.split('-');

							if(attNameArr[0] === 'data'){

								if((attNameArr[1] === 'slider') && (attNameArr[2] === 'controls')){

									switch(attName){


										case 'data-slider-controls': {

											var attValue = attribs[a].value;

											
											switch(attValue){

												case 'bubbles': {

													renderSliderControls('bubbles');

												}

												break;

												case 'bubbles-vertical': {

													renderSliderControls('bubbles','vertical');

												}
												break;

												case 'bubbles-center': {

													renderSliderControls('bubbles','center');

												}
												break;
												case 'bars': {

													renderSliderControls('bars');

												}
												break;

												case 'bars-center': {

													renderSliderControls('bars');

												}
												break;


												case 'arrows': {

													renderSliderControls('arrows');

												}
												break;

												case 'arrows-bubbles': {

													renderSliderControls('arrows');
													renderSliderControls('bubbles');

												}
												break;
												case 'arrows-bubbles-vertical': {

													renderSliderControls('arrows');
													renderSliderControls('bubbles','vertical');

												}
												break;

												case 'arrows-bars': {

													renderSliderControls('bars');
													renderSliderControls('arrows');
													

												}
												break;

												default:{


													renderSliderControls('default');
												}




											}
										}
										break;
										default: {

											renderSliderControls('default');
										}
									}// End of switch statement

								}else if(attName === 'data-slider-speed'){

									var speedArr = attribs[a].value.split('');
									var num = 	parseInt(speedArr[0]);


									if(typeof num === 'number' && (speedArr[speedArr.length - 1] === 's')){

										sliderSpeed = num * 1000;
									}


								}// End of check if attribute contains 'conrol' string


							}// End of check if attribute conatins 'data' string


						}


					}


					
				}// End of slideroptions function


				function renderSliderControls(controlType,pos){


					var totSlides = slides.length;
					var controlsParent = sb.sb_createElement('section');

					if(pos && pos === 'vertical'){

						controlsParent.className = 'slider__controls slider__controls--pos-left-center';

					}else if(controlType === 'bars' || controlType === 'bubbles'){

						
						controlsParent.className = 'slider__controls slider__controls--pos-bottom-center';


					}else{

						controlsParent.className = 'slider__controls';


					}

					

					if(controlType === 'arrows' || controlType === 'default'){

						if(controlType === 'default'){

							controlType = 'arrows';
						}

						var conts = createControls(2,controlType);

						appendControls(controlsParent,conts,controlType);

						

					}else{


						if(pos){

							var conts = createControls(totSlides,controlType,pos);

						}else{

							var conts = createControls(totSlides,controlType);


						}

						

						
						appendControls(controlsParent,conts,controlType);


					}

					

				}

				function createControls(numControls,type,align){


					var conts = new Array();

					for(var c=0; c < numControls; c++ ){

						
						control = sb.sb_createElement('span');

						switch(type){


							case 'arrows':{

								if(c === 0){

									control.className = 'slider__controls-arrow slider__controls-arrow-next slider__controls-arrow-next--pos-center';
									sb.sb_insertInner(control,'&#10095; ');

								}else{

									control.className = 'slider__controls-arrow slider__controls-arrow-prev slider__controls-arrow-prev--pos-center';
									sb.sb_insertInner(control,'&#10094; ');

								}

							
								

							}
							break;

							case 'bubbles':{

								if(c === 0){

									if(align && align === 'vertical'){

										control.className = 'slider__controls-bubble slider__controls-bubble-active slider__controls-bubble--vt';


									}else{

										control.className = 'slider__controls-bubble slider__controls-bubble-active slider__controls-bubble--hr';

									}

									


								}else{


									if(align && align === 'vertical'){

										control.className = 'slider__controls-bubble slider__controls-bubble--vt';


									}else{

										control.className = 'slider__controls-bubble slider__controls-bubble--hr';

									}

									

								}

							
								

							}
							break;

							case 'bars':{

								if(c === 0){

									control.className = 'slider__controls-bar slider__controls-bar-active';

								}else{

									control.className = 'slider__controls-bar';

								}

							
								

							}
							break;

							default:{


								if(c === 0){

									control.className = 'slider__controls-arrow slider__controls-arrow-next slider__controls-arrow-next--pos-center';
									sb.sb_insertInner(control,'&#10095; ');

								}else{

									control.className = 'slider__controls-arrow slider__controls-arrow-prev slider__controls-arrow-prev--pos-center';
									sb.sb_insertInner(control,'&#10094; ');

								}

							}





						}// End of switch statement

						conts[c] = control;
					
						
					}// End of for loop

					
					return conts;

				}

				function appendControls(controlsParent,controlsArr,type){



					for(var c=0; c < controlsArr.length; c++){

						sb.sb_addChild(controlsParent,controlsArr[c]);
					}

					sb.sb_addChild(sb.view,controlsParent);

					controls.push(getSliderControls(type));

					
				}


		



		


}

Slider.prototype.destroy = function(){


		

}


function Requery(sandbox){this.sb = sandbox; this.query = null }


Requery.prototype.init = function(){
	
	var sb = this.sb 
	
	console.log('The requery object is starting')
	 this.listens()
	 this.parseQuery()
	
}

Requery.prototype.listens = function(){
	
	var sb = this.sb 
	sb.sb_notifyListen({
		
		 'get-query-data' : this.handleGetQueryData.bind(this)
		
	},sb.moduleMeta.moduleId,sb.moduleMeta.modInstId)
}

Requery.prototype.emit = function(eNotifs){
	
	var sb = this.sb 
	
	
		
		    sb.sb_notifyEvent({
		
		      type: eNotifs.type,
		      data: eNotifs.data
		
	     })
		
}

Requery.prototype.parseQuery = function(){
	
	  var sb = this.sb 
	  
	  var query = this.getQuery(this.getCurrentPage())
	  
	  if(query){
	  
		
		console.log('The request data')
		console.log(query)
		this.query = query
	    //query.success = 'success'
	  	this.unsetQuery(this.getCurrentPage())
	    //  this.done(query)
	  
	  }else{

		this.query = this.getCurrentPage()
		this.unsetQuery(this.getCurrentPage())

	  }
	
}

Requery.prototype.getQuery = function(page){
	
   console.log('The page')
   console.log(page)
   console.log(localStorage)
   var sb = this.sb 
	 var query = sb.sb_jsonToJs(localStorage.getItem(page))
	 
	 console.log('The query')
	 console.log(query)
	 return query
	
}

Requery.prototype.unsetQuery = function(page){
	
	
   var sb = this.sb 
   localStorage.removeItem(page)
	 
	
}

Requery.prototype.getCurrentPage = function(){
	
	 return window.location.href.split('/').pop().split('.')[0]
	
}

Requery.prototype.handleGetQueryData = function(data){
	
	console.log('This get name handler')
	this.getQueryData(data)
   
}

Requery.prototype.getQueryData = function(data){
	
	console.log('The get component name')
	
	
	console.log(this.query)
	this.emit({type: 'take-query-data',data: this.query})
   
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



function Render(sandbox){
	
	this.sb = sandbox
	this.componentname =  window.location.href.split('/').pop().split('.')[0]
	
	
}

Render.prototype.init = function(){
	
	 
	 this.listens()
	 this.emit({type:'get-query-data',data: ''})
	//  setTimeout(
	// 	(function(self){
	// 		return function(){
	// 		console.log('The event is emitted, check it out')
	// 		console.log(self)
	// 		self.emit({type: 'render-component-'+self.componentname,data: 'none' })
	// 		}
	// 	})(this),
	//  5000)

	// this.emit({type: 'render-component-'+this.componentname,data: 'none' })
	 
	
}


Render.prototype.listens = function(){
	
	var sb = this.sb 
	sb.sb_notifyListen({
		 'take-query-data': this.handleTakeQueryData.bind(this)
	},sb.moduleMeta.moduleId,sb.moduleMeta.modInstId)
}

Render.prototype.emit = function(eNotifs){
	
	var sb = this.sb 
	
	
		
		    sb.sb_notifyEvent({
		
		      type: eNotifs.type,
		      data: eNotifs.data
		
	     })
		
}

Render.prototype.handleTakeQueryData = function(data){
	
	var sb = this.sb 
	
	console.log('The take component name event has occured and the data is: ')
	console.log(data)

	if(data instanceof Object && typeof data !== 'string'){

		 this.emit({type: 'render-component-'+data.page,data: data })

	}else{

		this.emit({type: 'render-component-'+data,data: data })

	}

	
	
	
		

}



function Messenger(sandbox) {
	
	this.sb = sandbox
	
}

Messenger.prototype.init = function(){
	
	 
	 this.listens()
	
}

Messenger.prototype.send = function(url,data,success,fail){
	
	var sb = this.sb 
	
	sb.sb_ajaxGet(url,data,success,fail)
	
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
	
	console.log('Inside formatRQ retrieve data')
	console.log(evInfo)
	var url = evInfo.url
	if(evInfo.data.data){
		
		var data = evInfo.data.data 
		
		this.send(url,data,evInfo.success,evInfo.fail)
	}else{
		
		this.send(url,'data',evInfo.success,evInfo.fail)
		
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

	var classList = sb.sb_getClasses(sb.view);

	sb.sb_toggleClass(classList,'d-none')
	
	
}

Preloader.prototype.listens = function(){
	
	var sb = this.sb 
	sb.sb_notifyListen({
		
		 'stop-preloader' : this.handleStopPreloader.bind(this)
		
	},sb.moduleMeta.moduleId,sb.moduleMeta.modInstId)
}

Preloader.prototype.stopPreloader = function(){
	
	var sb = this.sb 
	
	console.log('The stop preloader is invoked')
	var classList = sb.sb_getClasses(sb.view);
	sb.sb_toggleClass(classList,'d-none')
	
}

Preloader.prototype.handleStopPreloader = function(eventInfo){
	  
	  this.stopPreloader()
	
}




function Component(sandbox) {
	
	this.sb = sandbox
	this.componentname = window.location.href.split('/').pop().split('.')[0]
	
}

Component.prototype.init = function(){
	
	 this.listens()
	//  this.emit({type:'get-component-name',data: ''})
	 
	

}


Component.prototype.listens = function(){
	
	
	var sb = this.sb 
	var name = 'render-component-'+this.componentname
	sb.sb_notifyListen({
		
		 'request-query-success' : this.handleRQS.bind(this),
		  [name] : this.handleComponentRender.bind(this),
		  'take-component-name': this.handleTakeComponentName.bind(this),
		 'component-resource-creation-done': this.handleComponentCreationDone.bind(this)
		
	},sb.moduleMeta.moduleId,sb.moduleMeta.modInstId)
}

Component.prototype.emit = function(eNotifs){
	
		 console.log('The value of this in emit')
		  var sb = this.sb 
		  console.log(eNotifs)
	
		sb.sb_notifyEvent({
		
		      type: eNotifs.type,
		      data: eNotifs.data
		
	     })
		

}


Component.prototype.handleRQS = function(eventInfo){
	  
	  this.evt.data.name()
	
}

Component.prototype.handleTakeComponentName = function(data){
	
	var sb = this.sb 
	
	
	this.componentname = data.data
		

}

Component.prototype.handleComponentCreationDone = function(data){
	
	var sb = this.sb 

	sb.sb_addChild(sb.view,data)
	this.emit({type:'stop-preloader',data:''})
	this.emit({type:'create-links',data:''})

}

Component.prototype.handleComponentRender = function(data){
	  
	  console.log('The component render event has occured')
	  console.log(data)
	  
	  this[this.componentname](data)
	  

}

Component.prototype.messenger = function(data){
	  
	
	  this.emit({type: 'retrieve-data',data: data })
	
}


Component.prototype.cart = function(data){
	  
	  var sb = this.sb
	  var cart = sb.sb_jsonTojs(localStorage.cart)
	  
	  var ol = sb.sb_createElement('ul')
	
	  for(var p = 0; p < cart.length; p++){
	  	
	  	   var ol = sb.sb_createElement('li')
	  	   
	  	   ol.innerHTML = cart[p].producName 
	  	   
	  	   sb.sb_appendChild(ol,ul) 
	  	   this.messenger({
	  	   	
	  	   	  url: 'www.google.com',
	  	   	  data: 'adwords',
	  	   	  success: function(data){ 
	  	   	  
	  	   	    console.log(data)
	  	   	    	 this.emit({type: 'component-render-success',data: 'Your component has rendered'})
	  	   	   },
	  	   	    
	  	   	  fail: function(data){
	  	   	  	
	  	   	  	this.emit({
	  	   	  		
	  	   	  		type: 'log-error',
	  	   	  		data: data
	  	   	  		
	  	   	  	})
	  	   	  	
	  	   	  		 this.emit({type: 'component-render-fail',data: 'Your component has rendered'})
	  	   	  	  
	  	   	  }
	  	   	
	  	   	
	  	   })
	  	
	  }
	  
	 
	  
	 sb.sb_appendChild(sb.view,ul)

	 
	
}

Component.prototype.menulist = function(data){
	  
	var sb = this.sb

	

	var catlist = sb.sb_createElement('article')
	var url = 'http://localhost:3000'+data.endpoint+'/'+ data.data   


	this.messenger({url: url,data:'data',success: success.bind(this),fail: fail.bind(this)})
	

	function success(data){

		console.log('The return json data')
		console.log(data)
		let menu = sb.sb_jsonToJs(data)
		if(menu.categories){

			menu = menu.categories
		}else{
			menu = menu.items
		}
		console.log('The js')
		console.log(menu)

		this.emit({type: 'create-list',data:{

			type: 'regular',
			data: menu,
			options: {

				image: true,
				src: 'img/starters/',
				styles:{

					class: 'top-offset-vh-xx-sm pos-rel'
				}
			},
			parent:  catlist

		}})

	}
	

	function fail(data){

		this.emit({type: 'stop-preloader',data: data})

	}
	
	
}

Component.prototype.dashboard = function(data){
	  

	console.log('The request data inside the current component')
	console.log(data)	
	var sb = this.sb
	var menulist = sb.sb_createElement('article')
	//url = 'https://smarfoapi.herokuapp.com/smarfo/menu' 
	var url = 'http://localhost:3000/smarfo/menu' 

	this.messenger({url: url,data:'data',success: success.bind(this),fail: fail.bind(this)})




	function success(data){

		// console.log(data)
		// console.log('The value of this')
		// console.log(this)

		let menu = sb.sb_jsonToJs(data)

		this.emit({type: 'create-list',data:{

			type: 'tiled',
			data: menu.categories,
			options: {

				image: true,
				src: 'img/',
				cols: 2
			},
			parent:  menulist

		}})

		

	}


function fail(data){

	// console.log('OH,GOOD GOD, THERE GOES A CATASTROPHIC FAIL')
	// console.log(data)
	this.emit({type: 'stop-preloader',data:'test'})


}




}


function List(sandbox){
	
	this.sb = sandbox
	
}

List.prototype.init = function(){
	
	this.listens()
	
}


List.prototype.listens = function(){
	
	var sb = this.sb 
	sb.sb_notifyListen({
		
		
		 'create-list': this.handleCreatList.bind(this)
		 
	},sb.moduleMeta.moduleId,sb.moduleMeta.modInstId)
}

List.prototype.emit = function(eNotifs){
	
	var sb = this.sb 

	sb.sb_notifyEvent({
	
		type: eNotifs.type,
		data: eNotifs.data

		})
	

}

List.prototype.createTiled = function(itemData,options){
	
	var sb = this.sb
	let lst = sb.sb_createElement('li')
	sb.sb_addProperty(lst,'class','mg-bottom-fd-xx-tn cursor-pointer pd-left-fl-bt d-inline-block pd-bottom-fd-bt pd-top-fd-bt pos-rel')
	sb.sb_addProperty(lst,'data-navigata-page','menulist')
	sb.sb_addProperty(lst,'data-navigata-data','[{data: '+itemData.Name+',page: menulist,endpoint: /smarfo/menuitems}]')

	if(options.cols === 2){

		let classList = sb.sb_getClasses(lst)
		sb.sb_addClass(classList,'hr-size-fl-sm')
		sb.sb_addClass(classList,'d-inline-block')
		sb.sb_addClass(classList,'mg-left-fl-x-bt')
		

	   

		if(itemData !== null){

			let dv = sb.sb_createElement('div')
			let sp = sb.sb_createElement('span')
			let img = sb.sb_createElement('img')
			let h2 = sb.sb_createElement('h2')
			sb.sb_addProperty(dv,'class','hr-size-fl-xx-bg pos-rel')
			
			sb.sb_addProperty(sp,'class','hr-size-fl-xx-bg item-overlay top-offset-0 d-block pos-abs')

			sb.sb_addProperty(img,'src',options.src+itemData.image)
			sb.sb_addProperty(img,'class','hr-size-fl-xx-bg')
			sb.sb_addProperty(h2,'class','top-offset-fl-sm left-offset-fl-xx-sm fg-light pos-rel')
			sb.sb_insertInner(h2,itemData.Name)

			sb.sb_addChild(dv,sp)
			-
			sb.sb_addChild(dv,img)
			sb.sb_addChild(sp,h2)

			

			sb.sb_addChild(lst,dv)
			console.log(lst)


		 //  sb.sb_insertInner(lst,itemData.Name)

		}
		
	  return lst

	 }else if(options.cols === 3){

		 let classList = sb.sb_getClasses(lst)
		 sb.sb_addClass(classList,'hr-size-fl-xxx-sm')
		 sb.sb_addClass(classList,'d-inline-block')
		 sb.sb_addClass(classList,'mg-left-fl-x-bt')
		 
		 if(itemData !== null){

			 sb.sb_insertInner(lst,itemData.Name)
			 
		   }
		 sb.sb_addChild(sb.view,lst);

	 }else{

		 let classList = sb.sb_getClasses(lst)
		 sb.sb_addClass(classList,'hr-size-fl-sm')
		 sb.sb_addClass(classList,'d-block')
		 sb.sb_addClass(classList,'mg-left-fl-x-bt')

		 if(itemData !== null){

			 
			 sb.sb_insertInner(lst,itemData.Name)
			 
		   }

		 sb.sb_addChild(sb.view,lst);
	 }

	
}

List.prototype.createRegular = function(itemData,options){
	
		
		var sb = this.sb
		let lst = sb.sb_createElement('li')
		sb.sb_addProperty(lst,'class','hr-size-fl-xx-bg bx-shadow cursor-pointer fd-font-x-tn mg-bottom-fd-tn pd-left-fl-bt bg-light pos-rel d-block pd-bottom-fd-tn pd-top-fd-tn')
	    sb.sb_addProperty(lst,'data-navigata-page','detail')
	    sb.sb_addProperty(lst,'data-navigata-data','[{data: '+itemData.Name+',page: detail,endpoint: /smarfo/menuitem}]')

		
		if(options.image){

			console.log('The Main menu')

			let sp = sb.sb_createElement('span')
			let sp2 = sb.sb_createElement('span')
			let sp3 = sb.sb_createElement('span')
			let img = sb.sb_createElement('img')
			let input = sb.sb_createElement('input')
			let st = sb.sb_createElement('strong')
			let small = sb.sb_createElement('small')
			let smallSp = sb.sb_createElement('span')
			let priceSp = sb.sb_createElement('span')
			let minus = sb.sb_createElement('input')
			let add = sb.sb_createElement('input')

			var fm = sb.sb_createElement('form')
			var inputId = sb.sb_createElement('input')
			var inputPrice = sb.sb_createElement('input')
			var inputName = sb.sb_createElement('input')

			sb.sb_addProperty(inputId,'type','hidden')
			sb.sb_addProperty(inputId,'name','product_id')
			sb.sb_addProperty(inputId,'value','sampleid')

			sb.sb_addProperty(inputPrice,'type','hidden')
			sb.sb_addProperty(inputPrice,'name','product_price')
			sb.sb_addProperty(inputPrice,'value','sampleprice')

			
			sb.sb_addProperty(inputName,'type','hidden')
			sb.sb_addProperty(inputName,'name','product_name')
			sb.sb_addProperty(inputName,'value','sampleproducts')

			sb.sb_addProperty(input,'type','number')
			sb.sb_addProperty(input,'name','product_qty')
			

			sb.sb_addProperty(minus,'type','button')
			sb.sb_addProperty(minus,'name','remove_product')
			sb.sb_addProperty(minus,'value','-')

			sb.sb_addProperty(add,'type','button')
			sb.sb_addProperty(add,'name','add_product')
			sb.sb_addProperty(add,'value','+')

			sb.sb_addChild(fm,minus)
			sb.sb_addChild(fm,inputId)
			sb.sb_addChild(fm,inputPrice)
			sb.sb_addChild(fm,inputName)
			sb.sb_addChild(fm,input)
			sb.sb_addChild(fm,add)
			sb.sb_addChild(fm,st)
		


			sb.sb_addProperty(img,'src',options.src+itemData.image)
			sb.sb_addProperty(img,'class','hr-size-fl-xx-md bd-rad-bt pos-rel')
			sb.sb_addProperty(fm,'class','hr-fl-size-xx-bg  mg-bottom-fd-sm pos-rel')
			// sb.sb_addProperty(fm,'id',ct+'-form')
			sb.sb_addProperty(minus,'class','hr-size-fl-xxx-sm cursor-pointer float-left vt-size-fd-bt d-inline-block bg-light bd-bottom-left-rad-fd-xx-bt bd-top-left-rad-fd-xx-bt bd-fd-secondary-xx-bt pd-fd-xx-tn text-align-center  font-fd-xx-tn font-wt-bolder  pos-rel')
			// sb.sb_addProperty(minus,'id',ct)
			sb.sb_addEvent(minus,'click',this.removeFromCart.bind(this))
			sb.sb_addProperty(add,'class','hr-size-fl-xxx-sm cursor-pointer float-left vt-size-fd-bt d-inline-block  bg-light bd-bottom-right-rad-fd-xx-bt bd-top-right-rad-fd-xx-bt bd-fd-secondary-xx-bt pd-fd-xx-tn text-align-center font-wt-bolder  font-fd-xx-tn pos-rel')
			// sb.sb_addProperty(add,'id',ct)
			sb.sb_addEvent(add,'click',this.addToCart.bind(this))
			sb.sb_addProperty(input,'class','vt-size-fd-bt float-left d-inline-block hr-size-fl-xxx-sm pd-fd-xx-tn bg-light bd-fd-secondary-xx-bt ')
			sb.sb_addProperty(input,'placeholder','0')
			sb.sb_addEvent(input,'input',this.updateCart.bind(this))
			sb.sb_addProperty(small,'class','hr-size-fl-lg d-block pos-rel')
			sb.sb_addProperty(smallSp,'class','d-inline-block font-wt-bolder fg-secondary font-fd-xx-tn pos-rel')
			sb.sb_addProperty(priceSp,'class','d-inline-block font-wt-bolder fg-secondary font-fd-xx-tn pos-rel')
			sb.sb_addProperty(st,'class','clearfix')
			
			sb.sb_addProperty(sp,'class','hr-size-fl-xx-sm mg-right-fl-bt d-inline-block float-left')
			sb.sb_addProperty(sp2,'class','hr-size-fl-xxx-sm font-fd-xx-tn d-inline-block float-left')
			sb.sb_addProperty(sp3,'class','hr-size-fl-xxx-sm d-inline-block float-left')
			sb.sb_insertInner(sp2,itemData.Name)
			sb.sb_insertInner(minus,'-')
			sb.sb_insertInner(add,'+')
			sb.sb_insertInner(priceSp,'152,99')
			sb.sb_insertInner(smallSp,'R')
			
			
			
		
			sb.sb_addChild(sp,img)
			
			// sb.sb_addChild(sp3,minus)
			// sb.sb_addChild(sp3,input)
			// sb.sb_addChild(sp3,add)
			
			sb.sb_addChild(sp3,fm)
			sb.sb_addChild(small,smallSp)
			sb.sb_addChild(small,priceSp)
			sb.sb_addChild(sp3,small)
			
			
			
			sb.sb_addChild(lst,sp)
			sb.sb_addChild(lst,sp2)
			sb.sb_addChild(lst,sp3)
			sb.sb_addChild(lst,st)
			
		

		}else{

			console.log('The mini menu')
			sb.sb_addProperty(lst,'class','hr-size-fl-xx-bg font-fd-xx-tn mg-bottom-fd-xx-tn bd-bottom-fd-secondary-xx-bt pos-rel d-block pd-bottom-fd-bt pd-top-fd-bt pd-left-fl-xxx-tn')
			sb.sb_insertInner(lst,itemData.Name)


		}

		return lst
		
	
}



List.prototype.handleCreatList = function(data){

	console.log('Create list event has occured')
	console.log(data)
	this.createList(data)

}



List.prototype.createList = function(data){

	var sb = this.sb
	var listData = data.data

	var lstCont = sb.sb_createElement('ul')

	if(data.type === 'tiled'){

		for(list in listData){

			var lst = this.createTiled(listData[list],data.options)
			sb.sb_addChild(lstCont,lst)
			
		}

		var parent = data.parent

		sb.sb_addChild(parent,lstCont)

		this.emit({type: 'component-resource-creation-done',data: parent})
	
	}else{

		for(list in listData){

			var lst = this.createRegular(listData[list],data.options)
			sb.sb_addChild(lstCont,lst)
		}		

		var parent = data.parent

		if(data.options.styles){

			if(data.options.styles.class){

				sb.sb_addProperty(parent,'class',data.options.styles.class)
			}
		}

		sb.sb_addChild(parent,lstCont)

		this.emit({type: 'component-resource-creation-done',data: parent})

	}

}
	



List.prototype.addToCart = function(ev){

	var sb = this.sb

	sb.sb_stopEventBubble(ev)
	var productData = this.getAddProduct(ev)
	this.emit({type:'add-to-cart',data: productData})
}

List.prototype.removeFromCart = function(ev){

	var sb = this.sb

	sb.sb_stopEventBubble(ev)

	var productData = this.getRemoveProduct(ev)
	if(productData){

		this.emit({type:'remove-from-cart',data: productData})

	}

}

List.prototype.updateCart = function(ev){

	var sb = this.sb

	// console.log('The input event')
	// console.log(ev)
	//ev.stopImmediatePropagation()
	var productData = this.getUpdateProduct(ev)
	if(productData){

		this.emit({type:'update-cart',data: productData})

	}

	return false;

}

List.prototype.getAddProduct = function(evt){

	var sb = this.sb

	var productFm = sb.sb_getParent(evt.target)

	if(!productFm.product_qty.value){

		sb.sb_addProperty(productFm.product_qty,'value')
		productFm.product_qty.value =  1 
		
	}else{

		productFm.product_qty.value = parseInt(productFm.product_qty.value,10) + 1 
		
	}

	
	var productData = {

		productId: productFm.product_id.value,
		productName: productFm.product_name.value,
		productPrice: parseFloat(productFm.product_price.value,2),
		productQty: parseInt(productFm.product_qty.value,10)
	}

	return productData


}
List.prototype.getRemoveProduct = function(evt){

	    var sb = this.sb

	    var productFm = sb.sb_getParent(evt.target)

		if(productFm.product_qty.value && parseInt(productFm.product_qty.value,10) > 0){

			productFm.product_qty.value = parseInt(productFm.product_qty.value,10) - 1


			var productData = {

				productId: productFm.product_id.value,
				productName: productFm.product_name.value,
				productPrice: parseFloat(productFm.product_price.value,2),
				productQty: parseInt(productFm.product_qty.value,10)
			}

			return productData
		
		}else{

			console.log('The product to remove is not')
			return null
		}


}
List.prototype.getUpdateProduct = function(evt){


	var sb = this.sb
	
	var productFm = sb.sb_getParent(evt.target)
	var updateValue = parseInt(productFm.product_qty.value.trim())
	console.log('The converted update value')
	console.log(updateValue)

	
	

		if((updateValue !== '') && (!isNaN(updateValue)) && updateValue >= 0){

			


			var productData = {

				productId: productFm.product_id.value,
				productName: productFm.product_name.value,
				productPrice: parseFloat(productFm.product_price.value,2),
				productQty: parseInt(productFm.product_qty.value,10)
			}

			return productData
			 

		}else{

			
			console.log('The value is not in required format')
			return null
		}
		


}
List.prototype.getters = {

	 viewAttribs : this.viewAttribs,

	getListType : function(){

		for(var attribs = 0; attribs < this.viewAttribs.length; attribs++){

			if(this.viewAttribs[attribs].name === 'data-list-type'){


				if(this.viewAttribs[attribs].value === 'tile'){
					
					return 'tile';

				}else{

					return 'regular'
				}
			}
		}

	},
	getListCols: function(){

		for(var attribs = 0; attribs < this.viewAttribs.length; attribs++){

			if(this.viewAttribs[attribs].name === 'data-list-cols'){


				if(this.viewAttribs[attribs].value === '2'){
					
					return 2

				}else if(this.viewAttribs[attribs].value === '3'){

					return 3
				}else{

					return 0
				}
			}
		}

	},

	getImage: function(){

		for(var attribs = 0; attribs < this.this.viewAttribs.length; attribs++){

			if(this.viewAttribs[attribs].name === 'data-list-image'){

					return true; 
					
			}
		}

	},

	getImageSrc: function(){

		for(var attribs = 0; attribs < this.viewAttribs.length; attribs++){

			if(this.viewAttribs[attribs].name === 'data-list-image-src'){

					return this.viewAttribs[attribs].value
					
			}
		}

	},

	isSetList: function(){

		if(this.viewAttribs[attribs].name === 'data-list-src'){

			if(this.viewAttribs[attribs].value === ''){

				return true
			}else{

				return false
			}
			
		}
	},

	getListSrc: function(){

		for(var attribs = 0; attribs < this.viewAttribs.length; attribs++){

			if(this.viewAttribs[attribs].name === 'data-list-src'){

					return this.viewAttribs[attribs].value
					
			}
		}

	},

	getListData: function(){

		var listSrc = getters.getListSrc();
		dataFromApi('https://smarfoapi.herokuapp.com/smarfo'+listSrc)


	},

	completed: function(){

		console.log('The list completed method has been invoked')
		sb.sb_notifyEvent({

			type: 'list-loaded',
			data: 'completed'
		})

		
	}


}







function Cart(sandbox){this.sb = sandbox}

Cart.prototype.init = function(){

	var sb = this.sb;

	// console.log(this)

	

	sb.sb_notifyListen({

		'add-to-cart': this.handleCartAdd.bind(this),
		'remove-from-cart': this.handleCartRemove.bind(this),
		'update-cart': this.handleCartUpdate.bind(this)

		
	},sb.moduleMeta.moduleId,sb.moduleMeta.modInstId)

}

Cart.prototype.addToCart = function(product){

	 var sb = this.sb	 
	 console.log('The add event has taken place yo')

	 if(localStorage.cart){

		var products = sb.sb_jsonToJs(localStorage.getItem('cart'))

		if(products.length > 0){

			for(var p = 0; p < products.length; p++){
				
				console.log('The productId inside the cart product')
				console.log(products[p].productId)
				console.log('The productId inside the add product')
				console.log(product.productId)
				
				if(products[p].productId === product.productId){
	
					console.log('The productIds match here')
					products[p].productQty += 1
					break
	
					
				}else if(products[p] === products.length - 1 ){
	
					console.log('its either it is not breaking out of the loop')
					products.push(product)
				}
			}
	
			console.log('The product that has just been added')
			console.log(products.length)
			console.log(products)				
			localStorage.cart = sb.sb_jsToJson(products)
			

		}else{


			products.push(product)
			localStorage.cart = sb.sb_jsToJson(products)

			console.log('The first product quantity inside the cart')
			console.log(products[0].productQty)				

		}

		

	 }else{

		localStorage.setItem('cart',sb.sb_jsToJson([product]))
	 }
	
	
}

Cart.prototype.removeFromCart = function(product){

	var sb = this.sb
	if(localStorage.cart){

		var products = sb.sb_jsonToJs(localStorage.getItem('cart'))

		for(var p = 0; p < products.length; p++){

			if(products[p].productId === product.productId){

				
				if(products[p].productQty > 1){

					products[p].productQty -= 1
					console.log('The items that remains in this product')
					console.log(products[p].productQty)

				}else{

					products.splice(p,1);
					console.log('Product no longer exists')
					

				}

				break;
			}
		}

		localStorage.cart = sb.sb_jsToJson(products)

	 }


}

Cart.prototype.updateCart = function (product){

	var sb = this.sb

	if(localStorage.cart){

		var products = sb.sb_jsonToJs(localStorage.getItem('cart'))

		if(products.length > 0){

			for(var p = 0; p < products.length; p++){

				if(products[p].productId === product.productId){
	
					if(product.productQty === 0){

						console.log('The Item will be deleted')
						products.splice(p,1)
						console.log('The product that has just been deleted')
						console.log(products)
						console.log(products.length)	
						break

					}else{

						console.log('The quantity is added,cart updated')
						products[p].productQty = product.productQty
						break
					}
				
					
				}else if(products[p] === products.length - 1 ){
	
					products.push(product)
					console.log('The product that has just been pushed')
					console.log(products)
					console.log(products.length)				
				}
			}
	
			
			console.log(products)				
			localStorage.cart = sb.sb_jsToJson(products)
			

		}else{


			if(product.productQty > 0){

				products.push(product)
				localStorage.cart = sb.sb_jsToJson(products)

				console.log('The first product quantity inside the cart')
				console.log(products[0].productQty)				

			}else{

				console.log('This the update event, and it contains a product of zero quantity')
			}
			

		}

		

	 }else{

		localStorage.setItem('cart',sb.sb_jsToJson([product]))
	 }





},

Cart.prototype.handleCartAdd = function(product){

	
	this.addToCart(product)


}

Cart.prototype.handleCartRemove = function(product){

	this.removeFromCart(product)
	
}

Cart.prototype.handleCartUpdate = function(product){
	
	this.updateCart(product)
}



function Navigata(sandbox){this.sb = sandbox}

 Navigata.prototype.init = function(){

	// console.log('The navigata has been initialised')
	// console.log(this.sb)
	var sb = this.sb;
	
	sb.sb_notifyListen ({

		'create-links': this.handleListComplete.bind(this),
		
	},sb.moduleMeta.moduleId,sb.moduleMeta.modInstId)

}

Navigata.prototype.handleListComplete = function(){

	// var that = this;
	// setTimeout(
	// 	(function(self){
	// 		return function(){
	// 				self.startNavigata(self)
	// 			   }
	// 		})(this),
	// 			3000)

	// // this.startNavigata()
	console.log('The list loaded event has occured')
	this.startNavigata()

}

Navigata.prototype.startNavigata = function(){

	 var sb = this.sb

	//  console.log('The value of this')
	//  console.log(this)

	
	 var links = sb.sb_getByAttribute('data-navigata-page')

	    
	
		for(var i = 0;i < links.length;i++){

			this.addLinkEvents(links[i],this.getPage(links[i]),this.getData(links[i]))

		}
		
	 
}

Navigata.prototype.addLinkEvents = function(lk,page,pgData){

	 var sb = this.sb

	 console.log('The page')
	console.log(page)
	console.log('Data')
	console.log(pgData)

	//  console.log('The value of lk')
	//  console.log(lk)
	//  console.log('The value of page')
	//  console.log(page)

	//  var btn = sb.sb_getById('test-button')
	//  console.log(btn)
	//  var openLink = this.openLink
	 
	
	//  function test(){window.alert('I am the test')}
	//  console.log('The event function')
	//  var idd = sb.sb_getById('test')f

	// setTimeout(
	// 	(function(self){
	// 		return function(){
	// 				self.startNavigata(self)
	// 			   }
	// 		})(this),
	// 			3000)

	// console.log('The value of this inside addeveList')
	//  console.log(this)
	//  var that = this
	 sb.sb_addEvent(lk,'click',this.openLink.bind(this,page,pgData));
	 
}


 

Navigata.prototype.getPage = function(pageLink){

	var sb = this.sb

	var attribs = sb.sb_getAttributes(pageLink)

	for(var a = 0; a < attribs.length; a++){


		if(attribs[a].name === 'data-navigata-page'){

			return attribs[a].value
		}

	}

}

Navigata.prototype.getData = function(pageLink){

	var sb = this.sb

	var attribs = sb.sb_getAttributes(pageLink)

	for(var a = 0; a < attribs.length; a++){


		if(attribs[a].name === 'data-navigata-data'){

			var val = attribs[a].value

			val = val.trim().slice(1,(val.length - 1))
			val = val.slice(1,(val.length - 1)).split(',')
			console.log(val)
			dtObj = {}
			for(var v = 0; v < val.length; v++){

				var nv = val[v].split(':')

				dtObj[nv[0]] = nv[1].trim()

			}

			// console.log('The value of val')
			// console.log(dtObj)
			

			return dtObj
		}

	}

}

Navigata.prototype.openLink = function(page,pgData){

	// console.log('The page')
	// console.log(that)
	// console.log('Data')
	// console.log(page)
	// console.log(this)
	var sb = this.sb
	localStorage.setItem(page,sb.sb_jsToJson(pgData))
	// console.log('LocalStorage data')
	// console.log(sb.sb_jsonToJs(localStorage.getItem(page)))
	window.location.href = page+'.html'
}


 


		

	









