


/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@



		Framework 	 : Suku
		Version 	 : 1.0.0
		Author		 : SUKU organisation
		Website		 : www.suku.com
		Date Created : 15/05/2018


@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

var SUKU = (function(){


		/*==============================================================================================================

			The code immediately after this comment[starting with the return statement] is an object that will be executed
			and returned immediately after the containing "immediately invoked" function has been executed and soon after
			the script has been downloaded from its source. 
			This object is a SUKU framework object, which contains all the properties, methods, and objects that the
			SUKU framework defines.


		 ================================================================================================================*/





		return { // Return an object.


		/*============================================================================================

			The Method immediately after this comment(domLoaded()) is a SUKU framework method used to
			execute code immediately after the document loads. It relies on the Window object's load
			event to achieve this. Any argument passed to this method will be implemented only after
			the document has loaded


		 =============================================================================================*/

			domLoaded: function(code){ // Define domLoaded method


				this.ev_addHandler(window,'load',code); // Call the event handler method of this object to tie the laod
														// event to the Window object, and execute the code passed to
														// handle the event.


			},// End of afterLoad method


			throwErrors: function(errorMessage){ // Define throwErrors method


				
				throw new Error(errorMessage);


			},// End of afterLoad method



		/*******************************************************************************************************************
			
			Use DOM LEVEL 1 Interface Techniques To Manipulate Dom

		*********************************************************************************************************************/


	

			getby_id: function(id_selector){ // Define the getby_id() method to return an element in question by ID


					var elementById = document.getElementById(id_selector); // call the DOM LEVEL 1 getElementById() method to return an element by id

					return elementById; // return requested method


			},// End of getElementById method


			getby_tag: function(parent,tag_selector){

					var elementsByTag

					if(parent){

						elementsByTag = parent.getElementsByTagName(tag_selector);

					}else{

						elementsByTag = document.getElementsByTagName(tag_selector);
					}
				
					return elementsByTag;

			},// End of getelementBy Class method


			getby_name: function(tag_selector){



					var elementsByName = document.getElementsByName(tag_selector);

					return elementsByName;

			},// End of getelementBy Class method


			get_tag_name: function(element){



					var elementTagName = element.tagName;

					return elementTagName;

			},// End of getelementBy Class method






		/*******************************************************************************************************************
			
			Use DOM LEVEL 2 And 3 Interface Techniques To Manipulate The Dom

		*********************************************************************************************************************/






			




			getChildby_id: function(parent_tag_selector,child_tag_selector){




					if(typeof parent_tag_selector == null || typeof parent_tag_selector == 'string'){

						throw new Error('One of the required selectors is a string,object expected');	


					}else{


						var childElementbyId = parent_tag_selector.querySelector(child_tag_selector);

						return childElementbyId;


					}

					
			},// End of getelementBy Class method


			getChildby_class: function(parent_tag_selector,child_tag_selector){



					var childElemntByClass = parent_tag_selector.querySelector(child_tag_selector);

					return childElemntByClass;

			},// End of getelementBy Class method


			getAllChildby_class: function(parent_tag_selector,child_tag_selector){



					var childElemntsByClass = parent_tag_selector.querySelectorAll(child_tag_selector);

					return childElemntsByClass;

			},// End of getelementBy Class method

			getChildBy_attribute: function(parent_tag_selector,attribute){



					var childElemntByAttribute = parent_tag_selector.querySelector('['+attribute+']');

					return childElemntByAttribute;

			},// End of getelementBy Attribute method


			getAllChildBy_attribute: function(parent_tag_selector,attribute){



					var childElemntsByAttribute = parent_tag_selector.querySelectorAll('['+attribute+']');

					return childElemntsByAttribute;

			},// End of getelementBy Attribute method

			getBy_attribute: function(attribute){



					var childElemntByAttribute = document.querySelector('['+attribute+']');

					return childElemntByAttribute;

			},// End of getelementBy Attribute method

			getAllBy_attribute: function(attribute){



					var childElemntByAttribute = document.querySelectorAll('['+attribute+']');

					return childElemntByAttribute;

			},// End of getelementBy Attribute method












			/*******************************************************************************************************************
				
				Use DOM LEVEL 1 Node Interface Techniques To Manipulate Dom

			*********************************************************************************************************************/


			//************************Node Resources By properties[Read Only]***************************************************************


			get_type_of_node: function(node){


				var typeOfNode = 0;

				switch(node.nodeType){


					case 1: 
							{	
								typeOfNode = 'ELEMENT';
								break;
							}
					case 2: 
							{	
								typeOfNode = 'ATTRIBUTE';
								break;
							}

					case 3: 
							{	
								typeOfNode = 'TEXT';
								break;
							}

					case 4: 
							{	
								typeOfNode = 'CDATA';
								break;
							}
					case 5: 
							{	
								typeOfNode = 'ENTITY REFERENCE';
								break;
							}

					case 6: 
							{	
								typeOfNode = 'ENTITY';
								break;
							}

					case 7: 
							{	
								typeOfNode = 'PROCESSING INSTRUNCTION';
								break;
							}
					case 8: 
							{	
								typeOfNode = 'COMMENT';
								break;
							}

					case 9: 
							{	
								typeOfNode = 'DOCUMENT';
								break;
							}

					case 10: 
							{	
								typeOfNode = 'DOCUMENT TYPE';
								break;
							}

					case 11: 
							{	
								typeOfNode = 'DOCUMENT FRAGMENT';
								break;
							}

					case 12: 
							{	
								typeOfNode = 'NOTATION';
								break;
							}
					default: 
							{	
								typeOfNode = 'UNKNOWN NODE TYPE';
								break;
							}





				}// End of switch statement


				return typeOfNode;




			},


			get_node_name: function(node){



				var node_name = node.nodeName;

				return node_name;


			},

			get_node_value: function(node){



				var node_value = node.nodeValue;

				if(node_value != null){

					return node_value;


				}else{

					

					return node_value;


				}

				


			},


			//************************Node Resources By properties[By Relationships(Read Only)]****************************************




			get_owner_document: function(node){



				var nodeOwnerDocument = node.ownerDocument;

				return nodeOwnerDocument;


			},


			get_parent: function(childNode){



				var parentNode = childNode.parentNode;

				return parentNode;


			},

			get_all_children_count: function(parentNode){



				var childCount = parentNode.childElementCount;

				return childCount;


			},


			get_childs: function(parentNode){



				var nodeList = parentNode.childNodes;

				return nodeList;



			},

			
			get_first_child: function(parentNode){



				if(parentNode.hasChildNodes()){


					var firstChildNode  = '';

					if(parentNode.firstChild && (typeof parentNode.firstChild != null) ){


						firstChildNode = parentNode.childNodes[0];


					}


					return firstChildNode;


				}// End of outter if statement

				


			},


			get_last_child: function(parentNode){



				if(parentNode.hasChildNodes()){


					var lastChildNode  = '';

					if(parentNode.lastChild && (typeof parentNode.lastChild != null) ){


						lastChildNode = parentNode.childNodes[parentNode.childNodes.length - 1];


					}


					return lastChildNode;


				}// End of outter if statement

				


			},

			get_child_next_sibling: function(childNode){



				if(childNode.parentNode){


					var childNodeNextSibling  = '';

					if(childNode.nextSibling || typeof childNode.nextSibling == null ){


						childNodeNextSibling = childNode.nextSibling;


					}


					return childNodeNextSibling;


				}// End of outter if statement

				


			},

			get_child_previous_sibling: function(childNode){



				if(childNode.parentNode){


					var childNodePreviousSibling  = '';

					if(childNode.previousSibling || typeof childNode.previousSibling == null ){


						childNodePreviousSibling = childNode.nextSibling;


					}


					return childNodePreviousSibling;


				}// End of outter if statement

				


			},



			//************************Node Resources By Methods [Node manipulation]****************************************


			check_if_has_childs: function(node){


				var ifNodes = false;


				if(node.hasChildNodes()){


					 ifNodes = true;

					 return ifNodes;


				}else{


					return ifNodes;
				}

				


			},



			append_child: function(parentNode,appendNode){


				var appendedNode = parentNode.appendChild(appendNode);

				return appendedNode;
				


			},


			insert_before: function(parentNode,insertNode,refNode){



				if(refNode == undefined){


					var insertedNode = parentNode.insertBefore(insertNode,null);

					return insertedNode;

				}else{


					var insertedNode = parentNode.insertBefore(insertNode,refNode);

					return insertedNode;


				}

				

				
				
			},


			replace_child: function(parentNode,replaceNode,refNode){

				if(parentNode.hasChildNodes()){




					if(refNode != undefined || refNode != null){


						var replacedNode = parentNode.replaceChild(replaceNode,refNode);

						return replacedNode;

					}else{


						this.throwErrors('A required REFERENCE NODE must be supplied, none is');

					}



				}

				

				
				
			},

			remove_child: function(parentNode,removeNode){

				if(parentNode.hasChildNodes()){




					

						var removedNode = parentNode.removeChild(removeNode);

						return removedNode;

				



				}

				

				
				
			},




			copy_deep: function(node){


				var clonedDeepNode = node.cloneNode(true);

				return clonedDeepNode;
				


			},

			copy_shallow: function(node){


				var clonedShallowNode = node.cloneNode(false);

				return clonedShallowNode;
				


			},

			


			/*******************************************************************************************************************
				
				ACCESS DOCUMENT INFORMATION

			*********************************************************************************************************************/


			get_document_title: function(){


				var docTitle = document.title;

				return docTitle;
				


			},

			get_document_url: function(){


				var docUrl = document.URL;

				return docUrl;
				


			},

			get_document_domain: function(){


				var docDomain = document.domain;

				return docDomain;
				


			},

			get_document_referrer: function(){


				var docReferrer = document.referrer;

				return docReferrer;
				


			},


			/*******************************************************************************************************************
				
				MODIFY DOCUMENT INFORMATION

			*********************************************************************************************************************/


			set_document_domain: function(setDomain){


				
				document.domain = setDomain;

				var updatedDomain = document.domain;

				return updatedDomain;
				
				


			},



			/*******************************************************************************************************************
				
				ACCESS ELEMENT PROPERTIES

			*********************************************************************************************************************/


			

			get_element_id: function(element){


				
				

				var elementId = element.id;

				if(elementId != null || elementId != undefined){

					return elementId;


				}else{


					this.throwErrors('The specified element has no "id" attribute')


				}

				
				
				


			},

			get_element_class: function(element){


				
				

				var elementClass = element.className;

				if(elementClass != null || elementClass != undefined){

					return elementClass;


				}else{


					this.throwErrors('The specified element has no "class" attribute')


				}

				
				
				


			},


			get_element_title: function(element){


				
				

				var elementTitle = element.title;

				if(elementTitle != null || elementTitle != undefined){

					return elementTitle;


				}else{


					this.throwErrors('The specified element has no "title" attribute')


				}

				
				
				


			},


			get_element_style: function(element){


				
				

				var elementStyle = element.style;

				if(elementStyle != null || elementStyle != undefined){

					return elementStyle;


				}else{


					this.throwErrors('The specified element has no "style" attribute')


				}

				
				
				


			},





			get_custom_attribute_value: function(element,custAttribute){


				
				if((element != null || element != undefined) && (typeof custAttribute === 'string' && custAttribute != '')){


					if(custAttribute == 'id' || custAttribute == 'class' || custAttribute == 'style'
					   || custAttribute == 'lang' || custAttribute == 'title' || custAttribute == 'dir'){



								this.throwErrors('The "id","class","style","lang","title","dir",' +
												' and any of the event properties are invalid for custom attribute value');

						

					}else{




						var listFromString = custAttribute.split('-');
						var listFirstChild = listFromString[0];

						if(listFirstChild == 'data'){

							var custAttributeValue = element.getAttribute(custAttribute);

							return custAttributeValue;


						}else{


							this.throwErrors('Custom attribute must begin with "data-" string');
						}

						


					}// End of switch statement



				}else{


					this.throwErrors("One of the specified arguments is not in the proper format");
				}

				

				
				
				


			}, // End of get_element_attribut_value() 


			get_element_attributes: function(element){



				var attribs = element.attributes;

				return attribs;


			},


			/*******************************************************************************************************************
				
				SETTING ELEMENT PROPERTIES

			*********************************************************************************************************************/


			

			set_element_attribute: function(element,attribute,newAttributeValue){

			
				element.setAttribute(attribute,newAttributeValue);

				//var updatedAttributeValue = element.getAttribute(attribute);

				//return updatedAttributeValue;



			},


			remove_element_attribute: function(element,attribute){


				element.removeAttribute(attribute);

				//var updatedAttributeValue = element.getAttribute(attribute);

				//return updatedAttributeValue;



			},


			/*******************************************************************************************************************
				
				CREATING ELEMENTS

			*********************************************************************************************************************/


			create_element: function(elTag,attributes){


				if((elTag && typeof elTag ===  'string') && elTag != ''){

					
					try{


						var newElement = '';

						if(attributes){

							if(attributes instanceof Object){


								newElement = document.createElement(elTag);

								for(attrib in attributes){


									


										if(isNaN(attrib)){


											var attribValue = attributes[attrib];


											if(typeof attribValue === 'string'){

												newElement.attrib = attribValue;


											}else{


												this.throwErrors('Attribute value: ' +attribValue+ ' must be a string');


											}// End of valid attribute value check

												



										}else{

											
											this.throwErrors('All attributes must be of type "String" starting with a letter in the range "A-Z"');


										}// End of attribute format check




									

									

								




								}// End of for in statement

								return newElement;



							}else{

								this.throwErrors('Attributes argument must be of type "Object"');




							}// End of valid attributes check

							

						}else{


							newElement = document.createElement(elTag);

							return newElement;


						}// End of attributes existence check

						


					}catch(eRror){


						var errorMessage = String.prototype.split.call(eRror,':');
							errorMessage[0] = '';


						this.throwErrors(Array.prototype.join.call(errorMessage,' '));


					}// End of try catch statement
					
					


				}else{

					this.throwErrors('Prospective element argument must be a string that is not empty');

				}// End of valid tag check



			},


			/*******************************************************************************************************************
				
				IN DEPTH TEXT MANIPULATION

			*********************************************************************************************************************/


			create_text: function(parentNode,createText){



				if(parentNode && parentNode instanceof HTMLElement){

					if(createText){

						if(typeof createText === 'string'){


							var newTextNode = document.createTextNode('My name is Surprise');

							this.append_child(parentNode,newTextNode);

							return newTextNode;



						}else{


							this.throwErrors('Argument 2 of SUKU.create_text() must be of type String')
						}

					


					}else{


						this.throwErrors('Argument 2 of SUKU.create_text() is required.');

					}

					




				}else{

					this.throwErrors('Argument 1 of SUKU.create_text() is required and must be an object of type HTMLElement.')
				}

				



			},

			add_text: function(refTextNode,addText){



				var newText = refTextNode.appendData(addText);

				//return newText;



			},

			insert_text: function(refTextNode,insertStart,insertText){




				var newText = refTextNode.insertData(insertStart,insertText);

				//return newText;



			},

			delete_text: function(refTextNode,delStart,delCharNum){


				var deletedText = refTextNode.deleteData(delStart,delCharNum);

				//return deletedText;



			},

			replace_text: function(refTextNode,replStart,replCharNum,replText){


					refTextNode.replaceData(replStart,replCharNum,replText);

					//return newText;




			},

			get_full_text: function(refNode){



				var text = refNode.nodeValue;

				return text;



			},

			get_partial_text: function(refTextNode,extractStart,extractCharNum){


				var extractedText = refTextNode.substringData(extractStart,extractCharNum);

				return extractedText;




			},

			get_text_length: function(refTextNode){




				var textLength = refTextNode.data.length;

			

				return textLength;


			},

			split_text: function(refTextNode,splitStart){



				var splitNode = refTextNode.splitText(splitStart)
				var splitNodeText = this.get_full_text(splitNode);

				return splitNodeText;


			},


			normalize_text: function(parentNode){


				if(parentNode && parentNode instanceof HTMLElement){

					
					parentNode.normalize();

					var normalizedText = this.get_full_text(this.get_first_child(parentNode));

					return normalizedText;


					

				}else{


					this.throwErrors('Argument 1 of SUKU.normalize_text() must be an object of type HTMLElement');



				}

				
				


			},



			/*******************************************************************************************************************
				
				TABLE MANIPULATION

			*********************************************************************************************************************/



			make_table: function(){



				var table = this.create_element("table");

				return table;

			},

			make_table_body: function(){



				var tableBody = this.create_element("tbody");

				return tableBody

			},

			add_table_body: function(table,tableBody){



				this.append_child(table,tableBody);

			},

			make_table_row: function(tbody,rowPos){


				tbody.insertRow(rowPos);



			},


			make_table_rows: function(tbody,numRows){



				for(r=0; r < numRows;++r){


					tbody.insertRow(r);

				}

				



			},

			make_table_cell: function(trow,cellPos){


				trow.insertCell(cellPos);



			},

			make_table_cells: function(trow,numCells){


				

				for(c=0; c < numCells;++c){


					trow.insertCell(c);

				}

				





			},


			add_contentto_cell: function(cell,content){


				cell.innerHTML = content;



			},

			add_contentto_cells: function(cells,content){

				
				

					for(c=0;c < cells.length; ++c){



						cells[c].innerHTML = content[c];



					}


			},


			get_table_head: function(table){


				var tableHead = table.tHead;

				return tableHead;



			},

			get_table_foot: function(table){


				var tableFoot = table.tFoot;

				return tableFoot;



			},

			get_table_body_elements: function(table){


				var tableBodyElements = table.tBodies;

				return tableBodyElements;



			},

			get_table_caption: function(table){


				var tableCaption = table.tCaption;

				return tableCaption;



			},

			get_table_rows: function(table){


				var tableRows = table.rows;

				return tableRows;



			},

			get_row: function(table,rowPos){


				var row = table.rows[rowPos];

				return row;



			},




			get_first_row: function(table){


				var firstRow = table.rows[0];

				return firstRow;



			},

			get_last_row: function(table){


				var lastRow = table.rows[table.rows.length-1];

				return lastRow;



			},

			delete_row: function(table,rowPos){


				var delRow = table.deleteRow(rowPos);


			},

			delete_first_row: function(table){


				var delFirstRow = table.deleteRow(0);


			},

			delete_last_row: function(table){


				var delLastRow = table.deleteRow(table.rows.length-1);


			},





			get_row_cells: function(row){


				var tableCells = row.cells;

				return tableCells;



			},

			get_cell: function(row,cellPos){


				var cell = row.cells[cellPos];

				return cell;



			},


			get_first_cell: function(row){


				var cell = row.cells[0];

				return cell;


			},

			get_last_cell: function(row){


				var cell = row.cells[row.cells.length-1];


			},


			delete_cell: function(row,cellPos){


				var cell = row.delelteCell(cellPos);


			},


			delete_first_cell: function(row){


				var cell = row.deleteCell(0);


			},

			delete_last_cell: function(row){


				var cell = row.deleteCell([row.cells.length-1]);


			},


			/*******************************************************************************************************************
				
				DOM MANIPULATION BY HTML5 API

			*********************************************************************************************************************/




			getby_class: function(class_selector){



					var elementByClass = document.getElementsByClassName(class_selector);

					return elementByClass;

			},// End of getelementBy Class method


			get_class_list: function(element){



					var classes = element.classList;

					return classes;

			},// End of getelementBy Class method

			add_class: function(classList,className){



					classList.add(className);

					

			},

			remove_class: function(classList,className){



					classList.remove(className);

					
			},



			toggle_class: function(classList,className){



					classList.toggle(className);

					//return classes;

			},


			has_class: function(classList,className){



					var status = classList.contains(className);

					return status;

			},




			/*********************************** HTML5 FOCUS  MANAGEMENT  **********************************************************************/


			get_focused_element: function(){



					var focused = document.activeElement;

					return focused;

			},

			is_element_focused: function(element){



					var focusStatus = element.hasFocus();

					return focusStatus;

			},


			/*********************************** HTML5  DOCUMENT INFORMATION  **********************************************************************/


			document_load_state: function(){



					var loadState = document.readyState;

					if(loadState === "complete"){


						var loaded = "loaded";

						return loaded;


					}else{


						var loading = "loading";

						return loading;




					}

					

			},

			get_document_html: function(){



					var documentHtml = document.documentElement;

					return documentHtml;

					

					

			},


			get_document_head: function(){



					var documentHead = document.head || document.this.getby_tag('head')[0];

					return documentHead;

					

					

			},

			get_document_encoding: function(){



					var documentCharset = document.charset;

					return documentCharset;

					

					

			},

			/*********************************** HTML5  CUSTOM ATTRIBUTES **********************************************************************/


			get_custom_attribute_data: function(element,attributeName){



					var customDataValue = element.dataset.attributeName;

					return customDataValue;

					

			},

			set_custom_attribute_data: function(element,attributeName,data){



					element.dataset.attributeName = data;

					var updatedData = element.dataset.attributeName

					return updatedData;

					

			},



			/*********************************** HTML5  CONTENT READ AND WRITE **********************************************************************/


			get_inner_content: function(element){



					var innerContent = element.innerHTML;

					return innerContent;

					

			},

			get_inner_content_all: function(element){



					var content = element.outterHTML;

					return content;

					

			},



			insert_content_inner: function(element,data){



					element.innerHTML = data;

					

			},

			insert_content_by_replace: function(element,data){



					element.outerHTML = data;

					

			},

			insert_content_before: function(element,text){



					element.insertAdjacentHTML("beforebegin",text);

					

			},

			insert_content_after: function(element,text){



					element.insertAdjacentHTML("afterend",text);

					

			},

			insert_content_inner_start: function(element,text){



					element.insertAdjacentHTML("afterbegin",text);

					

			},

			insert_content_inner_end: function(element,text){



					element.insertAdjacentHTML("beforeend",text);

					

			},




		/*********************************** HTML5  VIEW SCROLL ************************************************************/



		scroll_to_view: function(element){



					element.scrollIntoView(true);

					

		},




		/*******************************************************************************************************************
				
				DOM MANIPULATION BY DOM LEVEL 2 AND 3

		*********************************************************************************************************************/




		/*********************************** COMPUTED STYLES ************************************************************/



		get_computed_styles: function(element){


					var computed = '';


					if(document.defaultView.getComputedStyle){

						computed = document.defaultView.getComputedStyle(element,null);

						return computed;



					}else{


						computed = element.currentStyle;

						return computed;
						



					}
					

		},

		/*********************************** ELEMENT DIMENSIONS[OFFSET DIMENSIONS] ************************************************************/



		get_element_height: function(element){



			var fullHeight = element.offsetHeight;

			return fullHeight;


					
					

		},

		get_element_width: function(element){


			var fullWidth = element.offsetWidth;

			return fullWidth;
		
					

		},

		get_offset_top: function(element){


			var distanceTop = element.offsetTop;

			return distanceTop;
		
					

		},

		get_offset_left: function(element){


			var distanceLeft = element.offsetLeft;

			return distanceLeft;
		
					

		},

		get_offset_parent: function(element){


			var parent = element.offsetParent;

			return parent;
		
					

		},




		/*********************************** [CLIENT[Element content area] DIMENSIONS] ******************************************/



		get_content_height: function(element){



			var contentHeight = element.clientHeight;

			return contentHeight;


					
		},

		get_content_width: function(element){



			var contentWidth = element.clientWidth;

			return contentWidth;


					
		},



		/*********************************** [SCROLL DIMENSIONS] ******************************************/



		scrollin_element_height: function(element){



			var scrollinHeight = element.scrollHeight;

			return scrollinHeight;


					
		},

		scrollin_element_width: function(element){



			var scrollinWidth = element.scrollWidth;

			return scrollinWidth;


					
		},

		scrollin_hidden_content_top: function(element){



			var scrollinTop = element.scrollTop;

			return scrollinTop;


					
		},

		scrollin_hidden_content_left: function(element){



			var scrollinLeft = element.scrollLeft;

			return scrollinLeft;


					
		},


		/*********************************** [VIEWPORT RELATED DIMENSIONS] ******************************************/


		get_all_element_dimensions: function(element){



			var elementDimensions = element.getBoundingClientRect();

			return elementDimensions;


					
		},

		get_element_viewport_top: function(element){



			var topRelViewport = element.getBoundingClientRect().top;

			return topRelViewport;


					
		},

		get_element_viewport_left: function(element){



			var leftRelViewport = element.getBoundingClientRect().left;

			return leftRelViewport;


					
		},

		get_element_viewport_right: function(element){



			var rightRelViewport = element.getBoundingClientRect().right;

			return rightRelViewport;


					
		},

		get_element_viewport_bottom: function(element){



			var botRelViewport = element.getBoundingClientRect().bottom;

			return botRelViewport;


					
		},


		/*******************************************************************************************************************
				
				JSON PARSERS AND SERIALIZERS

		*********************************************************************************************************************/




		/*********************************** JSON SERIALIZATION ************************************************************/



		js_to_json: function(jsObject,filter,indent){




				var jsonString = JSON.stringify(jsObject);


				return jsonString;
			
		},

		json_to_js: function(jsonString,options){


			var jsObject = JSON.parse(jsonString);

			return jsObject;

					

		},

		/*********************************** OBJECT AND ARRAY CASTING ************************************************************/



		object_to_array: function(castObj){

			if(castObj instanceof Object){


				if(!(castObj instanceof Array)){





					var arr = [];
					var count = 0;

					for(key in castObj){


						arr[count] = castObj[key];

						++count;
					}

					return arr;



				}else{


					return castObj;
				}



			}else{


				this.throwErrors('Argument 1 of object_to_array() must be an object');
			}


				


		},

		array_to_object: function(castArr){



			if(castArr instanceof Array){




					var obj = {}; 

					for(var i=0; i < castArr.length; i++){

						var property = 'property_'+(i+1);
						
						obj[property] = castArr[i];


					}

					

					return obj;
				
			}else{


				this.throwErrors('Argument 1 of array_to_object() must be an array');


			}




		},













			/*********************************** EVENT HANDLING ************************************************************/


			ev_addHandler: function(element,evtype,handler){


					if (element.addEventListener){

						element.addEventListener(evtype, handler, false);

					} else if (element.attachEvent){

						element.attachEvent("on" + evtype, handler);

					} else {

						element["on" + evtype] = handler;
					}


			},// end of event handler

			ev_removeHandler: function(element,evtype,handler){


					if (element.removeEventListener){

						element.removeEventListener(evtype, handler, false);

					} else if (element.detachEvent){

						element.detachEvent("on" + evtype, handler);

					} else {

						element["on" + evtype] = null;
					}


			},


			getEvent: function(event){

				return event ? event : window.event;

			},

			getTarget: function(event){

				return event.target || event.srcElement;

			},

			preventDefault: function(event){

				if (event.preventDefault){

					event.preventDefault();

				} else {

					event.returnValue = false;
				}

			},


			stopPropagation: function(event){

				if (event.stopPropagation){

					event.stopPropagation();

				} else {

					event.cancelBubble = true;

				}

			},



		/*******************************************************************************************************************
			
			AJAX REQUESTS MANIPULATIONS

		*********************************************************************************************************************/


		ajax_http_request: function(){


				var xhr = new XMLHttpRequest();

				return xhr


		},

		xhr_configuration: function(url,requestData,successCallback,failureCallback,method,type){



			xhr = this.ajax_http_request();


								
			//xhr.addEventListener('progress',progressHandler);
			
			xhr.addEventListener('abort',abortHandler);
			xhr.addEventListener('error',errorHandler);
			xhr.addEventListener('load',loadHandler);
			
			

			function abortHandler(event){

				
				failureCallback(event);


			}// End of abort handler


			function errorHandler(event){

			
				failureCallback(event);


			}// End of abort handler


			function loadHandler(event){

				
				if(xhr.status === 200 || xhr.status === 304){
					
					
					successCallback(xhr.responseText);


				}else if(xhr.status === 404){

					var ajax_error = 'Client Error: The requested resource or url was not found, error message ['+xhr.statusText+'], error code ['+xhr.status+'].';

					failureCallback(ajax_error);

				}else if(xhr.status === 400){


					var ajax_error = 'Client Error: Request is not in required format, error message ['+xhr.statusText+'], error code ['+xhr.status+'].';

					failureCallback(ajax_error);



				}else if(xhr.status === 504){


					var ajax_error = 'Server Error: The server responded with the technical error code ['+xhr.status+']';

					failureCallback(ajax_error);


				}


			}// End of abort handler



			xhr.open(method,url,true);

			if(type){

					if(type.toLowerCase() === 'application/json' || type.toLowerCase() === 'json'){

						xhr.setRequestHeader('Content-Type','application/json');

					}else if(type.toLowerCase() === 'text/plain'){

						xhr.setRequestHeader('Content-Type','text/plain');


					}else if(type.toLowerCase() === 'text/html'){


						xhr.setRequestHeader('Content-Type','text/html');


					}else if(type.toLowerCase() === 'application/x-www-form-urlencoded'){


						xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');



					}
				

			}//End of content type check


			if(method === 'GET'){

				xhr.send(null);


			}else{

				console.log('SUKU DATA TO THE SERVER')
				console.log(requestData)

				xhr.send(requestData);


			}


			




		},

		ajax_methods_validate: function(url,requestData,successCallback,failureCallback,method){


			if((url && successCallback && failureCallback )){

				

					if(method != 'GET'){

						


						if(requestData){


							var checkResult = internalCheck();

							if(checkResult){

								return true;
							}


						}else{


							switch(method){


								case 'POST': this.throwErrors('Argument 2 of ajax_post() must be none-empty');
											 break;
								case 'PUT': this.throwErrors('Argument 2 of ajax_put() must be none-empty');
											 break;
								case 'TRACE': this.throwErrors('Argument 2 of ajax_Trace() must be none-empty');
											 break;
								default : this.throwErrors('Argument 2 of ajax_delete() must be none-empty');
											 break;

							}

							


						}// End of request data check
					

					
				}else{


					var checkResult = internalCheck();

					if(checkResult){

						return true;
					}


				}// End of method check


				}else{


					this.throwErrors('One or more of the required arguments of ajax_get() is either null,empty or not provided');


				}// End of required arguments validation check


				function internalCheck(){


					if((typeof url === 'string' && url.trim() != '')){



						if((typeof successCallback === 'function') && (typeof failureCallback === 'function')){


								
								return true;

						}else{


							SUKU.throwErrors('arguments 3 and 4 of ajax_get() must both be functions');

						}// End of required callback functions check



					}else{


						
						SUKU.throwErrors('argument 1 of ajax_get() must be a none-empty string');



					}// End of required string arguments check





				}




		},

		ajax_get: function(url,requestData,successCallback,failureCallback,type){



				var validateResult = this.ajax_methods_validate(url,requestData,successCallback,failureCallback,'GET');


				if(validateResult){


					if(type){


						this.xhr_configuration(url,requestData,successCallback,failureCallback,'GET',type);



					}else{


						this.xhr_configuration(url,requestData,successCallback,failureCallback,'GET');



					}

					

				}

			

				

		},

		ajax_post: function(url,requestData,successCallback,failureCallback,type){



			var validateResult = this.ajax_methods_validate(url,requestData,successCallback,failureCallback,'POST');


				if(validateResult){


					if(type){


						this.xhr_configuration(url,requestData,successCallback,failureCallback,'POST',type);



					}else{


						this.xhr_configuration(url,requestData,successCallback,failureCallback,'POST');



					}

					

				}



				
				

		},

		ajax_replace: function(){


				var xhr = new XMLHttpRequest();


		},

		ajax_erase: function(){


				var xhr = new XMLHttpRequest();


		},

		ajax_modify: function(){


				var xhr = new XMLHttpRequest();


		},

		



		serialize: function(form){


			var parts = [],
			field = null,
			i,
			len,
			j,
			optLen,
			option,
			optValue;

			for (i=0, len=form.elements.length; i < len; i++){

				field = form.elements[i];

				switch(field.type){

					case "select-one":
					case "select-multiple":

						if (field.name.length){




							for (j=0, optLen = field.options.length; j < optLen; j++){

								option = field.options[j];

								if (option.selected){

									optValue = "";

									if (option.hasAttribute){

										optValue = (option.hasAttribute("value") ? option.value : option.text);

									}else{

										optValue = (option.attributes["value"].specified ? option.value : option.text);

									}// End of if else if
									
									parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(optValue));

								}// End of innermost if

							}// End of for loop



						}// End of if

						break;

					case undefined: //fieldset
					case "file": //file input
					case "submit": //submit button
					case "reset": //reset button
					case "button": //custom button
					break;
					case "radio": //radio button
					case "checkbox": //checkbox

						if (!field.checked){

							break;

						}
						/* falls through */
					default:
						//don’t include form fields without names
						if (field.name.length){

							parts.push(encodeURIComponent(field.name) + "=" +encodeURIComponent(field.value));

						}


					
				}// End of switch statement


			}// End of outer for loop

			return parts.join("&");



		},// End of serialize



		validator: function(data){



				return 'Invalid Data, rectify it';


		},



		
		}// End of return framework





	})(); // End of immediately invoked function




