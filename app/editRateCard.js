var itemTemplateA = "<div class='group'><h3><a href='#'>"
var itemTemplateB = "<button type='button' class='close'>&times;</button></a></h3>";
itemTemplateB += "<form class='form-horizontal'><div class='control-group'><label class='control-label' for='inputPrice'>Price</label>";
itemTemplateB += "<div class='controls'><div class='input-prepend'><span class='add-on'>$</span>";
itemTemplateB += "<input class='span4' id='inputPrice' type='text' value='50'></div></div></div>";
itemTemplateB += "<div class='control-group'><label class='control-label' for='inputTagline'>Tagline</label>";
itemTemplateB += "<div class='controls'><textarea rows='3' id='inputTagline'>Resume/candidate evaluations for applicants specializing in Machine Learning and Biocomputation.</textarea>"; 
itemTemplateB += "</div></div><div class='control-group'><label class='control-label' for='inputDescription'>Description</label>";
itemTemplateB += "<div class='controls'><textarea rows='7' id='inputDescription'>I have spent a significant portion of my tenure at Stanford researching Machine Learning algorithms, and have been published in Science twice in the time period.  I have also served as CTO for three different big-data-driven companies, and have evaluated countless candidates in my field of expertise.  I would happily look over any resume, and would be willing (for an additional fee) to consult on an in-person interview.</textarea>"; 
itemTemplateB += "</div></div><div class='control-group'><label class='control-label' for='inputFollowUp'>Follow-Up </label><div class='controls'><select id='inputFollowUp'>";
itemTemplateB += "<option>Resume Upload + Due Date</option><option>Contact Me</option></select></div></div><div class='control-group'><div class='controls'><label class='checkbox'>";
itemTemplateB += "Include Consultr Contract&trade;<input type='checkbox'></label></div></div></form></div>";
$(function() {
	var icons = {
		header: "ui-icon-circle-arrow-e",
        activeHeader: "ui-icon-circle-arrow-s"
    };
	$('#accordion').accordion({
		icons: icons,
		header: "> div > h3",
		collapsible: true
	})
	$('#accordion').sortable({
	    axis: "y",
	    handle: "h3",
	    stop: function( event, ui ) {
			          // IE doesn't register the blur when sorting
			          // so trigger focusout handlers to remove .ui-state-focus
	   ui.item.children( "h3" ).triggerHandler( "focusout" );
    	}
	});
});
$(document).ready(function() {
	$('#inputType').change(function() {
		var $curr = $('#inputType option:selected').text();
		if ($curr == "Other") {
			var $otherOption = '<div class="control-group" id="otherOption"><label class="control-label" for="inputOther">Other</label><div class="controls"><input type="text" style="height:30px" id="inputOther"></div></div>';
			$('.modal-body .form-horizontal').append($otherOption);
		} else {
			$('#otherOption').remove();
		}
	});
	$('#addItemModal button').click(function() {
		var $newItem = $('#inputType option:selected').text(); 
		if ($newItem == "Other") {
			$newItem = $('#inputOther').val();
		}
		$newItem = itemTemplateA + $newItem + itemTemplateB;
		$('#accordion').prepend($newItem);
		var icons = {
		header: "ui-icon-circle-arrow-e",
        activeHeader: "ui-icon-circle-arrow-s"
    	};

		$('#accordion').accordion('destroy').accordion({
		icons: icons,
		header: "> div > h3",
		collapsible: true
		});
	});
	$('.group button').click(function () {
		$(this).parent().parent().parent().remove();
	});
	$('.saveChangesBtn').click(function () {
		$("<div class='alert alert-info'>Changes Saved</div>").hide().prependTo('.currContent').fadeIn('slow').delay(3000).fadeOut('slow');
	});
});

