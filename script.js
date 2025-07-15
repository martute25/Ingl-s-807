// script.js

const ramos = [
  {
    nombre: "Lengua y Escritura Académica",
    id: "lengua-escritura-academica",
    requisitos: []
  },
  {
    nombre: "Psicología Educacional",
    id: "psicologia-educacional",
    requisitos: []
  },
  {
    nombre: "Pedagogía",
    id: "pedagogia",
    requisitos: []
  },
  {
    nombre: "Didáctica General",
    id: "didactica-general",
    requisitos: []
  },
  {
    nombre: "Educación Digital",
    id: "educacion-digital",
    requisitos: []
  },
  {
    nombre: "Lengua Inglesa e Interculturalidad I",
    id: "interculturalidad-1",
    requisitos: []
  },
  {
    nombre: "Fonética, Fonología y Dicción Inglesa I",
    id: "fonetica-1",
    requisitos: []
  },
  {
    nombre: "Gramática Inglesa I",
    id: "gramatica-1",
    requisitos: []
  },
  {
    nombre: "Práctica Profesional Docente I",
    id: "ppd-1",
    requisitos: []
  },
  {
    nombre: "Sujetos del Aprendizaje",
    id: "sujetos-aprendizaje",
    requisitos: ["psicologia-educacional", "interculturalidad-1", "fonetica-1", "gramatica-1"]
  },
  {
    nombre: "Historia y Política de la Educación Argentina",
    id: "historia-politica-educacion",
    requisitos: ["pedagogia"]
  },
  // Podés seguir agregando el resto siguiendo el mismo patrón...
];

const malla = document.getElementById("malla");

ramos.forEach((ramo) => {
  const card = document.createElement("div");
  card.classList.add("ramo");
  card.id = ramo.id;

  if (ramo.requisitos.length === 0) {
    card.classList.add("active");
  } else {
    card.classList.add("locked");
  }

  const titulo = document.createElement("h3");
  titulo.textContent = ramo.nombre;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      desbloquearDependientes(ramo.id);
    }
  });

  const label = document.createElement("label");
  label.appendChild(checkbox);
  label.appendChild(document.createTextNode(" Aprobado"));

  card.appendChild(titulo);
  card.appendChild(label);
  malla.appendChild(card);
});

function desbloquearDependientes(idAprobado) {
  ramos.forEach((ramo) => {
    if (ramo.requisitos.includes(idAprobado)) {
      const todosCumplidos = ramo.requisitos.every((req) => {
        const reqCheckbox = document.querySelector(`#${req} input[type='checkbox']`);
        return reqCheckbox && reqCheckbox.checked;
      });

      if (todosCumplidos) {
        const ramoDOM = document.getElementById(ramo.id);
        ramoDOM.classList.remove("locked");
        ramoDOM.classList.add("active");
        ramoDOM.style.pointerEvents = "auto";
        const checkbox = ramoDOM.querySelector("input[type='checkbox']");
        checkbox.disabled = false;
        desbloquearDependientes(ramo.id);
      }
    }
  });
}

document.querySelectorAll(".ramo.locked input").forEach((cb) => cb.disabled = true);
