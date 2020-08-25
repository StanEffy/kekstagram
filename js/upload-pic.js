'use strict';

(function () {
    let imageEffect = document.querySelector('.effect-image-preview');
    let bigPic = document.querySelector('.big-picture');

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

        window.comments.addComment(newBigPic);

        mainPage.insertBefore(newBigPic, pics);
    }

    let refreshImgList = function(){
        for(let i = 0; i < createdImages.length; i++){
            createdImages[i].addEventListener('click', function(evt){
                evt.preventDefault();
                createdBigImages[i].classList.remove('visually-hidden');
            })
        }
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
})();