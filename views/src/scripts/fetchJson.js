const baseUrl = window.location.origin;
const path = '/home/getValues'; // json 경로
const url = baseUrl + path;

function fetchJson(url){
    fetch(url)
        .then(function (res) {
            return res.json();
        })
        .then(function (json) {
            if (!json.success) {
                console.log('서버에서 데이터를 가져오는데 실패하였습니다.');
            } else{
                localStorage.setItem("json", JSON.stringify(json)) // 브라우저의 로컬 스토리지에 json 저장하기
            }
        })
    
    // console.log(JSON.parse(localStorage.getItem('json')))
    // localStorage.clear();
}

// fetch 시간 간격
fetchJson(url);
setInterval(()=>{
    fetchJson(url)
}, 600000)