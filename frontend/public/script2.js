window.addEventListener("load", () => {
  console.log("loaded from public storage");
  const formElement = document.querySelector("form");
  formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    const imageName = event.target.querySelector('input[type="text"]').value;
    const imageFile = event.target.querySelector('input[type="file"]').files[0];

    const formData = new FormData();
    formData.append("imageName", imageName);
    formData.append("imageFile", imageFile);

    const fetchSettings = {
      method: "POST",
      body: formData,
    };

    fetch("/uploadimage", fetchSettings)
      .then(async (data) => {
        if (data.status === 200) {
          const response = await data.json();
          event.target.outerHTML = `<img src="public/${response.imageName}.jpg>`;
        } else {
          event.target.outerHTML = `oops`;
          console.log("error");
        }
      })
      .catch((error) => {
        event.target.outerHTML = `oops`;
        console.log("error");
      });

    console.log(event.target, imageName, imageFile);
  });
});
