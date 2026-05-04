$(document).ready(function () {

  // 🖼️ rutas de imágenes
  const kuromiNormal = "kuromi_main.png";
  const kuromiAngry = "kuromi_enojada.png";
  const kuromiHappy = "kuromi_feliz.png";

  // 🎯 AUTOFOCUS (móvil UX)
  setTimeout(() => {
    $("#answer").focus();
  }, 600);

  // ❤️ Animación carta
  $(".valentines-day").click(function () {
    $("#card").addClass("show-card");
    $(".valentines-day").addClass("hide-envelope");
  });

  // 💜 Frases Kuromi
  const frases = [
    "Que ricas que son las alitas BBQ 💜",
    "No te estes comiendo todo los broasters ✨",
    "Estoy orgulloso de ti 🫶",
    "Porque sera tan rica las grasas 💫",
    "Es un buen día como para tomarse una coca cola 💖"
  ];

  const frasesCorrecto = [
    "Sabía que sabias cual era jiji 💜",
    "Obvio… era fácil 😌✨",
    "Bien ahí Kuromi girl 🫶",
    "Correcto~ ahora chi 😈💖"
  ];

  const frasesError = [
    "Mmm… no eh 😒",
    "Piensa un poquito más 💭",
    "¿Segura? 😏",
    "Intenta otra vez… yo espero 💜"
  ];

  function hablarKuromi(texto) {
    $("#speech").stop(true, true).text(texto).fadeIn();

    setTimeout(() => {
      $("#speech").fadeOut();
    }, 3500);
  }

  // 🎭 cambiar imagen Kuromi
  function cambiarKuromi(src) {
    $("#kuromi-img").stop(true, true).fadeOut(350, function () {
      $(this).attr("src", src).fadeIn(350);
    });
  }

  $("#kuromi").click(function () {
    const random = Math.floor(Math.random() * frases.length);
    hablarKuromi(frases[random]);
  });

  // 🔹 espacios
  $("#answer").on("input", function () {
    this.value = this.value.replace(/\s{2,}/g, " ");
  });

  // 🔹 ENTER
  $("#answer").keypress(function (e) {
    if (e.which === 13) {
      $("#enter-btn").click();
    }
  });

  // 📱 MICRO INTERACCIÓN (zoom leve al enfocar)
  $("#answer").on("focus", function () {
    $(".login-container").css("transform", "scale(1.02)");
  });

  $("#answer").on("blur", function () {
    $(".login-container").css("transform", "scale(1)");
  });

  // 🔐 VALIDACIÓN
  $("#enter-btn").click(function () {

    let respuesta = $("#answer").val()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, " ");

    const validas = [
      "cocacola",
      "coca",
      "coquita",
      "coca colita",
      "cocacolita",
      "coca cola"
    ];

    let successSound = $("#success-sound")[0];
    let errorSound = $("#error-sound")[0];

    // limpiar estados previos
    $("#answer").removeClass("error success");

    if (validas.includes(respuesta)) {

      // 📳 vibración éxito
      if (navigator.vibrate) {
        navigator.vibrate(80);
      }

      // 🔊 sonido éxito
      if (successSound) {
        successSound.currentTime = 2.7;
        successSound.play();
      }

      // ⌨️ cerrar teclado móvil
      $("#answer").blur();

      // 💚 EFECTO SUCCESS
      $("#answer").addClass("success");

      // 💖 Kuromi feliz
      cambiarKuromi(kuromiHappy);

      let random = Math.floor(Math.random() * frasesCorrecto.length);
      hablarKuromi(frasesCorrecto[random]);

      $("#error-msg").text("Correcto 💜").fadeIn();

      // ✨ glitter boost
      for (let i = 0; i < 25; i++) {
        crearParticula();
      }

      // 🔮 blur + fade
      setTimeout(() => {
        $("#login-screen").addClass("blur-out");

        setTimeout(() => {
          $("#login-screen").hide();
        }, 1800);

      }, 2800);

    } else {

      // 📳 vibración error
      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100]);
      }

      // 🔊 sonido error
      if (errorSound) {
        errorSound.currentTime = 0.3;
        errorSound.play();
      }

      // ❤️ EFECTO ERROR
      $("#answer").addClass("error");

      // 😈 Kuromi enojada
      cambiarKuromi(kuromiAngry);

      let random = Math.floor(Math.random() * frasesError.length);
      hablarKuromi(frasesError[random]);

      $("#error-msg").text("Intenta de nuevo 💭").fadeIn();

      $("#answer").addClass("shake");

      setTimeout(() => {
        $("#answer").removeClass("shake error");
        $("#error-msg").fadeOut();
        cambiarKuromi(kuromiNormal);
      }, 1500);

      $("#answer").val("");
    }

  });

  // 👁 OJITO tipo iPhone
  $(document).on("click", "#toggle-password", function () {

    let input = $("#answer");

    if (input.attr("type") === "password") {
      input.attr("type", "text");
      $(this).addClass("active");
    } else {
      input.attr("type", "password");
      $(this).removeClass("active");
    }

  });

  // ✨ PARTÍCULAS GLITTER
  function crearParticula() {

    const particle = document.createElement("div");
    particle.classList.add("particle");

    particle.style.left = Math.random() * 100 + "vw";

    const size = Math.random() * 6 + 3;
    particle.style.width = size + "px";
    particle.style.height = size + "px";

    const duration = Math.random() * 5 + 5;
    particle.style.animationDuration = duration + "s";

    const colors = ["#ffffff", "#e9d5ff", "#c084fc", "#a855f7"];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];

    document.getElementById("particles").appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, duration * 1000);
  }

  setInterval(crearParticula, 200);

});

