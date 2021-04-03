const d = document,
  $table = d.querySelector(".crud-table"),
  $form = d.querySelector(".crud-form"),
  $title = d.querySelector(".crud-title"),
  $template = d.getElementById("crud-template").content,
  $fragment = d.createDocumentFragment();

const getAll = async () => {
  try {
    let res = await axios.get("http://localhost:3000/language"),
      json = await res.data;
    console.log(json);

    json.forEach((el) => {
      $template.querySelector(".name").textContent = el.nombre;
      $template.querySelector(".type").textContent = el.tipo;
      $template.querySelector(".edit").dataset.id = el.id;
      $template.querySelector(".edit").dataset.name = el.nombre;
      $template.querySelector(".edit").dataset.type = el.tipo;
      $template.querySelector(".delete").dataset.id = el.id;

      let $clone = d.importNode($template, true);
      $fragment.appendChild($clone);
    });

    $table.querySelector("tbody").appendChild($fragment);
  } catch (err) {
    let message = err.statusText || "Ocurió un ERROR";
    $table.insertAdjacentElement(
      "afterend",
      `<p class="Error"><b>${err.status}: ${message}</b></p>`
    );
  }
};
d.addEventListener("DOMContentLoaded", getAll());
d.addEventListener("submit", async (e) => {
  if (e.target === $form) {
    e.preventDefault();

    if (!e.target.id.value) {
      //Create-POST
      try {
        let options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
            data: JSON.stringify({
              nombre: e.target.name.value,
              tipo: e.target.type.value,
            }),
          },
          res = await axios("http://localhost:3000/language", options),
          json = await res.data;

        location.reload();
      } catch (err) {
        let message = err.statusText || "Ocurió un ERROR";
        $form.insertAdjacentHTML(
          "afterend",
          `<p class="Error"><b>${err.status}: ${message}</b></p>`
        );
      }
    } else {
      //Update-PUT
      try {
        let options = {
            method: "PUT",
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
            data: JSON.stringify({
              nombre: e.target.name.value,
              tipo: e.target.type.value,
            }),
          },
          res = await axios(
            `http://localhost:3000/language/${e.target.id.value}`,
            options
          ),
          json = await res.data;

        location.reload();
      } catch (err) {
        let message = err.statusText || "Ocurió un ERROR";
        $form.insertAdjacentHTML(
          "afterend",
          `<p class="Error"><b>${err.status}: ${message}</b></p>`
        );
      }
    }
  }
});

d.addEventListener("click", async (e) => {
  if (e.target.matches(".edit")) {
    $title.textContent = "Edit Language";
    $form.name.value = e.target.dataset.name;
    $form.type.value = e.target.dataset.type;
    $form.id.value = e.target.dataset.id;
  }

  let isDelete = confirm(`Are you sure to delete ID ${e.target.dataset.id}?`);

  if (isDelete) {
    //Delete-DELETE
    try {
      let options = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        },
        res = await fetch(
          `http://localhost:3000/language/${e.target.dataset.id}`,
          options
        ),
        json = await res.json();

      if (!res.ok) throw { status: res.status, statusText: res.statusText };
      location.reload();
    } catch (er) {
      let message = err.statusText || "Ocurió un ERROR";
      alert(`Error${err.status}: ${message}`);
    }
  }
});
