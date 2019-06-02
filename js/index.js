var counter=1;
function add_word(button){
	window.counter+=1;
	word=`
	<div class="word card">
		<div class="card-header">
			Word-${window.counter}
		</div>
		<div class="word_property_list card-body">
			<select class="property_name">
				<option value="None" selected disabled>Feature</option>
				<option value="conll:FORM">conll:FORM</option>
				<option value="conll:LEMMA">conll:LEMMA</option>
				<option value="conll:UPOSTAG">conll:UPOSTAG</option>
				<option value="conll:XPOSTAG">conll:XPOSTAG</option>
				<option value="conll:FEATS">conll:FEATS</option>
				<option value="conll:DEPREL">conll:DEPREL</option>	
			</select>
			&emsp;<input type="text" class="property_value"><br>		
		</div> 
		<button type="submit" onclick="add_property(this)">Add Property</button>
	</div>
	`;
	document.getElementById('word_list').innerHTML+=word;
}
function add_property(block){
	var properties = block.parentElement.getElementsByClassName("word_property_list")[0];
	var property_select_option=`
	<select class="property_name">
		<option value="None" selected deactivated>Feature</option>
		<option value="conll:FORM">conll:FORM</option>
		<option value="conll:LEMMA">conll:LEMMA</option>
		<option value="conll:UPOSTAG">conll:UPOSTAG</option>
		<option value="conll:XPOSTAG">conll:XPOSTAG</option>
		<option value="conll:FEATS">conll:FEATS</option>
		<option value="conll:DEPREL">conll:DEPREL</option>	
	</select>
	&emsp;<input type="text" class="property_value">	
	<br>
	`;
	properties.innerHTML+=property_select_option;
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
