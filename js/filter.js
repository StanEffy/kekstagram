'use strict';

(function () {
        window.filters = {
            filterRandomPic: () => {
                let filterRandom = document.querySelector('#filter-random');
                filterRandom.addEventListener('click', function (evt) {
                    //evt.preventDefault();
                    let arrayNums = [];
                    let pictures = document.querySelectorAll('.picture');
                    for (let i = 0; arrayNums.length < 10; i++) {
                        let index = getRandomInteger(pictures.length - 1);
                        if (!arrayNums.includes(index)) {
                            arrayNums.push(index);
                        }
                    }
                    let fragment = document.createDocumentFragment();

                    arrayNums.forEach(elem => fragment.appendChild(pics.removeChild(pictures[elem])));
                    pics.prepend(fragment);
                })
            },
            filterPopularPic: (selector, filterId) => {
                let filterPopular = document.querySelector(filterId);
                filterPopular.addEventListener('click', function (evt) {
                    let pictures = document.querySelectorAll('.picture');
                    let countArr = [];
                    let indexOfOriginal = [];
                    pictures.forEach(elem => {
                        countArr.push(elem.querySelector(selector).textContent);
                    });
                    let initialState = countArr.slice();
                    countArr.sort((a, b) => (b - a));
                    let fragment = document.createDocumentFragment();
                    countArr.forEach(elem => {
                        let ind = initialState.indexOf(elem);

                        initialState.splice(ind, 1, 'f');
                        indexOfOriginal.push(ind);
                    });
                    indexOfOriginal.forEach(elem => fragment.appendChild(pics.removeChild(pictures[elem])));
                    pics.appendChild(fragment);
                })
            },

        }
    }
)();