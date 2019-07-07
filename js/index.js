// a counter variale which would store the counter of the number of the words 
var counter=0; 
// a list which stores the query details for every word as a separate element
var word_query_list=[];
// a list which stores the id of every word for which we are defining the query
window.word_id_list=[];
// a list which stores the dependency b/w words
var dependency_query_list=[];

function or_property(block, add_or=true){
	/* 
	The function is used to add another property in OR with the current property of that word
	Input Arguments=>
		block = the HTML element of the OR buttton , in order to get the conditon to add OR with 
	for eg:- [(conll:ID = "1")] => [(conll:ID = "1" | conll:ID = "2")]
	*/

	// using the **block**, we get the OR button, and then the exact location where the conditions are specified 
	var prop=block.parentElement.parentElement.getElementsByClassName("inside_card")[0];

	or_div=`<div style="text-align: center; color: rgb(102, 102, 102);">OR</div>`;

	property_selector=`
	<select class="property_name" style="width: 100%;">
		<option value="None" disabled="" selected>Feature</option>
		<option value="ID">ID</option>
		<option value="FORM">FORM</option>
		<option value="LEMMA">LEMMA</option>
		<option value="UPOSTAG">UPOSTAG</option>
		<option value="XPOSTAG">XPOSTAG</option>
		<option value="FEATS">FEATS</option>
		<option value="DEPREL">DEPREL</option>
	</select>
	<i class="property_rel fa fa-equals" onclick="inverse(this)" style="margin: 0px 45%;"></i>
	<input type="text" class="property_value" onchange="update_query()" style="width: 100%; margin: 1%;">`;

	content="";
	
	if(add_or){
		content+=or_div;
	}

	content+=property_selector;

	$(prop).append(content);	
}

function add_property(block){
	/*
	The functions adds a new property for the given word in an AND relation to that word
	Input Arguments=>
		block = the HTML element of the Word block , in order to get the Word to append the condition 
	for eg:- [(conll:ID = "1")] => [(conll:ID = "1") & (conll:UPOSTAG = "NOUN")]	
	*/

	// gets the html element using the **block** to get the word to whic we want to add the property
	var properties = block.parentElement.parentElement.getElementsByClassName("word_property_list")[0];
	
	content=`
	<div class="card" style="min-width: 20vw; width: 20vw; margin: 1%;">
        <div class="card-header header_card">
            <button type="submit" onclick="or_property(this)" class="btn btn-primary" style="width: 40%; float: left; margin: 1%;">OR</button>
            <button type="submit" onclick="delete_property(this)" class="btn btn-danger" style="width: 40%; float: right; margin: 1%;">Delete</button>
        </div>
        <div class="inside_card card-body" style="width: 100%; margin: 1%;">
            <select class="property_name" style="width: 100%;">
                <option value="None" disabled="" selected="">Feature</option>
                <option value="ID">ID</option>
                <option value="FORM">FORM</option>
                <option value="LEMMA">LEMMA</option>
                <option value="UPOSTAG">UPOSTAG</option>
                <option value="XPOSTAG">XPOSTAG</option>
                <option value="FEATS">FEATS</option>
                <option value="DEPREL">DEPREL</option>
            </select>
            <i class="property_rel fa fa-equals" onclick="inverse(this)" style="margin: 0px 45%;"></i>
            <input type="text" class="property_value" onchange="update_query()" style="width: 100%; margin: 1%;">
        </div>
    </div>
	`;
	$(properties).append(content);
}

function add_word(){
	/*
	The function adds a new word to the CQP query
	for eg:- [(conll:ID="1")] ==add_word==>> [(conll:ID="1")] [(conll:ID="2")]
	*/
	window.counter+=1;
	word_list=document.getElementById('word_list');
	$(word_list).append(`
	<div class="word card">
		<div class="card-header">
			<button type="submit" onclick="add_property(this)" class="btn btn-primary" style="float: left;">Add Property</button>
			<div style="width: 10%; margin: 0% 1%; float: left; text-align: center;">
				<input type="text" value="1" class="range_from form-control" placeholder="FROM" onchange="update_query()" style="width: 100%; margin: 0% 1%;">
				<span style="width: 100%; margin: 0% 1%;">FROM</span>
			</div>
			<div style="width: 10%; margin: 0% 1%; float: left; text-align: center;">
				<input type="text" value="1" class="range_to form-control" placeholder="to" onchange="update_query()" style="width: 100%; margin: 0% 1%;">
				<span style="margin: 0% 1%; width: 100%;">TO</span>
			</div>
			<button type="submit" onclick="delete_word(this)" class="btn btn-danger" style="float: right;">Delete Word</button>
			<input type="text" id="w${window.counter}" value="w${window.counter}" class="variable_name form-control" onchange="update_query()" style="width: 15%; margin: 0% 1%; float: right;">
		</div>
		<div class="word_property_list card-body" style="display: flex; flex-flow: row nowrap; flex-shrink: 0; overflow-x: auto;">
		</div>
	</div>
	`);

	
	
	if(window.word_query_list.length>0){
		add_dependency(add_normal_dependency="nextWord");	
	}
	
	update_query();	

}

