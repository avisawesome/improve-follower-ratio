document.addEventListener("DOMContentLoaded", ()=> {
    let followers_list = [];
    let following_list = [];
    const followers_button = document.querySelectorAll("#lb")[0];
    const following_button = document.querySelectorAll("#lb")[1];
    const genlist_button = document.querySelectorAll("#lb")[2];
    followers_button.addEventListener("click", () => uploadFile("followers"));
    following_button.addEventListener("click", ()=> uploadFile("following"));
    genlist_button.addEventListener("click", generateList)

    function uploadFile(ftype){
        const inp = document.createElement("input");
        inp.type = "file";
        inp.accept = "application/json";
        inp.addEventListener("change", (event)=> {
            const file = event.target.files[0];
            if (file){
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const jsonData = JSON.parse(e.target.result);
                        let usernames;
                        if (ftype === "followers") {
                            usernames = jsonData.map(item => item?.string_list_data?.[0]?.value).filter(username => username);
                            followers_list = usernames;
                        } else if (ftype === "following") {
                            usernames = jsonData.relationships_following.map(item => item?.string_list_data?.[0]?.value).filter(username => username);
                            following_list = usernames;
                        } 
                        if (usernames.length === 0) {
                            throw new Error(`No valid usernames found in the ${ftype} file.`);
                        }
                    } catch (err) {
                        alert("Please upload a valid JSON file");
                    }

                     
                };
                reader.readAsText(file);
            }
        });
        inp.click();
    }

    function generateList(){
        if (followers_list.length === 0 || following_list.length === 0) {
            alert("Please upload both files");
            return;
        }
        const followersSet = new Set(followers_list);
        const fakers = following_list.filter(username => !followersSet.has(username));
        localStorage.setItem("fakers", JSON.stringify(fakers));
        window.location.href = "result.html";
    }

});
