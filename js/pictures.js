'use strict'

let createdImages = [];
let createdBigImages = [];
//to get some random integers to make a simulation of real data

let getRandomInteger = function(max) {
	return Math.floor(Math.random() * Math.floor(max))
}
//body is body
let mainPage = document.querySelector('.main-page');

//we also want to get a unique avatar for user comments and for the author of the picture
let getAvatar = function() {
	let num = getRandomInteger(6);
	if(num == 0) {
		return 1
	} else {
		return num;
	}
}
//sorting function
let sortItOut = function(a, b){
	return a - b;
}

//random filter
let filterRandomPic = function() {
	let filterRandom = document.querySelector('#filter-random');
	filterRandom.addEventListener('click', function (evt){
			//evt.preventDefault();
			let arrayNums = [];
			let pictures = document.querySelectorAll('.picture');
			for(let i = 0; arrayNums.length < 10; i++){
				let index = getRandomInteger(pictures.length-1);
				if(!arrayNums.includes(index)){
					arrayNums.push(index);
				}
			}
			let fragment = document.createDocumentFragment();

			arrayNums.forEach(elem => fragment.appendChild(pics.removeChild(pictures[elem])));
			pics.prepend(fragment);

		}

	)
};

let filterPopularPic = function(selector, filterId) {
	let filterPopular = document.querySelector(filterId);
	filterPopular.addEventListener('click', function (evt){
		let pictures = document.querySelectorAll('.picture');
		let countArr = [];
		let indexOfOriginal = [];
		pictures.forEach(elem => {
			countArr.push(elem.querySelector(selector).textContent);
		});
		let initialState = countArr.slice();
		countArr.sort((a,b)=>( b-a ));
		console.log(initialState);
		console.log(countArr);
		let fragment = document.createDocumentFragment();

		countArr.forEach(elem => {
			let ind = initialState.indexOf(elem);

			initialState.splice(ind, 1, 'f');
			indexOfOriginal.push(ind);
		});
		console.log(indexOfOriginal);

		indexOfOriginal.forEach(elem => fragment.appendChild(pics.removeChild(pictures[elem])));

		pics.appendChild(fragment);
	})
}


let addComment = function(thisPic, smallOne){
	let sendNudes = thisPic.querySelector('.social__footer-btn');
	let newMessageContent = thisPic.querySelector('.social__footer-text');

	sendNudes.disabled = true;

	let changeInput = function(evt) {
		evt.preventDefault();
		if(newMessageContent.value.trim().length > 2){
			sendNudes.disabled = false;
		}

	}
	newMessageContent.addEventListener('input', changeInput);
/*create a new message and append it to pic container*/
	let appendMessage = function(evt) {
		if(newMessageContent.value.trim().length > 2){
			let newMessage = document.createElement('li');
			newMessage.classList.add('social__comment');
			let newMessageImg = document.createElement('img');
			newMessageImg.classList.add('social__picture');
			newMessageImg.src = 'img/avatar-6.svg';
			let newMessageText = document.createElement('p');
			newMessageText.classList.add('social__text');
			newMessageText.textContent = newMessageContent.value;
			newMessage.appendChild(newMessageImg);
			newMessage.appendChild(newMessageText);
			let commentsList = thisPic.querySelector('.social__comments');
			let commentsDisplay = thisPic.querySelector('.comments__display');
			commentsDisplay.textContent = parseInt(commentsDisplay.textContent, 10) + 1;
			let commentsCount = thisPic.querySelector('.comments-count');
			commentsCount.textContent = parseInt(commentsCount.textContent, 10) + 1;
			commentsList.appendChild(newMessage);
			let smallComments = smallOne.querySelector('.picture-comments');
			smallComments.textContent = +smallComments.textContent + 1;
			sendNudes.disabled = true;
			newMessageContent.value = '';
		}
	}
	sendNudes.addEventListener('click', function (evt) {
		appendMessage();
	});

	newMessageContent.addEventListener('keydown', function(evt){
		if(evt.keyCode === 13 && newMessageContent.value.trim().length > 2){
			appendMessage();
		}
	});

}


let pics = document.querySelector('.pictures');
let pic = pics.querySelector('.picture');
let bigPic = document.querySelector('.big-picture');

let galleryOverlay = document.querySelector('.big-picture__img');
let bigDescription = document.querySelector('.social__caption');
let likesCount = document.querySelector('.likes-count');
let commentsCount = document.querySelector('.comments-count');


let closePicture = document.querySelector('.big-picture__cancel');