function add_dependency(add_normal_dependency=null){
	
	dependency_list=document.getElementById('dependency_list');

	dependency_box=`
	<div class="dependency card">
	    <div class="card-header">
	        <button type="submit" onclick="delete_dependency(this)" class="btn btn-danger" style="float: right;">Delete Dependency</button>
	    </div>
	    <div class="card-body" style="display: flex; align-items: center; justify-content: center;">
	        <select class="word_left" onchange="update_query()" style="flex: 1 1 0%; margin: 1%; width: 30%;">
	            <option value="None" disabled selected>Left Variable</option>
	        </select>
	        <select class="dependency_type" onchange="update_query()" style="flex: 1 1 0%; margin: 1%; width: 30%; text-align: center;">
	            <option value="None" disabled selected>Dependency</option>
	            <option value="nextWord">nextWord</option>
	            <option value="HEAD">HEAD</option>
	        </select>
	        <select class="word_right" onchange="update_query()" style="flex: 1 1 0%; margin: 1%; width: 30%;">
	            <option value="None" disabled selected>Right Variable</option>
	        </select>
	    </div>
	</div>`;

	$(dependency_list).append(dependency_box);

	update_query();

	if(add_normal_dependency=="nextWord"){
		$(".dependency").eq(-1).find(".word_left").eq(0).prop('selectedIndex', window.word_list.length-1);
		$(".dependency").eq(-1).find(".dependency_type").eq(0).prop('selectedIndex', 1);
		$(".dependency").eq(-1).find(".word_right").eq(0).prop('selectedIndex', window.word_list.length);
	}

}

function get_word_query(word_prop){
	query="";
	varible_name=word_prop.parentElement.children[0].getElementsByClassName("variable_name")[0].value;
	
	range_from=word_prop.parentElement.children[0].getElementsByClassName("range_from")[0].value;
	range_to=word_prop.parentElement.children[0].getElementsByClassName("range_to")[0].value;	
	range="{"+range_from+", "+range_to+"} ";
	if(range_to.trim()=="inf"){
		if(range_from.trim()=="0"){
			range="*";
		}
		else if(range_from.trim()=="1"){
			range="+";
		}
	}
	if(range_from.trim()==range_to.trim()){
		range="{"+range_from+"} ";	
	}

	query+=varible_name+":[ ";
	inner_card=word_prop.getElementsByClassName("inside_card");
	for(j=0;j<inner_card.length;j++){
		query_in=" ( ";
		has_info=false;

		property_name=inner_card[j].getElementsByClassName("property_name");
		property_rel=inner_card[j].getElementsByClassName("property_rel");
		property_value=inner_card[j].getElementsByClassName("property_value");
		
		for(k=0;k<property_name.length;k++){
			name=property_name[k].value;
			rel=property_rel[k];
			value=property_value[k].value;
			
			if(name!="None" && value!=""){
				if(has_info==true)
					query_in+=" | "
				query_in+="conll:"+name;
				has_info=true;
				x=true;
				if(rel.classList.contains("fa-equals"))
					query_in+=" = ";
				else if(rel.classList.contains("fa-not-equal"))
					query_in+=" != ";
				query_in+="\""+value+"\"";
			}
		}
		query_in+=" ) ";
		if(has_info){
			if(j!=0){
				query+=" & ";
			}
			query+=query_in;
		}
	}
	query+=" ]"+range;
	return query;
}

