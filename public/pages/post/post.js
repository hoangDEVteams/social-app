function submitPost(){
    const content = document.getElementById("post-input").value.trim();

    if(!content) {
        alert("Vui lòng nhập nội dung bài viết")
        return;
    }

    fetch("/post",{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
            },
            body: JSON.stringify({content})
    })
    .then(res =>{
        if(res.ok){
            window.location.href = "/";
        }
        else{
            return res.json().then(data=>{
                alert(data.message || "lôi khi đăng");
            })
        }
    })
    .catch(error => {
        console.error("Lỗi kết nối:", error);
        alert("Không thể gửi bài viết. Vui lòng thử lại.");
    });
}