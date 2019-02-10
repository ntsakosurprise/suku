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

List.prototype.createTiled = function(itemData){
	
	let lst = sb.sb_createElement('li')
	sb.sb_addProperty(lst,'class','mg-bottom-fd-xx-tn cursor-pointer pd-left-fl-bt d-inline-block pd-bottom-fd-bt pd-top-fd-bt pos-rel')
	sb.sb_addProperty(lst,'data-navigata-page','menulist')
	sb.sb_addProperty(lst,'data-navigata-data','[{product: pname,otherdata: otherdata}]')

	if(cols === 2){

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

			sb.sb_addProperty(img,'src','img/'+itemData.image)
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
		
		sb.sb_addChild(sb.view,lst);

	 }else if(cols === 3){

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

List.prototype.createRegular = function(itemData){
	
		

		let lst = sb.sb_createElement('li')
		sb.sb_addProperty(lst,'class','hr-size-fl-xx-bg bx-shadow fd-font-x-tn mg-bottom-fd-tn pd-left-fl-bt bg-light pos-rel d-block pd-bottom-fd-tn pd-top-fd-tn')
	

		
		if(getters.getImage()){

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
		


			sb.sb_addProperty(img,'src','img/'+itemData.image)
			sb.sb_addProperty(img,'class','hr-size-fl-xx-md bd-rad-bt pos-rel')
			sb.sb_addProperty(fm,'class','hr-fl-size-xx-bg  mg-bottom-fd-sm pos-rel')
			sb.sb_addProperty(fm,'id',ct+'-form')
			sb.sb_addProperty(minus,'class','hr-size-fl-xxx-sm float-left vt-size-fd-bt d-inline-block bg-light bd-bottom-left-rad-fd-xx-bt bd-top-left-rad-fd-xx-bt bd-fd-secondary-xx-bt pd-fd-xx-tn text-align-center  font-fd-xx-tn font-wt-bolder  pos-rel')
			sb.sb_addProperty(minus,'id',ct)
			sb.sb_addEvent(minus,'click',this.removeFromCart)
			sb.sb_addProperty(add,'class','hr-size-fl-xxx-sm float-left vt-size-fd-bt d-inline-block  bg-light bd-bottom-right-rad-fd-xx-bt bd-top-right-rad-fd-xx-bt bd-fd-secondary-xx-bt pd-fd-xx-tn text-align-center font-wt-bolder  font-fd-xx-tn pos-rel')
			sb.sb_addProperty(add,'id',ct)
			sb.sb_addEvent(add,'click',this.addToCart)
			sb.sb_addProperty(input,'class','vt-size-fd-bt float-left d-inline-block hr-size-fl-xxx-sm pd-fd-xx-tn bg-light bd-fd-secondary-xx-bt ')
			sb.sb_addProperty(input,'placeholder','0')
			sb.sb_addEvent(input,'input',this.updateCart)
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
			ct++

		

		}else{

			console.log('The mini menu')
			sb.sb_addProperty(lst,'class','hr-size-fl-xx-bg font-fd-xx-tn mg-bottom-fd-xx-tn bd-bottom-fd-secondary-xx-bt pos-rel d-block pd-bottom-fd-bt pd-top-fd-bt pd-left-fl-xxx-tn')
			sb.sb_insertInner(lst,itemData.Name)


		}

		return lst
		
	
}



List.prototype.handleCreatList = function(data){

	this.createList(data)

}



List.prototype.createList = function(data){

	var sb = this.sb
	var listData = data.data.data

	var lstCont = sb.sb_createElement('ul')

	if(data.data.type === 'regular'){

		for(list in listData){

			var lst = this.createRegular(listData[list],data.data)
			sb.sb_addChild(lstCont,lst)
			
		}

		var parent = data.data.parent

		sb.sb_addChild(parent,lstCont)

		this.emit({type: 'component-resource-creation-done',data: parent})
	
	}else{

		for(list in listData){

			this.createTiled(listData[list],data.data)
		}		

	}

}
	



List.prototype.addToCart = function(ev){

	var productData = this.getAddProduct(ev)
	this.emit({type:'add-to-cart',data: productData})
}

List.prototype.removeFromCart = function(ev){

	var productData = this.getRemoveProduct(ev)
	if(productData){

		this.emit({type:'remove-from-cart',data: productData})

	}

}

List.prototype.updateCart = function(ev){

	var productData = this.getUpdateProduct(ev)
	if(productData){

		this.emit({type:'update-cart',data: productData})

	}

}

List.prototype.getAddProduct = function(evt){


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





