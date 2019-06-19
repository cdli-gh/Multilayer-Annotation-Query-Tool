var counter=0;
var query_list=[];
function add_word(button){
	window.counter+=1;

	main_div=document.createElement('div');
	main_div.className="word card";
	
	div1=document.createElement('div');
	div1.className="card-header";
	// div1.appendChild(document.createTextNode("Word-"+window.counter));
	
	div2=document.createElement('div');
	div2.className="word_property_list card-body";
	div2.style="display:flex;flex-direction: row; flex-wrap: nowrap; flex-shrink: 0;overflow-x: auto;";
	
	button1=document.createElement("button");
	button1.type="submit";
	button1.setAttribute("onclick","delete_word(this)");
	button1.appendChild(document.createTextNode("Delete Word"));
	button1.className="btn btn-danger";
	button1.style="float: right;";

	button2=document.createElement("button");
	button2.type="submit";
	button2.setAttribute("onclick","add_property(this)");
	button2.appendChild(document.createTextNode("Add Property"));
	button2.className="btn btn-primary";
	button2.style="float: left;";
	
	// <input type="text" name="word_name" class="form-control" style="float: right; width: 25%;margin: 0% 1%;" placeholder="Word Variable">
	var_input=document.createElement("input");
	var_input.type="text";
	var_input.value="w"+window.counter;
	var_input.className="variable_name form-control";
	var_input.style="width:10%;margin: 0% 1%;float:right;";
	var_input.disabled=true;	

	div1.appendChild(button1);
	div1.appendChild(button2);
	div1.appendChild(var_input);

	main_div.appendChild(div1);
	main_div.appendChild(div2);
	
	document.getElementById('word_list').appendChild(main_div);

	update_query();
	
	

}

function update_query(){
	generate_query();
	document.getElementById("cqp").value=window.query_list.join(" ");

	left_variables=document.getElementsByClassName("word_left");	
	for(i=0;i<left_variables.length;i++){
		update_dropdown(left_variables[i]);
	}
	right_variables=document.getElementsByClassName("word_right");	
	for(i=0;i<right_variables.length;i++){
		update_dropdown(right_variables[i]);
	}
}

function update_dropdown(drop_list){
	original=drop_list.value.split(":")[0].trim();
	drop_list.options.length=1;
	drop_list.options[0].selected=true;
	for(i=0;i<window.query_list.length;i++){
		x=document.createElement("option");
		v=window.query_list[i];
		if(v.split(":")[0].trim()==original){
			x.selected=true;	
		}
		x.text=v;
		x.value=v;
		drop_list.appendChild(x);		
	}
}

function add_property(block){
	var properties = block.parentElement.parentElement.getElementsByClassName("word_property_list")[0];
		
	div=document.createElement("div");
	div.className="card";
	div.style="min-width: 20vw; width:20vw; margin: 1%;";
	// min-width: 10vw; min-height: 10vh; margin:1%;
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
	
	// select2.style="width: 25%;margin:1%;";
	// select2.value="is"
	// options2=["is","is not"];
	// for(i=0;i<options2.length;i++){
	// 	x=document.createElement("option");
	// 	x.text=options2[i];
	// 	x.value=options2[i];
	// 	select2.appendChild(x);
	// }

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
	// div_out.style="width:100%;margin: 1%;"

	div_out.appendChild(or_button);
	div_out.appendChild(del_button);

	div_in.appendChild(select1);
	div_in.appendChild(select2);
	div_in.appendChild(input);
	
	// and_box=document.createElement("div");
	// and_box.className="card";
	// and_box.style="padding:1%;margin: 1%;float: left;display: inline-block;";
	// and_box.appendChild(document.createTextNode("AND"));

	div.appendChild(div_out);
	div.appendChild(div_in);
	// div.appendChild(del_button);
	
	if(properties.childElementCount>0){
		and=document.createElement("div");
		and.appendChild(document.createTextNode("AND"));
		and.style="text-align:center;color:#666666;display: flex;justify-content: center;flex-direction: column;text-align: center;";
		properties.appendChild(and);	
	}
	
	properties.appendChild(div);
}
function get_word_query(word_prop){
	query="";
	varible_name=word_prop.parentElement.children[0].getElementsByClassName("variable_name")[0].value;
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
	query+=" ] ";
	return query;
}
function generate_query(){
	
	var block=document.getElementById("cqp");
	var word_prop_list=document.getElementsByClassName("word_property_list");
	
	word_list=[];
	
	for(i=0;i<word_prop_list.length;i++){
		word_list.push(get_word_query(word_prop_list[i]));
	}
	window.query_list=word_list;
}

function or_property(block){
	var prop=block.parentElement.parentElement.getElementsByClassName("inside_card")[0];

	or=document.createElement("div");
	or.appendChild(document.createTextNode("--OR--"));
	or.style="text-align:center;color:#666666;";
	
	select1=document.createElement("select");
	select1.className="property_name";
	select1.style="width: 100%;";
	options1=["ID","FORM","LEMMA","UPOSTAG","XPOSTAG","FEATS","DEPREL"];
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
	select2.style="margin:0 45%;"
	select2.setAttribute("onclick","inverse(this)");

	input=document.createElement("input");
	input.type="text";
	input.className="property_value";
	input.style="width:100%;margin: 1%;";
	input.setAttribute("onchange","update_query()");

	prop.appendChild(or);
	prop.appendChild(select1);
	prop.appendChild(select2);
	prop.appendChild(input);
	
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

function add_dependency(button){
	// window.counter+=1;

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

	word_list=[];
	word_prop_list=document.getElementsByClassName("word_property_list");
	for(i=0;i<word_prop_list.length;i++){
		word_list.push(get_word_query(word_prop_list[i]));
	}

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

	// select2
	select2=document.createElement("select");
	select2.className="dependency_type";
	select2.style="flex:1;margin:1%;width:30%;";
	// options1=["nextWord"];
	x=document.createElement("option");
	x.text="Next Word";
	x.value="nextWord";
	x.selected=true;
	select2.appendChild(x);
	
	x=document.createElement("option");
	x.text="HEAD";
	x.value="HEAD";
	select2.appendChild(x);
	

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
	
	div2.appendChild(select1);
	div2.appendChild(select2);
	div2.appendChild(select3);
	

	main_div.appendChild(div1);
	main_div.appendChild(div2);
	
	document.getElementById('dependency_list').appendChild(main_div);

}

