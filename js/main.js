// main.js
const contents = document.querySelectorAll('#container>div');
const sections = document.querySelectorAll("#container>div>section");
const lis = document.querySelectorAll("aside>.quick>li");
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

// .quick li를 클릭할 때 스크롤이 content(윈도우) 높이값 만큼씩 움직이게, li.on 붙여라
for(let j=0; j<lis.length; j++){
    lis[j].addEventListener('click', (e) => {
        e.preventDefault();

        Wscroll(j*devHeight);
        list(lis, j);
        if(j>=0 && j<3){
            list(gnbLi,j);
            gnbMove(j);
        } else if(j>=3 && j<=6){
            list(gnbLi,3);
            gnbMove(3);
        } else if(j==7){
            list(gnbLi,4);
            gnbMove(4);
        } else if(j==8){
            list(gnbLi,5);
            gnbMove(5);
        }
    });
}
// .gnbLi를 클릭 할때 스크롤이 content(윈두우) 높이값 만큼씩 움직이게, li.on이 붙어라
for(let d=0; d<gnbLi.length; d++){
    gnbLi[d].addEventListener('click', (e) => {
        e.preventDefault();
        gnbMove(d);

        if(d>=0 && d<4){
            Wscroll(d*devHeight);
            list(lis, d);
            list(gnbLi,d);
        } else if(d===4){
            Wscroll((d+3)*devHeight);
            list(lis, d+3);
            list(gnbLi,d+3);
        } else if(d===5){
            Wscroll((d+3)*devHeight);
            list(lis, d+3);
            list(gnbLi,d+3);
        }
    });
}

const numAnimaton = document.querySelectorAll('.num_animation');

function numAni(){
    function changeNum(idx){
        var num=0;
        var targetNum = numAnimaton[idx].getAttribute('data-rate');
        var timer = setInterval(() => {
            ++num;
            numAnimaton[idx].innerText = num + "%";
            if(num == targetNum){
                clearInterval(timer);
            }
        },60, 500);
    }
    
    for(var i=0; i<numAnimaton.length; i++){
        changeNum(i);
    }
}


// content에서 마우스 휠을 위로 움직였을 때, 앞에 content로 이동
// 휠을 아래로 움직였을 때, 뒤에 content로 이동, 이동하고 나서 section.on, quick li.on이 붙어라


for(let i=0; i<contents.length; i++){
  contents[i].addEventListener("wheel", (e) => {
    if(e.deltaY < 0){
      // scroll up
      let prev = e.currentTarget.previousElementSibling.offsetTop;
      
      Wscroll(prev); //sections
      list(lis, i-1);
      if(i>=0 && i<=3){
        list(gnbLi,i-1);
        gnbMove(i-1);
      } else if(i>=3 && i<=7){
        list(gnbLi,3);
        gnbMove(3);
      } else if(i==8){
        list(gnbLi,4);
        gnbMove(4);
      }
      numAni();
    } else if(e.deltaY > 0){
        // scroll down
        let next = e.currentTarget.nextElementSibling.offsetTop;

        Wscroll(next); //sections
        list(lis, i+1);
        if(i>=0 && i<3){
            list(gnbLi,i+1);
            gnbMove(i+1);
        } else if(i>=3 && i<6){
            list(gnbLi,3);
            gnbMove(3);
        } else if(i==6){
            list(gnbLi,4);
            gnbMove(4);
        } else if(i==7){
            list(gnbLi,5);
            gnbMove(5);
        }
        numAni();
      }
    })
}

let content1Ani = setTimeout(() => {
    sections[0].classList.add('on');
},500);

// content4 - validation 버튼 누르면
const validationBtn1 = document.querySelector('li.validation_btn1');
const validationPopup1 = document.querySelector('div.validation_popup1');
const validationClose1 = document.querySelector('a.close_btn1');
const body = document.querySelector('body');
const mobBg = document.querySelector('div.bg');