//close the bigpic by the click on the cross
closePicture.addEventListener('click', function(evt){
	evt.preventDefault();
	bigPic.classList.add('visually-hidden');
	sendNudes.removeEventListener('click', appendMessage);
	//we should mend it on close
});


let uploadOverlay = document.querySelector('.upload-overlay');

//close the upload form

let uploadClose = document.getElementById('upload-cancel');

uploadClose.addEventListener('click', function(evt) {
	evt.preventDefault();
	uploadOverlay.classList.add('visually-hidden');

	uploadOverlay.querySelector('.upload-form-hashtags').value = '';
	uploadOverlay.querySelector('.upload-form-description').value = '';
})

// manipulation with the scale. Pin is this sphere and imageEffect is kitty picture

let levelPin = document.querySelector('.upload-effect-level-pin');
let imageEffect = document.querySelector('.effect-image-preview');

//block with the list of radio buttons
//let inputOriginal = document.getElementById('upload-effect-none');
let inputChrome = document.getElementById('upload-effect-chrome');
let inputSepia = document.getElementById('upload-effect-sepia');
let inputMarvin = document.getElementById('upload-effect-marvin');
let inputPhobos = document.getElementById('upload-effect-phobos');
let inputHeat = document.getElementById('upload-effect-heat');

//yellow line on the effect 
let levelStripe = document.querySelector('.upload-effect-level-val');

//grey background of the line
let levelStripeArea = document.querySelector('.upload-effect-level');

//effect
let uploadEffect = document.querySelector('.upload-effect');
let imagePreview = document.querySelector('.upload-form-preview');

//function which computes the intensity of the effect on the picture
let getEffectInt = function(){
	let num = window.getComputedStyle(levelPin).left;
	return Math.trunc(parseInt(num, 10) / 45);
	}

//here is a function which computes how intense is the applying effect
let filterChange = function(){
	if(inputChrome.checked){
		imageEffect.style = `filter: grayscale(${getEffectInt()*10}%)`;
		
	} else if(inputSepia.checked){
		imageEffect.style = `filter: sepia(${getEffectInt()*10}%)`;
		} else if(inputMarvin.checked){
		imageEffect.style = `filter: invert(${getEffectInt()*10}%)`;
			} else if(inputPhobos.checked){
		imageEffect.style = `filter: blur(${Math.trunc(getEffectInt()/3)}px)`;
				} else if(inputHeat.checked){
		imageEffect.style = `filter: brightness(${Math.trunc(getEffectInt()/3)})`;;
	} else {
		imageEffect.style = `filter: none`;
	}
};


//this affects on the width of the yellow stripe there
levelStripe.style.width = window.getComputedStyle(levelPin).left;

//list of consts
let PREVIEW_PIC_WIDTH = 586;
let YELLOW_LINE_WIDTH = 495;
let YELLOW_LINE_MARGIN = 90;

//to get the left margin for the slider where 631 is margin of line plus
//margin of pic

let getMargin = function(){
	if(window.innerWidth > PREVIEW_PIC_WIDTH){
		return (window.innerWidth - (PREVIEW_PIC_WIDTH - YELLOW_LINE_MARGIN)) / 2; 
	} else {
		return 0;
	}
}

//to keep the offsetValue
let shiftX;

//drag and drop of slider-effect which works pretty bad and nervous 
//i don't know why by now
levelPin.addEventListener('mousedown', function(evt) {
	evt.preventDefault();
	shiftX = evt.offsetX;
	console.log(shiftX);
	//levelPin.style.left = window.getComputedStyle(levelPin).left;
	//levelPin.style.left = evt.offsetX;
	let levelPinMouseMoveHandler =  function(moveEvt) {
		console.log(moveEvt.pageX - getMargin());
		console.log('pin is situated on ' + levelPin.style.left);
		console.log('margin is ' + getMargin())
		
		moveEvt.preventDefault();
		let getPx = moveEvt.pageX - getMargin();
		if(getPx > 457){
			levelPin.style.left = "457px";
			} else if(getPx < 7){
			levelPin.style.left = "7px";
				} else {
					levelPin.style.left = moveEvt.pageX - getMargin() + 'px';
				}

		levelStripe.style.width = window.getComputedStyle(levelPin).left;
		filterChange();
	}
	
	document.addEventListener('mousemove', levelPinMouseMoveHandler);

	let levelPinMouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', levelPinMouseMoveHandler);
      document.removeEventListener('mouseup', levelPinMouseUpHandler);
    };

    document.addEventListener('mouseup', levelPinMouseUpHandler)
  });

