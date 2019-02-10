
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