validationBtn1.addEventListener('click', (e) => {
    e.preventDefault();
    body.classList.add('on');
    mobBg.classList.add('on');
    validationPopup1.classList.add('on');

    validationPopup1.addEventListener('wheel', (e) => {
        e.preventDefault();
        e.stopPropagation();
    });
});

validationClose1.addEventListener('click', (e) => {
    e.preventDefault();
    body.classList.remove('on');
    mobBg.classList.remove('on');
    validationPopup1.classList.remove('on');

    validationSlide(0)
    list(slides,0);
    list(rollingBtn1, 0);

    validationPopup1.removeEventListener('wheel', parentScrollHandler);
});

// 슬라이드 부분
const prevBtn1 = document.querySelector('a.prev_btn1');
const nextBtn1 = document.querySelector('a.next_btn1');
const rollingBtn1 = document.querySelectorAll('div.rolling_btn1>ul>li');
const slide = document.querySelector('div.validation_popup1>ul');
const slides = document.querySelectorAll('div.validation_popup1>ul>li');

let slidesW = 950;
let slidesM = 50;
let slidesNum =0;
let slidesCount = slides.length;

slide.style.width = (slidesW + slidesM) * slidesCount - slidesM + 'px';

// 슬라이드 함수
function validationSlide(num){
    slide.style.transform = `translateX(${(-num*1000)+460}px)`;
    slidesNum = num;

    updateNav();
}
// 버튼 기능 업데이트 함수
function updateNav() {
    // 처음일때
    if(slidesNum == 0){
        prevBtn1.classList.add('none');
    } else{
        prevBtn1.classList.remove('none');
    }
    // 마지막일때
    if(slidesNum == slidesCount -1){
        nextBtn1.classList.add('none');
    } else{
        nextBtn1.classList.remove('none');
    }
}
validationSlide(0);
// next 버튼
nextBtn1.addEventListener('click', (e) => {
    e.preventDefault();

    validationSlide(slidesNum+1);

    list(slides,slidesNum);
    list(rollingBtn1, slidesNum);
});
// prev버튼
prevBtn1.addEventListener('click', (e) => {
    e.preventDefault();

    validationSlide(slidesNum-1);

    list(slides,slidesNum);
    list(rollingBtn1, slidesNum);
});
// rolling버튼
for(let i=0; i<rollingBtn1.length; i++){
    rollingBtn1[i].addEventListener('click', (e) => {
        e.preventDefault();
        if(slidesNum < slidesCount -1){
            validationSlide(i);
        } else{
            validationSlide(i);
        }
        list(slides,i);
        list(rollingBtn1, i);
    });
}

// content5 - validation 버튼 누르면
const validationBtn2 = document.querySelector('li.validation_btn2');
const validationPopup2 = document.querySelector('div.validation_popup2');
const validationClose2 = document.querySelector('a.close_btn2');

validationBtn2.addEventListener('click', (e) => {
    e.preventDefault();
    body.classList.add('on');
    mobBg.classList.add('on');
    validationPopup2.classList.add('on');

    validationPopup2.addEventListener('wheel', (e) => {
        e.preventDefault();
        e.stopPropagation();
    });
});

validationClose2.addEventListener('click', (e) => {
    e.preventDefault();
    body.classList.remove('on');
    mobBg.classList.remove('on');
    validationPopup2.classList.remove('on');

    validationSlide2(0)
    list(slides2,0);
    list(rollingBtn2, 0);

    validationPopup2.removeEventListener('wheel', parentScrollHandler);
});

// 슬라이드 부분
const prevBtn2 = document.querySelector('a.prev_btn2');
const nextBtn2 = document.querySelector('a.next_btn2');
const rollingBtn2 = document.querySelectorAll('div.rolling_btn2>ul>li');
const slide2 = document.querySelector('div.validation_popup2>ul');
const slides2 = document.querySelectorAll('div.validation_popup2>ul>li');

let slidesNum2 = 0;
let slidesCount2 = slides2.length;

