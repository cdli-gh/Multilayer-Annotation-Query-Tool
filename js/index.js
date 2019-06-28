// a counter variale which would store the counter of the number of the word 
var counter=0; 
// a list which stores the query details for every word as a separate element
var word_query_list=[];
// a list which stores the id of every word for which we are defining the query
window.word_id_list=[];
// a list which stores the dependency b/w words
var dependency_query_list=[];

function or_property(block){
	/* 
	The function is used to add another property in OR with the current property of that word
	The function recieves the **block** variable as the location of the OR button, it used to add property to that specific condition
	for eg:- [(conll:ID = "1")] => [(conll:ID = "1" | conll:ID = "2")]
	*/

	// using the **block**, we get the OR button, and then the exact location where the conditions are specified 
	var prop=block.parentElement.parentElement.getElementsByClassName("inside_card")[0];

	//  creating a division to hold the GUI for OR  
	or=document.createElement("div");

	// adding the text "OR"
	or.appendChild(document.createTextNode("OR"));
	or.style="text-align:center;color:#666666;";
	
	// creatign a dropdown and adding options to it
	select=document.createElement("select");
	select.className="property_name";
	select.style="width: 100%;";
	
	// list of options oto add
	options1=["ID","FORM","LEMMA","UPOSTAG","XPOSTAG","FEATS","DEPREL"];
	
	// addign a dummy default dropdown option 
	x=document.createElement("option");
	x.text="Feature";
	x.value="None";
	x.selected=true;
	x.disabled=true;
	select.appendChild(x);

	// adding all the options to the dropdown
	for(i=0;i<options1.length;i++){
		x=document.createElement("option");
		x.text=options1[i];
		x.value=options1[i];
		select.appendChild(x);
	}
	
	// creating an equals/not-equals sign
	equals=document.createElement("i");
	equals.className="property_rel fa fa-equals";
	equals.style="margin:0 45%;"

	// will change equals to not-eqals and vice-versa 
	equals.setAttribute("onclick","inverse(this)");

	// input box to enter the value of the property
	input=document.createElement("input");
	input.type="text";
	input.className="property_value";
	input.style="width:100%;margin: 1%;";

	// will update the query everywhere as soon as the value in the textbox is updated
	input.setAttribute("onchange","update_query()");

	// appending the OR text to the div of property of that word
	prop.appendChild(or);
	// appending the dropdown 
	prop.appendChild(select);
	// appending the equals sign
	prop.appendChild(equals);
	// appending the input box
	prop.appendChild(input);
	
}

function add_property(block){
	/*
	The functions adds a new property for the given word in an AND relation to that word
	The function recieves the **block** variable as the location of the **ADD PROPERTY** button, it used to add property more property to that word
	for eg:- [(conll:ID = "1")] => [(conll:ID = "1") & (conll:UPOSTAG = "NOUN")]	
	*/

	var properties = block.parentElement.parentElement.getElementsByClassName("word_property_list")[0];
		
	div=document.createElement("div");
	div.className="card";
	div.style="min-width: 20vw; width:20vw; margin: 1%;";

	div_in=document.createElement("div");
	div_in.className="inside_card card-body";
	div_in.style="width:100%;margin: 1%;"

	select1=document.createElement("select");
	select1.className="property_name";
	select1.style="width: 100%;";
	
	options1=["ID","FORM","LEMMA","UPOSTAG","XPOSTAG","FEATS","DEPREL",];
	x=document.createElement("option");
	x.text="Feature";
	x.value="None";
	x.selected=true;
	x.disabled=true;
	select1.appendChild(x);
	for(i=0;i<options1.length;i++){
		x=document.createElement("option");
		x.text=options1[i];
		x.value=options1[i];
		select1.appendChild(x);
	}
	
	select2=document.createElement("i");
	select2.className="property_rel fa fa-equals";
	select2.style="margin:0 45%";
	select2.setAttribute("onclick","inverse(this)");
	
	input=document.createElement("input");
	input.type="text";
	input.className="property_value";
	input.style="width:100%;margin: 1%;";
	input.setAttribute("onchange","update_query()");

	or_button=document.createElement("button");
	or_button.type="submit";
	or_button.setAttribute("onclick","or_property(this)");
	or_button.appendChild(document.createTextNode("OR"));
	or_button.className="btn btn-primary";
	or_button.style="width:40%;float:left;margin:1%;";

	del_button=document.createElement("button");
	del_button.type="submit";
	del_button.setAttribute("onclick","delete_property(this)");
	del_button.appendChild(document.createTextNode("Delete"));
	del_button.className="btn btn-danger";
	del_button.style="width:40%;float:right;margin:1%;";
	
	div_out=document.createElement("div");
	div_out.className="card-header header_card";
	
	div_out.appendChild(or_button);
	div_out.appendChild(del_button);

	div_in.appendChild(select1);
	div_in.appendChild(select2);
	div_in.appendChild(input);
	
	div.appendChild(div_out);
	div.appendChild(div_in);
	
	if(properties.childElementCount>0){
		and=document.createElement("div");
		and.appendChild(document.createTextNode("AND"));
		and.style="text-align:center;color:#666666;display: flex;justify-content: center;flex-direction: column;text-align: center;";
		properties.appendChild(and);	
	}
	
	properties.appendChild(div);
}

