const urlUsers = "https://66a5bacc23b29e17a1a0c825.mockapi.io/api/users";

const tbody_user = document.querySelector(".tbody_user");

async function getAllUsers(url) {
    try {
        const data = await fetch(url);
        const res = await data.json();

        for (let i = 0; i < res.length; i++) {
            tbody_user.innerHTML += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${res[i].fullname}</td>
                    <td>${res[i].age}</td>
                    <td>${res[i].role}</td>
                    <td>${res[i].username}</td>
                    <td>
                        <span onclick="window.location.href='show.html?id=${
                            res[i].id
                        }'">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </span>
                        <span onclick="handleDeleteAPIUser('${urlUsers}', ${
                            res[i].id
                        })">
                            <i class="fa-solid fa-trash-can"></i>
                        </span>
                    </td>
                </tr>
            `;
        }
    } catch (error) {
        console.error(error);
    } finally {
        console.log("Đã xong");
    }
}

getAllUsers(urlUsers);

async function handleDeleteAPIUser(url, id) {
    const check = confirm("Bạn muốn xóa bản ghi không.");

    if (check) {
        try {
            const response = await fetch(url + "/" + id, {
                method: "DELETE",
            });

            if (!response.ok) {
                alert("Xóa không thành công");
            }

            alert("Xóa thành công");
            return response.json();
        } catch (error) {
            console.error(error);
        } finally {
            window.location.href = "index.html";
        }
    }
}
