const notFollowingBack = JSON.parse(localStorage.getItem("fakers")) || [];
        const listElement = document.getElementById("fakeslist");

        if (notFollowingBack.length > 0) {
            notFollowingBack.forEach(username => {
                const li = document.createElement("li");
                li.textContent = username;
                listElement.appendChild(li);
            });
        } else {
            listElement.textContent = "Everyone follows you back!";
        }
        function goBack() {
            window.history.back();
        }