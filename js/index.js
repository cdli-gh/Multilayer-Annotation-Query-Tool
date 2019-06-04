// var counter=0;
function add_word(button){
	// window.counter+=1;

	main_div=document.createElement('div');
	main_div.className="word card";
	
	div1=document.createElement('div');
	div1.className="card-header";
	// div1.appendChild(document.createTextNode("Word-"+window.counter));
	
	div2=document.createElement('div');
	div2.className="word_property_list card-body";
	div2.style="overflow: auto;max-height: 25vh;";
	
	button1=document.createElement("button");
	button1.type="submit";
	button1.setAttribute("onclick","delete_word(this)");
	button1.appendChild(document.createTextNode("Delete Word"));
	button1.style="float: right;";

	button2=document.createElement("button");
	button2.type="submit";
	button2.setAttribute("onclick","add_property(this)");
	button2.appendChild(document.createTextNode("Add Property"));
	button2.style="float: left;";
	
	div1.appendChild(button1);
	div1.appendChild(button2);

	main_div.appendChild(div1);
	main_div.appendChild(div2);
	
	document.getElementById('word_list').appendChild(main_div);
}
function add_property(block){
	var properties = block.parentElement.parentElement.getElementsByClassName("word_property_list")[0];
	
	div=document.createElement("div");
	div.className="card";
	div.style="padding: 1%;width: 25vw;margin: 1%;float: left;display: inline-block;";
	select1=document.createElement("select");
	select1.className="property_name";
	select1.style="width: 70%;margin:1%;";
	options1=["FORM","LEMMA","UPOSTAG","XPOSTAG","FEATS","DEPREL"];
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
	
	select2=document.createElement("select");
	select2.className="property_rel";
	select2.style="width: 25%;margin:1%;";
	options2=["is","is not"];
	for(i=0;i<options2.length;i++){
		x=document.createElement("option");
		x.text=options2[i];
		x.value=options2[i];
		select2.appendChild(x);
	}

	input=document.createElement("input");
	input.type="text";
	input.className="property_value";
	input.style="width:100%;margin:1%;";

	or_button=document.createElement("button");
	or_button.type="submit";
	or_button.setAttribute("onclick","or_property(this)");
	or_button.appendChild(document.createTextNode("OR"));
	or_button.style="width:48%;float:left;";

	del_button=document.createElement("button");
	del_button.type="submit";
	del_button.setAttribute("onclick","delete_property(this)");
	del_button.appendChild(document.createTextNode("Delete"));
	del_button.style="width:48%;float:right;";
	

	div.appendChild(select1);
	div.appendChild(select2);
	div.appendChild(input);
	div.appendChild(or_button);
	div.appendChild(del_button);

	properties.appendChild(div);
}

function generate_query(){
	
	var block=document.getElementById("generated_query");
	var word_prop_list=document.getElementsByClassName("word_property_list");
	
	query="";

	for(i=0;i<word_prop_list.length;i++){
		
		var properties=word_prop_list[i].getElementsByClassName("property_name");
		var properties_rel=word_prop_list[i].getElementsByClassName("property_rel");
		var properties_value=word_prop_list[i].getElementsByClassName("property_value");
		console.log(properties_rel);

		query+=" [ "
		
		for(j=0;j<properties.length;j++){
			if(j!=0){
				query+=" & ";
			}
			query += properties[j].value; 
			if(properties_rel[j].value=="is"){
				query+="=";
			}
			else if(properties_rel[j].value=="is not"){
				query+="!=";
			}
			query+= "\"" + properties_value[j].value + "\"";

		}
		query+=" ] "
	}
	block.innerHTML=query;
}

function or_property(block){
	var prop=block.parentElement;
}
function delete_word(block){
	var word=block.parentElement.parentElement;
	word.remove();
}

function delete_property(block){
	var prop=block.parentElement;
	prop.remove();	
}
