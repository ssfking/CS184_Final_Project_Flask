

function addItem(type, price, tagline, description, follow_up, options) {
	var $item = "<div class='group'><h3><a href='#'>" + type + "<button type='button' class='close'>&times;</button></a></h3>";
	$item += "<form class='form-horizontal'><div class='control-group'><label class='control-label' for='inputPrice'>Price</label><div class='controls'><div class='input-prepend'><span class='add-on'>$</span>"
	$item += "<input class='span4' id='inputPrice' type='text' value='" + price.substring(1, price.length) + "'></div></div></div>";
	$item += "<div class='control-group'><label class='control-label' for='inputTagline'>Tagline</label>";
	$item += "<div class='controls'><textarea rows='3' id='inputTagline'>" + tagline + "</textarea></div></div><div class='control-group'><label class='control-label' for='inputDescription'>Description</label>"
	$item += "<div class='controls'><textarea rows='3' id='inputDescription'>" + description + "</textarea>";
	$item += "</div></div><div class='control-group'><label class='control-label' for='inputFollowUp'>Follow-Up </label><div class='controls'><select id='inputFollowUp'>";	
	$item += "<option>Resume Upload + Due Date</option><option>Contact Me</option></select></div></div><div class='control-group'><div class='controls'><label class='checkbox'>";
	$item += "Include Consultr Contract&trade;<input type='checkbox'></label></div></div></form></div>";
	if(options.prepend == true) $('#accordion').prepend($item);
	else $('#accordion').append($item);
}

$(document).ready(function() {
	var icons = {
			header: "ui-icon-circle-arrow-e",
	        activeHeader: "ui-icon-circle-arrow-s"
	    };
	$.getJSON('/api/rateCardInfo', function(danielHaggerty) {
		$('#accordion').hide();
		$.each(danielHaggerty.consultr_items[0].consultr_items, function (index, value) {
			addItem(value.title, value.price, value.tagline, value.description, "", {prepend: false});
		})
		
		$('#accordion').fadeIn('slow').accordion({
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
		$('#inputType').change(function() {
			var $curr = $('#inputType option:selected').text();
			if ($curr == "Other") {
				var $otherOption = '<div class="control-group" id="otherOption"><label class="control-label" for="inputOther">Other</label><div class="controls"><input type="text" style="height:30px" id="inputOther"></div></div>';
				$('.modal-body .form-horizontal').append($otherOption);
			} else {
				$('#otherOption').remove();
			}
		});
		$('div').delegate('.group button', 'click', function () {
			$(this).parent().parent().parent().remove();
		});
	});
	$('#addItemModal button').click(function() {
			var $newItem = $('#inputType option:selected').text(); 
			if ($newItem == "Other") {
				$newItem = $('#inputOther').val();
			}
			addItem($newItem, "10", "Give a short tagline to attract interest", "Give a longer description of why someone should contract your consulting services in this particular field", "", {prepend: true});
			$('#accordion').accordion('destroy').accordion({
			icons: icons,
			header: "> div > h3",
			collapsible: true
			});
		});
	$('.saveChangesBtn').click(function () {
		 var data = {};
		 data.consultr_items = new Array();
		 $('.group').each(function () {
		 	var item = {};
			var title = $(this).find('h3').text();
		 	title = title.substring(0, title.length - 1);
		 	item.title = title;
		 	var price = $(this).find('#inputPrice').first().val();
		 	item.price = '$' + price;
		 	var tagline = $(this).find('#inputTagline').first().val();
		 	item.tagline = tagline;
		 	var description = $(this).find('#inputDescription').first().val();
		 	item.description = description;
		 	data.consultr_items.push(item);
		 })
			
		 $.ajax({
		        type: "POST",
		        //the url where you want to sent the userName and password to
		        contentType: 'application/json',
		        url: '/processRateCards',
		        dataType: 'json',
		        async: false,
		        //json object to sent to the authentication url
		        data: JSON.stringify(data),
		    });
		$("<div class='alert alert-info'>Changes Saved</div>").hide().prependTo('.currContent').fadeIn('slow').delay(3000).fadeOut('slow');
	});
});