let effectLabels = document.querySelectorAll('.upload-effect-label');

let uploadFile = document.querySelector('.upload-file');

uploadFile.addEventListener('click', function(evt){
	
	(function(){
	effectLabels.forEach(elem => elem.addEventListener('mousedown', filterChange));
})();
});
(function(){
	let renderComment = function(array){
		let fragment = document.createDocumentFragment();
		array.forEach(function(element){
			let container = document.createElement('li');
			container.classList.add('social__comment');
			let avatar = document.createElement('img');
			avatar.classList.add('social__picture');
			avatar.src = element.avatar;
			avatar.alt = element.name;
			avatar.style.width = '35';
			avatar.style.height = '35';
			let paragrath = document.createElement('p');
			paragrath.classList.add('social__text');
			paragrath.textContent = element.message;
			container.appendChild(avatar);
			container.appendChild(paragrath);
			fragment.appendChild(container);
			
		});
		return fragment;
	}

	let renderPhoto = function(array) {
		let fragment = document.createDocumentFragment();
		array.forEach(function(element){
			let imageContainer = document.createElement('div');
			imageContainer.classList.add('big-picture__img');
			let image = document.createElement('img');
			image.width = '600';
			image.height = '600';
			image.alt = 'вот что ты тут забыл?';
			image.url = element.url;
			imageContainer.appendChild(image);

		})
		return fragment;
	}

	let renderBigPhotos = function(array){
		for(let i = 0; i < array.length; i++) {
			let ref = document.createElement('a');
			ref.classList.add('picture');
			ref.innerHTML = '<img src="' + array[i].url + '" />';
			let stats = document.createElement('span');
			stats.classList.add('picture-stats');

			let comment = document.createElement('span');
			comment.classList.add('picture-comments');
			comment.classList.add('picture-stat');
			comment.textContent = array[i].comments.length;
			stats.appendChild(comment);

			let like = document.createElement('span');
			like.classList.add('picture-likes');
			like.classList.add('picture-stat');
			like.textContent = array[i].likes;
			stats.appendChild(like);
			ref.appendChild(stats);
			pics.appendChild(ref);
		}

		for(let i = 0; i < array.length; i++){
			let templateItem = bigPic.cloneNode(true);
			let addPicture = templateItem.querySelector('.big-picture__img img');
			addPicture.src = array[i].url;
			addPicture.width = '600';
			addPicture.height = '600';
			addPicture.alt = 'some picture';

			let bigPicSocial = templateItem.querySelector('.big-picture__social');
			let socialPic = bigPicSocial.querySelector('.social__picture');
			socialPic.src = 'img/avatar-'+ getAvatar() + '.svg';
			let photoDescription = bigPicSocial.querySelector('.social__caption');
			photoDescription.textContent = array[i].description;
			let socialLikes = bigPicSocial.querySelector('.likes-count');
			socialLikes.textContent = array[i].likes;

			let commentDisplay = bigPicSocial.querySelector('.comments__display');
			let commentCount = bigPicSocial.querySelector('.comments-count');
			if(array[i].comments.length >= 5){
				commentDisplay.textContent = '5';
				commentCount.textContent = array[i].comments.length;
			} else {
				commentDisplay.textContent = array[i].comments.length;
				commentCount.textContent = array[i].comments.length;
			}

			let commentsList = bigPicSocial.querySelector('.social__comments');
			commentsList.innerHTML = '';
			commentsList.appendChild(renderComment(array[i].comments));

			mainPage.insertBefore(templateItem, pics);

		}
		let bigPictureArray = document.querySelectorAll('.big-picture');
		
		let pictureArray = document.querySelectorAll('.picture');
		
    	for(let i = 0; i < pictureArray.length; i++){
      		pictureArray[i].addEventListener('click', function(evt){
        		evt.preventDefault();
        		let ifCommentAdded = false;

        		bigPictureArray[i].classList.remove('visually-hidden');
        		let commentsListBigPic = bigPictureArray[i].querySelectorAll('.social__comment');
        		let buttonSocialLoadMore = bigPictureArray[i].querySelector('.social__loadmore');

        		if(commentsListBigPic.length > 5){
					for(let i = 5; i < commentsListBigPic.length; i++){
						commentsListBigPic[i].classList.add('visually-hidden');
						buttonSocialLoadMore.classList.remove('visually-hidden');
						buttonSocialLoadMore.disabled = false;
						let activeDisplay = bigPictureArray[i].querySelector('.comments__display');
						activeDisplay.textContent = '5';
					}
				}

				buttonSocialLoadMore.addEventListener('click', function(evt){
					evt.preventDefault();
					for(let j = 5; j < commentsListBigPic.length; j++){
						commentsListBigPic[j].classList.remove('visually-hidden');
						
						let activeDisplay = bigPictureArray[i].querySelector('.comments__display');
						activeDisplay.textContent = bigPictureArray[i].querySelectorAll('.social__comment').length;
						buttonSocialLoadMore.disabled = 'true';
					}
				})
				addComment(bigPictureArray[i], pictureArray[i]);

        	})
      	}

		let popupClose = document.querySelectorAll('.big-picture__cancel');
		
		popupClose.forEach(elem => elem.addEventListener('click', function(evt){
			evt.preventDefault();
			this.parentNode.parentNode.classList.add('visually-hidden');
			//buttonSocialLoadMore.textContent = 'Загрузить все комментарии';

		}));
	}

	
    let hideThisPopup = function(){
		this.parentNode.classList.add('visually-hidden');
	}
	

	window.backend.load(renderBigPhotos, window.errorHandler);
	filterRandomPic();
	filterPopularPic('.picture-likes', '#filter-popular');
	filterPopularPic('.picture-comments', '#filter-discussed');
})();

