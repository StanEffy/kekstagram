'use strict';

(function () {
    window.comments = {
        addComment: (thisPic, smallOne) => {
            let sendNudes = thisPic.querySelector('.social__footer-btn');
            let newMessageContent = thisPic.querySelector('.social__footer-text');
            sendNudes.disabled = true;
            let changeInput = function(evt) {
                evt.preventDefault();
                //comment length validity
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
        },
    }

})();