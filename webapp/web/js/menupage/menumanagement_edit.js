/* $This file is distributed under the terms of the license in /doc/license.txt$ */

var menuManagementEdit = {
    onLoad: function() {
		this.initObjects();
		this.bindEventListeners();
    },
    initObjects: function() {
    	 this.changeContentType = $('#changeContentType');
    	 this.selectContentType = $('#selectContentType');
    	 this.existingContentType = $('#existingContentType');
    	 this.selectClassGroupDropdown = $('#selectClassGroup');
    	 this.classesForClassGroup = $('#classesInSelectedGroup');
    	 this.selectedGroupForPage = $('#selectedContentTypeValue');
    	 this.selectClassesMessage = $('#selectClassesMessage');
    	
    },
    bindEventListeners: function() {        
        // Listeners for vClass switching
        this.changeContentType.click(function() {
           menuManagementEdit.showClassGroups();
           return false;
        });
        this.selectClassGroupDropdown.change(function() {
        	menuManagementEdit.chooseClassGroup();
        });
    },
    showClassGroups: function() {
    	if(!this.existingContentType.hasClass("hidden")) {
    		this.existingContentType.addClass("hidden");
    		this.selectClassesMessage.addClass("hidden");
    		this.classesForClassGroup.addClass("hidden");
    	} 
		this.selectContentType.removeClass("hidden");

    },
    hideClassGroups: function() {
    	if(!this.selectContentType.hasClass("hidden")) {
    		
    		this.selectContentType.addClass("hidden");
    	}
    	this.existingContentType.removeClass("hidden");
    	this.selectClassesMessage.removeClass("hidden");
		this.classesForClassGroup.removeClass("hidden");
    },
    chooseClassGroup: function() {
    	
    	var url = "dataservice?getVClassesForVClassGroup=1&classgroupUri=";
    	var vclassUri = this.selectClassGroupDropdown.val();
    	url += encodeURIComponent(vclassUri);
    	//Make ajax call to retrieve vclasses
	  $.getJSON(url, function(results) {
		  
		  if ( results.classes.length == 0 ) {
             
          } else {
        	  //update existing content type with correct class group name and hide class group select again
        	  var _this = menuManagementEdit;
        	  menuManagementEdit.hideClassGroups();
        	  
        	  menuManagementEdit.selectedGroupForPage.html(results.classGroupName);
          		//retrieve classes for class group and display with all selected
        	  menuManagementEdit.classesForClassGroup.empty();
        	  menuManagementEdit.classesForClassGroup.append('<ul id="selectedClasses" name="selectedClasses">');
        	  menuManagementEdit.classesForClassGroup.append('<li class="ui-state-default">' + 
                      '<input type="checkbox" name="allSelected" id="allSelected" value="all" checked/>' +  
                      '<label class="inline" for="All"> All</label>' +
               '</li>');
              $.each(results.classes, function(i, item) {
            	  var thisClass = results.classes[i];
            	  var thisClassName = thisClass.name;
            	  //When first selecting new content type, all classes should be selected
            	  menuManagementEdit.classesForClassGroup.append(' <li class="ui-state-default">' + 
                          '<input type="checkbox" checked name="classInClassGroup" value="' + thisClass.URI + '" />' +  
                         '<label class="inline" for="' + thisClassName + '"> ' + thisClassName + '</label>' + 
                          '</li>');
              });
              menuManagementEdit.classesForClassGroup.append("</ul>");
				
              
          }
		 
	  });
    } 
};

$(document).ready(function() {   
    menuManagementEdit.onLoad();
}); 