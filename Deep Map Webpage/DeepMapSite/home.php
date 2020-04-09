<?php
	require('session.php');    
?>

</html>
	<head>
    	<script src="https://www.gstatic.com/firebasejs/7.9.1/firebase-app.js"</script>

		<!-- TODO: Add SDKs for Firebase products that you want to use
     	https://firebase.google.com/docs/web/setup#available-libraries -->
		<script src="https://www.gstatic.com/firebasejs/7.9.1/firebase-analytics.js"></script>
        <script src="https://www.gstatic.com/firebasejs/7.9.1/firebase-database.js"></script>
    </head>

  <body>    
  	
    	  
        <!--Where the list of resources is going to injected from the firebase--> 
        <div display="inline-block" id="Resources"><h2>Community Resources</h2><button value="New Resource" onclick="AddNew()">Add New</button><br>
        
          <h3>Filter</h3>
          <!--radio button selector for choosing which kind of resources to display-->
          <input type="radio" id="all_radio" name="filter" value="all" checked onclick="ApplyFilter(this.value)">
          <label for="all_radio">All</label>
          <input type="radio" id="physical_radio" name="filter" value="physical" onclick="ApplyFilter(this.value)">
          <label for="physical_radio">Physical</label>
          <input type="radio" id="virtual_radio" name="filter" value="virtual" onclick="ApplyFilter(this.value)">
          <label for="virtual_radio">Virtual<label>
  
         <hr>
        </div><br>
    
         
        <div id="newresourceform">
        
        <h2>Add/Edit Resource</h2>
        
        <label for="virtualswitch">Virtual</label>
        <input type="checkbox" id="is_virtual" name="virtualswitch" onclick="convertVirtualForm()"><br><br>
        
  		<label for="name">Name:</label><br>
        <input type="text" id="addResourceName" name="name"><br><br>
        <label for="link">Link:</label><br>
        <input type="text" id="addLink" name="link"><br><br>
        
        <div id="notVirtualApplicableFields">
  		  <label id="phoneLabel" for="phone">Phone:</label><br>
          <input type="text" id="addResourcePhone" name="phone"><br><br>
        
          <label id="emailLabel" for="email">Email:</label><br>
          <input type="text" id="addResourceEmail" name="email"><br><br>
        </div>
        
        
        
        
        <label for="image">Image:</label><br>
        <input type="file" accept="image/*" id="addImage" name="image" onchange="preview_image(event)"><br><br>
        <img id="preview-image"><br><br>
        
        
        <input type="checkbox" id="academic_accessibility_supports" name="aas">
        <label for="aas">Academic & Accessibility Supports: </label><br>
        
        
        <input type="checkbox" id="counselling" name="counselling">
        <label for="counselling">Counselling </label><br>
        
        
        <input type="checkbox" id="disability" name="disability">
        <label for="disability">Disability </label><br>
        
        
        <input type="checkbox" id="food_assistance" name="food_assistance">
        <label for="food_assistance">Food Assistance</label><br>
        
        
        <input type="checkbox" id="funding_wage_subsidies" name="funding">
        <label for="funding">Funding & Wage Subsidies</label><br>
        
        
        <input type="checkbox" id="health_wellness" name="health_wellness">
        <label for="health_wellness">Health & Wellness</label><br>
        
        
        <input type="checkbox" id="housing" name="housing">
        <label for="housing">Housing</label><br>
        
        
        <input type="checkbox" id="indigenous" name="indigenous">
        <label for="indigenous">Indigenous</label><br>
        
        
        <input type="checkbox" id="international" name="international">
        <label for="international">International</label><br>
        
        
        <input type="checkbox" id="lgbtq2s+" name="lgbtq2s+">
        <label for="lqbtq2s+">LGBTQ2S+ </label><br>
        
        
        <input type="checkbox" id="legal_advice" name="legal_advice">
        <label for="legal_advice">Legal Advice </label><br>
        
        
        <input type="checkbox" id="mental_health_addictions" name="mental_health_addictions">
        <label for="mental_health_addictions">Mental Health Addictions </label><br>
        
        
        <input type="checkbox" id="other" name="other">
        <label for="other">Other </label><br>
        
        
        <input type="checkbox" id="sexualized_violence" name="sexualized_violence">
        <label for="sexualized_violence">Sexualized Violence </label><br>
        
        <input type="checkbox" id="workplace_accessibility_career_services" name="workplace_accessibility_career_services">
        <label for="workplace_accessibility_career_services">Workplace Accessibility & Career Services</label><br><br>
        
        <label for="description">Description:</label><br>
        <textarea id="addDescription" name="description"></textarea><br><br>        
        
        <div id="notVirtualApplicableFields2">
          <label id="coordinatesLabel" for="coordinates">Location</label><br>
          <input type="text" id="addlocation" name="coordinates"><br><br>

        </div>	
        
        <input type="button" id='submitbutton' value="Submit" onclick="AddResource()">
        <input type="button" id='cancelbutton' value="Cancel" onclick="Cancel()">
	
        <hr><br>
        </div>
        
        <?php echo "<br><button><a href='logout.php'>Logout</a></button>" ?>
  </body>     