slide2.style.width = (slidesW + slidesM) * slidesCount - slidesM + 'px';

function validationSlide2(num2){
    slide2.style.transform = `translateX(${(-num2*1000)+460}px)`;
    slidesNum2 = num2;

    updateNav2();
}
// 버튼 기능 업데이트 함수
function updateNav2() {
    // 처음일때
    if(slidesNum2 == 0){
        prevBtn2.classList.add('none');
    } else{
        prevBtn2.classList.remove('none');
    }
    // 마지막일때
    if(slidesNum2 == slidesCount -1){
        nextBtn2.classList.add('none');
    } else{
        nextBtn2.classList.remove('none');
    }
}
validationSlide2(0);

nextBtn2.addEventListener('click', (e) => {
    e.preventDefault();

    validationSlide2(slidesNum2+1);

    list(slides2,slidesNum2);
    list(rollingBtn2, slidesNum2);
});
// prev버튼
prevBtn2.addEventListener('click', (e) => {
    e.preventDefault();

    validationSlide2(slidesNum2-1);

    list(slides2,slidesNum2);
    list(rollingBtn2, slidesNum2);
});
// rolling버튼
for(let i=0; i<rollingBtn2.length; i++){
    rollingBtn2[i].addEventListener('click', (e) => {
        e.preventDefault();
        if(slidesNum2 < slidesCount -1){
            validationSlide2(i);
        } else{
            validationSlide2(i);
        }
        list(slides2,i);
        list(rollingBtn2, i);
    });
}



// content8 - ILLUSTRATION
const illustLi = document.querySelectorAll('div.illust>ul>li');
const popupWrap = document.querySelector('section.popup_wrap');
const popup = document.querySelector('ul.popup');
const popupImg = document.querySelectorAll('li.popup_img');
const popupClose = document.querySelector('a.popup_close');
const popupBtn = document.querySelector('div.popup_btn');

let popupImgCount = popupImg.length;
illustLi.forEach((el, index) => {
  el.onclick = () => {
    currentIndex = index
  }
});
let topHeight = 0;

const parentScrollHandler = (e) => {
    e.stopPropagation();
};

// 슬라이드 가로로 배열하기
for(let i=0; i<popupImgCount; i++){
  popupImg[i].style.left = i*100+ "%";
}

// 일러스트 버튼을 누르면 나오게
for(let i=0; i<illustLi.length; i++){
  illustLi[i].addEventListener('click', (e) => {
    e.preventDefault();
    body.classList.add('on');
    mobBg.classList.add('on');
    popupWrap.classList.add('on');
    popupBtn.classList.add('on');
    popupClose.classList.add('on');
    popup.style.left = -i*100 + '%';

    popupWrap.addEventListener('wheel', (e) => {
        e.preventDefault();
        e.stopPropagation();
    });
  });
}

popupClose.addEventListener('click', (e) => {
  e.preventDefault();
  body.classList.remove('on');
  mobBg.classList.remove('on');
  popupWrap.classList.remove('on');
  popupBtn.classList.remove('on');
  popupClose.classList.remove('on');
});

// 슬라이드 이동 함수
function goToSlide(idx){
  popup.style.left = idx*-100 + "%";
  popup.classList.add('animate');
  currentIndex = idx;
}

// 버튼을 클릭하면 슬라이드 이동시키기
const popupPrev = document.querySelector('div.popup_btn>a.popup_prev');
const popupNext = document.querySelector('div.popup_btn>a.popup_next');
let pouppLast = popupImgCount - 1;

popupNext.addEventListener('click', (e) => {
  e.preventDefault();
  if(currentIndex > pouppLast -1) currentIndex =  -1;
  goToSlide(currentIndex + 1);
});

popupPrev.addEventListener('click', (e) => {
  e.preventDefault();
  if(currentIndex <= 0) currentIndex =  pouppLast +1;
  goToSlide(currentIndex - 1);
});