function add_word(button){
	window.counter+=1;

	main_div=document.createElement('div');
	main_div.className="word card";
	
	div1=document.createElement('div');
	div1.className="card-header";
	
	div2=document.createElement('div');
	div2.className="word_property_list card-body";
	div2.style="display:flex;flex-direction: row; flex-wrap: nowrap; flex-shrink: 0;overflow-x: auto;";
	
	button1=document.createElement("button");
	button1.type="submit";
	button1.setAttribute("onclick","delete_word(this)");
	button1.appendChild(document.createTextNode("Delete Word"));
	button1.className="btn btn-danger";
	button1.style="float: right;";

	message1=document.createElement("span");
	message1.appendChild(document.createTextNode("FROM"));
	message1.style="width:100%;margin: 0% 1%;";
	
	range_from=document.createElement("input");
	range_from.type="text";
	range_from.value="1";
	range_from.className="range_from form-control";
	range_from.style="width:100%;margin: 0% 1%;";
	range_from.placeholder="from";
	range_from.setAttribute("onchange","update_query()");

	div_from=document.createElement("div");
	div_from.style="width:10%; margin: 0% 1%;float:left;text-align:center;";
	div_from.appendChild(range_from);
	div_from.appendChild(message1);

	message2=document.createElement("span");
	message2.appendChild(document.createTextNode("TO"));
	message2.style="margin: 0% 1%;width: 100%;";


	range_to=document.createElement("input");
	range_to.type="text";
	range_to.value="1";
	range_to.className="range_to form-control";
	range_to.style="width:100%;margin: 0% 1%";
	range_to.placeholder="to";
	range_to.setAttribute("onchange","update_query()");
	
	div_to=document.createElement("div");
	div_to.style="width:10%; margin: 0% 1%;float:left;text-align:center;";
	div_to.appendChild(range_to);
	div_to.appendChild(message2);

	button2=document.createElement("button");
	button2.type="submit";
	button2.setAttribute("onclick","add_property(this)");
	button2.appendChild(document.createTextNode("Add Property"));
	button2.className="btn btn-primary";
	button2.style="float: left;";
	
	var_input=document.createElement("input");
	var_input.type="text";
	var_input.id="w"+window.counter;
	var_input.value="w"+window.counter;
	var_input.className="variable_name form-control";
	var_input.style="width:15%;margin: 0% 1%;float:right;";
	var_input.setAttribute("onchange","update_query()");
	// var_input.disabled=true;	


	div1.appendChild(button2);
	div1.appendChild(div_from);
	div1.appendChild(div_to);

	div1.appendChild(button1);
	div1.appendChild(var_input);

	main_div.appendChild(div1);
	main_div.appendChild(div2);
	
	document.getElementById('word_list').appendChild(main_div);

	update_query();
	
}

function add_dependency(button){
	main_div=document.createElement('div');
	main_div.className="dependency card";
	
	div1=document.createElement('div');
	div1.className="card-header";
	
	div2=document.createElement('div');
	div2.className="card-body";
	div2.style="display:flex; align-items: center; justify-content: center;";
	
	button1=document.createElement("button");
	button1.type="submit";
	button1.setAttribute("onclick","delete_dependency(this)");
	button1.appendChild(document.createTextNode("Delete Dependency"));
	button1.className="btn btn-danger";
	button1.style="float: right;";

	div1.appendChild(button1)

	word_list=window.word_query_list;

	// select1 
	select1=document.createElement("select");
	select1.className="word_left";
	select1.style="flex:1;margin: 1%; width:30%;";
	x=document.createElement("option");
	x.text="Left Variable";
	x.value="None";
	x.selected=true;
	x.disabled=true;
	select1.appendChild(x);
	for(i=0;i<word_list.length;i++){
		x=document.createElement("option");
		x.text=word_list[i];
		x.value=word_list[i];
		select1.appendChild(x);
	}
	select1.setAttribute("onchange","update_query()");
	
	// select2
	select2=document.createElement("span");
	select2.className="dependency_type";
	select2.style="flex:1;margin:1%;width:30%;text-align:center;";
	select2.appendChild(document.createTextNode("HEAD"));

	// select3
	select3=document.createElement("select");
	select3.className="word_right";
	select3.style="flex:1;margin:1%;width:30%;";
	x=document.createElement("option");
	x.text="Right Variable";
	x.value="None";
	x.selected=true;
	x.disabled=true;
	select3.appendChild(x);
	for(i=0;i<word_list.length;i++){
		x=document.createElement("option");
		x.text=word_list[i];
		x.value=word_list[i];
		select3.appendChild(x);
	}
	select3.setAttribute("onchange","update_query()");
	
	div2.appendChild(select1);
	div2.appendChild(select2);
	div2.appendChild(select3);
	

	main_div.appendChild(div1);
	main_div.appendChild(div2);
	
	document.getElementById('dependency_list').appendChild(main_div);

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
		drop_list.options.length=1;
		drop_list.options[0].selected=true;
		for(j=0;j<window.word_query_list.length;j++){
			x=document.createElement("option");
			v=window.word_query_list[j];
			id=window.word_id_list[j];
			if(id==original_selected_id){
				console.log(original_selected_id);
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
		drop_list.options.length=1;
		drop_list.options[0].selected=true;
		for(j=0;j<window.word_query_list.length;j++){
			x=document.createElement("option");
			v=window.word_query_list[j];
			id=window.word_id_list[j];
			if(id==original_selected_id){
				console.log(original_selected_id);
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
		r=dependency_prop_list[i].getElementsByClassName("word_right")[0].value.split(":")[0].trim();
		if(l!="None" && r!="None"){
			query=l+".conll:HEAD="+r;
			dependency_list.push(query);
		}
	}
	window.dependency_query_list=dependency_list;
}


function update_query(){
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
	if(sign.classList.contains("fa-equals")){
		sign.classList.replace("fa-equals","fa-not-equal");
	}
	else if(sign.classList.contains("fa-not-equal")){
		sign.classList.replace("fa-not-equal","fa-equals");
	}
	update_query();

}

function delete_dependency(block){
	var dependency=block.parentElement.parentElement;
	dependency.remove();
}

