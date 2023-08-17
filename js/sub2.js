// sub2.js
const contents = document.querySelectorAll('#container>div');
const sections = document.querySelectorAll("#container>div>section");
const gnbLi = document.querySelectorAll('.gnb>ul>li');
const gnbBar = document.querySelector('.gnb_bar');

let devHeight = window.innerHeight;

window.addEventListener('resize', () => {
    devHeight = window.innerHeight;
});

for(let i=0; i<contents.length; i++){
    contents[i].style.height = `${devHeight}px`;
}

let list = (className, index) => {
    className.forEach(item => {
        item.classList.remove('on');
    });
    className[index].classList.add('on');
}

let Wscroll = (position) => {
    window.scroll({
        top:position,
        left:0,
        behavior:'smooth',
    });
    for(let j=0; j<sections.length; j++){
        if(position >= j*devHeight && position < (j+1)*devHeight){
            sections.forEach(item => {
                item.classList.remove('on');
            });
            sections[j].classList.add('on');
        }
    }
}

function gnbMove(index){
    gnbBar.style.width = gnbLi[index].offsetWidth + 'px';
    gnbBar.style.left = gnbLi[index].offsetLeft + 'px';
}

// content에서 마우스 휠을 위로 움직였을 때, 앞에 content로 이동
// 휠을 아래로 움직였을 때, 뒤에 content로 이동, 이동하고 나서 section.on, quick li.on이 붙어라

list(gnbLi,3);
gnbMove(3);

for(let i=0; i<contents.length; i++){
    contents[i].addEventListener("wheel", (e) => {
      if(e.deltaY < 0){
        // scroll up
        let prev = e.currentTarget.previousElementSibling.offsetTop;
        
        Wscroll(prev);
      } else if(e.deltaY > 0){
        // scroll down
        let next = e.currentTarget.nextElementSibling.offsetTop;

        Wscroll(next);
      }
    })
}

let content1Ani = setTimeout(() => {
    sections[0].classList.add('on');
},500);

// button design에서 해당 버튼을 누르면 창이 나오게 하기
const button = document.querySelectorAll('#detail_content2-6>section>dl>dd>a');
const body = document.querySelector('body');
const mobBg = document.querySelector('div.bg');
const buttonPopup = document.querySelector('div.button_popup');
const popup = document.querySelectorAll('div.button_popup>div');
const buttonClose = document.querySelector('a.button_close');

let shouldStopPropagation = true;

const parentScrollHandler = (e) => {
    if(shouldStopPropagation){
        e.stopPropagation();
    }
};

const childScrollHandlers = [];

for(let i=0; i<button.length; i++){
    button[i].addEventListener('click', (e) => {
        e.preventDefault();

        body.classList.add('on');
        mobBg.classList.add('on');
        buttonPopup.classList.add('on');
        popup[i].classList.add('on');

        buttonPopup.addEventListener('wheel', (e) => {
            e.preventDefault();
            e.stopPropagation();
        });

        for (let j = 0; j < popup.length; j++) {
            const childScrollHandler = (e) => {
              if (shouldStopPropagation) {
                e.stopPropagation();
              }
            };
            popup[j].addEventListener('wheel', childScrollHandler);
            childScrollHandlers.push(childScrollHandler);
        }
    })
}

buttonClose.addEventListener('click', (e) => {
    e.preventDefault();
    body.classList.remove('on');
    mobBg.classList.remove('on');
    buttonPopup.classList.remove('on');
    popup.forEach(item => {
        item.classList.remove('on');
    });
    buttonPopup.removeEventListener('wheel', parentScrollHandler);
});