if (typeof jQuery == 'undefined') {
	var fileref = document.createElement('script');
	fileref.setAttribute("type", "text/javascript");
	fileref.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js");
	fileref.setAttribute("onload", "embedDiv()");
	document.getElementsByTagName("head")[0].appendChild(fileref);
} else embedDiv();

function embedDiv() {
	$(document).ready(function() {
		$('#consultrRateCard').append('<iframe frameborder="0" src="http://localhost:5000/iframeTest" width="190px" height="350px"></iframe>');
	});
}


function generateModalContent(selector, item) {
				var header = '<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h3>' + item.title +  ' <span class="divider">/</span> <a href="#" class="disabled">' + item.price + '</a></div>';
		                var body = '<div class="modal-body">' + item.description + '</div>';
	   	   	        var footer = "<div class='modal-footer'><form action='' method='POST'><script src='https://checkout.stripe.com/v2/checkout.js' class='stripe-button'";
			        footer += "data-key='pk_test_HGPEf0bMInAJeRJRwUFxxjpZ' data-amount='2000' data-name='Demo Site' data-description='2 widgets ($20.00)' ";
				footer += "data-image='\/128x128.png'><\/script></form></div>";
			       return header + body + footer;
}
function renderModal(selector, item, options) {
	var parent = "body",
	  $this = $(parent).find(selector);

			  options = options || {};
			  options.width = options.width || 'auto';

			  if ($this.length == 0) {
			    var selectorArr = selector.split(".");
			    var $wrapper = $('<div class="modal hide fade ' + selectorArr[selectorArr.length-1] + '"></div>');
			    $wrapper.append(generateModalContent(selector, item));
			    $this = $wrapper.appendTo(parent);
			    $this.modal();
			  } else {
			    $this.html(generateModalContent(selector, item)).modal("show");
			  }

			  $this.css({
			    width: options.width,
			    'margin-left': function () {
			      return -($(this).width() / 2);
			    }
			  });

			}