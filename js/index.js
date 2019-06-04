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
	options2=["is","is not"]
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
	div.appendChild(select1);
	div.appendChild(select2);
	div.appendChild(input);

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