//Upload your picture
let uploadFileId = document.querySelector('#upload-file');
uploadFileId.addEventListener('change', function(evt){
	uploadOverlay.classList.remove('visually-hidden');
	let file = uploadFileId.files[0];

	let reader = new FileReader();
	imageEffect.file = file;


	let src = reader.readAsDataURL(file);


    reader.onload = (function(aImg) { 
    	return function(e) { 
    		aImg.src = e.target.result; 
    		}; 
    	})(imageEffect);

	imageEffect.src = src;
	imageEffect.width ='586';
	imageEffect.height ='587';
	imageEffect.classList.add('object-fit');
})

let renderNewBigPic = function(){
	let newBigPic = bigPic.cloneNode(true);
	createdBigImages.push(newBigPic);
	let img = newBigPic.querySelector('.big-picture__img img');
	img.src = imageEffect.src;
	img.style.filter = imageEffect.style.filter;
	img.classList.add('object-fit');

	let socialCaption = newBigPic.querySelector('.social__caption');
	socialCaption.textContent = document.querySelector('.upload-form-hashtags').value + ' ' + document.querySelector('.upload-form-description').value;
	newBigPic.querySelector('.social__picture').src = 'img/avatar-' + getAvatar() + '.svg';
	newBigPic.querySelector('.likes-count').textContent = '0';
	newBigPic.querySelector('.comments__display').textContent = '0';
	newBigPic.querySelector('.comments-count').textContent = '0';
	newBigPic.querySelector('.social__comments').innerHTML = '';

	let close = newBigPic.querySelector('.big-picture__cancel');

	close.addEventListener('click', function(evt){
		evt.preventDefault();
		this.parentNode.parentNode.classList.add('visually-hidden');
	});

	addComment(newBigPic);

	mainPage.insertBefore(newBigPic, pics);
}

let submitPic = document.querySelector('.upload-form-submit');
submitPic.addEventListener('click', function(evt){
	evt.preventDefault();

	let newPic = imageEffect.cloneNode();
	newPic.className = '';

	let linkImageCover = document.createElement('a');
	linkImageCover.classList.add('picture');
	linkImageCover.classList.add('picture-added');
	linkImageCover.appendChild(newPic);

	let picStatsContainer = document.createElement('span');
	picStatsContainer.classList.add('picture-stats');

	let picComment = document.createElement('span');
	let picLikes = document.createElement('span');

	picComment.classList.add('picture-stat');
	picComment.classList.add('picture-comments');
	picLikes.classList.add('picture-stat');
	picLikes.classList.add('picture-likes');

	picComment.textContent = '0';
	picLikes.textContent = '0';

	picStatsContainer.appendChild(picComment);
	picStatsContainer.appendChild(picLikes);

	linkImageCover.appendChild(picStatsContainer);

	createdImages.push(linkImageCover);

	pics.appendChild(linkImageCover);
	uploadOverlay.classList.add('visually-hidden');

	renderNewBigPic();

	refreshImgList();

});

var refreshImgList = function(){
	for(let i = 0; i < createdImages.length; i++){
		createdImages[i].addEventListener('click', function(evt){
			evt.preventDefault();
			createdBigImages[i].classList.remove('visually-hidden');
		})
	}
}
