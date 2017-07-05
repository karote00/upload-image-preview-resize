document.addEventListener('DOMContentLoaded', function() {
	var uploadCards = document.querySelectorAll('.upload-card');

	for (var i = 0; i < uploadCards.length; i++) {
		uploadCards[i].addEventListener('click', uploadFile);
	}

	function uploadFile() {
		var self = this;
		var name = self.getAttribute('name');
		var fileInput = document.querySelector('input[name="' + name + '"]');
		fileInput && fileInput.click();
	}
});

var FILE_SIZE = 10;
var SINGLE_IMAGE_LIMIT = 1024 * 1024 * FILE_SIZE;

function convertImgToBase64(file, cb) {
  var FR = new FileReader();
  FR.onload = function(e) {
		cb(e.target.result);
  };

  FR.readAsDataURL(file);
}

function uploadImage(input) {
	var name = input.name;
	var uploadCard = document.querySelector('div[name="' + name + '"]');
	var img = uploadCard.querySelector('img');

	var file = input.files[0];
	if (file.size > SINGLE_IMAGE_LIMIT) {
		alert('單個圖片大小不可超過 ' + FILE_SIZE + 'MB');
	} else {
		var result = convertImgToBase64(file, function(result) {
			setImg(uploadCard, result);
		});
	}

	input.value = '';
}

function setImg(elm, result) {
	var self = elm;
	var uploadCard = self.parentElement;
	var imgContainer = self.querySelector('.img');
	var img = self.querySelector('img');
	img.src = result;
	imgContainer.style.opacity = '0';
	imgContainer.style.padding = '';
	imgContainer.style.height = '';
	imgContainer.style.width = '';

	setTimeout(function() {
		imgContainer.style.opacity = '1';

		var sW = self.clientWidth;
		var sH = self.clientHeight;
		var imgW = img.clientWidth || sW - 8;
		var imgH = img.clientHeight || sH - 8;
		if ((imgW / imgH) >= ((sW - 8) / (sH - 8))) {
			imgContainer.style.width = (sW - 8) + 'px';
			imgContainer.style.paddingTop = ((sH - imgH - 8) / 2) + 'px';
		} else {
			var lw = (sH / imgH) * sW;
			imgContainer.style.height = (sH - 8) + 'px';
			imgContainer.style.paddingLeft = ((sW - lw - 8) / 2) + 'px';
			imgContainer.style.paddingRight = ((sW - lw - 8) / 2) + 'px';
		}
	}, 200);
}