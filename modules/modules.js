
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

function Register(sandbox) {
	
	this.sb = sandbox
	
}

Register.prototype.init = function(){
	
	 console.log('The register module is initiated')
	 this.setUpRegister()
	
}

Register.prototype.emit = function(eNotifs){
	
	   var sb = this.sb 
		console.log(eNotifs)
	
		sb.sb_notifyEvent({
		
		      type: eNotifs.type,
		      data: eNotifs.data
		
	     })
}

Register.prototype.messenger = function(data){
	
	this.emit({type: 'retrieve-data',data: data })
  
}


Register.prototype.setUpRegister = function(){
	
	 
	var sb = this.sb
	var registerT = sb.sb_getChildById('#register')
	sb.sb_addEvent(registerT,'click',this.handleRegister.bind(this))

	
}

Register.prototype.handleRegister = function(ev){
	
	 var sb = this.sb 

	 sb.sb_preventNormal(ev)
	 this.getRegisterData()
	
	
}


Register.prototype.getRegisterData = function(){
	
	var sb = this.sb
  
	var register = sb.sb_getChildById('#register-data')

	console.log('register form')
	console.log(register.email.value)
	
	var registerData = {
		
		username: register.username.value,
		password: register.password.value,
		email: register.email.value
		
	}
	
	registerData = sb.sb_jsToJson(registerData)

	var url = 'http://localhost:3000/smarfo/register'

	success = this.sucess 
	fail = this.fail
	type = 'json'
	method = 'post'
	
	this.messenger({url: url,data:registerData,success: success.bind(this),fail: fail.bind(this),type: type,method:method})
   
   
}





Register.prototype.sucess = function(data){
	
	var sb = this.sb 

	var response = sb.sb_jsonToJs(data)

	
	if(response.isRegistered){
		
		console.log('Successful registration')
		this.setRegister(response)


	}else{
		
		// this.respondRegister(data)

		console.log('Registration failed')
		console.log(data)
		console.log('An issue has occured')
		
	}
	
	 
	
}

Register.prototype.fail = function(data){
	
	  var sb = this.sb 
	
  
	 
	//   var resEl = sb.sb_getChildById('#response')
	//   resEl.innerHTML = 'An error occured,request could not be completed,please tey again'
	//   this.emit({type: 'log-error',data: data})

	console.log('The registration error')
	console.log(data)
		

}

Register.prototype.redirect = function(){
	  
	  
	  window.location.href = "login.html"

}

Register.prototype.setRegister = function(data){
	  
	  var sb = this.sb 
	  var login = {
			 username: data.username
	  }
	  
	  localStorage.setItem('login',sb.sb_jsToJson(login))
	  console.log('LocalStorage data')
	  console.log(localStorage.login)
	  this.redirect()


}


Register.prototype.respondRegister = function(data){
	  
	  
	  var resEl = sb.sb_getChildById('#response')
	  
	    resEl.innerHTML = data.message
	  	

}


function Login(sandbox){
	
	this.sb = sandbox
	this.ref = window.document.referrer.split('/').pop().split('.')[0]
	
}

Login.prototype.init = function(){
	
	 this.setUpLogin()
	 console.log('The page on which auth runs')
	console.log(this.ref)
	
}

Login.prototype.emit = function(eNotifs){

	var sb = this.sb 
	console.log(eNotifs)

	sb.sb_notifyEvent({
	
			type: eNotifs.type,
			data: eNotifs.data
	
		})
	
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
	
	var sb = this.sb
	console.log('Handle login')
	 sb.sb_preventNormal(ev)
	 this.getLoginData()
	
	
}


Login.prototype.getLoginData = function(){
	
	var sb = this.sb
  
  var login = sb.sb_getChildById('#login-data')
  
  console.log('Login Data')
  console.log(login)
   var loginData = {
   	
   	    email: login.email.value,
   	    password: login.password.value
   	
   }
   
   loginData = sb.sb_jsToJson(loginData)
   var url = 'https://smarfoapi.herokuapp.com/smarfo/login'
//    var url = 'http://localhost:3000/smarfo/login'

   success = this.success 
   fail = this.fail
   type = 'json'
   method = 'post'
   
   this.messenger({url: url,data:loginData,success: success.bind(this),fail: fail.bind(this),type: type,method:method})
   
	 
	
	
}


