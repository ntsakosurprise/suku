

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




