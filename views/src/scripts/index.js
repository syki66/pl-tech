// 외부 html 파일 div 내부로 임포트하기


document.querySelectorAll('.carousel__item').forEach((e,i)=>{
    e.innerHTML=`<object type="text/html" data="src/pages/${i+1}.html" ></object>`;
});