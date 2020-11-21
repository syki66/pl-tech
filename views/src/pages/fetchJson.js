const url = "http://localhost:3000/rotate";


// fetch(url)
// .then(function (res) {
//     return res.json();
// })
// .then(function (json) {
//     if (!json.success) {
//         alert('서버에서 데이터를 가져오는데 실패하였습니다.');
//     } else{
//         return json;
//     }
// })


let res = await fetch(url);

if (res.ok) {
    let json = await res.json();
} else{
    alert("서버에서 데이터를 가져오는 도중에 에러가 발생하였습니다.")
}

// function getTime(url) {

// }

// function init() {
//     // getTime();
//     setInterval(getTime, 1000);
// }

// init();