// 💜 GLOW QUE SIGUE EL DEDO (touch + mouse)
const input = document.getElementById("answer");

// crear capa glow
const glow = document.createElement("div");
glow.classList.add("input-glow");
input.parentElement.appendChild(glow);

function moverGlow(x, y) {
  const rect = input.getBoundingClientRect();

  const posX = x - rect.left;
  const posY = y - rect.top;

  glow.style.setProperty("--x", posX + "px");
  glow.style.setProperty("--y", posY + "px");
}

// 🖱️ mouse
input.addEventListener("mousemove", (e) => {
  moverGlow(e.clientX, e.clientY);
});

// 📱 touch (clave para celular)
input.addEventListener("touchmove", (e) => {
  const touch = e.touches[0];
  moverGlow(touch.clientX, touch.clientY);
});

// cuando entra al input
input.addEventListener("focus", () => {
  glow.style.opacity = "1";
});

// cuando sale
input.addEventListener("blur", () => {
  glow.style.opacity = "0";
});

// ✨ PARTICULAS QUE SIGUEN EL DEDO
function crearParticulaTouch(x, y) {

  const particle = document.createElement("div");
  particle.classList.add("particle-touch");

  const size = Math.random() * 8 + 4;

  particle.style.width = size + "px";
  particle.style.height = size + "px";

  particle.style.left = x - size / 2 + "px";
  particle.style.top = y - size / 2 + "px";

  const colors = [
    "#ffffff",
    "#e9d5ff",
    "#c084fc",
    "#a855f7"
  ];

  particle.style.background =
    colors[Math.floor(Math.random() * colors.length)];

  document.body.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, 3000);
}

$(document).on("mousemove", function (e) {
  crearParticulaTouch(e.clientX, e.clientY);
});

$(document).on("touchmove", function (e) {
  const touch = e.originalEvent.touches[0];
  crearParticulaTouch(touch.clientX, touch.clientY);
});

const musicBtn = document.getElementById("music-btn");
const bgMusic = document.getElementById("bg-music");

let isPlaying = false;

musicBtn.addEventListener("click", () => {
  if (!isPlaying) {
    bgMusic.volume = 0.5;
    bgMusic.play();
    musicBtn.textContent = "⏸️";
    isPlaying = true;
  } else {
    bgMusic.pause();
    musicBtn.textContent = "▶️";
    isPlaying = false;
  }
});