Login.prototype.success = function(data){
	
	var sb = this.sb 
	
	var response = sb.sb_jsonToJs(data)

	
	if(response.isvalid){
		
		console.log('Successful Login')
		console.log(response)
		this.setLogin(response.login)


	}else{
		
		// this.respondRegister(data)

		console.log('Login')
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
	  
	  
	
	  window.location.href = this.ref+".html"

}

Login.prototype.setLogin = function(data){
	  
	var sb = this.sb
	var login = {
	     	username: data.id
	  }

	  console.log('SET LOGIN, LOGIN')
	  console.log(login)
	  
	  localStorage.setItem('login',sb.sb_jsToJson(login))
	  this.redirect()


}


Login.prototype.respondLogin = function(data){
	  
	  
	  var resEl = sb.sb_getChildById('#response')
	  
	    resEl.innerHTML = data.message
	  	

}

function Logout(sandbox){
	
	this.sb = sandbox
	
}

Logout.prototype.init = function(){
	
	 this.setUpLogOut()
	
}

Logout.prototype.listens = function(){
	
	var sb = this.sb 
	sb.sb_notifyListen({
		
		 'log-out' : this.handleLogOut.bind(this)
		
	})
}

Logout.prototype.setUpLogOut = function(){
	
	 
	var sb = this.sb
	
	// var loginT = sb.sb_getChildById('#login')
	sb.sb_addEvent(sb.view,'click',this.handleLogOut.bind(this))

	
}

Logout.prototype.handleLogOut = function(ev){
	
	 this.unsetLogout()
	
}


Logout.prototype.redirect = function(){
	  
	  
	  window.location.href = "bargain.html"

}

Logout.prototype.unsetLogout = function(){
	  
	  console.log('The user is about to be logged out')
	

	  if(localStorage.login){
	  	
		   localStorage.removeItem('login')
		   console.log('Get the loging')
		   console.log(localStorage.getItem('login'))
	  	   this.redirect()
	  	
	  }
	  
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

Messenger.prototype.send = function(data){
	
	var sb = this.sb 
	
	if(data.method === 'post'){

		if(data.data.type){

			sb.sb_ajaxPost(data.data.url,data.data.data,data.data.success,data.data.fail,data.data.type)
		}else{

			sb.sb_ajaxPost(data.data.url,data.data.data,data.data.success,data.data.fail)


		}
		
	}else{

		sb.sb_ajaxGet(data.data.url,data.data.data,data.data.success,data.data.fail)

	}
	
	
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

Messenger.prototype.formatRQ = function(data){
	
	var sb = this.sb 

	 if(data.method){

		if(data.method === 'post'){

			this.send({method:'post',data})

		}else{

			this.send({method:'get',data})

		}

	 }else{

		this.send({method:'get',data})
	 }
	
	// console.log('Inside formatRQ retrieve data')
	// console.log(evInfo)
	// var url = evInfo.url
	// if(evInfo.data.data){
		
	// 	var data = evInfo.data.data 
		
	// 	this.send(url,data,evInfo.success,evInfo.fail)
	// }else{
		
	// 	this.send(url,'data',evInfo.success,evInfo.fail)
		
	// }
	
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

	if(!sb.view.contains(data)){

		sb.sb_addChild(sb.view,data)
		this.emit({type:'stop-preloader',data:''})
	    this.emit({type:'create-links',data:''})


	}
   
	
	
}

Component.prototype.handleComponentRender = function(data){
	  
	  console.log('The component render event has occured')
	  console.log(data)
	  
	  this[this.componentname](data)
	  

}

Component.prototype.messenger = function(data){
	  
	
	  this.emit({type: 'retrieve-data',data: data })
	
}

Component.prototype.tools = function(id){
	  
	var that = this

	var tools = {

		detail: {

			events: {

				addToCart: function(ev){

					var sb = that.sb
	
					sb.sb_stopEventBubble(ev)
					var productData = this.functions.getAddProduct(ev)
					that.emit({type:'add-to-cart',data: productData})
				},
				updateCart: function(ev){
	
					var sb = that.sb
	
					// console.log('The input event')
					// console.log(ev)
					//ev.stopImmediatePropagation()
					var productData = this.functions.getUpdateProduct(ev)
					if(productData){
	
						that.emit({type:'update-cart',data: productData})
	
					}
	
					return false;
	
	
				},
				removeFromCart: function(ev){
	
					var sb = that.sb
	
					sb.sb_stopEventBubble(ev)
	
					var productData = this.functions.getRemoveProduct(ev)
					if(productData){
	
						that.emit({type:'remove-from-cart',data: productData})
	
					}
								
				}

			},
			functions:{



				getAddProduct : function(evt){

					var sb = that.sb
				
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
				
				
				},
				getRemoveProduct : function(evt){
				
						var sb = that.sb
				
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
				
				
				},
				getUpdateProduct : function(evt){
				
				
					var sb = that.sb
					
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
			}
			
		

		},
		cart: {

			events: {

				addToCart: function(ev){

					var sb = that.sb
	
					sb.sb_stopEventBubble(ev)
					var productData = this.functions.getAddProduct(ev)
					that.emit({type:'add-to-cart',data: productData})
				},
				updateCart: function(ev){
	
					var sb = that.sb
	
					// console.log('The input event')
					// console.log(ev)
					//ev.stopImmediatePropagation()
					var productData = this.functions.getUpdateProduct(ev)
					if(productData){
	
						that.emit({type:'update-cart',data: productData})
	
					}
	
					return false;
	
	
				},
				removeFromCart: function(ev){
	
					var sb = that.sb
	
					sb.sb_stopEventBubble(ev)
	
					var productData = this.functions.getRemoveProduct(ev)
					if(productData){
	
						that.emit({type:'remove-from-cart',data: productData})
	
					}
								
				},
				startOrder: function(tool,ev){

					var sb = this.sb
					sb.sb_preventNormal(ev)

					var cartstate = tool.functions.getCart()

					if(!cartstate.empty){

						var totalCart = tool.functions.calculate(cartstate.cart)

						if(localStorage.ordercollects){

							localStorage.removeItem('ordercollects')
							localStorage.setItem('ordercollects',sb.sb_jsToJson({

								cart: {
	
									data: {
										cart: cartstate.cart,
										extra : totalCart
									}
								}
	
							}))

						}else{

							localStorage.setItem('ordercollects',sb.sb_jsToJson({

								cart: {
	
									data: {
										cart: cartstate.cart,
										extra : totalCart
									}
								}
	
							}))

						}
						

						window.location.href= 'checkout.html'
					}

					

				}

			},
			functions:{



				getCart : function(evt){

					var sb = that.sb

					if(localStorage['cart']){
				
						var cart = sb.sb_jsonToJs(localStorage['cart'])
						
						if(cart.length > 0){
							
							 return {empty: false,cart: cart}
							
						}else{
							
							return {empty: true}
							
						}
						
						
					}else{
						
						return {empty: true}

					}

				},
				calculate: function(calcs){


					var totalPrice = 0;

					for(var p = 0; p < calcs.length; p++){

						var price = calcs[p].productPrice * calcs[p].productQty
						totalPrice += price
					
					}

					return totalPrice




				}
					
				
					
			}
			
		

		},
		checkout: {

			events: {

				loadNext: function(tool,els,ev){

					var sb = that.sb

					console.log(tool.identifiers.current)
					console.log(tool.identifiers.steps)
					console.log(tool.identifiers.steps[tool.identifiers.current].next)

					var next = tool.identifiers.steps[tool.identifiers.current].next

					if(tool.identifiers.steps[tool.identifiers.current].completed){

						console.log('THE CURRENT STEP HAS COMPLETED')
						if(tool.identifiers.steps[tool.identifiers.current].next === 'confirm'){

							sb.sb_insertInner(ev.target,'Place Order')
						}
						if(!tool.identifiers.steps[next].called){

							console.log('This step has not been called, call it')
							console.log(tool.identifiers.steps[next])
							tool.functions[tool.identifiers.steps[tool.identifiers.current].next](tool,els)

						}
						

					}else{

						console.log('Please complete the step before this to proceed')
					}
					
	
					// sb.sb_stopEventBubble(ev)
					// var productData = this.functions.getAddProduct(ev)
					// that.emit({type:'add-to-cart',data: productData})
				},
				save: function(tool,els,stage,ev){

					var sb = that.sb
					var value = ev.target.value

					console.log('The saved value')
					console.log(value)

				
					if(localStorage.ordercollects){


						var ordercollects = sb.sb_jsonToJs(localStorage.getItem('ordercollects'))

						if(ordercollects[stage] === undefined){

							ordercollects[stage] = {
								data: value
							}
	
							tool.identifiers.current = stage
							tool.identifiers.steps[tool.identifiers.current].completed = true
	
							console.log('ordercollects save undefined stage')
							console.log(ordercollects)
							localStorage.setItem('ordercollects',sb.sb_jsToJson(ordercollects))
							
	
						}else{
	
							ordercollects[stage].data = value
							tool.identifiers.current = stage
							tool.identifiers.steps[tool.identifiers.current].completed = true
						}

					}else{

						var ordercollects = {

							stage:{
								data: value
							}
						}

						localStorage.setItem('ordercollects',sb.sb_jsToJson(ordercollects))
						tool.identifiers.current = stage
						tool.identifiers.steps[tool.identifiers.current].completed = true

					}

				

				


				},
				reveal: function(tool,els,reveal,append,ev){

					var sb = that.sb
					
					if(append.contains(reveal)){

						console.log('Main contains reveal')
						var computedStyle = document.defaultView.getComputedStyle(reveal,null);
						console.log(computedStyle.display)


						if(computedStyle.display === 'block'){

							reveal.style.display = 'none'
						}else{

							reveal.style.display = 'block'
						}

					}else{

						console.log('Main does not reveal')
						sb.sb_addChild(append,reveal)

					}
					

				},
				captureAddress: function(tool,els,stage,ev){


					var sb = that.sb

					sb.sb_stopEventBubble(ev)
					sb.sb_preventNormal(ev)
					var addressForm = sb.sb_getById('capture-address')
					
					var inputs = sb.sb_getByTag(addressForm,'input')
					var address = {}
					

					for(var i=0; i < inputs.length; i++){

						if(inputs[i].value === '' || inputs[i].value.length < 2){
							break;

						}else if(i === inputs.length - 1){

							
							address[inputs[i].name] = inputs[i].value

							if(localStorage.ordercollects){

								var ordercollects = sb.sb_jsonToJs(localStorage.getItem('ordercollects'))

								if(ordercollects[stage] === undefined){

									ordercollects[stage] = {
										data: address
									}

									tool.identifiers.current = stage
									tool.identifiers.steps[tool.identifiers.current].completed = true

									console.log('ordercollects save undefined stage')
									console.log(ordercollects)
									localStorage.setItem('ordercollects',sb.sb_jsToJson(ordercollects))
									

								}else{

									ordercollects[stage].data = address
									tool.identifiers.current = stage
									tool.identifiers.steps[tool.identifiers.current].completed = true
								}
							}else{

								
								var ordercollects = {

									stage:{
										data: address
									}
								}
								console.log('THE ORDERCOLLECTS IS UNDEFINED')
		
								localStorage.setItem('ordercollects',sb.sb_jsToJson(ordercollects))
								tool.identifiers.current = stage
								tool.identifiers.steps[tool.identifiers.current].completed = true

							}

						}else{

							address[inputs[i].name] = inputs[i].value
						}
					}

					

				},
				capturePayment: function(tool,els,stage,ev){


					var sb = that.sb

					sb.sb_stopEventBubble(ev)
					sb.sb_preventNormal(ev)
					var paymentForm = sb.sb_getById('capture-card')
					
					var inputs = sb.sb_getByTag(paymentForm,'input')
					var card = {}
					

					for(var i=0; i < inputs.length; i++){

						if(inputs[i].value === '' || inputs[i].value.length < 2){
							break;

						}else if(i === inputs.length - 1){

							
							card[inputs[i].name] = inputs[i].value

							

							if(localStorage.ordercollects){

								var ordercollects = sb.sb_jsonToJs(localStorage.getItem('ordercollects'))

								if(ordercollects[stage] === undefined){

									ordercollects[stage] = {
										data: card
									}
	
									tool.identifiers.current = stage
									tool.identifiers.steps[tool.identifiers.current].completed = true
	
									console.log('ordercollects save undefined stage')
									console.log(ordercollects)
									localStorage.setItem('ordercollects',sb.sb_jsToJson(ordercollects))
									
	
								}else{
	
									ordercollects[stage].data = card
									tool.identifiers.current = stage
									tool.identifiers.steps[tool.identifiers.current].completed = true
								}

							}else{

									
								var ordercollects = {

									stage:{
										data: card
									}
								}
								console.log('THE ORDERCOLLECTS IS UNDEFINED')
		
								localStorage.setItem('ordercollects',sb.sb_jsToJson(ordercollects))
								tool.identifiers.current = stage
								tool.identifiers.steps[tool.identifiers.current].completed = true

							}

							

						}else{

							card[inputs[i].name] = inputs[i].value
						}
					}



				},
				orderPlaced: function(data){

					var sb = that.sb

					
					var received = sb.sb_createElement('article')
					var plasuc = sb.sb_createElement('div')
					var placed = sb.sb_createElement('div')
					var remark = sb.sb_createElement('div')
					var track = sb.sb_createElement('div')
					var manage = sb.sb_createElement('div')
					var success = sb.sb_createElement('span')
					var successBtn = sb.sb_createElement('button')
					var completed = sb.sb_createElement('span')
					var placedText = sb.sb_createElement('p')
					var remarkText = sb.sb_createElement('p')
					var trackText = sb.sb_createElement('a')
					var manageText = sb.sb_createElement('span')

				
					sb.sb_addProperty(success,'class','d-inline-block font-fd-xxx-tn fg-dark-lt')
					sb.sb_addProperty(plasuc,'class','d-block font-fd-xxx-tn mg-bottom-fd-xxx-sm mg-left-fl-xx-sm')
					sb.sb_addProperty(placed,'class','d-block mg-bottom-fd-xxx-sm mg-left-fl-xx-tn')
					sb.sb_addProperty(remark,'class','d-block mg-bottom-fd-md mg-left-fl-xx-tn')
					sb.sb_addProperty(track,'class','d-block mg-bottom-fd-tn mg-left-fl-x-tn')
					sb.sb_addProperty(manage,'class','link d-block pos-fd hr-size-fl-xx-bg bottom-offset-0 bg-light pd-top-fd-xxx-sm pd-bottom-fd-xx-bt z-index')

					sb.sb_addProperty(placedText,'class','d-block font-fd-xxx-sm fg-dk-green')
					sb.sb_addProperty(remarkText,'class','d-block font-fd-x-tn fg-dark hr-size-fl-bg text-align-center')
					sb.sb_addProperty(trackText,'class','d-block font-fd-x-tn pd-top-fd-xx-tn text-align-center link pd-bottom-fd-xx-tn bd-fd-dark-green-x-bt bd-rad-bt hr-size-fl-xx-lg fg-secondary')
					sb.sb_addProperty(trackText,'href','orderstatus.html')
					sb.sb_addProperty(manageText,'class','d-block font-fd-x-tn pd-top-fd-xx-tn text-align-center pd-bottom-fd-xx-tn bg-secondary hr-size-fl-xx-bg fg-light')
					
				


					sb.sb_addProperty(successBtn,'class','mg-bottom-fd-x-tn vt-size-fd-xxx-tn  mg-right-fd-xx-sm bd-rad-fl-md bd-none hr-size-fd-xx-bg bg-dk-green fg-light pos-rel')
					sb.sb_addProperty(received,'class','hr-size-fl-xx-bg mg-bottom-fd-hg pos-rel top-offset-vh-x-tn')

				
					sb.sb_addProperty(completed,'class','font-fd-xxx-sm form__checkbox_button')

					sb.sb_insertInner(completed,'&#10003;')
					sb.sb_insertInner(placedText,'Order successfully placed')
					sb.sb_insertInner(remarkText,'Good news pal, your order #'+data.order.order_no+' has been placed is being proccessed')
					sb.sb_insertInner(trackText,'Track Order')
					sb.sb_insertInner(manageText,'View Order')
					sb.sb_insertInner(sb.view,'')

					sb.sb_addChild(successBtn,completed)
					sb.sb_addChild(success,successBtn)
					sb.sb_addChild(plasuc,success)
					sb.sb_addChild(placed,placedText)
					sb.sb_addChild(remark,remarkText)
					sb.sb_addChild(track,trackText)
					sb.sb_addChild(manage,manageText)
					sb.sb_addChild(received,plasuc)
					sb.sb_addChild(received,placed)
					sb.sb_addChild(received,remark)
					sb.sb_addChild(received,track)
					sb.sb_addChild(received,manage)
					sb.sb_addChild(sb.view,received)

					localStorage.setItem('orderno',sb.sb_jsToJson({orderno: data.order.order_no}))




				}
				
				

			},
			functions:{



				cart : function(evt){

					var sb = that.sb
					window.location.href = 'kart.html'
				
				},
				delivery : function(tool,els){
				
						var sb = that.sb
						console.log('The delivery function runs')

						var methods = [

							{label:'Instore Serve',value: 'instore',run: tool.events.save},
							{label:'Takeaway',value:'takeaway',run: tool.events.save},
							{label:'Home delivery',value:'home',run: tool.events.reveal}
						]
						var revealContent = {

							address: {
								control: {
									name: 'input',
									type: 'text',
									placeholder:'Street address',
									text: '',
									id:'address',
									style: {
										parents: {

											list: 'list__item list__item--ve list__item--marg-offset-bottom-small pd-left-fd-tn pd-top-fd-bt',
											span: ' hr-size-fl-xx-bg text-align-center bg-dark-lta fg-dark bd-rad-x-bt pd-fd-xxx-tn d-block mg-top-fd-bt font-fd-x-tn',
											small: 'd-block  mg-bottom-fd-xxx-tn font-fd-xx-tn fg-secondary',
										},
										me:'bg-transparent hr-size-fl-xx-bg pd-fd-bt bd-none'
									}
								}
							},
							city:  {
								control: {
									name: 'input',
									type: 'text',
									placeholder:'Your city',
									text:'',
									id:'city',
									style: {
										parents: {

											list: 'list__item list__item--ve  list__item--marg-offset-bottom-small pd-left-fd-tn pd-top-fd-bt',
											span: ' pd-fd-xxx-tn hr-size-fl-xx-bg text-align-center bg-dark-lta fg-dark bd-rad-x-bt d-block mg-top-fd-bt font-fd-x-tn',
											small: 'd-block  mg-bottom-fd-xxx-tn font-fd-xx-tn fg-secondary',
										},
										me:'bg-transparent hr-size-fl-xx-bg pd-fd-bt bd-none'
									}
								}
							},
							province:  {
								control: {
									name:'input',
									type: 'text',
									placeholder:'Province',
									text: '',
									id: 'province',
									style: {
										parents: {

											list: 'list__item  d-inline-block hr-size-fl-sm list__item--ve  list__item--marg-offset-bottom-small pd-top-fd-bt',
											span: ' pd-fd-xxx-tn hr-size-fl-lg text-align-center bg-dark-lta fg-dark bd-rad-x-bt d-block mg-top-fd-bt font-fd-x-tn',
											small: 'd-block  mg-bottom-fd-xxx-tn font-fd-xx-tn fg-secondary',
										},
										me:'bg-transparent hr-size-fl-xx-bg pd-fd-bt bd-none'
									}
								}
							},
							code:  {
								control: {
									name: 'input',
									type: 'text',
									placeholder:'Postal code',
									text: '',
									id:'code',
									style: {
										parents: {

											list: 'list__item  d-inline-block hr-size-fl-sm list__item--ve  list__item--marg-offset-bottom-small',
											span: ' pd-fd-xxx-tn hr-size-fl-lg text-align-center bg-dark-lta fg-dark bd-rad-x-bt pd-fd-bt d-block mg-top-fd-bt font-fd-x-tn',
											small: 'd-block mg-bottom-fd-xxx-tn font-fd-xx-tn fg-secondary',
										},
										me:'bg-transparent hr-size-fl-xx-bg pd-fd-bt bd-none'
									}
								}
							},
							save:  {

								control: {
									name: 'input',
									type: 'submit',
									placeholder:'Postal code',
									text: 'Save',
									id:'capture_address',
									style: {
										parents: {

											list: 'list__item  d-inline-block hr-size-fl-sm list__item--ve  list__item--marg-offset-bottom-small',
											span: ' pd-fd-xxx-tn hr-size-fl-lg text-align-center fg-dark bd-rad-x-bt pd-fd-bt d-block mg-top-fd-bt font-fd-x-tn',
											small: 'd-block mg-bottom-fd-xxx-tn font-fd-xx-tn fg-secondary',
										},
										me:'hr-size-fl-xx-bg bg-dark fg-light d-inline-block pd-fd-bt bd-none'
									},
									event: tool.events.captureAddress
								}
							}

						}
						var homeReveal = sb.sb_createElement('form')
						var lst = sb.sb_createElement('ul')





						var stageContent = sb.sb_createElement('section')
						var legend = sb.sb_createElement('h1')

						var optionsForm = sb.sb_createElement('form')
						var optionList = sb.sb_createElement('ul')
						sb.sb_addProperty(optionsForm,'class','form')
						sb.sb_addProperty(optionList,'class','list list--hr list--none')

						sb.sb_addProperty(homeReveal,'class','form mg-top-fd-md mg-bottom-fd-md pd-left-fl-x-bt')
						sb.sb_addProperty(homeReveal,'id','capture-address')
						sb.sb_addProperty(lst,'class','list list--hr list--none')
		   
		   
						sb.sb_addChild(optionsForm,optionList)
						sb.sb_addChild(homeReveal,lst)

						for(item in revealContent){

							var li = sb.sb_createElement('li')
							var lb = sb.sb_createElement('small')
							var sp = sb.sb_createElement('span')
							var input = sb.sb_createElement(revealContent[item].control.name)
							sb.sb_addProperty(li,'class',revealContent[item].control.style.parents.list)
							sb.sb_addProperty(lb,'class',revealContent[item].control.style.parents.small)
							sb.sb_addProperty(sp,'class',revealContent[item].control.style.parents.span)
							sb.sb_addProperty(input,'class',revealContent[item].control.style.me)
							sb.sb_addProperty(input,'type',revealContent[item].control.type)
							sb.sb_addProperty(input,'placeholder',revealContent[item].control.placeholder)
							sb.sb_addProperty(input,'value',revealContent[item].control.text)
							sb.sb_addProperty(input,'name',revealContent[item].control.id)

							if(revealContent[item].control.event !== undefined){

								sb.sb_addEvent(input,'click',revealContent[item].control.event.bind(this,tool,els,'delivery'))
							}
							// sb.sb_addProperty(input,'name',revealContent[item].control.id)
				
							if(item !== 'save'){

								sb.sb_insertInner(lb,item)

							}
							
							// sb.sb_insertInner(sp,userData[id])
							sb.sb_addChild(sp,input)
							sb.sb_addChild(li,lb)
							sb.sb_addChild(li,sp)
							sb.sb_addChild(lst,li)
				
						}
				
				

						for(var i=0;i < methods.length; i++){


						
							  console.log('function name')
							  console.log(methods[i].run.name)
			   
							   var uli = sb.sb_createElement('li')
							   var usp = sb.sb_createElement('span')   
							   var updator = sb.sb_createElement('input')
							   var updatorLabel = sb.sb_createElement('label')
							   var updatorLabelSp = sb.sb_createElement('span')
							   var uinputId = sb.sb_createElement('input')
							   var uinputPrice = sb.sb_createElement('input')
							   var uinputName = sb.sb_createElement('input')
							   var radioCont = sb.sb_createElement('div')
							   var idCont = sb.sb_createElement('div')
							   var priceCont = sb.sb_createElement('div')
			   
							   sb.sb_addProperty(uli,'class','list__item form__radio__group list__item--ve list__item--border-bottom-secondary list__item--marg-offset-bottom-small d-block hr-size-fl-bg cursor-pointer pd-left-fd-tn pd-top-fd-bt')
							   sb.sb_addProperty(usp,'class','mg-left-fl-tn d-inline-block mg-top-fd-bt font-fd-xx-tn')
							   
							   sb.sb_addProperty(updator,'type','radio')
							   sb.sb_addProperty(updator,'name','updator')
							   sb.sb_addProperty(updator,'id','updator')
							   sb.sb_addProperty(updator,'value',methods[i].value)
							   sb.sb_addProperty(updator,'class','form__radio__group')
			   
							   sb.sb_addProperty(updatorLabel,'type','label')
							   sb.sb_addProperty(updatorLabel,'for','updator')
							   sb.sb_addProperty(updatorLabel,'class','form__radio__label')
							   sb.sb_addProperty(updatorLabelSp,'class','form__radio__button')
			   
			   
							//    sb.sb_addProperty(uinputId,'type','hidden')
							//    sb.sb_addProperty(uinputId,'name','product_id')
							//    sb.sb_addProperty(uinputId,'value','sampleid')
					   
							//    sb.sb_addProperty(uinputPrice,'type','hidden')
							//    sb.sb_addProperty(uinputPrice,'name','product_price')
							//    sb.sb_addProperty(uinputPrice,'value','sampleprice')
					   
							   
							//    sb.sb_addProperty(uinputName,'type','hidden')
							//    sb.sb_addProperty(uinputName,'name','product_name')
							//    sb.sb_addProperty(uinputName,'value','sampleproducts')
			   
							   sb.sb_addProperty(radioCont,'class','d-inline-block pd-left-fl-x-bt hr-size-fl-xxx-sm')
							   sb.sb_addProperty(idCont,'class','d-inline-block font-fd-xx-tn hr-size-fl-xxx-sm')
							   sb.sb_addProperty(priceCont,'class','d-inline-block font-fd-xx-tn hr-size-fl-xxx-sm')
			   
						   
							   sb.sb_insertInner(idCont,methods[i].label)
							//    sb.sb_insertInner(priceCont,'R854')

							   if(methods[i].run.name === 'save'){

								 sb.sb_addEvent(updator,'click',methods[i].run.bind(this,tool,els,'delivery'))

							   }else{

								 sb.sb_addEvent(updator,'click',methods[i].run.bind(this,tool,els,homeReveal,uli,'delivery'))	

							   }
							  
			   
							   sb.sb_addChild(optionList,uli)
							   sb.sb_addChild(uli,radioCont)
							   sb.sb_addChild(uli,idCont)
							//    sb.sb_addChild(uli,priceCont)
							   sb.sb_addChild(updatorLabel,updatorLabelSp)
							   sb.sb_addChild(updator,updatorLabel)
							   sb.sb_addChild(radioCont,updator)

							  
						   
			   
							
						}

						sb.sb_addProperty(stageContent,'class','hr-size-fl-xx-lg mg-auto')
						sb.sb_addProperty(legend,'class','bg-secondary bd-left-fd-dark-bt pd-left-fd-xxx-tn hr-size-fl-lg fg-light font-wt-bolder mg-bottom-fd-md font-fd-tn ')
						

						sb.sb_insertInner(legend,'Delivery Method')

						
						sb.sb_addChild(stageContent,legend)
						sb.sb_addChild(stageContent,optionsForm)
						sb.sb_addChild(els.main,stageContent)

						tool.identifiers.steps['delivery'].called = true

					
						// tool.identifiers.current = 'delivery'
					


				
						
				
				
				},
				payment : function(tool,els){
				
				
					   var sb = that.sb
						console.log('The payment function runs')

						var methods = [

							{label:'Cashpay',value:'cashpay',run: tool.events.save},
							{label:'Paypal',value:'paypal',run: tool.events.save},
							{label:'Visa',value:'visa',run: tool.events.reveal}
						]

						var revealContent = {

							['card holder']: {
								control: {
									name: 'input',
									type: 'text',
									placeholder:"Card holder's name",
									text: '',
									id:'owner',
									style: {
										parents: {

											list: 'list__item list__item--ve list__item--marg-offset-bottom-small pd-left-fd-tn pd-top-fd-bt',
											span: ' hr-size-fl-xx-bg text-align-center bg-dark-lta fg-dark bd-rad-x-bt pd-fd-xxx-tn d-block mg-top-fd-bt font-fd-x-tn',
											small: 'd-block  mg-bottom-fd-xxx-tn font-fd-xx-tn fg-secondary',
										},
										me:'bg-transparent hr-size-fl-xx-bg pd-fd-bt bd-none'
									}
								}
							},
							['card number']:  {
								control: {
									name: 'input',
									type: 'text',
									placeholder:'0000 0000 000 000 000',
									text:'',
									id:'card_number',
									style: {
										parents: {

											list: 'list__item list__item--ve  list__item--marg-offset-bottom-small pd-left-fd-tn pd-top-fd-bt',
											span: ' pd-fd-xxx-tn hr-size-fl-lg text-align-center bg-dark-lta fg-dark bd-rad-x-bt d-block mg-top-fd-bt font-fd-x-tn',
											small: 'd-block  mg-bottom-fd-xxx-tn font-fd-xx-tn fg-secondary',
										},
										me:'bg-transparent hr-size-fl-xx-bg pd-fd-bt bd-none'
									}
								}
							},
							expiry:  {
								control: {
									name:'input',
									type: 'text',
									placeholder:'05/2020',
									text: '',
									id:'expiry',
									style: {
										parents: {

											list: 'list__item  d-inline-block hr-size-fl-sm list__item--ve  list__item--marg-offset-bottom-small pd-top-fd-bt',
											span: ' pd-fd-xxx-tn hr-size-fl-lg text-align-center bg-dark-lta fg-dark bd-rad-x-bt d-block mg-top-fd-bt font-fd-x-tn',
											small: 'd-block  mg-bottom-fd-xxx-tn font-fd-xx-tn fg-secondary',
										},
										me:'bg-transparent hr-size-fl-xx-bg pd-fd-bt bd-none'
									}
								}
							},
							cvv:  {
								control: {
									name: 'input',
									type: 'text',
									placeholder:'000',
									text: '',
									id:'cvv',
									style: {
										parents: {

											list: 'list__item  d-inline-block hr-size-fl-sm list__item--ve  list__item--marg-offset-bottom-small',
											span: ' pd-fd-xxx-tn hr-size-fl-lg text-align-center bg-dark-lta fg-dark bd-rad-x-bt pd-fd-bt d-block mg-top-fd-bt font-fd-x-tn',
											small: 'd-block mg-bottom-fd-xxx-tn font-fd-xx-tn fg-secondary',
										},
										me:'bg-transparent hr-size-fl-xx-bg pd-fd-bt bd-none'
									}
								}
							},
							save:  {

								control: {
									name: 'input',
									type: 'submit',
									placeholder:'Postal code',
									text: 'Save',
									id: 'save',
									style: {
										parents: {

											list: 'list__item  d-inline-block hr-size-fl-sm list__item--ve  list__item--marg-offset-bottom-small',
											span: ' pd-fd-xxx-tn hr-size-fl-lg text-align-center fg-dark bd-rad-x-bt pd-fd-bt d-block mg-top-fd-bt font-fd-x-tn',
											small: 'd-block mg-bottom-fd-xxx-tn font-fd-xx-tn fg-secondary',
										},
										me:'hr-size-fl-xx-bg bg-dark fg-light d-inline-block pd-fd-bt bd-none'
									},
									event: tool.events.capturePayment
								}
							}

						}
						var reveal = sb.sb_createElement('form')
						var lst = sb.sb_createElement('ul')
					

						var stageContent = sb.sb_createElement('section')
						var legend = sb.sb_createElement('h1')

						var optionsForm = sb.sb_createElement('form')
						var optionList = sb.sb_createElement('ul')
						sb.sb_addProperty(optionsForm,'class','form')
						sb.sb_addProperty(optionList,'class','list list--hr list--none')

						sb.sb_addProperty(reveal,'class','form mg-top-fd-md mg-bottom-fd-md pd-left-fl-x-bt')
						sb.sb_addProperty(lst,'class','list list--hr list--none')
		   
		   
						sb.sb_addChild(optionsForm,optionList)
						sb.sb_addChild(reveal,lst)

						for(item in revealContent){

							var li = sb.sb_createElement('li')
							var lb = sb.sb_createElement('small')
							var sp = sb.sb_createElement('span')
							var input = sb.sb_createElement(revealContent[item].control.name)
							sb.sb_addProperty(li,'class',revealContent[item].control.style.parents.list)
							sb.sb_addProperty(lb,'class',revealContent[item].control.style.parents.small)
							sb.sb_addProperty(sp,'class',revealContent[item].control.style.parents.span)
							sb.sb_addProperty(input,'class',revealContent[item].control.style.me)
							sb.sb_addProperty(input,'type',revealContent[item].control.type)
							sb.sb_addProperty(input,'placeholder',revealContent[item].control.placeholder)
							sb.sb_addProperty(input,'value',revealContent[item].control.text)
							sb.sb_addProperty(input,'name',revealContent[item].control.id)
							// sb.sb_addProperty(input,'name',revealContent[item].control.id)
				
							if(item !== 'save'){

								sb.sb_insertInner(lb,item)

							}

							if(revealContent[item].control.event !== undefined){

								sb.sb_addEvent(input,'click',revealContent[item].control.event.bind(this,tool,els,'payment'))
							}
							
							// sb.sb_insertInner(sp,userData[id])
							sb.sb_addChild(sp,input)
							sb.sb_addChild(li,lb)
							sb.sb_addChild(li,sp)
							sb.sb_addChild(lst,li)
				
						}

						for(var i=0;i < methods.length; i++){


						
			   
						
			   
							   var uli = sb.sb_createElement('li')
							   var usp = sb.sb_createElement('span')   
							   var updator = sb.sb_createElement('input')
							   var updatorLabel = sb.sb_createElement('label')
							   var updatorLabelSp = sb.sb_createElement('span')
							   var uinputId = sb.sb_createElement('input')
							   var uinputPrice = sb.sb_createElement('input')
							   var uinputName = sb.sb_createElement('input')
							   var radioCont = sb.sb_createElement('div')
							   var idCont = sb.sb_createElement('div')
							   var priceCont = sb.sb_createElement('div')
			   
							   sb.sb_addProperty(uli,'class','list__item form__radio__group list__item--ve list__item--border-bottom-secondary list__item--marg-offset-bottom-small d-block hr-size-fl-bg cursor-pointer pd-left-fd-tn pd-top-fd-bt')
							   sb.sb_addProperty(usp,'class','mg-left-fl-tn d-inline-block mg-top-fd-bt font-fd-xx-tn')
							   
							   sb.sb_addProperty(updator,'type','radio')
							   sb.sb_addProperty(updator,'name','updator')
							   sb.sb_addProperty(updator,'id','updator')
							   sb.sb_addProperty(updator,'value',methods[i].value)
							   sb.sb_addProperty(updator,'class','form__radio__group')
			   
							   sb.sb_addProperty(updatorLabel,'type','label')
							   sb.sb_addProperty(updatorLabel,'for','updator')
							   sb.sb_addProperty(updatorLabel,'class','form__radio__label')
							   sb.sb_addProperty(updatorLabelSp,'class','form__radio__button')
			   
			   
							//    sb.sb_addProperty(uinputId,'type','hidden')
							//    sb.sb_addProperty(uinputId,'name','product_id')
							//    sb.sb_addProperty(uinputId,'value','sampleid')
					   
							//    sb.sb_addProperty(uinputPrice,'type','hidden')
							//    sb.sb_addProperty(uinputPrice,'name','product_price')
							//    sb.sb_addProperty(uinputPrice,'value','sampleprice')
					   
							   
							//    sb.sb_addProperty(uinputName,'type','hidden')
							//    sb.sb_addProperty(uinputName,'name','product_name')
							//    sb.sb_addProperty(uinputName,'value','sampleproducts')
			   
							   sb.sb_addProperty(radioCont,'class','d-inline-block pd-left-fl-x-bt hr-size-fl-xxx-sm')
							   sb.sb_addProperty(idCont,'class','d-inline-block font-fd-xx-tn hr-size-fl-xxx-sm')
							   sb.sb_addProperty(priceCont,'class','d-inline-block font-fd-xx-tn hr-size-fl-xxx-sm')
			   
						   
							   sb.sb_insertInner(idCont,methods[i].label)
							//    sb.sb_insertInner(priceCont,'R854')

								if(methods[i].run.name === 'save'){

									sb.sb_addEvent(updator,'click',methods[i].run.bind(this,tool,els,'payment'))

								}else{

									sb.sb_addEvent(updator,'click',methods[i].run.bind(this,tool,els,reveal,uli,'payment'))	

								}
			   
							   sb.sb_addChild(optionList,uli)
							   sb.sb_addChild(uli,radioCont)
							   sb.sb_addChild(uli,idCont)
							//    sb.sb_addChild(uli,priceCont)
							   sb.sb_addChild(updatorLabel,updatorLabelSp)
							   sb.sb_addChild(updator,updatorLabel)
							   sb.sb_addChild(radioCont,updator)

							  
						   
			   
							
						}

						sb.sb_addProperty(stageContent,'class','hr-size-fl-xx-lg mg-auto')
						sb.sb_addProperty(legend,'class','bg-secondary bd-left-fd-dark-bt pd-left-fd-xxx-tn hr-size-fl-lg fg-light font-wt-bolder mg-bottom-fd-md font-fd-tn ')
						

						sb.sb_insertInner(legend,'Paying With')
						sb.sb_insertInner(els.main,'')
						
						sb.sb_addChild(stageContent,legend)
						sb.sb_addChild(stageContent,optionsForm)
						
						sb.sb_addChild(els.main,stageContent)

						sb.sb_insertInner(els.buttons[tool.identifiers.steps['payment'].previous],' ')
						sb.sb_addChild(els.buttons[tool.identifiers.steps['payment'].previous],sb.sb_copyDeep(els.completed))
						sb.sb_addChild(els.buttons['payment'],els.active)

						tool.identifiers.steps['payment'].called = true


						// tool.identifiers.current = 'delivery'
					


				
				
				
				},
				confirm: function(tool,els){

					console.log('The confirm runs')
					var sb = that.sb
					var order = {}

					var stageContent = sb.sb_createElement('section')
					var legend = sb.sb_createElement('h1')
					var address = sb.sb_createElement('h1')
					var paymethod = sb.sb_createElement('h1')
					var deliverydetails = ''
					var paymentdetails = ''


					var ordercollects = sb.sb_jsonToJs(localStorage.ordercollects)
					var cart = ordercollects.cart.data.cart
					var total = ordercollects.cart.data.extras
					var deliverymethod = ordercollects.delivery.data
					var paymentmethod = ordercollects.payment.data

					console.log('THE PAY METHOD')
					console.log(deliverymethod)
					console.log(paymentmethod)
					console.log(ordercollects)

					if(deliverymethod instanceof Object){

						deliverydetails = deliverymethod.address +',' + deliverymethod.city+',' + deliverymethod.code						
						
					}else{

						deliverydetails = deliverymethod
					}

					if(paymentmethod instanceof Object){

						paymentdetails = paymentmethod.owner +',' + paymentmethod.card_number+',' + paymentmethod.cvv						
						
					}else{

						paymentdetails = paymentmethod
					}

					var date = new Date()
					var year = date.getFullYear()
					var month = date.getMonth()
					var yearDate = date.getDate()
					var hour = date.getHours()
					var minutes = date.getMinutes()

					ordercollects.date = (year+'/'+month+'/'+yearDate+'/'+hour+'/'+minutes)

					order.date = ordercollects.date
					order.address = deliverydetails
					order.payment = paymentdetails
					order.cart = cart
					order.total = total
					order.username = sb.sb_jsonToJs(localStorage.login).username

					if(localStorage.order){

						localStorage.removeItem('order')
						localStorage.setItem('order',sb.sb_jsToJson(order))
					}else{

						localStorage.setItem('order',sb.sb_jsToJson(order))

					}
					

					console.log('The ordercollects data')
					console.log(order)



					var lst = sb.sb_createElement('ul')
					sb.sb_addProperty(lst,'class','list list-none')
					var addressD = sb.sb_createElement('section')
					var paymentD = sb.sb_createElement('section')
					// sb.sb_addChild(els.main,lst)

					for(var p = 0; p < cart.length; p++){

						let li = sb.sb_createElement('li')
						sb.sb_addProperty(li,'class','hr-size-fl-xx-bg cursor-pointer fd-font-x-tn mg-bottom-fd-xxx-tn pd-left-fl-bt bg-light pos-rel d-block bd-bottom-fd-secondary-xx-bt pd-bottom-fd-tn pd-top-fd-tn')
						// sb.sb_addProperty(li,'data-navigata-page','detail')
						// sb.sb_addProperty(li,'data-navigata-data','[{data: '+itemData.item_id+',page: detail,endpoint: /detail}]')




						let sp = sb.sb_createElement('span')
						let sp2 = sb.sb_createElement('span')
						let sp3 = sb.sb_createElement('span')
						let img = sb.sb_createElement('img')
						let input = sb.sb_createElement('span')
						let rm = sb.sb_createElement('span')
						let st = sb.sb_createElement('strong')
						let small = sb.sb_createElement('small')
						let smallSp = sb.sb_createElement('span')
						let priceSp = sb.sb_createElement('span')
						
			
			
			
						sb.sb_addProperty(img,'src','img/fish.jpg')
						sb.sb_addProperty(img,'class','hr-size-fl-xx-md mg-left-fl-xx-sm bd-rad-bt pos-rel')
						// sb.sb_addProperty(fm,'class','hr-fl-size-xx-bg mg-top-fl-x-tn mg-bottom-fd-sm pos-rel')
						// sb.sb_addProperty(fm,'id',ct+'-form')
						// sb.sb_addProperty(minus,'class','hr-size-fl-xxx-sm cursor-pointer float-left vt-size-fd-bt d-inline-block bg-light bd-bottom-left-rad-fd-xx-bt bd-top-left-rad-fd-xx-bt bd-fd-secondary-xx-bt pd-fd-xx-tn text-align-center  font-fd-xx-tn font-wt-bolder  pos-rel')
						// sb.sb_addProperty(minus,'id',ct)
						// sb.sb_addEvent(minus,'click',this.removeFromCart.bind(this))
						// sb.sb_addProperty(add,'class','hr-size-fl-xxx-sm cursor-pointer float-left vt-size-fd-bt d-inline-block  bg-light bd-bottom-right-rad-fd-xx-bt bd-top-right-rad-fd-xx-bt bd-fd-secondary-xx-bt pd-fd-xx-tn text-align-center font-wt-bolder  font-fd-xx-tn pos-rel')
						// sb.sb_addProperty(add,'id',ct)
						// sb.sb_addEvent(add,'click',this.addToCart.bind(this))
						// sb.sb_addProperty(input,'class','vt-size-fd-bt float-left bg-secondary font-fd-xx-tn text-align-center fg-light font-wt-bolder d-inline-block hr-size-fd-md pd-fd-xx-tn bd-fd-secondary-xx-bt ')
						sb.sb_addProperty(rm,'class',' font-fd-x-tn text-align-center fg-secondary font-wt-bolder pd-fd-xxx-tn d-inline-block hr-size-fd-xx-sm pos-rel right-offset-fl-bt top-offset-fl-xxx-tn ')
						// sb.sb_addProperty(input,'placeholder','0')
						// sb.sb_addEvent(input,'input',this.updateCart.bind(this))
						sb.sb_addProperty(small,'class','pd-left-fd-xx-tn d-block pos-rel mg-top-fd-tn')
						sb.sb_addProperty(smallSp,'class','d-inline-block font-wt-bolder fg-secondary font-fd-xx-tn pos-rel')
						sb.sb_addProperty(priceSp,'class','d-inline-block font-wt-bolder fg-secondary font-fd-xx-tn pos-rel')
						sb.sb_addProperty(st,'class','clearfix')
						
						sb.sb_addProperty(sp,'class','hr-size-fl-xx-sm d-inline-block float-left')
						sb.sb_addProperty(sp2,'class','hr-size-fl-md pd-left-fl-bt font-fd-x-tn d-inline-block float-left')
						sb.sb_addProperty(sp3,'class','hr-size-fl-xxx-tn d-inline-block float-left')
						sb.sb_insertInner(rm,cart[p].productQty+'x')
						sb.sb_insertInner(sp2,cart[p].productName)
						// sb.sb_insertInner(minus,'-')
						sb.sb_insertInner(input,cart[p].productQty)
						// sb.sb_insertInner(add,'+')
						sb.sb_insertInner(priceSp,'R'+cart[p].productPrice)
					
						
						
					
						sb.sb_addChild(sp,img)
						
						// sb.sb_addChild(sp3,minus)
						// sb.sb_addChild(sp3,input)
						// sb.sb_addChild(sp3,add)
						sb.sb_addChild(sp3,rm)
						// sb.sb_addChild(sp3,fm)
						// sb.sb_addChild(small,smallSp)
						sb.sb_addChild(small,priceSp)
						sb.sb_addChild(sp2,small)
						
						
						
						sb.sb_addChild(li,sp3)
						sb.sb_addChild(li,sp2)
						sb.sb_addChild(li,sp)
						sb.sb_addChild(li,st)
						sb.sb_addChild(lst,li)
						
						
					}

				



					sb.sb_addProperty(stageContent,'class','hr-size-fl-xx-lg mg-bottom-fd-hg mg-auto')
					sb.sb_addProperty(legend,'class','bg-secondary  bd-left-fd-dark-bt pd-left-fd-xxx-tn hr-size-fl-lg fg-light font-wt-bolder mg-bottom-fd-md font-fd-tn ')
					sb.sb_addProperty(address,'class','bg-secondary mg-top-fd-tn bd-left-fd-dark-bt pd-left-fd-xxx-tn hr-size-fl-lg fg-light font-wt-bolder mg-bottom-fd-xxx-sm font-fd-tn ')
					sb.sb_addProperty(paymethod,'class','bg-secondary bd-left-fd-dark-bt pd-left-fd-xxx-tn hr-size-fl-lg fg-light font-wt-bolder mg-bottom-fd-xxx-sm font-fd-tn ')
					sb.sb_addProperty(addressD,'class','mg-bottom-fd-xxx-sm font-fd-xx-tn')
					sb.sb_addProperty(paymentD,'class','mg-bottom-fd-xxx-sm font-fd-xx-tn')
					

					sb.sb_insertInner(legend,'Order Summary')
					sb.sb_insertInner(address,'Delivery Address')
					sb.sb_insertInner(paymethod,'Payment Method')
					sb.sb_insertInner(addressD,deliverydetails)
					sb.sb_insertInner(paymentD,paymentdetails)
					sb.sb_insertInner(els.main,'')
					
					sb.sb_addChild(stageContent,legend)
					sb.sb_addChild(stageContent,lst)
					sb.sb_addChild(stageContent,address)
					sb.sb_addChild(stageContent,addressD)
					sb.sb_addChild(stageContent,paymethod)
					sb.sb_addChild(stageContent,paymentD)
					// sb.sb_addChild(stageContent,optionsForm)
					
					sb.sb_addChild(els.main,stageContent)


					sb.sb_insertInner(els.buttons[tool.identifiers.steps['confirm'].previous],' ')
					sb.sb_addChild(els.buttons[tool.identifiers.steps['confirm'].previous],sb.sb_copyDeep(els.completed))
					sb.sb_addChild(els.buttons['confirm'],els.active)

					tool.identifiers.current = 'confirm'
					tool.identifiers.steps[tool.identifiers.current].completed = true

					tool.identifiers.steps['confirm'].called = true
				},

				order: function(tool,els){

					var sb = that.sb

					var order = sb.sb_jsonToJs(localStorage.order)
					var order = sb.sb_jsToJson(order)
					console.log('The Order Function runs, about to submit the order')

					var url = 'https://smarfoapi.herokuapp.com/smarfo/order'
					//var url = 'http://localhost:3000/smarfo/order'

					success = success 
					fail = fail
					type = 'json'
					method = 'post'
					
					that.messenger({url: url,data:order,success: success.bind(this),fail: fail.bind(),type: type,method:method})
					
					function success(data){

						console.log('The order data from the server')
						localStorage.removeItem('cart')
						localStorage.removeItem('ordercollects')
						localStorage.removeItem('order')
						console.log('LOCAL STORAGE')
						console.log(localStorage)
						console.log(data)

						var placedOder = sb.sb_jsonToJs(data)

						tool.events.orderPlaced(placedOder)
					}
					function fail(data){

						console.log('The failed request order data')
						console.log(data)

					}
			

				}




			},
			identifiers:{

				current: 'cart',
				steps : {

					cart:{
						
						previous: ' ',
						next: 'delivery',
						completed: true,
						called: true
					},
					delivery: {
						
						previous: 'cart',
						next: 'payment',
						completed: false,
						called: false
					},
					payment:{
			
						previous: 'delivery',
						next: 'confirm',
						completed: false,
						called: false
					},
					confirm:{
			
						previous: 'payment',
						next: 'order',
						completed: false,
						called: false
					},

					order:{
			
						previous: 'confirm',
						next: 'order',
						completed: false,
						called: false
					}
			
			
				}
				
			}
			
		

		}
	}

	if(tools[id]){

		return tools[id]
	}

  
}


Component.prototype.kart = function(data){
	  
	  var sb = this.sb
	  var tools = this.tools('cart')
	  var cart = sb.sb_createElement('article')
	  sb.sb_addProperty(cart,'class','hr-size-fl-xx-bg top-offset-vh-xx-tn mg-bottom-fd-hg pos-abs')

	
		var cartstate = tools.functions.getCart()

			
			if(typeof cartstate.empty !== undefined){
				
				if(cartstate.empty === true){
					
					var empty = sb.sb_createElement('div')
					var clear = sb.sb_createElement('div')
					var img = sb.sb_createElement('img')
					sb.sb_addProperty(empty,'class','left-offset-fl-x-tn fg-secondary font-fd-xx-sm top-offset-vh-md mg-bottom-fd-hg pos-abs')
					sb.sb_addProperty(clear,'class','left-offset-0 fg-secondary font-fd-xx-sm top-offset-vh-bt hr-size-fl-xx-bg pos-abs')
					sb.sb_addProperty(img,'src','img/clear.png')
					sb.sb_addProperty(img,'class','hr-size-fl-lg mg-left-fl-xxx-tn d-block bd-rad-bt pos-rel')
					sb.sb_insertInner(empty,'Your cart is empty')
					sb.sb_addChild(clear,img)
					sb.sb_addChild(cart,clear)
					sb.sb_addChild(cart,empty)
					
				}else{
					
					console.log('THE CART IS')
					console.log(cartstate.cart)

					var cartDetails = sb.sb_createElement('div')
					var cartContent = sb.sb_createElement('section')
					var cartPrice = sb.sb_createElement('span')
					var cartLabel = sb.sb_createElement('span')
					var customise = sb.sb_createElement('a')
					var customiseBtn = sb.sb_createElement('span')
					
					var lst = sb.sb_createElement('ul')
					sb.sb_addProperty(cartDetails,'class','hr-size-fl-xx-bg bx-shadow bg-light font-fd-xx-sm top-offset-vh-xx-tn z-index pos-fd')
					sb.sb_addProperty(cartContent,'class','pd-left-fl-xxx-sm pd-top-fd-tn  vt-size-fd-xx-tn pos-rel')
					sb.sb_addProperty(cartPrice,'class','fg-secondary d-block mg-bottom-fd-x-bt  font-fd-sm  pos-rel')
					sb.sb_addProperty(cartLabel,'class','fg-general d-block font-fd-x-tn mg-left-fd-x-sm  pos-rel')
					sb.sb_addProperty(cart,'class','hr-size-fl-xx-bg top-offset-vh-x-sm mg-bottom-fd-hg pos-abs')
					sb.sb_addProperty(customise,'class','link d-block pos-fd hr-size-fl-xx-bg bottom-offset-0 bg-light pd-top-fd-xxx-sm pd-bottom-fd-xx-bt z-index')
					// sb.sb_addProperty(customise,'href','checkout.html')
				
					
					sb.sb_addProperty(customiseBtn,'class','d-inline-block font-fd-x-tn pd-top-fd-xx-tn text-align-center pd-bottom-fd-xx-tn bg-secondary hr-size-fl-xx-bg fg-light')
					sb.sb_insertInner(customiseBtn,'Checkout')
					var totalPrice = 0;

					for(var p = 0; p < cartstate.cart.length; p++){

						var price = cartstate.cart[p].productPrice * cartstate.cart[p].productQty
						totalPrice += price
					
					}

					sb.sb_insertInner(cartPrice,'R '+totalPrice.toFixed(2))
					sb.sb_insertInner(cartLabel,'Total Price')
					sb.sb_addChild(cartDetails,cartContent)
					sb.sb_addChild(cartContent,cartPrice)
					sb.sb_addChild(cartContent,cartLabel)
		            sb.sb_addChild(customise,customiseBtn)

					for(var p = 0; p < cartstate.cart.length; p++){

						let li = sb.sb_createElement('li')
						sb.sb_addProperty(li,'class','hr-size-fl-xx-bg cursor-pointer fd-font-x-tn mg-bottom-fd-tn pd-left-fl-bt bg-light pos-rel d-block bd-bottom-fd-secondary-xx-bt pd-bottom-fd-tn pd-top-fd-tn')
						// sb.sb_addProperty(li,'data-navigata-page','detail')
						// sb.sb_addProperty(li,'data-navigata-data','[{data: '+itemData.item_id+',page: detail,endpoint: /detail}]')




						let sp = sb.sb_createElement('span')
						let sp2 = sb.sb_createElement('span')
						let sp3 = sb.sb_createElement('span')
						let img = sb.sb_createElement('img')
						let input = sb.sb_createElement('span')
						let rm = sb.sb_createElement('span')
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
						sb.sb_addProperty(inputId,'value',cartstate.cart[p].productId)
			
						sb.sb_addProperty(inputPrice,'type','hidden')
						sb.sb_addProperty(inputPrice,'name','product_price')
						sb.sb_addProperty(inputPrice,'value',cartstate.cart[p].productPrice)
			
						
						sb.sb_addProperty(inputName,'type','hidden')
						sb.sb_addProperty(inputName,'name','product_name')
						sb.sb_addProperty(inputName,'value',cartstate.cart[p].productName)
			
						// sb.sb_addProperty(input,'type','number')
						// sb.sb_addProperty(input,'name','product_qty')
						// sb.sb_addProperty(input,'value',cartstate.cart[p].productQty)
						
			
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
					
			
			
						sb.sb_addProperty(img,'src','img/fish.jpg')
						sb.sb_addProperty(img,'class','hr-size-fl-xx-md bd-rad-bt pos-rel')
						sb.sb_addProperty(fm,'class','hr-fl-size-xx-bg mg-top-fl-x-tn mg-bottom-fd-sm pos-rel')
						// sb.sb_addProperty(fm,'id',ct+'-form')
						sb.sb_addProperty(minus,'class','hr-size-fl-xxx-sm cursor-pointer float-left vt-size-fd-bt d-inline-block bg-light bd-bottom-left-rad-fd-xx-bt bd-top-left-rad-fd-xx-bt bd-fd-secondary-xx-bt pd-fd-xx-tn text-align-center  font-fd-xx-tn font-wt-bolder  pos-rel')
						// sb.sb_addProperty(minus,'id',ct)
						// sb.sb_addEvent(minus,'click',this.removeFromCart.bind(this))
						sb.sb_addProperty(add,'class','hr-size-fl-xxx-sm cursor-pointer float-left vt-size-fd-bt d-inline-block  bg-light bd-bottom-right-rad-fd-xx-bt bd-top-right-rad-fd-xx-bt bd-fd-secondary-xx-bt pd-fd-xx-tn text-align-center font-wt-bolder  font-fd-xx-tn pos-rel')
						// sb.sb_addProperty(add,'id',ct)
						// sb.sb_addEvent(add,'click',this.addToCart.bind(this))
						sb.sb_addProperty(input,'class','vt-size-fd-bt float-left bg-secondary font-fd-xx-tn text-align-center fg-light font-wt-bolder d-inline-block hr-size-fd-md pd-fd-xx-tn bd-fd-secondary-xx-bt ')
						sb.sb_addProperty(rm,'class',' font-fd-tn text-align-center fg-red font-wt-bolder pd-fd-xxx-tn bd-rad-xxx-tn d-inline-block hr-size-fd-xx-sm pos-abs right-offset-fl-x-bt top-offset-0')
						// sb.sb_addProperty(input,'placeholder','0')
						// sb.sb_addEvent(input,'input',this.updateCart.bind(this))
						sb.sb_addProperty(small,'class','pd-left-fd-xx-tn d-block pos-abs mg-top-fd-tn')
						sb.sb_addProperty(smallSp,'class','d-inline-block font-wt-bolder fg-secondary font-fd-xx-tn pos-rel')
						sb.sb_addProperty(priceSp,'class','d-inline-block font-wt-bolder fg-secondary font-fd-xx-tn pos-rel')
						sb.sb_addProperty(st,'class','clearfix')
						
						sb.sb_addProperty(sp,'class','hr-size-fl-xx-sm mg-right-fl-bt d-inline-block float-left')
						sb.sb_addProperty(sp2,'class','hr-size-fl-xxx-sm font-fd-x-tn d-inline-block float-left')
						sb.sb_addProperty(sp3,'class','hr-size-fl-xxx-sm d-inline-block float-left')
						sb.sb_insertInner(rm,'x')
						sb.sb_insertInner(sp2,cartstate.cart[p].productName)
						sb.sb_insertInner(minus,'-')
						sb.sb_insertInner(input,cartstate.cart[p].productQty)
						sb.sb_insertInner(add,'+')
						sb.sb_insertInner(priceSp,'R'+cartstate.cart[p].productPrice)
					
						
						
					
						sb.sb_addChild(sp,img)
						
						// sb.sb_addChild(sp3,minus)
						// sb.sb_addChild(sp3,input)
						// sb.sb_addChild(sp3,add)
						sb.sb_addChild(sp3,rm)
						sb.sb_addChild(sp3,fm)
						// sb.sb_addChild(small,smallSp)
						sb.sb_addChild(small,priceSp)
						sb.sb_addChild(sp2,small)
						
						
						
						sb.sb_addChild(li,sp)
						sb.sb_addChild(li,sp2)
						sb.sb_addChild(li,sp3)
						sb.sb_addChild(li,st)
						sb.sb_addChild(lst,li)
						
						
					}

					
					sb.sb_addEvent(customise,'click',tools.events.startOrder.bind(this,tools))

					this.emit({type:'component-resource-creation-done',data: cartDetails})
					this.emit({type:'component-resource-creation-done',data: customise})
					sb.sb_addChild(cart,lst)
						

					

				}
				
			}else{

				console.log('THE CART CODE')
			}

	 
		this.emit({type:'component-resource-creation-done',data: cart})
	 
	
}


Component.prototype.checkout = function(data){
	  
	var sb = this.sb

	
	
		var tools = this.tools('checkout')

		var mainEl = sb.sb_createElement('div')
		var stages = sb.sb_createElement('div')
		var stagesBg = sb.sb_createElement('div')
		var cartStage = sb.sb_createElement('span')
		var cartStageBtn = sb.sb_createElement('button')
		var cartStageLb = sb.sb_createElement('h1')
		var deliveryStage = sb.sb_createElement('span')
		var deliveryStageBtn = sb.sb_createElement('button')
		var deliveryStageLb = sb.sb_createElement('h1')
		var paymentStage = sb.sb_createElement('span')
		var paymentStageBtn = sb.sb_createElement('button')
		var  paymentStageLb = sb.sb_createElement('h1')
		var confirmStage = sb.sb_createElement('span')
		var confirmStageBtn = sb.sb_createElement('button')
		var confirmStageLb = sb.sb_createElement('h1')
		var activeStage = sb.sb_createElement('span')
		var completed = sb.sb_createElement('span')
		var aCircleLf = sb.sb_createElement('span')
		var aCircleMd = sb.sb_createElement('span')
		var aCircleRt = sb.sb_createElement('span')

		var customise = sb.sb_createElement('span')
		var customiseBtn = sb.sb_createElement('span')
		
		sb.sb_addProperty(stages,'class',' z-index bg-general-alt top-offset-vh-x-tn left-offset-fl-xxx-tn pos-fd')
		sb.sb_addProperty(stagesBg,'class','hr-size-fd-hi-2 bg-dark left-offset-fd-x-tn mg-top-fd-x-tn vt-size-fd-xx-bt pos-abs')
		sb.sb_addProperty(cartStage,'class','d-inline-block font-fd-xxx-tn fg-dark-lt')
		sb.sb_addProperty(deliveryStage,'class','d-inline-block font-fd-xxx-tn fg-dark-lt')
		sb.sb_addProperty(paymentStage,'class','d-inline-block font-fd-xxx-tn fg-dark-lt')
		sb.sb_addProperty(confirmStage,'class','d-inline-block font-fd-xxx-tn fg-dark-lt')
		sb.sb_addProperty(aCircleLf,'class',' left-offset-fd-xxx-tn d-block mg-right-fd-xx-sm bd-rad-fl-md bd-none dots bg-light pos-abs')
		sb.sb_addProperty(aCircleMd,'class','left-offset-fd-x-tn mg-right-fd-xx-sm bd-rad-fl-md bd-none dots bg-light pos-abs')
		sb.sb_addProperty(aCircleRt,'class','left-offset-fd-xxx-sm mg-right-fd-xx-sm bd-rad-fl-md bd-none dots bg-light pos-abs')
		sb.sb_addProperty(cartStageBtn,'class','mg-bottom-fd-x-tn vt-size-fd-bt  mg-right-fd-sm bd-rad-fl-md bd-none hr-size-fd-md bg-dk-green fg-light pos-rel')
		sb.sb_addProperty(deliveryStageBtn,'class','mg-bottom-fd-x-tn vt-size-fd-bt mg-right-fd-sm bd-rad-fl-md bd-none hr-size-fd-md bg-dk-green fg-light pos-rel')
		sb.sb_addProperty(paymentStageBtn,'class','mg-bottom-fd-x-tn vt-size-fd-bt   mg-right-fd-sm bd-rad-fl-md bd-none hr-size-fd-md bg-dk-green fg-light pos-rel')
		sb.sb_addProperty(confirmStageBtn,'class','mg-bottom-fd-x-tn vt-size-fd-bt bd-rad-fl-md bd-none hr-size-fd-md bg-dk-green fg-light pos-rel')
		sb.sb_addProperty(customise,'class','cursor-pointer link d-block pos-fd hr-size-fl-xx-bg bottom-offset-0 bg-light  pd-top-fd-xx-bt z-index')
		sb.sb_addProperty(mainEl,'class','hr-size-fl-xx-bg mg-bottom-fd-hg pos-abs top-offset-vh-x-sm')
		sb.sb_addProperty(completed,'class','font-fd-x-tn form__checkbox_button')
		// sb.sb_addProperty(customise,'href','checkout.html')
					
						
		sb.sb_addProperty(customiseBtn,'class','d-inline-block font-fd-x-tn pd-top-fd-xx-tn text-align-center  pd-bottom-fd-xx-tn  bg-secondary hr-size-fl-xx-bg fg-light')
		sb.sb_insertInner(customiseBtn,'Procceed')

		sb.sb_insertInner(cartStageLb,'Cart')
		sb.sb_insertInner(deliveryStageLb,'Delivery')
		sb.sb_insertInner(paymentStageLb,'Payment')
		sb.sb_insertInner(confirmStageLb,'Confirm')
		sb.sb_insertInner(completed,'&#10003;')





		sb.sb_addChild(stages,stagesBg)

		sb.sb_addChild(stages,cartStage)
		sb.sb_addChild(cartStageBtn,completed)
		sb.sb_addChild(cartStage,cartStageBtn)
		sb.sb_addChild(cartStage,cartStageLb)

		sb.sb_addChild(stages,deliveryStage)
		sb.sb_addChild(deliveryStage,deliveryStageBtn)
		sb.sb_addChild(deliveryStageBtn,activeStage)
		sb.sb_addChild(deliveryStage,deliveryStageLb)


		sb.sb_addChild(stages,paymentStage)
		sb.sb_addChild(paymentStage,paymentStageBtn)
		sb.sb_addChild(paymentStage,paymentStageLb)




		sb.sb_addChild(stages,confirmStage)
		sb.sb_addChild(confirmStage,confirmStageBtn)
		sb.sb_addChild(confirmStage,confirmStageLb)

		sb.sb_addChild(activeStage,aCircleLf)
		sb.sb_addChild(activeStage,aCircleMd)
		sb.sb_addChild(activeStage,aCircleRt)
		sb.sb_addChild(customise,customiseBtn)

		console.log('tools')
		console.log(tools)

		var els = {

			main: mainEl,
			active: activeStage,
			completed: completed,
			buttons: {
				cart: cartStageBtn,
				delivery: deliveryStageBtn,
				payment: paymentStageBtn,
				confirm: confirmStageBtn
			}

		}

		sb.sb_addEvent(customise,'click',tools.events.loadNext.bind(this,tools,els))
		

		this.emit({type:'component-resource-creation-done',data: stages})
		this.emit({type:'component-resource-creation-done',data: mainEl})
		this.emit({type:'component-resource-creation-done',data: customise})
		customise.click(tools,els)



   
  
}

Component.prototype.menulist = function(data){
	  
	var sb = this.sb

	

	var catlist = sb.sb_createElement('article')
	var url = 'https://smarfoapi.herokuapp.com'+data.endpoint+'/'+ data.data 
	var menuUrl = 'https://smarfoapi.herokuapp.com/smarfo/menu' 
	//var url = 'http://localhost:3000'+data.endpoint+'/'+ data.data   


	this.messenger({url: url,data:'data',success: success.bind(this),fail: fail.bind(this)})
	

	function success(data){

		console.log('The return json data MenuList success')
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

					class: 'top-offset-vh-x-tn mg-bottom-fd-hg pos-rel'
				}
			},
			parent:  catlist

		}})

		this.messenger({url: menuUrl,data:'data',success: menuSuccess.bind(this),fail: fail.bind(this)})



	}

	function menuSuccess(data){

		console.log('The return json data MenuList menu success')
		console.log(data)

		var sb = this.sb
		let menu = sb.sb_jsonToJs(data)
		let menuList = menu.categories

		var modalList = sb.sb_createElement('ul')

		sb.sb_addProperty(modalList,'class','list list--hr list--none')
	   //  var ing = sb.sb_createElement('div')
	   //  sb.sb_addProperty(desc,'class','accordion__content d-none hr-size-fl-md accordion__content--bg-general font-fd-xx-tn mg-bottom-fd-xxx-tn')
	   //  sb.sb_addProperty(ing,'class','accordion__content d-none hr-size-fl-md accordion__content--bg-general font-fd-xx-tn mg-bottom-fd-xxx-tn ')
	   //   sb.sb_insertInner(desc,data.description)

	   for( it in menuList){

		   var li = sb.sb_createElement('li')
		   var sp = sb.sb_createElement('span')
		   sb.sb_addProperty(li,'class','list__item list__item--ve list__item--border-bottom-secondary list__item--marg-offset-bottom-small cursor-pointer pd-left-fd-tn pd-top-fd-bt')
		   sb.sb_addProperty(sp,'class','mg-left-fl-tn d-inline-block mg-top-fd-bt font-fd-xx-tn')

		   sb.sb_insertInner(sp,menuList[it].Name)
		   sb.sb_addChild(li,sp)
		   sb.sb_addChild(modalList,li)

	   }

		var actions = sb.sb_createElement('div')
		var actionsCustomise = sb.sb_createElement('section')
		var actionsCart = sb.sb_createElement('section')
		var customise = sb.sb_createElement('div')
		var customiseBtn = sb.sb_createElement('button')

		sb.sb_addProperty(actions,'class','pos-fd hr-size-fl-xx-bg bx-shadow bottom-offset-0 bg-light pd-top-fd-xxx-sm pd-bottom-fd-xx-tn z-index')
		sb.sb_addProperty(actionsCustomise,'class','pos-rel hr-size-fl-sm d-inline-block')
		sb.sb_addProperty(actionsCart,'class','pos-rel hr-size-fl-md d-inline-block')
		sb.sb_addProperty(customiseBtn,'class','d-inline-block mg-left-fl-xxx-tn  pd-top-fd-xx-tn pd-bottom-fd-xx-tn pos-rel btn bg-secondary fg-light')
		sb.sb_insertInner(customiseBtn,'Menu')

		sb.sb_addChild(actionsCustomise,customise)
		sb.sb_addChild(customise,customiseBtn)
		sb.sb_addChild(actions,actionsCustomise)
		



		var modals = [{

			activator: {
					
				activate: customiseBtn
			},
			parent:{

				class: 'modal',
				id: 'showmenu'

			},
			head: {
				head: false
			},
			content: {
				class: 'modal__content bd-top-right-rad-fd-xx-bt modal__content--size-fl-xxx-md modal__content--pos-abs modal__content--left-offset-0 modal__content--bottom-offset-0 modal__content--bd-rad-fd-tn modal__content--bg-light'
			},
			body: {
				body: modalList,
				class: 'modal__body'
			},
			foot: {
				foot: false
			}


		}]

		
			
		 
		
		
		this.emit({type:'component-resource-creation-done',data: actions})
		this.emit({type:'create-modal',data: modals})
		

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
	 sb.sb_addProperty(menulist,'class','top-offset-vh-x-tn pos-rel mg-bottom-fd-hg')
	 var url = 'https://smarfoapi.herokuapp.com/smarfo/menu' 
	// var url = 'http://localhost:3000/smarfo/menu' 

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

Component.prototype.detail = function(data){
	  
	var sb = this.sb

	

	// var catlist = sb.sb_createElement('article')
	console.log(data.data)

	var url = 'https://smarfoapi.herokuapp.com/smarfo'+data.endpoint+'/Starters/'+data.data 
	// var url = 'http://localhost:3000/smarfo'+data.endpoint+'/Starters/'+data.data

	// var sdata = {

	// 	menuitem: "Starters",
	// 	item: data.data.item_id
	// }
	this.messenger({url: url,data:'sdata',success: success.bind(this),fail: fail.bind(this)})
	var tools = this.tools('detail')
	

	function success(data){

		console.log('Successfull request')
		console.log(data)
	
		var data = sb.sb_jsonToJs(data)
		console.log(data)

		
		var productP = sb.sb_createElement('article')
		var product = sb.sb_createElement('div')
		var productI = sb.sb_createElement('img')
		var actions = sb.sb_createElement('div')
		var actionsCustomise = sb.sb_createElement('section')
		var actionsCart = sb.sb_createElement('section')
		var customise = sb.sb_createElement('div')
		var customiseBtn = sb.sb_createElement('button')
		var actionsCartForm = sb.sb_createElement('form')
		var minus = sb.sb_createElement('input')
		var update = sb.sb_createElement('input')
		var add = sb.sb_createElement('input')
		var inputId = sb.sb_createElement('input')
		var inputPrice = sb.sb_createElement('input')
		var inputName = sb.sb_createElement('input')

		sb.sb_addProperty(productP,'class','hr-size-fl-xx-bg mg-bottom-fd-hg pos-rel top-offset-vh-x-tn')
		sb.sb_addProperty(product,'class','hr-size-fl-x-bg mg-auto mg-bottom-fd-xx-tn')
		sb.sb_addProperty(productI,'src','img/starters/'+data.detail.image)
		sb.sb_addProperty(productI,'class','hr-size-fl-xx-bg ')
		sb.sb_addProperty(actions,'class','pos-fd hr-size-fl-xx-bg bx-shadow bottom-offset-0 bg-light pd-top-fd-xxx-sm pd-bottom-fd-xx-tn z-index')
		sb.sb_addProperty(actionsCustomise,'class','pos-rel hr-size-fl-sm d-inline-block')
		sb.sb_addProperty(actionsCart,'class','pos-rel hr-size-fl-md d-inline-block')
		sb.sb_addProperty(customiseBtn,'class','d-inline-block mg-left-fl-xxx-tn  pd-top-fd-xx-tn pd-bottom-fd-xx-tn pos-rel btn bg-secondary fg-light')
		sb.sb_insertInner(customiseBtn,'Customise')
		sb.sb_addProperty(actionsCartForm,'class','pos-rel left-offset-0')
		sb.sb_addProperty(minus,'class','d-inline-block hr-size-fl-xxx-sm cursor-pointer vt-size-fd-bt  bg-light bd-top-left-rad-fd-xx-bt bd-fd-secondary-xx-bt pd-fd-xx-tn text-align-center font-wt-bolder font-fd-xx-tn')
		sb.sb_addProperty(minus,'type','button')
		sb.sb_addProperty(minus,'value','-')
		sb.sb_addProperty(minus,'name','remove_product')
		sb.sb_addEvent(minus,'click',tools.events.removeFromCart.bind(tools))
		sb.sb_addProperty(update,'class','vt-size-fd-bt d-inline-block hr-size-fl-xxx-sm pd-fd-xx-tn bg-light bd-fd-secondary-xx-bt')
		sb.sb_addProperty(update,'type','number')
		sb.sb_addProperty(update,'placeholder','0')
		sb.sb_addProperty(update,'name','product_qty')
		sb.sb_addEvent(update,'input',tools.events.updateCart.bind(tools))
		sb.sb_addProperty(add,'class','d-inline-block hr-size-fl-xxx-sm cursor-pointer vt-size-fd-bt  bg-light bd-bottom-right-rad-fd-xx-bt bd-top-right-rad-fd-xx-bt bd-fd-secondary-xx-bt pd-fd-xx-tn text-align-center font-wt-bolder font-fd-xx-tn')
		sb.sb_addProperty(add,'type','button')
		sb.sb_addProperty(add,'value','+')
		sb.sb_addProperty(add,'name','add_product')
		sb.sb_addEvent(add,'click',tools.events.addToCart.bind(tools))
		
		sb.sb_addProperty(inputId,'type','hidden')
		sb.sb_addProperty(inputId,'name','product_id')
		sb.sb_addProperty(inputId,'value',data.item_id)

		sb.sb_addProperty(inputPrice,'type','hidden')
		sb.sb_addProperty(inputPrice,'name','product_price')
		sb.sb_addProperty(inputPrice,'value',data.price)

		
		sb.sb_addProperty(inputName,'type','hidden')
		sb.sb_addProperty(inputName,'name','product_name')
		sb.sb_addProperty(inputName,'value',data.Name)



		sb.sb_addChild(productP,product)
		sb.sb_addChild(product,productI)
		sb.sb_addChild(actions,actionsCustomise)
		sb.sb_addChild(actions,actionsCart)
		// sb.sb_addChild(actions,actionsCustomise)
		sb.sb_addChild(actionsCart,actionsCartForm)
		sb.sb_addChild(actionsCartForm,minus)
		sb.sb_addChild(actionsCartForm,update)
		sb.sb_addChild(actionsCartForm,add)
		sb.sb_addChild(actionsCartForm,inputId)
		sb.sb_addChild(actionsCartForm,inputPrice)
		sb.sb_addChild(actionsCartForm,inputName)
		sb.sb_addChild(actionsCustomise,customise)
		sb.sb_addChild(customise,customiseBtn)
		sb.sb_addChild(productP,actions)
		
		// for(p in data){

		// 	if(!(p === 'image' || p === 'variants')){


		// 		this.emit({type: 'create-accordion',data:{

		// 			parent: productP,
		// 			title: p,
		// 			data: data[p]


		// 		}})

		// 	}
		// }


		// Accordion

		 var desc = sb.sb_createElement('div')
		 var ing = sb.sb_createElement('ul')
		 sb.sb_addProperty(ing,'class','list list--hr list--none')
		 sb.sb_addProperty(desc,'class','accordion__content d-none hr-size-fl-x-bg mg-auto accordion__content--bg-general font-fd-xx-tn mg-bottom-fd-xxx-tn')
		 sb.sb_addProperty(ing,'class','accordion__content d-none hr-size-fl-x-b mg-auto accordion__content--bg-general font-fd-xx-tn mg-bottom-fd-xxx-tn ')
		  sb.sb_insertInner(desc,data.detail.description)

		// Modal

		 var modalList = sb.sb_createElement('ul')
		 var modals = []
		 sb.sb_addProperty(modalList,'class','list list--hr list--none')
		//  var ing = sb.sb_createElement('div')
		//  sb.sb_addProperty(desc,'class','accordion__content d-none hr-size-fl-md accordion__content--bg-general font-fd-xx-tn mg-bottom-fd-xxx-tn')
		//  sb.sb_addProperty(ing,'class','accordion__content d-none hr-size-fl-md accordion__content--bg-general font-fd-xx-tn mg-bottom-fd-xxx-tn ')
		//   sb.sb_insertInner(desc,data.description)

		for(var i = 0; i < data.detail.ingredients.length; i++){

			var li = sb.sb_createElement('li')
			var sp = sb.sb_createElement('span')
			sb.sb_addProperty(li,'class','list__item list__item--ve list__item--border-bottom-secondary list__item--marg-offset-bottom-small cursor-pointer pd-left-fd-tn pd-top-fd-bt')
			sb.sb_addProperty(sp,'class','mg-left-fl-tn d-inline-block mg-top-fd-bt font-fd-xx-tn')

			sb.sb_insertInner(sp,data.detail.ingredients[i])
			sb.sb_addChild(li,sp)
			sb.sb_addChild(ing,li)

		}
		

		 for(v in data.detail.variants){

			 var li = sb.sb_createElement('li')
			 var sp = sb.sb_createElement('span')

			 sb.sb_addProperty(li,'class','list__item list__item--ve list__item--border-bottom-secondary list__item--marg-offset-bottom-small cursor-pointer pd-left-fd-tn pd-top-fd-bt')

			 sb.sb_addProperty(sp,'class','mg-left-fl-tn d-inline-block mg-top-fd-bt font-fd-xx-tn')
			 console.log('v')
			 console.log(typeof v)
			 if(v.trim() === "drinks"){sb.sb_insertInner(sp,'Drink Choice')}else{sb.sb_insertInner(sp,v)}
			
			 sb.sb_addChild(li,sp)

			 sb.sb_addChild(modalList,li)

			 var modal = {}
			 var optionsForm = sb.sb_createElement('form')
			 var optionList = sb.sb_createElement('ul')
			 sb.sb_addProperty(optionsForm,'class','form')
			 sb.sb_addProperty(optionList,'class','list list--hr list--none')

			 sb.sb_addChild(optionsForm,optionList)

			 for(it in data.detail.variants[v]){

				var uli = sb.sb_createElement('li')
				var usp = sb.sb_createElement('span')   
				var updator = sb.sb_createElement('input')
				var updatorLabel = sb.sb_createElement('label')
				var updatorLabelSp = sb.sb_createElement('span')
				var uinputId = sb.sb_createElement('input')
				var uinputPrice = sb.sb_createElement('input')
				var uinputName = sb.sb_createElement('input')
				var radioCont = sb.sb_createElement('div')
				var idCont = sb.sb_createElement('div')
				var priceCont = sb.sb_createElement('div')

				sb.sb_addProperty(uli,'class','list__item form__radio__group list__item--ve list__item--border-bottom-secondary list__item--marg-offset-bottom-small d-block hr-size-fl-bg cursor-pointer pd-left-fd-tn pd-top-fd-bt')
				sb.sb_addProperty(usp,'class','mg-left-fl-tn d-inline-block mg-top-fd-bt font-fd-xx-tn')
				
				sb.sb_addProperty(updator,'type','radio')
				sb.sb_addProperty(updator,'name','updator')
				sb.sb_addProperty(updator,'id','updator')
				sb.sb_addProperty(updator,'value','value')
				sb.sb_addProperty(updator,'class','form__radio__group')

				sb.sb_addProperty(updatorLabel,'type','label')
				sb.sb_addProperty(updatorLabel,'for','updator')
				sb.sb_addProperty(updatorLabel,'class','form__radio__label')
				sb.sb_addProperty(updatorLabelSp,'class','form__radio__button')


				sb.sb_addProperty(uinputId,'type','hidden')
				sb.sb_addProperty(uinputId,'name','product_id')
				sb.sb_addProperty(uinputId,'value','sampleid')
		
				sb.sb_addProperty(uinputPrice,'type','hidden')
				sb.sb_addProperty(uinputPrice,'name','product_price')
				sb.sb_addProperty(uinputPrice,'value','sampleprice')
		
				
				sb.sb_addProperty(uinputName,'type','hidden')
				sb.sb_addProperty(uinputName,'name','product_name')
				sb.sb_addProperty(uinputName,'value','sampleproducts')

				sb.sb_addProperty(radioCont,'class','d-inline-block pd-left-fl-x-bt hr-size-fl-xxx-sm')
				sb.sb_addProperty(idCont,'class','d-inline-block font-fd-xx-tn hr-size-fl-xxx-sm')
				sb.sb_addProperty(priceCont,'class','d-inline-block font-fd-xx-tn hr-size-fl-xxx-sm')

			
				sb.sb_insertInner(idCont,'sample')
				sb.sb_insertInner(priceCont,'R854')

				sb.sb_addChild(optionList,uli)
				sb.sb_addChild(uli,radioCont)
				sb.sb_addChild(uli,idCont)
				sb.sb_addChild(uli,priceCont)
				sb.sb_addChild(updatorLabel,updatorLabelSp)
				sb.sb_addChild(updator,updatorLabel)
				sb.sb_addChild(radioCont,updator)
			

			 }

			 modal.activator = {

				activate: li
			 },
			 modal.parent ={

				class: 'modal',
				id: v

			}
			 modal.body = {

				body:  optionsForm,
				class: 'modal__body'
				
				}
			 modal.head = {
				 head: true,
				 buttonText: '',
				 title: v,
				 class: 'modal__head ',
				 child: {

					class: ''
				 }
				
			 }
			 modal.foot = {
				foot: true,
				buttonText: 'Done',
				class: 'modal__foot pos-fd bottom-offset-0 ',
				child: {

					class: 'modal__button modal__close-bottom-btn hr-size-fl-xx-bg font-fd-x-tn bx-shadow d-block mg-auto close-modal'
				 }
				
				
			}
			modal.content = {

				class: 'modal__content modal__content--size-fl-xx-bg vt-size-flv-xx-bg modal__content--pos-rel modal__content--left-offset-0 modal__content--bg-light'

			}
			 modals.push(modal)

		 }


		var accordionData = {

			 'description':{

				parent: productP,
				title: 'Description',
				content: desc
				
				
			 },
			 'ingredients':{

				parent: productP,
				title: 'Ingredients',
				content: ing
			
				
			 }
			 
		}
		
		// Modal data

		modals.unshift({

			activator: {
					
				activate: customiseBtn
			},
			parent:{

				class: 'modal',
				id: 'customise'

			},
			head: {
				head: false
			},
			content: {
				class: 'modal__content bd-top-right-rad-fd-xx-bt modal__content--size-fl-xxx-md modal__content--pos-abs modal__content--left-offset-0 modal__content--bottom-offset-0 modal__content--bd-rad-fd-tn modal__content--bg-light'
			},
			body: {
				body: modalList,
				class: 'modal__body'
			},
			foot: {
				foot: false
			}


		})

		
			
		 
		
		
		this.emit({type:'create-accordion',data: accordionData})
		this.emit({type:'create-modal',data: modals})
		this.emit({type:'component-resource-creation-done',data: productP})
		

		// console.log(data)
		// console.log('The return json data')
		// console.log(data)
		// let menu = sb.sb_jsonToJs(data)
		// if(menu.categories){

		// 	menu = menu.categories
		// }else{
		// 	menu = menu.items
		// }
		// console.log('The js')
		// console.log(menu)

		// this.emit({type: 'create-list',data:{

		// 	type: 'regular',
		// 	data: menu,
		// 	options: {

		// 		image: true,
		// 		src: 'img/starters/',
		// 		styles:{

		// 			class: 'top-offset-vh-xx-sm pos-rel'
		// 		}
		// 	},
		// 	parent:  catlist

		// }})

	}
	

	function fail(data){



		console.log('Failed request')
		console.log(data)
		// this.emit({type: 'stop-preloader',data: data})

	}
	
	
}


Component.prototype.bargain = function(data){
	  
	var sb = this.sb

	

	// var catlist = sb.sb_createElement('article')
	console.log(data.data)
	var url = 'https://smarfoapi.herokuapp.com/smarfo/bargain'
	//var url = 'http://localhost:3000/smarfo/bargain'

	// var sdata = {

	// 	menuitem: "Starters",
	// 	item: data.data.item_id
	// }
	this.messenger({url: url,data:'sdata',success: success.bind(this),fail: fail.bind(this)})
	var tools = this.tools('detail')
	

	function success(data){

		console.log('Successfull Bargain request')
		console.log(data)
	
		var data = sb.sb_jsonToJs(data).detail
		console.log(data)

		
		var productP = sb.sb_createElement('article')
		var product = sb.sb_createElement('div')
		var productI = sb.sb_createElement('img')
		 var bargain = sb.sb_createElement('div')
		 var bA = sb.sb_createElement('section')
		 var bAtitleO = sb.sb_createElement('h2')
		 var bAtitleT = sb.sb_createElement('span')
		 var bTag = sb.sb_createElement('span')
		 var bPrice = sb.sb_createElement('span')
		 var bInfo = sb.sb_createElement('div')
		 var bName = sb.sb_createElement('section')
		 var bPercent = sb.sb_createElement('section')
		 var bPercentC = sb.sb_createElement('div')
		 var bPercentP = sb.sb_createElement('span')
		 var bPercentO = sb.sb_createElement('span')

		var customiseBtn = sb.sb_createElement('button')
	

		sb.sb_addProperty(productP,'class','hr-size-fl-xx-bg top-offset-vh-bt mg-bottom-fd-hg pos-rel')
		sb.sb_addProperty(product,'class','hr-size-fl-x-bg pos-rel top-offset-vh-bt mg-auto mg-bottom-fd-tn')
		sb.sb_addProperty(productI,'src','img/starters/'+data.image)
		sb.sb_addProperty(productI,'class','hr-size-fl-xx-bg')
		sb.sb_addProperty(bInfo,'class','hr-size-fl-xx-bg mg-bottom-fd-tn')
		sb.sb_addProperty(bName,'class','hr-size-fl-xx-bg mg-top-fd-xx-tn font-fd-x-tn')
		sb.sb_addProperty(bPercent,'class','hr-size-fd-xx-bg top-offset-vh-tn text-align-center pos-abs left-offset-fl-lg bd-rad-fl-md bg-secondary vt-size-fd-xxx-tn')
		sb.sb_addProperty(bPercentC,'class','d-block pos-rel top-offset-fl-xx-sm font-fd-x-tn fg-light')
		sb.sb_addProperty(bPercentP,'class','d-block')
		sb.sb_addProperty(bPercentO,'class','d-block')
		sb.sb_addProperty(bargain,'class','hr-size-fl-xx-bg pos-rel  mg-auto mg-top-fd-tn mg-bottom-fd-tn')
		sb.sb_addProperty(bA,'class','pos-abs  left-offset-fl-xxx-sm  mg-bottom-fd-xxx-tn portfolio-title-container')
		sb.sb_addProperty(bAtitleO,'class','portfolio-title')
		sb.sb_addProperty(bAtitleT,'class','item-adjust')
		sb.sb_addProperty(bTag,'class',' pos-abs d-block left-offset-fl-bt top-offset-vh-xxx-tn mg-bottom-fd-xxx-tn font-fd-x-tn fg-secondary')
		sb.sb_addProperty(bPrice,'class','pos-abs d-block left-offset-fl-xx-sm top-offset-vh-xx-tn font-fd-tn')
		// sb.sb_insertInner(bTitle,'Grab our daily bargain')
		sb.sb_insertInner(bAtitleO,'Grab our daily bargain')
		sb.sb_insertInner(bAtitleT,'@  only')
		sb.sb_insertInner(bTag,'Only')
		sb.sb_insertInner(bPrice,data.price)
		sb.sb_insertInner(bName,data.name)
		sb.sb_insertInner(bPercentP,data.percent)
		sb.sb_insertInner(bPercentO,'off')

		sb.sb_addChild(bA,bAtitleO)
		sb.sb_addChild(bA,bAtitleT)

		sb.sb_addChild(bargain,bA)
		// sb.sb_addChild(bargain,bTag)
		sb.sb_addChild(bargain,bPrice)

		sb.sb_addChild(bInfo,bName)
		 sb.sb_addChild(bInfo,customiseBtn)
		sb.sb_addChild(bPercentC,bPercentP)
		sb.sb_addChild(bPercentC,bPercentO)
		sb.sb_addChild(bPercent,bPercentC)
		
		
	
		sb.sb_addProperty(customiseBtn,'class','d-inline-block action-btn hr-size-fl-x-sm  pd-top-fd-xx-tn pd-bottom-fd-xx-tn pos-fd btn bg-secondary fg-light')
		sb.sb_insertInner(customiseBtn,'Order Now')
	


		sb.sb_addChild(productP,product)
		sb.sb_addChild(product,productI)
		sb.sb_addChild(product,bPercent)
		sb.sb_addChild(product,bInfo)
	
			
	
		this.emit({type:'component-resource-creation-done',data: bargain})
		this.emit({type:'component-resource-creation-done',data: productP})
		

		

	}
	

	function fail(data){



		console.log('Failed request')
		console.log(data)
		// this.emit({type: 'stop-preloader',data: data})

	}
	
	
}


Component.prototype.uprofile = function(data){
	  
	var sb = this.sb

	

	// var catlist = sb.sb_createElement('article')
	// console.log(data.data)
	// var url = 'http://localhost:3000/smarfo/profile'

	// var sdata = {

	// 	menuitem: "Starters",
	// 	item: data.data.item_id
	// }

	var loginData = sb.sb_jsonToJs(localStorage.getItem('login'))

	var loginData = {
   	
	 	email: 'masanabila@gmail.com',
	 	password: '123456'
	
     }

	loginData = sb.sb_jsToJson(loginData)
	var url = 'https://smarfoapi.herokuapp.com/smarfo/login'
	//  var url = 'http://localhost:3000/smarfo/login'

	type = 'json'
	method = 'post'

	this.messenger({url: url,data:loginData,success: success.bind(this),fail: fail.bind(this),type: type,method:method})
	

	function success(data){

		console.log('Successfull user profile request')
		console.log(data)
	
		var data = sb.sb_jsonToJs(data).login
		console.log(data)

		var userData = {

			email: data.email,
			dob: data.dob,
			gender: data.gender,
			contact: data.contact

		}
		
		var productP = sb.sb_createElement('article')
		var bargain = sb.sb_createElement('div')
		var bTitle = sb.sb_createElement('h1')
		var product = sb.sb_createElement('div')
		var avCont = sb.sb_createElement('section')
		var avFig = sb.sb_createElement('figure')
		var avImg = sb.sb_createElement('img')
		var uname = sb.sb_createElement('span')
		var info = sb.sb_createElement('div')
		var lst = sb.sb_createElement('ul')
		var edit = sb.sb_createElement('div')
		var editAvImg = sb.sb_createElement('img')
		var editAvCont = sb.sb_createElement('div')
		var editAvatar = sb.sb_createElement('img')
		var name = data.first_name+' '+data.last_name
		
	
	

		sb.sb_addProperty(productP,'class','hr-size-fl-xx-bg top-offset-vh-xxx-tn mg-bottom-fd-hg pos-rel')
		sb.sb_addProperty(bargain,'class','hr-size-fl-xx-bg pos-fd z-index box-shadow  mg-auto bg-secondary vt-size-fd-bt mg-bottom-fd-tn')
		sb.sb_addProperty(bTitle,'class','pd-left-fl-sm top-offset-fl-bt fg-light pd-top-fd-xx-tn  mg-bottom-fd-xxx-tn')
		sb.sb_addProperty(edit,'class','pos-abs bd-rad-fl-md cursor-pointer top-offset-vh-x-tn left-offset-fl-lg bg-dk-green-lt vt-size-fd-bt hr-size-fd-md')
		sb.sb_addProperty(editAvImg,'class','hr-size-fl-md cursor-pointer left-offset-fl-tn top-offset-fl-tn pos-rel')
		sb.sb_addProperty(editAvImg,'src','img/edit.png')
		sb.sb_addProperty(product,'class','hr-size-fl-x-bg pos-rel top-offset-vh-bt mg-auto mg-bottom-fd-tn')
		sb.sb_addProperty(avCont,'class','avatar avatar--positon mg-left-fl-tn')
		sb.sb_addProperty(avFig,'class','avatar__fig avatar__fig--hr-size-fd-hi-xx-bg avatar__fig--bd-rad-fl-md')
		sb.sb_addProperty(avImg,'class','avatar__pik avatar__pik--hr-size-fd-hi-xx-bg')
		sb.sb_addProperty(avImg,'src',data.profile_url)
		sb.sb_addProperty(editAvCont,'class','pos-abs bd-rad-fl-md cursor-pointer top-offset-fl-tn left-offset-fl-x-md bg-dk-green vt-size-fd  hr-size-fd-xx-sm')
		sb.sb_addProperty(editAvatar,'class','hr-size-fl-md left-offset-fl-tn top-offset-fl-tn pos-rel')
		sb.sb_addProperty(editAvatar,'src','img/avataredit.png')
		sb.sb_addProperty(uname,'class','d-inline-block font-fd-tn mg-left-fd-x-tn mg-top-fd-tn mg-bottom-fd-sm fg-secondary')
		sb.sb_insertInner(bTitle,'Profile')
		sb.sb_insertInner(uname,name)
		sb.sb_addProperty(lst,'class','list list--hr list--none')


		for(id in userData){

			var li = sb.sb_createElement('li')
			var lb = sb.sb_createElement('small')
			var sp = sb.sb_createElement('span')
			sb.sb_addProperty(li,'class','list__item list__item--ve list__item--border-bottom-secondary list__item--marg-offset-bottom-small pd-left-fd-tn pd-top-fd-bt')
			sb.sb_addProperty(lb,'class','d-block mg-left-fl-tn mg-bottom-fd-xxx-tn font-fd-xx-tn fg-secondary')
			sb.sb_addProperty(sp,'class','mg-left-fl-tn d-block mg-top-fd-bt font-fd-x-tn')

			sb.sb_insertInner(lb,id)
			sb.sb_insertInner(sp,userData[id])
			sb.sb_addChild(li,lb)
			sb.sb_addChild(li,sp)
			sb.sb_addChild(lst,li)

		}


		
		
	
		// sb.sb_addProperty(customiseBtn,'class','d-inline-block action-btn hr-size-fl-x-tn  pd-top-fd-xx-tn pd-bottom-fd-xx-tn pos-fd btn bg-secondary fg-light')
		// sb.sb_insertInner(customiseBtn,'Order Now')
	


		sb.sb_addChild(productP,product)
		sb.sb_addChild(bargain,bTitle)
		sb.sb_addChild(edit,editAvImg)
		sb.sb_addChild(product,avCont)
		sb.sb_addChild(product,info)
		sb.sb_addChild(avCont,avFig)
		sb.sb_addChild(editAvCont,editAvatar)
		sb.sb_addChild(avCont,editAvCont)
		sb.sb_addChild(avCont,uname)
		sb.sb_addChild(avFig,avImg)
		sb.sb_addChild(info,lst)
	
			
	
		this.emit({type:'component-resource-creation-done',data: bargain})
		this.emit({type:'component-resource-creation-done',data: edit})
		this.emit({type:'component-resource-creation-done',data: productP})
		

		

	}
	

	function fail(data){



		console.log('Failed request')
		console.log(data)
		// this.emit({type: 'stop-preloader',data: data})

	}
	
	
}


Component.prototype.manage = function(data){
	  
	var sb = this.sb

	

	// var catlist = sb.sb_createElement('article')
	console.log(data.data)
	var url = 'http://localhost:3000/smarfo/bargain'

	// var sdata = {

	// 	menuitem: "Starters",
	// 	item: data.data.item_id
	// }
	this.messenger({url: url,data:'sdata',success: success.bind(this),fail: fail.bind(this)})
	var tools = this.tools('detail')
	

	function success(data){

		console.log('Successfull Bargain request')
		console.log(data)
	
		var data = sb.sb_jsonToJs(data).detail
		console.log(data)

		
		var productP = sb.sb_createElement('article')
		var product = sb.sb_createElement('div')
		var productI = sb.sb_createElement('img')
		 var bargain = sb.sb_createElement('div')
		 var bTitle = sb.sb_createElement('h1')
		 var bTag = sb.sb_createElement('span')
		 var bPrice = sb.sb_createElement('span')
		 var bInfo = sb.sb_createElement('div')
		 var bName = sb.sb_createElement('section')
		 var bPercent = sb.sb_createElement('section')
		 var bPercentC = sb.sb_createElement('div')
		 var bPercentP = sb.sb_createElement('span')
		 var bPercentO = sb.sb_createElement('span')

		var customiseBtn = sb.sb_createElement('button')
	

		sb.sb_addProperty(productP,'class','hr-size-fl-xx-bg top-offset-vh-xx-tn mg-bottom-fd-hg pos-rel')
		sb.sb_addProperty(product,'class','hr-size-fl-x-bg pos-rel top-offset-vh-bt mg-auto mg-bottom-fd-tn')
		sb.sb_addProperty(productI,'src','img/starters/'+data.image)
		sb.sb_addProperty(productI,'class','hr-size-fl-xx-bg')
		sb.sb_addProperty(bInfo,'class','hr-size-fl-xx-bg mg-bottom-fd-tn')
		sb.sb_addProperty(bName,'class','hr-size-fl-xx-bg mg-top-fd-xx-tn font-fd-x-tn')
		sb.sb_addProperty(bPercent,'class','hr-size-fd-xx-bg top-offset-vh-tn text-align-center pos-abs left-offset-fl-lg bd-rad-fl-md bg-secondary vt-size-fd-xxx-tn')
		sb.sb_addProperty(bPercentC,'class','d-block pos-rel top-offset-fl-xx-sm font-fd-x-tn fg-light')
		sb.sb_addProperty(bPercentP,'class','d-block')
		sb.sb_addProperty(bPercentO,'class','d-block')
		sb.sb_addProperty(bargain,'class','hr-size-fl-xx-bg pos-rel  mg-auto mg-top-fd-tn mg-bottom-fd-tn')
		sb.sb_addProperty(bTitle,'class','pos-abs  left-offset-fl-md  mg-bottom-fd-xxx-tn')
		sb.sb_addProperty(bTag,'class',' pos-abs d-block left-offset-fl-x-bt top-offset-vh-bt mg-bottom-fd-xxx-tn font-fd-xx-tn fg-secondary')
		sb.sb_addProperty(bPrice,'class','pos-abs d-block left-offset-fl-bt top-offset-vh-xxx-tn font-fd-tn')
		sb.sb_insertInner(bTitle,'Grab our daily bargain')
		sb.sb_insertInner(bTag,'Only')
		sb.sb_insertInner(bPrice,data.price)
		sb.sb_insertInner(bName,data.name)
		sb.sb_insertInner(bPercentP,data.percent)
		sb.sb_insertInner(bPercentO,'off')


		sb.sb_addChild(bargain,bTitle)
		sb.sb_addChild(bargain,bTag)
		sb.sb_addChild(bargain,bPrice)

		sb.sb_addChild(bInfo,bName)
		 sb.sb_addChild(bInfo,customiseBtn)
		sb.sb_addChild(bPercentC,bPercentP)
		sb.sb_addChild(bPercentC,bPercentO)
		sb.sb_addChild(bPercent,bPercentC)
		
		
	
		sb.sb_addProperty(customiseBtn,'class','d-inline-block action-btn hr-size-fl-x-tn  pd-top-fd-xx-tn pd-bottom-fd-xx-tn pos-fd btn bg-secondary fg-light')
		sb.sb_insertInner(customiseBtn,'Order Now')
	


		sb.sb_addChild(productP,product)
		sb.sb_addChild(product,productI)
		sb.sb_addChild(product,bPercent)
		sb.sb_addChild(product,bInfo)
	
			
	
		this.emit({type:'component-resource-creation-done',data: bargain})
		this.emit({type:'component-resource-creation-done',data: productP})
		

		

	}
	

	function fail(data){



		console.log('Failed request')
		console.log(data)
		// this.emit({type: 'stop-preloader',data: data})

	}
	
	
}

Component.prototype.orderstatus = function(data){
	  
	var sb = this.sb

	

	var url = 'https://smarfoapi.herokuapp.com/smarfo/order/track'
	// var url = 'http://localhost:3000/smarfo/order/track'

	success = success 
	fail = fail
	type = 'json'
	method = 'post'
	
	console.log('About to track an order')

	if(localStorage.orderno && localStorage.login){

		console.log('Order Status Fields Exists')
		var track = {

			username: sb.sb_jsonToJs(localStorage.getItem('login')).username,
			orderno: sb.sb_jsonToJs(localStorage.getItem('orderno')).orderno

			
		}

		track = sb.sb_jsToJson(track)
		this.messenger({url: url,data:track,success: success.bind(this),fail: fail.bind(),type: type,method:method})

	}
	



	
	

	function success(data){

		var sb = this.sb
		 var trackresponse = sb.sb_jsonToJs(data)

		 console.log('The track status data')
		 console.log(trackresponse)

		 if(trackresponse.status){

			

					
			var received = sb.sb_createElement('article')
			var trackEst = sb.sb_createElement('section')
			var trackEstTm = sb.sb_createElement('div')
			var trackEstOd = sb.sb_createElement('div')
			
			 var completed = sb.sb_createElement('span')
			 var trackEstTmLab = sb.sb_createElement('span')
			 var trackEstTmClock = sb.sb_createElement('span')
			 var trackeEstOdLab = sb.sb_createElement('span')
			 var trackEstOdNm = sb.sb_createElement('span')
			

			var stages = sb.sb_createElement('div')
			var stagesLabels = sb.sb_createElement('div')
			var stagesBgO = sb.sb_createElement('div')
			var stagesBgT = sb.sb_createElement('div')
			var stagesBgTr = sb.sb_createElement('div')
			var stagesBgF = sb.sb_createElement('div')
			var placedStage = sb.sb_createElement('span')
			var placedStageBtn = sb.sb_createElement('button')
			var placedStageLb = sb.sb_createElement('section')
			var placedStageLbL = sb.sb_createElement('h1')
			var placedStageLbC = sb.sb_createElement('p')
			var confirmStage = sb.sb_createElement('span')
			var confirmStageBtn = sb.sb_createElement('button')
			var confirmStageLb = sb.sb_createElement('section')
			var confirmStageLbL = sb.sb_createElement('h1')
			var confirmStageLbC = sb.sb_createElement('p')
			var progressStage = sb.sb_createElement('span')
			var progressStageBtn = sb.sb_createElement('button')
			var  progressStageLb = sb.sb_createElement('section')
			var progressStageLbL = sb.sb_createElement('h1')
			var progressStageLbC = sb.sb_createElement('p')
			var completedStage = sb.sb_createElement('span')
			var completedStageBtn = sb.sb_createElement('button')
			var completedStageLb = sb.sb_createElement('section')
			var completedStageLbL = sb.sb_createElement('h1')
			var completedStageLbC = sb.sb_createElement('p')
			var activeStage = sb.sb_createElement('span')
			var aCircleLf = sb.sb_createElement('span')
			var aCircleMd = sb.sb_createElement('span')
			var aCircleRt = sb.sb_createElement('span')

		


			sb.sb_addProperty(stages,'class',' z-index bg-general-alt left-offset-fl-bt top-offset-vh-xx-sm pos-fd')
			sb.sb_addProperty(stagesLabels,'class',' z-index  left-offset-fl-x-tn pd-top-fd-x-tn top-offset-vh-xx-sm pos-fd')
			
			
			sb.sb_addProperty(stagesBgF,'class','vt-size-fl-md bg-dark-lt left-offset-fd-x-tn mg-top-fd-xxx-tn hr-size-fd-xxx-tn pos-abs')
			sb.sb_addProperty(placedStage,'class','d-block font-fd-xxx-tn mg-bottom-fd-xx-sm fg-dark-lt')
			sb.sb_addProperty(confirmStage,'class','d-block font-fd-xxx-tn mg-bottom-fd-xx-sm fg-dark-lt')
			sb.sb_addProperty(progressStage,'class','d-block font-fd-xxx-tn mg-bottom-fd-xx-sm fg-dark-lt')
			sb.sb_addProperty(completedStage,'class','d-block font-fd-xxx-tn  fg-dark-lt')
			sb.sb_addProperty(aCircleLf,'class',' left-offset-fd-xxx-tn d-block mg-right-fd-xx-sm bd-rad-fl-md bd-none dots bg-light pos-abs')
			sb.sb_addProperty(aCircleMd,'class','left-offset-fd-x-tn mg-right-fd-xx-sm bd-rad-fl-md bd-none dots bg-light pos-abs')
			sb.sb_addProperty(aCircleRt,'class','left-offset-fd-xxx-sm mg-right-fd-xx-sm bd-rad-fl-md bd-none dots bg-light pos-abs')
			sb.sb_addProperty(placedStageBtn,'class','mg-bottom-fd-x-tn d-inline-block vt-size-fd-bt  mg-right-fd-xx-sm bd-rad-fl-md bd-none hr-size-fd-md bg-dk-green fg-light pos-rel')
			sb.sb_addProperty(confirmStageBtn,'class','mg-bottom-fd-x-tn d-inline-block vt-size-fd-bt mg-right-fd-xx-sm bd-rad-fl-md bd-none hr-size-fd-md bg-dk-green fg-light pos-rel')
			sb.sb_addProperty(progressStageBtn,'class','mg-bottom-fd-x-tn d-inline-block vt-size-fd-bt   mg-right-fd-xx-sm bd-rad-fl-md bd-none hr-size-fd-md bg-dk-green fg-light pos-rel')
			sb.sb_addProperty(completedStageBtn,'class','mg-bottom-fd-x-tn d-inline-block vt-size-fd-bt  mg-right-fd-xx-sm bd-rad-fl-md bd-none hr-size-fd-md bg-dk-green fg-light pos-rel')

			sb.sb_addProperty(placedStageLbL,'class','font-fd-x-tn mg-bottom-fd-xxx-tn')
			sb.sb_addProperty(confirmStageLbL,'class','font-fd-x-tn mg-bottom-fd-xxx-tn')
			sb.sb_addProperty(progressStageLbL,'class','font-fd-x-tn mg-bottom-fd-xxx-tn')
			sb.sb_addProperty(completedStageLbL,'class','font-fd-x-tn mg-bottom-fd-xxx-tn')

			sb.sb_addProperty(placedStageLbC,'class','font-fd-xx-tn')
			sb.sb_addProperty(confirmStageLbC,'class','font-fd-xx-tn')
			sb.sb_addProperty(progressStageLbC,'class','font-fd-xx-tn')
			sb.sb_addProperty(completedStageLbC,'class','font-fd-xx-tn')
			
			// sb.sb_addProperty(placedStageLb,'class','d-inline-block mg-bottom-fd-md')
			// sb.sb_addProperty(confirmStageLb,'class','d-inline-block mg-bottom-fd-md')
			// sb.sb_addProperty(progressStageLb,'class','d-inline-block mg-bottom-fd-md')
			// sb.sb_addProperty(completedStageLb,'class','d-inline-block mg-bottom-fd-md')
		
			// sb.sb_addProperty(activeStage,'class','pos-rel left-offset-fd-xx-tn')
			sb.sb_addProperty(completed,'class','font-fd-x-tn form__checkbox_button')


			sb.sb_addProperty(trackEst,'class','d-block bg-dark-lta pd-top-fd-tn hr-size-fl-xx-bg vt-size-fd-xxx-tn')
			// sb.sb_addProperty(success,'class','d-inline-block font-fd-xxx-tn fg-dark-lt')
			sb.sb_addProperty(trackEstOd,'class','d-inline-block font-fd-xxx-tn pd-left-fl-bt hr-size-fl-sm')
			sb.sb_addProperty(trackEstTm,'class','d-inline-block font-fd-xxx-tn pd-left-fl-xxx-tn hr-size-fl-sm')



			sb.sb_insertInner(placedStageLbL,'Order Placed')
			sb.sb_insertInner(confirmStageLbL,'Order Confirmed')
			sb.sb_insertInner(progressStageLbL,'In Progress')
			sb.sb_insertInner(completedStageLbL,'Order Completed')

			sb.sb_insertInner(placedStageLbC,'Your order has been successfuly placed')
			sb.sb_insertInner(confirmStageLbC,'Your order has been confirmed by our staff')
			sb.sb_insertInner(progressStageLbC,'We are busy preparing your order')
			sb.sb_insertInner(completedStageLbC,'Your order has been successfully completed')

			// sb.sb_insertInner(completed,'&#10003;')
	

			sb.sb_addProperty(trackEstTmLab,'class','d-block mg-bottom-fd-xx-tn font-fd-x-tn')
			sb.sb_addProperty(trackEstTmClock,'class','d-block font-fd-xx-tn fg-secondary')
			sb.sb_addProperty(trackeEstOdLab,'class','d-block mg-bottom-fd-xx-tn font-fd-x-tn')
			sb.sb_addProperty(trackEstOdNm,'class','d-block font-fd-xx-tn fg-secondary')

		
			
		


			
			sb.sb_addProperty(received,'class','hr-size-fl-xx-bg mg-bottom-fd-hg pos-rel top-offset-vh-xx-tn')
			sb.sb_addProperty(completed,'class','font-fd-x-tn form__checkbox_button')

			sb.sb_insertInner(completed,'&#10003;')
			sb.sb_insertInner(trackEstTmLab,'ESTIMATED TIME')
			sb.sb_insertInner(trackEstTmClock,'30 Minutes')
			sb.sb_insertInner(trackeEstOdLab,'ORDER NUMBER')
			sb.sb_insertInner(trackEstOdNm,'#'+trackresponse.orderstatus.orderno)
			
			// sb.sb_insertInner(sb.view,'')



			
			sb.sb_addChild(trackEstOd,trackeEstOdLab)
			sb.sb_addChild(trackEstOd,trackEstOdNm)
			sb.sb_addChild(trackEstTm,trackEstTmLab)
			sb.sb_addChild(trackEstTm,trackEstTmClock)

		
			
			sb.sb_addChild(stages,stagesBgO)
			sb.sb_addChild(stages,stagesBgT)
			sb.sb_addChild(stages,stagesBgTr)
			// sb.sb_addChild(stages,stagesBgF)


			sb.sb_addChild(stages,placedStage)
			// sb.sb_addChild(placedStageBtn,completed)
			sb.sb_addChild(placedStage,placedStageBtn)
			sb.sb_addChild(placedStageLb,placedStageLbL)
			sb.sb_addChild(placedStageLb,placedStageLbC)
			sb.sb_addChild(stagesLabels,placedStageLb)

			sb.sb_addChild(stages,confirmStage)
			sb.sb_addChild(confirmStage,confirmStageBtn)
			// sb.sb_addChild(confirmStageBtn,activeStage)
			sb.sb_addChild(confirmStageLb,confirmStageLbL)
			sb.sb_addChild(confirmStageLb,confirmStageLbC)
			sb.sb_addChild(stagesLabels,confirmStageLb)


			sb.sb_addChild(stages,progressStage)
			sb.sb_addChild(progressStage,progressStageBtn)
			sb.sb_addChild(progressStageLb,progressStageLbL)
			sb.sb_addChild(progressStageLb,progressStageLbC)
			sb.sb_addChild(stagesLabels,progressStageLb)






			sb.sb_addChild(stages,completedStage)
			sb.sb_addChild(completedStage,completedStageBtn)
			sb.sb_addChild(completedStageLb,completedStageLbL)
			sb.sb_addChild(completedStageLb,completedStageLbC)
			sb.sb_addChild(stagesLabels,completedStageLb)

			sb.sb_addChild(activeStage,aCircleLf)
			sb.sb_addChild(activeStage,aCircleMd)
			sb.sb_addChild(activeStage,aCircleRt)

			sb.sb_addChild(trackEst,trackEstOd)
			sb.sb_addChild(trackEst,trackEstTm)
			sb.sb_addChild(received,trackEst)
			sb.sb_addChild(received,stages)
			sb.sb_addChild(received,stagesLabels)


			// sb.sb_addChild(sb.view,received)
			this.emit({type:'component-resource-creation-done',data: received})

			
			switch(trackresponse.orderstatus.status.trim()){

				case 'placed':{



					sb.sb_addProperty(stagesBgO,'class','vt-size-fl-tn bg-secondary left-offset-fd-x-tn mg-top-fd-x-tn hr-size-fd-xxx-tn pos-abs')
					sb.sb_addProperty(stagesBgT,'class','vt-size-fl-tn bg-secondary left-offset-fd-x-tn track-offset-sm hr-size-fd-xxx-tn pos-abs')
					sb.sb_addProperty(stagesBgTr,'class','vt-size-fl-tn bg-dark-lt left-offset-fd-x-tn track-offset-lg hr-size-fd-xxx-tn pos-abs')
					sb.sb_addChild(placedStageBtn,sb.sb_copyDeep(completed))
					sb.sb_addChild(confirmStageBtn,sb.sb_copyDeep(completed))
					// sb.sb_addProperty(placedStageLbL,'class','font-fd-x-tn mg-bottom-fd-xxx-tn fg-dark')
					// sb.sb_addProperty(confirmStageLbL,'class','font-fd-x-tn mg-bottom-fd-xxx-tn fg-dark')
					// sb.sb_addProperty(progressStageLbL,'class','font-fd-x-tn mg-bottom-fd-xxx-tn fg-dark')
					// sb.sb_addProperty(completedStageLbL,'class','font-fd-x-tn mg-bottom-fd-xxx-tn fg-dark-lta')

					sb.sb_addProperty(placedStageLb,'class','d-inline-block fg-dark mg-bottom-fd-md')
					sb.sb_addProperty(confirmStageLb,'class','d-inline-block fg-dark mg-bottom-fd-md')
					sb.sb_addProperty(progressStageLb,'class','d-inline-block fg-dark mg-bottom-fd-md')
					sb.sb_addProperty(completedStageLb,'class','d-inline-block fg-dark-lta mg-bottom-fd-md')
		
					sb.sb_addChild(progressStageBtn,activeStage)


				}
				break;
				case 'progress':{

					sb.sb_addProperty(stagesBgO,'class','vt-size-fl-tn bg-secondary left-offset-fd-x-tn mg-top-fd-x-tn hr-size-fd-xxx-tn pos-abs')
					sb.sb_addProperty(stagesBgT,'class','vt-size-fl-tn bg-secondary left-offset-fd-x-tn track-offset-sm hr-size-fd-xxx-tn pos-abs')
					sb.sb_addProperty(stagesBgTr,'class','vt-size-fl-tn bg-dark-lt left-offset-fd-x-tn track-offset-lg hr-size-fd-xxx-tn pos-abs')
					sb.sb_addChild(placedStageBtn,sb.sb_copyDeep(completed))
					sb.sb_addChild(confirmStageBtn,sb.sb_copyDeep(completed))

					// sb.sb_addProperty(placedStageLbL,'class','font-fd-x-tn mg-bottom-fd-xxx-tn fg-dark')
					// sb.sb_addProperty(confirmStageLbL,'class','font-fd-x-tn mg-bottom-fd-xxx-tn fg-dark')
					// sb.sb_addProperty(progressStageLbL,'class','font-fd-x-tn mg-bottom-fd-xxx-tn fg-dark')
					// sb.sb_addProperty(completedStageLbL,'class','font-fd-x-tn mg-bottom-fd-xxx-tn fg-dark-lta')

					sb.sb_addProperty(placedStageLb,'class','d-inline-block fg-dark mg-bottom-fd-md')
					sb.sb_addProperty(confirmStageLb,'class','d-inline-block fg-dark mg-bottom-fd-md')
					sb.sb_addProperty(progressStageLb,'class','d-inline-block fg-dark mg-bottom-fd-md')
					sb.sb_addProperty(completedStageLb,'class','d-inline-block fg-dark-lta mg-bottom-fd-md')

					sb.sb_addChild(progressStageBtn,activeStage)

				}
				break;
				default :{

					sb.sb_addProperty(stagesBgO,'class','vt-size-fl-tn bg-secondary left-offset-fd-x-tn mg-top-fd-x-tn hr-size-fd-xxx-tn pos-abs')
					sb.sb_addProperty(stagesBgT,'class','vt-size-fl-tn bg-secondary left-offset-fd-x-tn track-offset-sm hr-size-fd-xxx-tn pos-abs')
					sb.sb_addProperty(stagesBgTr,'class','vt-size-fl-tn bg-secondary left-offset-fd-x-tn track-offset-lg hr-size-fd-xxx-tn pos-abs')
					sb.sb_addChild(placedStageBtn,sb.sb_copyDeep(completed))
					sb.sb_addChild(confirmStageBtn,sb.sb_copyDeep(completed))
					sb.sb_addChild(progressStageBtn,sb.sb_copyDeep(completed))

					// sb.sb_addProperty(placedStageLbL,'class','font-fd-x-tn mg-bottom-fd-xxx-tn fg-dark')
					// sb.sb_addProperty(confirmStageLbL,'class','font-fd-x-tn mg-bottom-fd-xxx-tn fg-dark')
					// sb.sb_addProperty(progressStageLbL,'class','font-fd-x-tn mg-bottom-fd-xxx-tn fg-dark')
					// sb.sb_addProperty(completedStageLbL,'class','font-fd-x-tn mg-bottom-fd-xxx-tn fg-dark')

					sb.sb_addProperty(placedStageLb,'class','d-inline-block fg-dark mg-bottom-fd-md')
					sb.sb_addProperty(confirmStageLb,'class','d-inline-block fg-dark mg-bottom-fd-md')
					sb.sb_addProperty(progressStageLb,'class','d-inline-block fg-dark mg-bottom-fd-md')
					sb.sb_addProperty(completedStageLb,'class','d-inline-block fg-dark mg-bottom-fd-md')

					sb.sb_addChild(completedStageBtn,sb.sb_copyDeep(completed))

				}



		}



		 }else{


		 }
	}
	

	function fail(data){

		this.emit({type: 'stop-preloader',data: data})

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
	
		console.log('The Item Data')
	   console.log(itemData)
		
		var sb = this.sb
		let lst = sb.sb_createElement('li')
		sb.sb_addProperty(lst,'class','hr-size-fl-xx-bg bx-shadow cursor-pointer fd-font-x-tn mg-bottom-fd-tn pd-left-fl-bt bg-light pos-rel d-block pd-bottom-fd-tn pd-top-fd-tn')
	    sb.sb_addProperty(lst,'data-navigata-page','detail')
	    sb.sb_addProperty(lst,'data-navigata-data','[{data: '+itemData.item_id+',page: detail,endpoint: /detail}]')

		
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
			sb.sb_addProperty(inputId,'value',itemData.item_id)

			sb.sb_addProperty(inputPrice,'type','hidden')
			sb.sb_addProperty(inputPrice,'name','product_price')
			sb.sb_addProperty(inputPrice,'value',itemData.price)

			
			sb.sb_addProperty(inputName,'type','hidden')
			sb.sb_addProperty(inputName,'name','product_name')
			sb.sb_addProperty(inputName,'value',itemData.Name)

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
			sb.sb_addProperty(small,'class','pd-left-fd-xx-tn d-block pos-abs mg-top-fd-tn')
			sb.sb_addProperty(smallSp,'class','d-inline-block font-wt-bolder fg-secondary font-fd-xx-tn pos-rel')
			sb.sb_addProperty(priceSp,'class','d-inline-block font-wt-bolder fg-secondary font-fd-xx-tn pos-rel')
			sb.sb_addProperty(st,'class','clearfix')
			
			sb.sb_addProperty(sp,'class','hr-size-fl-xx-sm mg-right-fl-bt d-inline-block float-left')
			sb.sb_addProperty(sp2,'class','hr-size-fl-xxx-sm font-fd-xx-tn d-inline-block float-left')
			sb.sb_addProperty(sp3,'class','hr-size-fl-xxx-sm d-inline-block float-left')
			sb.sb_insertInner(sp2,itemData.Name)
			sb.sb_insertInner(minus,'-')
			sb.sb_insertInner(add,'+')
			sb.sb_insertInner(priceSp,'R'+itemData.price)
		
			
			
		
			sb.sb_addChild(sp,img)
			
			// sb.sb_addChild(sp3,minus)
			// sb.sb_addChild(sp3,input)
			// sb.sb_addChild(sp3,add)
			
			sb.sb_addChild(sp3,fm)
			// sb.sb_addChild(small,smallSp)
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
	console.log('The cart product data')
	console.log(productData)
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

function Accordion(sandbox){
	
	this.sb = sandbox

	
}

Accordion.prototype.init = function(){
	
	this.listens()
	
}


Accordion.prototype.listens = function(){
	
	var sb = this.sb 
	sb.sb_notifyListen({
		
		
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
   sb.sb_addProperty(parent,'class','accordion accordion--vt-size-fd-bt accordion--bg-secondary accordion--pos-rel accordion--hr-size-fl-x-bg mg-auto mg-bottom-fd-xx-tn')
   
	return parent
		
	
}


Accordion.prototype.createBar = function(){
			
			
   var sb = this.sb
   
   var bar = sb.sb_createElement('div')
   sb.sb_addProperty(bar,'class','accordion__text')
   
	return bar
		
	
}

Accordion.prototype.createTitle = function(data){
			
   var sb = this.sb
   
   var title = sb.sb_createElement('p')
   sb.sb_addProperty(title,'class','accordion__text-node pos-abs fg-general-alt font-fd-xx-tn')
   sb.sb_insertInner(title,data)
   
   return title

}

Accordion.prototype.createController = function(){
			
   var sb = this.sb
   
   var btn  = sb.sb_createElement('button')
   sb.sb_addProperty(btn,'class','accordion__btn--exp-con top-offset-fl-tn right-offset-fl-bt')
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
			sb.sb_addChild(data[el].parent,data[el].content)

			console.log('The accordion content')
			console.log(data[el].content)
			
			sb.sb_addEvent(controller,'click',this.expand.bind(this,data[el].content,controller))

			this.emit({type: 'component-resource-creation-done',data: data[el].parent})
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
		sb.sb_addChild(data.parent,data.content)
		
		sb.sb_addEvent(controller,'click',this.expand.bind(this,data.content,controller))
		this.emit({type: 'component-resource-creation-done',data: data.parent})

	}

   
	
	
		
	 


}

Accordion.prototype.expand = function(content,controller){

 var sb = this.sb 

 console.log('The content element')
 console.log(content)
 
 if(controller.innerHTML.trim() === '+'){
 	
 	    controller.innerHTML = '-'
 	
 }else{
 	
  	controller.innerHTML = '+'
 }
 var classList = sb.sb_getClasses(content)
 sb.sb_toggleClass(classList,'d-none')
 

}


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
   sb.sb_addProperty(parent,'class',options.class)
   sb.sb_addProperty(parent,'data-modal',options.id)
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


Modal.prototype.createModalHead = function(options){
			
			
   var sb = this.sb
   
   var head = sb.sb_createElement('div')
   var btn = sb.sb_createElement('span')
   sb.sb_addProperty(head,'class',options.class)
   sb.sb_addProperty(btn,'class',options.child.class)
   sb.sb_insertInner(btn,options.buttonText)
   sb.sb_addChild(head,btn)
  
	return {head: head,close: btn}
		
	
}

Modal.prototype.createModalContent = function(options){
			
			
	var sb = this.sb
	
	var modCont = sb.sb_createElement('article')
	sb.sb_addProperty(modCont,'class',options.class)
	
	return modCont
		 
	 
 }

Modal.prototype.createModalBody = function(options){
	
	 
	 var sb = this.sb
   
   var body = sb.sb_createElement('div')
   sb.sb_addProperty(body,'class',options.class)
//    sb.sb_addChild(body,options.content)
   sb.sb_addChild(body,options.body)
   
//    switch(options.size){
   	
//    	  case 1:{
   	  	
   	  	 
//    	  }
   	
//    }
	 
	 return body

	
}


Modal.prototype.createModalFoot = function(options){
	
	 
	 var sb = this.sb
   
   var foot = sb.sb_createElement('div')
   var btn = sb.sb_createElement('span')
   sb.sb_addProperty(foot,'class',options.class)
   sb.sb_addProperty(btn,'class',options.child.class)
   sb.sb_insertInner(btn,options.buttonText)
   sb.sb_addChild(foot,btn)
  
	 return {foot: foot,close: btn }

	
}

Modal.prototype.handleCreateModal = function(data){

	console.log('Create Modal event event event has occured')
	console.log(data)
	this.createModal(data)

}

Modal.prototype.createModal = function(data){

	var sb = this.sb

	if(data.length > 0){

		for(var modal=0; modal < data.length; modal++){



			var parent = this.getParent(data[modal].parent)
			var modCont = this.createModalContent(data[modal].content)

			if(data[modal].head.head){ 
		
				var head = this.createModalHead(data[modal].head)
				sb.sb_addChild(modCont,head.head)
				
				sb.sb_addEvent(head.close,'click',this.closeModal.bind(this,parent,head.close))
				
			}
			
			if(data[modal].foot.foot){ 
				
				var foot = this.createModalFoot(data[modal].foot)
				// sb.sb_addChild(parent,foot.foot)
				sb.sb_addEvent(foot.close,'click',this.closeModal.bind(this,parent,foot.close))
			}

			var body = this.createModalBody(data[modal].body) 
		
			
			sb.sb_addChild(modCont,body)
			sb.sb_addChild(parent,modCont)

			if(foot){
				
				sb.sb_addChild(modCont,foot.foot)
			}
			
			sb.sb_addEvent(window,'click',this.closeModal.bind(this,parent,null))
			sb.sb_addEvent(data[modal].activator.activate,'click',this.openModal.bind(this,parent))
			console.log('modal parent')
			console.log(parent)
			this.emit({type: 'component-resource-creation-done',data: parent})



		}


	}
	
	
	
	

}

Modal.prototype.openModal = function(data,ev){

	var sb = this.sb
	sb.sb_stopEventBubble(ev)
	console.log('The modal open func')
	console.log(data)
	
	var computedStyle = document.defaultView.getComputedStyle(data,null);
	console.log(computedStyle.display)

	// var classList = sb.sb_getClasses(data)
	// sb.sb_toggleClass(classList,'d-none')

	if(computedStyle.display === 'none'){

		data.style.display = "block"
		console.log('Element style now')
		console.log(data.style.display)
	}
	
 
}


Modal.prototype.closeModal = function(data,targ,ev){

	var sb = this.sb 

	 console.log('The code gets at this point')
	// console.log(ev)
	
	// console.log('data')
	// console.log(data)
	// console.log('data.parent')
	// console.log(data.parent)
	if(ev.target === data){
		
		console.log('The events is initiated by the window')

		// var classList = sb.sb_getClasses(data)

		if(data.style.display === 'block'){

			// console.log('The code gets here')
			// console.log(sb.sb_hasClass(classList,'d-none'))
			// sb.sb_toggleClass(classList,'d-none')

			console.log('We are setting none')
			data.style.display = 'none'

		}
		
		
	}else if(ev.target === targ){
		

		if(data.style.display === 'block'){

			// console.log('The code gets here')
			// console.log(sb.sb_hasClass(classList,'d-none'))
			// sb.sb_toggleClass(classList,'d-none')

			console.log('We are setting none')
			data.style.display = 'none'

		}
		// var classList = sb.sb_getClasses(data)
		// // sb.sb_toggleClass(classList,'d-none')
		// console.log('The code inside the closeModal runs')

		// if(data.style.display === 'block'){

		// 	data.style.display = 'none'
		// }
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
		console.log('The products content')
		console.log(products)
		console.log('The product in to be added')
		console.log(product)

		if(products.length > 0){

			for(var p = 0; p < products.length; p++){
				
				console.log('The productId inside the cart product')
				console.log(products[p].productId)
				console.log(typeof products[p].productId)
				console.log('The productId inside the add product')
				console.log(product.productId)
				console.log(typeof product.productId)
				console.log(products[p].productId)
				
				if(products[p].productId === product.productId){
	
					console.log('The productIds match here')
					// console.log(product.productQty)
					products[p].productQty += 1
					break
	
					
				}else if(p === products.length - 1 ){
	
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

		console.log('The cart contains no items')
		console.log(product)
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


 


		

	









