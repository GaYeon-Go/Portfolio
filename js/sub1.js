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
    
    if(i==2){
        contents[i].style.height = `${3*devHeight}px`;
    } else{
        contents[i].style.height = `${devHeight}px`;
    }
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
        
        if(i==3){
            Wscroll();
        } else{
            Wscroll(prev);
        }
      } else if(e.deltaY > 0){
        // scroll down
        let next = e.currentTarget.nextElementSibling.offsetTop;

        if(i==2){
            Wscroll();
        } else{
            Wscroll(next);
        }
      }
    })
}

let content1Ani = setTimeout(() => {
    sections[0].classList.add('on');
},500);