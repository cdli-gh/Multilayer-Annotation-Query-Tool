var counter=1;
function add_word(button){
	window.counter+=1;

	main_div=document.createElement('div');
	main_div.className="word card";
	div1=document.createElement('div');
	div1.className="card-header";
	div1.appendChild(document.createTextNode("Word-"+window.counter));
	div2=document.createElement('div');
	div2.className="word_property_list card-body";
	div2.style="overflow: auto;height: 20vh;";
	div21=document.createElement("div");
	div21.className="card";
	div21.style="padding: 1%;width: 20vw; margin: 1%;float: left;";
	select=document.createElement("select");
	select.className="property_name";
	select.style="width: 100%;";
	options=["FORM","LEMMA","UPOSTAG","XPOSTAG","FEATS","DEPREL"];
	x=document.createElement("option");
	x.text="Feature";
	x.value="None";
	x.selected=true;
	x.disabled=true;
	select.appendChild(x);
	for(i=0;i<options.length;i++){
		x=document.createElement("option");
		x.text=options[i];
		x.value="conll:"+options[i];
		select.appendChild(x);
	}
	input=document.createElement("input");
	input.type="text";
	input.class="property_value";
	input.style="width:100%;";
	div21.appendChild(select);
	div21.appendChild(input);
	div2.appendChild(div21);
	button=document.createElement("button");
	button.type="submit";
	button.setAttribute("onclick","add_property(this)");
	button.appendChild(document.createTextNode("Add Property"));
	main_div.appendChild(div1);
	main_div.appendChild(div2);
	main_div.appendChild(button);
	
	document.getElementById('word_list').appendChild(main_div);
}
function add_property(block){
	var properties = block.parentElement.getElementsByClassName("word_property_list")[0];
	
	div=document.createElement("div");
	div.className="card";
	div.style="padding: 1%;width: 20vw; margin: 1%;float: left;";
	select=document.createElement("select");
	select.className="property_name";
	select.style="width: 100%;";
	options=["FORM","LEMMA","UPOSTAG","XPOSTAG","FEATS","DEPREL"];
	x=document.createElement("option");
	x.text="Feature";
	x.value="None";
	x.selected=true;
	x.disabled=true;
	select.appendChild(x);
	for(i=0;i<options.length;i++){
		x=document.createElement("option");
		x.text=options[i];
		x.value="conll:"+options[i];
		select.appendChild(x);
	}
	input=document.createElement("input");
	input.type="text";
	input.class="property_value";
	input.style="width:100%;";
	div.appendChild(select);
	div.appendChild(input);

	properties.appendChild(div);
}

function generate_query(){
	
	var block=document.getElementById("generated_query");
	var word_prop_list=document.getElementsByClassName("word_property_list");
	
	query="";

	for(i=0;i<word_prop_list.length;i++){
		
		var properties=word_prop_list[i].getElementsByClassName("property_name");
		var properties_value=word_prop_list[i].getElementsByClassName("property_value");
		
		query+=" [ "
		
		for(j=0;j<properties.length;j++){
			if(j!=0){
				query+=" & ";
			}
			query+=properties[j].value+"= \""+properties_value[j].value+"\"";
		}
		query+=" ] "
	}
	block.innerHTML=query;
}
