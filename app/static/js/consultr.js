
			
var tabContainers = {};
tabContainers['RateCard'] = '#consultrRateCard';
tabContainers['About Me'] = '#consultrAboutMe';
tabContainers['Contact'] = '#consultrContact';

function getItem(items, title) {
	for (var i in items) {
		if (items[i].title === title) return items[i];
	}
}

$(document).ready(function () {
	$.getJSON('/api/rateCardInfo', function(danielHaggerty) {
		$('#consultrProfileHeader').append('<img src="' + danielHaggerty.img + '"" id="consultrProfilePhoto"></img> ' + danielHaggerty.name);
		var $consultrItems = '';
		$.each(danielHaggerty.consultr_items[0].consultr_items, function (index, value) {
			var $newItem = $('<div class="rateItem" ><div class="consultrItemDescription">' + value.title + 
							'</div><button class="btn btn-mini btn-success consultrBtn">' + value.price + '</button></div>');
			$newItem.popover({ animation: true, html: true, trigger: 'hover', content: "<div class='consultrPopover'>" + value.tagline + "</div>", delay: {show: 1000, hide: 0}, placement: "top"});
			$newItem.appendTo('#consultrRateCard');
			});
			$('#consultrAboutMe').append(danielHaggerty.about_me);
			$('.consultrTabItem').click(function ()  {
			$(tabContainers[$('.active').text()]).addClass('consultrInvisible');
			$('.active').removeClass('active');
			$(this).addClass('active');
			$(tabContainers[$(this).text()]).removeClass('consultrInvisible');
		});
		$('.consultrBtn').click(function () {
			var currItem = getItem(danielHaggerty.consultr_items, $(this).siblings('.consultrItemDescription').html());
			$(window.parent.renderModal(".my-modal-class", currItem, {width: "500px"}));
		})
	});
	
});

			