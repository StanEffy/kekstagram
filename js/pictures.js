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

//adding comments to any picture you want


let pics = document.querySelector('.pictures');
let pic = pics.querySelector('.picture');
let bigPic = document.querySelector('.big-picture');

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
});

// manipulation with the scale. Pin is this sphere and imageEffect is kitty picture


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
				window.comments.addComment(bigPictureArray[i], pictureArray[i]);

        	})
      	}

		let popupClose = document.querySelectorAll('.big-picture__cancel');

		popupClose.forEach(elem => elem.addEventListener('click', function(evt){
			evt.preventDefault();
			this.parentNode.parentNode.classList.add('visually-hidden');
			//buttonSocialLoadMore.textContent = 'Загрузить все комментарии';

		})
		);
	}

	window.backend.load(renderBigPhotos, window.errorHandler);
	window.filters.filterRandomPic();
	window.filters.filterPopularPic('.picture-likes', '#filter-popular');
	window.filters.filterPopularPic('.picture-comments', '#filter-discussed');
})();




