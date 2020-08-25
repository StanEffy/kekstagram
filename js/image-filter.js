'use strict';

(function () {
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

//to get the left margin for the slider where 631 is margin of line plus
//margin of pic

    let getMargin = function(){
        if(window.innerWidth > window.utils.PREVIEW_PIC_WIDTH){
            return (window.innerWidth - (window.utils.PREVIEW_PIC_WIDTH - window.utils.YELLOW_LINE_MARGIN)) / 2;
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
})()