function update_dropdowns(){
	left_variables=document.getElementsByClassName("word_left");
	for(i=0;i<left_variables.length;i++){
		drop_list=left_variables[i];
		original_selected_id=drop_list[drop_list.selectedIndex].id;
		// console.log("test4>"+original_selected_id);
		drop_list.options.length=1;
		drop_list.options[0].selected=true;
		for(j=0;j<window.word_query_list.length;j++){
			x=document.createElement("option");
			v=window.word_query_list[j];
			id=window.word_id_list[j];
			if(id==original_selected_id){
				// console.log(original_selected_id);
				x.selected=true;	
			}
			x.text=v;
			x.value=v;
			x.id=id;
			drop_list.appendChild(x);		
		}
	}

	right_variables=document.getElementsByClassName("word_right");
	for(i=0;i<right_variables.length;i++){
		drop_list=right_variables[i];
		original_selected_id=drop_list[drop_list.selectedIndex].id;
		// console.log("test4>"+original_selected_id);
		drop_list.options.length=1;
		drop_list.options[0].selected=true;
		for(j=0;j<window.word_query_list.length;j++){
			x=document.createElement("option");
			v=window.word_query_list[j];
			id=window.word_id_list[j];
			if(id==original_selected_id){
				// console.log(original_selected_id);
				x.selected=true;	
			}
			x.text=v;
			x.value=v;
			x.id=id;
			drop_list.appendChild(x);		
		}
	}
}

function generate_query(){
	
	var block=document.getElementById("cqp");
	var word_prop_list=document.getElementsByClassName("word_property_list");
	
	word_list=[];
	id_list=[];

	for(i=0;i<word_prop_list.length;i++){
		word_list.push(get_word_query(word_prop_list[i]));
		id_list.push(word_prop_list[i].parentElement.getElementsByClassName("variable_name")[0].id);
	}
	window.word_query_list=word_list;
	window.word_id_list=id_list;

	update_dropdowns();

	var dependency_prop_list=document.getElementsByClassName("dependency");

	dependency_list=[];

	for(i=0;i<dependency_prop_list.length;i++){
		l=dependency_prop_list[i].getElementsByClassName("word_left")[0].value.split(":")[0].trim();
		d=dependency_prop_list[i].getElementsByClassName("dependency_type")[0].value.trim();
		r=dependency_prop_list[i].getElementsByClassName("word_right")[0].value.split(":")[0].trim();
		// console.log("test>"+l);
		// console.log("test>"+d);
		// console.log("test>"+r);
		
		if(l!="None" && d!="None" && r!="None"){
			if(d=="HEAD")
				query=l+".conll:HEAD="+r;
			else if(d=="nextWord")
				query=l+".conll:nextWord="+r;
			dependency_list.push(query);
		}
	}
	window.dependency_query_list=dependency_list;
}


function update_query(){
	// var dependency_prop_list=document.getElementsByClassName("dependency");
	// for(i=0;i<dependency_prop_list.length;i++){
	// 	l=dependency_prop_list[i].getElementsByClassName("word_left")[0].value.split(":")[0].trim();
	// 	d=dependency_prop_list[i].getElementsByClassName("dependency_type")[0].value.trim();
	// 	r=dependency_prop_list[i].getElementsByClassName("word_right")[0].value.split(":")[0].trim();
	// 	console.log("test3>"+l);
	// 	console.log("test3>"+d);
	// 	console.log("test3>"+r);
	// }
	generate_query();
	console.log(window.word_query_list);
	console.log(window.word_id_list);
	console.log(window.dependency_query_list);
	document.getElementById("cqp").value=window.word_query_list.join(" ");
	if(window.dependency_query_list.length>0){
		document.getElementById("cqp").value+=" :: "+window.dependency_query_list.join(" & ");
	}
}


function delete_word(block){
	var word=block.parentElement.parentElement;
	word.remove();
	update_query();
}

function delete_property(block){
	var prop=block.parentElement.parentElement;
	// if not the first child of the parent
	if(prop.previousSibling!=null){
		prop.previousSibling.remove();
	}
	prop.remove();
	update_query();	
}

function inverse(sign){
	/*
	The function is used to inverse the sign of the equal(=) sign to not-equal(!=) sign and vice versa on being clicked 
	input arguments=>
		sign = the HTML element of the equals/not-equals sign  
	*/

	// check if the sign is equals
	if(sign.classList.contains("fa-equals")){
		// if the sign is equals, then change it to not-equals
		sign.classList.replace("fa-equals","fa-not-equal");
	}
	// check if the sign is not-equals
	else if(sign.classList.contains("fa-not-equal")){
		// if the sign is not-equals, then change it to equals 
		sign.classList.replace("fa-not-equal","fa-equals");
	}
	update_query();

}

function delete_dependency(block){
	var dependency=block.parentElement.parentElement;
	dependency.remove();
}

