




/*function renderGrid(){

	var imgCont = document.getElementById('renderGrid');
	
	var imgs = imgCont.children;


	var pad = 5;
	var cols = 4;
	var nextTop;
	var nextLeft;



	for(i=1; i < imgs.length;i++){




		
		if(i % cols == 0){


			

			nextTop = (imgs[i-cols].offsetTop + imgs[i-cols].offsetHeight) + pad;
			imgs[i].style.top = nextTop + "px";



		}else{



			if(imgs[i-cols]){


				nextTop = (imgs[i-cols].offsetTop + imgs[i-cols].offsetHeight) + pad;
				imgs[i].style.top = nextTop + "px";

			}

			nextLeft = (imgs[i-1].offsetLeft + imgs[i-1].offsetWidth) + pad;
			imgs[i].style.left = nextLeft + "px";



		}// End of outter ifelse statement




	}// End of for loop





	

}// End of renderGrid element

window.addEventListener('load',renderGrid,false);

window.addEventListener('resize',renderGrid,false);

*/






SUKU.domLoaded(function(){

		

		// console.log('The location object properties')
		// console.log(window.location)
		// var dt = localStorage.getItem('menulist')
		// console.log(dt)
		// dt = JSON.parse(dt)
		// console.log(dt)

		// console.log(localStorage)
		// localStorage.removeItem('detail')
		localStorage.removeItem('cart')
		activator.activate()


		

		// if(localStorage.cart){

		// 	console.log(localStorage.removeItem('cart'))

		// }
	
		// var modulesList = [Search,Register,Slider,List,Cart];
		// processModules(modulesList);

		
		


});// End of dom loaded function



