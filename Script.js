/* ================= PROFILE IMAGE ================= */
const imageUpload = document.getElementById("imageUpload");
const profileImage = document.getElementById("profileImage");

if (localStorage.getItem("profileImage")) {
  profileImage.src = localStorage.getItem("profileImage");
  imageUpload.style.display = "none";
}

imageUpload?.addEventListener("change", () => {
  const file = imageUpload.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    profileImage.src = reader.result;
    localStorage.setItem("profileImage", reader.result);
    imageUpload.style.display = "none";
  };
  reader.readAsDataURL(file);
});

/* ================= INTRO VIDEO ================= */
const videoUpload = document.getElementById("videoUpload");
const introVideo = document.getElementById("introVideo");

if (localStorage.getItem("introVideo")) {
  introVideo.src = localStorage.getItem("introVideo");
  videoUpload.style.display = "none";
}

videoUpload?.addEventListener("change", () => {
  const file = videoUpload.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    introVideo.src = reader.result;
    localStorage.setItem("introVideo", reader.result);
    videoUpload.style.display = "none";
  };
  reader.readAsDataURL(file);
});

/* ================= AUTO-SAVE EDITABLE CONTENT ================= */
const editableElements = document.querySelectorAll("[contenteditable='true']");

editableElements.forEach((el, index) => {
  const key = "editable_" + index;

  if (localStorage.getItem(key)) {
    el.innerHTML = localStorage.getItem(key);
  }

  el.addEventListener("input", () => {
    localStorage.setItem(key, el.innerHTML);
  });
});

/* ================= LEARNINGS (UNLIMITED CLASSES) ================= */
const learningContainer = document.getElementById("learningContainer");
const addClassBtn = document.getElementById("addClassBtn");

function saveLearningClasses() {
  localStorage.setItem("learningClasses", learningContainer.innerHTML);
}

function addLearningClass(content = "") {
  const div = document.createElement("div");
  div.className = "class-learning";
  div.contentEditable = "true";

  div.innerHTML = content || `
    <h3>Class Title</h3>
    <ul>
      <li>Learning 1</li>
      <li>Learning 2</li>
      <li>Learning 3</li>
      <li>Learning 4</li>
      <li>Learning 5</li>
    </ul>
  `;

  div.addEventListener("input", saveLearningClasses);
  learningContainer.appendChild(div);
  saveLearningClasses();
}

if (localStorage.getItem("learningClasses")) {
  learningContainer.innerHTML = localStorage.getItem("learningClasses");
  [...learningContainer.children].forEach(div => {
    div.addEventListener("input", saveLearningClasses);
  });
}

addClassBtn?.addEventListener("click", () => addLearningClass());

/* ================= ASSIGNMENTS ================= */
const assignmentUpload = document.getElementById("assignmentUpload");
const assignmentList = document.getElementById("assignmentList");

assignmentUpload?.addEventListener("change", () => {
  assignmentList.innerHTML = "";

  [...assignmentUpload.files].forEach(file => {
    const li = document.createElement("li");
    li.textContent = file.name;
    assignmentList.appendChild(li);
  });
});

/* ================= SCROLL REVEAL (VERY IMPORTANT) ================= */
const cards = document.querySelectorAll(".card");

const revealCards = () => {
  cards.forEach(card => {
    const top = card.getBoundingClientRect().top;
    if (top < window.innerHeight - 80) {
      card.classList.add("show");
    }
  });
};

window.addEventListener("scroll", revealCards);
revealCards(); // SHOW ON LOAD
