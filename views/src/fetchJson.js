const url = "http://localhost:3000/rotate";

function fetchJson(url){
    fetch(url)
        .then(function (res) {
            return res.json();
        })
        .then(function (json) {
            if (!json.success) {
                alert('서버에서 데이터를 가져오는데 실패하였습니다.');
            } else{
                localStorage.setItem("json", JSON.stringify(json))
                // 커라젤 숨기고 있다가 여기서 로딩 끝나면 펼쳐주기
            }
        })
    
    console.log(JSON.parse(localStorage.getItem('json')))
    // localStorage.clear();
}

setInterval(()=>{
    fetchJson(url)
}, 1000)