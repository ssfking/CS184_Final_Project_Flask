var danielHaggerty = {name: "Daniel Haggerty", profession: "Professor", img: "http://research.microsoft.com/en-us/groups/mldept/viola.jpg", email: "danielh@stanford.edu", address: "46 Blue Heron, Irvine, CA", phone_number: "9492935907", location: "San Francisco, CA", description: "<h6>Header 1</h6><p>	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non sagittis augue. Aliquam erat volutpat. Aliquam vitae orci at sapien iaculis egestas. </p><h6>Header 2</h6><p>	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non sagittis augue. Aliquam erat volutpat. Aliquam vitae orci at sapien iaculis egestas. </p><h6>Header 3</h6><p>	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non sagittis augue. Aliquam erat volutpat. Aliquam vitae orci at sapien iaculis egestas. </p><h6>Header 4</h6><p>	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non sagittis augue. Aliquam erat volutpat. Aliquam vitae orci at sapien iaculis egestas. </p>"};
danielHaggerty.consultr_items = [{title: "Resume Evaluation", price: "$50", 
								short_description: "You should really consider dishing out $50 of your hard earned money, because I am exquisitely awesome.", 
								long_description: "No really, you don't get it.  I'm the hot shit!"},
								{title: "Quick Email", price: "$100", 
								short_description: "Still I see no changes, all I see is racist faces.  Missplaced hate spells disgrace....", 
								long_description: "No really, you don't get it.  I'm the hot shit!"},
								{title: "Recruit Evaluation", price: "$200", 
								short_description: "You should really consider dishing out $50 of your hard earned money, because I am exquisitely awesome.", 
								long_description: "No really, you don't get it.  I'm the hot shit!"},
								{title: "Business Plan Evaluation", price: "$500", 
								short_description: "You should really consider dishing out $50 of your hard earned money, because I am exquisitely awesome.", 
								long_description: "No really, you don't get it.  I'm the hot shit!"},
								{title: "Per-diem Consultation", price: "$3000", 
								short_description: "You should really consider dishing out $50 of your hard earned money, because I am exquisitely awesome.", 
								long_description: "No really, you don't get it.  I'm the hot shit!"},
								{title: "Investment Evaluation", price: "$3000", 
								short_description: "You should really consider dishing out $50 of your hard earned money, because I am exquisitely awesome.", 									long_description: "No really, you don't get it.  I'm the hot shit!"},
								{title: "Advisory Board Membership", price: "$30000", 
								short_description: "You should really consider dishing out $50 of your hard earned money, because I am exquisitely awesome.", 
								long_description: "No really, you don't get it.  I'm the hot shit!"}];
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
				$('#consultrProfileHeader').append('<img src="' + danielHaggerty.img + '"" id="consultrProfilePhoto"></img> ' + danielHaggerty.name);
				var $consultrItems = '';
				$.each(danielHaggerty.consultr_items, function (index, value) {
					var $newItem = $('<div class="rateItem" ><div class="consultrItemDescription">' + value.title + 
									'</div><button class="btn btn-mini btn-success consultrBtn">' + value.price + '</button></div>');
					$newItem.popover({ animation: true, html: true, trigger: 'hover', content: "<div class='consultrPopover'>" + value.short_description + "</div>", delay: {show: 1000, hide: 0}, placement: "top"});
					$newItem.appendTo('#consultrRateCard');
				});
				$('#consultrAboutMe').append(danielHaggerty.description);
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

			