</html>

	<script>

    	
		var firebaseConfig = {
  			apiKey: "AIzaSyDCqRh-DggEksVX-sNS-4xnvV2Ng-Jit0g",
    		authDomain: "deepmapdatabas.firebaseapp.com",
    		databaseURL: "https://deepmapdatabas.firebaseio.com",
    		projectId: "deepmapdatabas",
    		storageBucket: "deepmapdatabas.appspot.com",
    		messagingSenderId: "712818292763",
    		appId: "1:712818292763:web:1db396ec5859bd4bc820be",
    		measurementId: "G-XVMWD5FL63"
		};
        
        firebase.initializeApp(firebaseConfig);
        			
        //console.log(firebase);
        
        var oldKey = "";
        var filterValue = "All";
        
        var community_resources_ref = firebase.database().ref('community_resources/');      
        
        console.log(community_resources_ref);
        
        community_resources_ref.once("value", function(snapshot) {
   			console.log(snapshot.val());
            
            var community_resources_data = snapshot.val();
                       
        	for (var key in community_resources_data) {
                
                //append all data from community resources "table"
                var res = document.createElement("div");   
                
                
                //add id 'resourcesitem' and class which indicates if it is a virtual resource or not
                res.id = "resourceitem";
                res.className = "isVirtual-"+community_resources_data[key].vrtl;
                res.style.display = 'inline';
                
                 //labels as virtual if true is found in db (could be labelled with type rather than just indicated by true or false)
                if(community_resources_data[key].vrtl){
                  res.innerHTML += '<h5>Virtual</h5>';
                }else{
                  res.innerHTML += '<h5>Physical</h5>';
                }
                
                //div for each item contain class indicating if it is virtual or not (could contain type in the future rather than just true or false)
                res.innerHTML += '<p><b>Name: </b>' + community_resources_data[key].name + ' </p> '; 

                
                
                //show these fields if the resource is not a virtual one
                if(!community_resources_data[key].vrtl){
                  res.innerHTML += '<p><b>Phone: </b>' + community_resources_data[key].phone + ' </p> '; 
                  res.innerHTML += '<p><b>Email: </b>' + community_resources_data[key].email + ' </p> ';
                }else{
                  res.innerHTML += '<p><b>Link: </b>' + community_resources_data[key].link + ' </p> ';
                }
                
                res.innerHTML += '<p><b>Categories: </b>';
                
                for(var cat in community_resources_data[key].categories){
                	if(community_resources_data[key].categories[cat]){
                    	res.innerHTML += cat + '</p> ';
                    }
                }
                
                res.innerHTML += '<br><img src=\"' + community_resources_data[key].image + '\" id="list-image"><br>';
                
                
                
                res.innerHTML += '<p id="description"><b>Description: </b>' + community_resources_data[key].description + '</p>';
                
        		res.innerHTML += '<input type="button" id="' + key + '" value="Edit" onclick="EditResource(this.id)">';
                
                res.innerHTML += '<input type="button" id="' + key + '" value="Delete" onclick="DeleteResource(this.id)"><hr>';
            	
                document.getElementById('Resources').appendChild(res);
              
        	}
        }, 
        function (error) {
   			console.log("Error: " + error.code);
		});
        
        
        
        function DeleteResource(resourceID) {  
            var result = confirm("Are you sure you want to delete this resource?"); 
            
            if(result){
        	    community_resources_ref.child(resourceID).remove();    
                window.location.reload();
            }
        }
        
        
        
        function AddResource() {
        
        	if(document.getElementById('addResourceName').value == ""){
                alert("Please at least give this resource a name")
            }
            else{
        	    var newKey;
                if(oldKey == ""){
                	newKey = community_resources_ref.push().key;
                }else{
                	newKey = oldKey;
                    oldKey = "";
                }
                
                var info = {}
                
                
                info['vrtl'] = document.getElementById('is_virtual').checked
                 
                
                info['name'] = document.getElementById('addResourceName').value;
                info['phone'] = document.getElementById('addResourcePhone').value;
                info['email'] = document.getElementById('addResourceEmail').value;
                
                //remove 'http://' or 'https://' from input if it is there
                var link = document.getElementById('addLink').value;              
                link = link.replace('http://','');
                link = link.replace('https://','');
                
                info['link'] = link;
                info['image'] = document.getElementById('preview-image').src;
                info['description'] = document.getElementById('addDescription').value;
                
                if(document.getElementById('addlocation').value != ""){
                  try{
                    var coords = document.getElementById('addlocation').value.split(',');
                    info['latitude'] = coords[0];
                    info['longitude'] = coords[1];
                  }catch(err){
                    alert(err.message);
                  }
                }

                
                
                firebase.database().ref('community_resources/'+newKey).set(info);
                
                var categories = {};
                              
                categories['academic_accessibility_supports'] = document.getElementById('academic_accessibility_supports').checked;
                categories['counselling'] = document.getElementById('counselling').checked;
                categories['disability'] = document.getElementById('disability').checked;
                categories['food_assistance'] = document.getElementById('food_assistance').checked;
                categories['funding_wage_subsidies'] = document.getElementById('funding_wage_subsidies').checked;
                categories['health_wellness'] = document.getElementById('health_wellness').checked;
                categories['housing'] = document.getElementById('housing').checked;
                categories['indigenous'] = document.getElementById('indigenous').checked;
                categories['international'] = document.getElementById('international').checked;
                categories['lgbtq2s+'] = document.getElementById('lgbtq2s+').checked;
                categories['legal_advice'] = document.getElementById('legal_advice').checked;
                categories['mental_health_addictions'] = document.getElementById('mental_health_addictions').checked;
                categories['other'] = document.getElementById('other').checked;
                categories['sexualized_violence'] = document.getElementById('sexualized_violence').checked;
                categories['workplace_accessibility_career_services'] = document.getElementById('workplace_accessibility_career_services').checked;
                            
                firebase.database().ref('community_resources/'+newKey+'/categories/').set(categories);
                
                           
               
                window.location.reload(true);
                
            }
        }
        
        
        
        function preview_image(event) {
            var reader = new FileReader();
            
            reader.onload = function() {
                var output = document.getElementById('preview-image');
                output.src = reader.result;
            }
            reader.readAsDataURL(event.target.files[0]);
        }
        
        
        
        //called when the edit button of a particular resource is clicked. It's purpose is to fetch the data from the database and automatically fill the form with it
        function EditResource(key){

        	oldKey = key;
        
        	community_resources_ref2 = firebase.database().ref('community_resources/');
        
        
            community_resources_ref2.once("value", function(snapshot) {
                var community_resources_data = snapshot.val();
                
                document.getElementById('addResourceName').value = community_resources_data[key].name;
                document.getElementById('addResourceEmail').value = community_resources_data[key].email;
                document.getElementById('addLink').value = community_resources_data[key].link;
                document.getElementById('addResourcePhone').value = community_resources_data[key].phone;
                document.getElementById('preview-image').src = community_resources_data[key].image;
                document.getElementById('addDescription').value = community_resources_data[key].description;
                document.getElementById('addlocation').value = community_resources_data[key].latitude + ',' + community_resources_data[key].longitude;  

                
        		if(community_resources_data[key].vrtl){
                    document.getElementById('is_virtual').checked = true;
                }else{
                    document.getElementById('is_virtual').checked = false;
                }
            
                
                var cat = community_resources_data[key].categories;    
                
                
                if(cat['academic_accessibility_supports']){
                    document.getElementById('academic_accessibility_supports').checked = true;
                }else{
                    document.getElementById('academic_accessibility_supports').checked = false;
                }
            
                if(cat['counselling']){
                    document.getElementById('counselling').checked = true;
                }else{
                    document.getElementById('counselling').checked = false;
                }
            
                if(cat['disability']){
                    document.getElementById('disability').checked = true;
                }else{
                    document.getElementById('disability').checked = false;            
                }
            
                if(cat['food_assistance']){
                    document.getElementById('food_assistance').checked = true;
                }else{
                    document.getElementById('food_assistance').checked = false;
                }
            
                if(cat['funding_wage_subsidies']){
                    document.getElementById('funding_wage_subsidies').checked = true;
                }else{
                    document.getElementById('funding_wage_subsidies').checked = false;
                }
            
                if(cat['health_wellness']){
                    document.getElementById('health_wellness').checked = true;
                }else{
                    document.getElementById('health_wellness').checked = false;
                }
            
                if(cat['housing']){
                    document.getElementById('housing').checked = true; 
                }else{
                    document.getElementById('housing').checked = false; 
                }
            
                if(cat['indigenous']){
                    document.getElementById('indigenous').checked = true;
                }else{
                    document.getElementById('indigenous').checked = false;
                }
            
                if(cat['international']){
                    document.getElementById('international').checked = true;
                }else{
                    document.getElementById('international').checked = false;
                }
            
                if(cat['lgbtq2s+']){
                    document.getElementById('lgbtq2s+').checked = true;
                }else{
                    document.getElementById('lgbtq2s+').checked = false;
                }
            
                if(cat['legal_advice']){
                document.getElementById('legal_advice').checked = true;
                }else{
                    document.getElementById('legal_advice').checked = false;
                }
            
                if(cat['mental_health_addictions']){
                    document.getElementById('mental_health_addictions').checked = true;
                }else{
                    document.getElementById('mental_health_addictions').checked = false;
                }
                
                if(cat['other']){
                    document.getElementById('other').checked = true;
                }else{
                    document.getElementById('other').checked = false;
                }            
            
                if(cat['sexualized_violence']){
                    document.getElementById('sexualized_violence').checked = true;
                }else{
                    document.getElementById('sexualized_violence').checked = false;
                }
            
                if(cat['workplace_accessibility_career_services']){
                    document.getElementById('workplace_accessibility_career_services').checked = true;
                }else{
                    document.getElementById('workplace_accessibility_career_services').checked = false;            
                }
                convertVirtualForm();

            }, 
            function (error) {
   			console.log("Error: " + error.code);
		    });
            
            document.getElementById('Resources').style.display = 'none';
            document.getElementById('newresourceform').style.display = 'inline-block';
        }
    
    
    
    function Cancel(){
      window.location.reload();  
    }
    
    
    
    //could change this to filter by a type value rather than just a true or false value in the future
    function ApplyFilter(filterBy) {
      
     var phys = document.getElementsByClassName('isVirtual-false');
     var virt = document.getElementsByClassName('isVirtual-true');
    
      
      if(filterBy == "all"){
  
        for(var x = 0; x < phys.length; x++){
          phys[x].style.display = 'inline';
        }
        for(var y = 0; y < virt.length; y++){
          virt[y].style.display = 'inline';
        }
        
      }else if(filterBy == "physical"){
        for(var x = 0; x < phys.length; x++){
          phys[x].style.display = 'inline';
        }
        for(var y = 0; y < virt.length; y++){
          virt[y].style.display = 'none';
        }


      }else if(filterBy == "virtual"){
              
        for(var x = 0; x < phys.length; x++){
          phys[x].style.display = 'none';
        }
        for(var y = 0; y < virt.length; y++){
          virt[y].style.display = 'inline';
        }
        
      }
      
    }
    
    
    
    function AddNew(){
      document.getElementById("Resources").style.display = 'none';
      document.getElementById("newresourceform").style.display = 'inline-block';
    }
    
    
    
    //changes the form to hide elements that are not applicable to virtual resources
    function convertVirtualForm(){
      
      if(document.getElementById('is_virtual').checked){
        
        document.getElementById("notVirtualApplicableFields").style.display = "none";
        document.getElementById("notVirtualApplicableFields2").style.display = "none";
        
        
      }else{
        
        document.getElementById("notVirtualApplicableFields").style.display = "";
        document.getElementById("notVirtualApplicableFields2").style.display = "";
      
      }
    }
        
</script>

<style>

    #preview-image{
        max-width: 200px;
        max-height: 200px;
    }
    #list-image{
        max-width: 200px;
        max-height: 200px;
    }
    #map{
        height: 400px; 
        width: 50%;
    }
    #newresourceform{
      display: none;
    }
    
    .isVirtual-true{
      display: inline;
    }
    .isVirtual-false{
      display: inline;
    }   

</style>