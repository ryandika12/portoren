/* Menu (show/hidden) */
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close")

/* Menu (show) */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu")
  })
}

/* Menu (hidden) */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu")
  })
}

/* Mobile menu */
const navLink = document.querySelectorAll(".nav-link")

function linkAction() {
  const navMenu = document.getElementById("nav-menu")
  navMenu.classList.remove("show-menu")
}
navLink.forEach((n) => n.addEventListener("click", linkAction))

/* Skills (accordion) */
const skillsContent = document.getElementsByClassName("skills-container-content"),
  skillsHeader = document.querySelectorAll(".skills-container-header")

function toggleSkills() {
  let itemClass = this.parentNode.className

  for (i = 0; i < skillsContent.length; i++) {
    skillsContent[i].className = "skills-container-content skills-close";
  }
  if (itemClass === "skills-container-content skills-close") {
    this.parentNode.className = "skills-container-content skills-open"
  }
}

skillsHeader.forEach((el) => {
  el.addEventListener("click", toggleSkills)
})

/* Experience tabs */
const tabs = document.querySelectorAll("[data-target]"),
  tabContents = document.querySelectorAll("[data-content]")

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target)

    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("experience-active")
    })
    target.classList.add("experience-active")

    tabs.forEach((tab) => {
      tab.classList.remove("experience-active")
    })
    tab.classList.add("experience-active")
  })
})

/* Articles swiper */
const swiperArticles = new Swiper(".articles-container", {
  cssMode: true,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
})

/* Scroll sections (active link) */
const sections = document.querySelectorAll("section[id]")

function scrollActive() {
  const scrollY = window.pageYOffset

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight
    const sectionTop = current.offsetTop - 50
    const sectionId = current.getAttribute("id")

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav-menu a[href*=" + sectionId + "]")
        .classList.add("active-link")
    } else {
      document
        .querySelector(".nav-menu a[href*=" + sectionId + "]")
        .classList.remove("active-link")
    }
  })
}
window.addEventListener("scroll", scrollActive)

/* Background header */
function scrollHeader() {
  const nav = document.getElementById("header")

  if (this.scrollY >= 80) nav.classList.add("scroll-header")
  else nav.classList.remove("scroll-header")
}
window.addEventListener("scroll", scrollHeader)

/* Show scroll to top */
function scrollUp() {
  const scrollUp = document.getElementById("scroll-up")

  if (this.scrollY >= 560) scrollUp.classList.add("show-scroll")
  else scrollUp.classList.remove("show-scroll")
}
window.addEventListener("scroll", scrollUp)

/* Dark/Light mode */
const themeButton = document.getElementById("theme-button")
const darkTheme = "dark-theme"
const iconTheme = "fa-sun"

const selectedTheme = localStorage.getItem("selected-theme")
const selectedIcon = localStorage.getItem("selected-icon")

const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light"
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "fa-moon" : "fa-sun"

if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](darkTheme)
  themeButton.classList[selectedIcon === "fa-moon" ? "add" : "remove"](iconTheme)
}

themeButton.addEventListener("click", () => {
  document.body.classList.toggle(darkTheme)
  themeButton.classList.toggle(iconTheme)

  localStorage.setItem("selected-theme", getCurrentTheme())
  localStorage.setItem("selected-icon", getCurrentIcon())
})

/* Mail integration */
document.addEventListener("DOMContentLoaded", function() {
  emailjs.init("AyzaofNC9QcpER17I")
})

document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault()

  emailjs.sendForm('service_k0kwypn', 'template_5cvyfrv', this)
    .then(function(response) {
      console.log('Success!', response.status, response.text)
      alert('Email sent successfully!')
      document.getElementById('contact-form').reset()
    }, function(error) {
      console.log('Failed...', error)
      alert('Email sending failed.')
    })
})

    const musicToggle = document.getElementById('music-toggle');
    const audio = new Audio('assets/musicpolitrik.mp3'); // Ganti dengan file musik Anda
    let isPlaying = false;

    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            isPlaying = false;
            musicToggle.innerHTML = '<i class="fas fa-music"></i>';
        } else {
            audio.play();
            isPlaying = true;
            musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
        }
    });

    // Agar musik berhenti saat pengguna berpindah halaman
window.addEventListener('beforeunload', () => {
  if (gameModal.musicRef) {
      gameModal.musicRef.pause();
  }
});

document.getElementById('game-toggle').addEventListener('click', () => {
  const gameModal = document.getElementById('tetris-game');
  gameModal.style.display = 'block';

  // Mainkan musik saat game dimulai
  const gameMusic = new Audio('assets/squidgame.mp3');
  gameMusic.loop = true;
  gameMusic.play();

  // Simpan referensi musik dalam properti objek
  gameModal.musicRef = gameMusic;

  // Mulai game
  startTetrisGame();
});

document.getElementById('close-game').addEventListener('click', () => {
  const gameModal = document.getElementById('tetris-game');
  gameModal.style.display = 'none';

  // Hentikan musik
  if (gameModal.musicRef) {
      gameModal.musicRef.pause();
      gameModal.musicRef.currentTime = 0; // Kembali ke awal lagu
  }

  // Reset game
  window.location.reload();
});

// Tetris Game
function startTetrisGame() {
    const canvas = document.getElementById('tetris-canvas');
    const context = canvas.getContext('2d');

    const ROWS = 20;
    const COLUMNS = 10;
    const BLOCK_SIZE = 30;
    let score = 0;

    const board = Array.from({ length: ROWS }, () => Array(COLUMNS).fill(0));

    const tetrominoes = [
        [[1, 1, 1], [0, 1, 0]], // T
        [[1, 1], [1, 1]],       // O
        [[1, 1, 0], [0, 1, 1]], // S
        [[0, 1, 1], [1, 1, 0]], // Z
        [[1, 1, 1, 1]],         // I
        [[1, 1, 1], [1, 0, 0]], // L
        [[1, 1, 1], [0, 0, 1]]  // J
    ];

    let currentPiece = {
        shape: tetrominoes[Math.floor(Math.random() * tetrominoes.length)],
        row: 0,
        col: Math.floor(COLUMNS / 2) - 1
    };

    function drawBlock(x, y) {
        context.fillStyle = 'cyan';
        context.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        context.strokeStyle = 'black';
        context.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    }

    function drawBoard() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLUMNS; col++) {
                if (board[row][col] !== 0) {
                    drawBlock(col, row);
                }
            }
        }
        drawPiece();
    }

    function drawPiece() {
        currentPiece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    drawBlock(currentPiece.col + x, currentPiece.row + y);
                }
            });
        });
    }

    function movePieceDown() {
        currentPiece.row++;
        if (collision()) {
            currentPiece.row--;
            lockPiece();
            clearRows();
            resetPiece();
        }
        drawBoard();
    }

    function collision() {
        for (let y = 0; y < currentPiece.shape.length; y++) {
            for (let x = 0; x < currentPiece.shape[y].length; x++) {
                if (
                    currentPiece.shape[y][x] !== 0 &&
                    (board[currentPiece.row + y] &&
                        board[currentPiece.row + y][currentPiece.col + x]) !== 0
                ) {
                    return true;
                }
            }
        }
        return false;
    }

    function lockPiece() {
        currentPiece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    board[currentPiece.row + y][currentPiece.col + x] = value;
                }
            });
        });
    }

    function clearRows() {
        for (let row = 0; row < ROWS; row++) {
            if (board[row].every(cell => cell !== 0)) {
                board.splice(row, 1);
                board.unshift(Array(COLUMNS).fill(0));
                score += 100; // Tambahkan skor
                document.getElementById('score').textContent = score;
            }
        }
    }

    function resetPiece() {
        currentPiece.shape = tetrominoes[Math.floor(Math.random() * tetrominoes.length)];
        currentPiece.row = 0;
        currentPiece.col = Math.floor(COLUMNS / 2) - 1;

        if (collision()) {
            alert(`Game Over! Your score: ${score}`);
            window.location.reload();
        }
    }

    function movePiece(dir) {
        currentPiece.col += dir;
        if (collision()) {
            currentPiece.col -= dir;
        }
        drawBoard();
    }

    function rotatePiece() {
        const rotated = currentPiece.shape[0].map((_, index) =>
            currentPiece.shape.map(row => row[index]).reverse()
        );
        const original = currentPiece.shape;
        currentPiece.shape = rotated;
        if (collision()) {
            currentPiece.shape = original;
        }
        drawBoard();
    }

    document.addEventListener('keydown', event => {
        if (event.key === 'ArrowLeft') movePiece(-1);
        if (event.key === 'ArrowRight') movePiece(1);
        if (event.key === 'ArrowDown') movePieceDown();
        if (event.key === 'ArrowUp') rotatePiece();
    });

    setInterval(movePieceDown, 1000);
}
function startTetrisGame() {
  const canvas = document.getElementById('tetris-canvas');
  const context = canvas.getContext('2d');

  const ROWS = 20;
  const COLUMNS = 10;
  const BLOCK_SIZE = 30;
  let score = 0;

  const board = Array.from({ length: ROWS }, () => Array(COLUMNS).fill(0));

  const tetrominoes = [
      [[1, 1, 1], [0, 1, 0]], // T
      [[1, 1], [1, 1]],       // O
      [[1, 1, 0], [0, 1, 1]], // S
      [[0, 1, 1], [1, 1, 0]], // Z
      [[1, 1, 1, 1]],         // I
      [[1, 1, 1], [1, 0, 0]], // L
      [[1, 1, 1], [0, 0, 1]]  // J
  ];

  let currentPiece = {
      shape: tetrominoes[Math.floor(Math.random() * tetrominoes.length)],
      row: 0,
      col: Math.floor(COLUMNS / 2) - 1
  };

  function drawBlock(x, y) {
      context.fillStyle = 'cyan';
      context.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
      context.strokeStyle = 'black';
      context.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
  }

  function drawBoard() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      for (let row = 0; row < ROWS; row++) {
          for (let col = 0; col < COLUMNS; col++) {
              if (board[row][col] !== 0) {
                  drawBlock(col, row);
              }
          }
      }
      drawPiece();
  }

  function drawPiece() {
      currentPiece.shape.forEach((row, y) => {
          row.forEach((value, x) => {
              if (value !== 0) {
                  drawBlock(currentPiece.col + x, currentPiece.row + y);
              }
          });
      });
  }

  function movePieceDown() {
      currentPiece.row++;
      if (collision()) {
          currentPiece.row--;
          lockPiece();
          clearRows();
          resetPiece();
      }
      drawBoard();
  }

  function collision() {
      for (let y = 0; y < currentPiece.shape.length; y++) {
          for (let x = 0; x < currentPiece.shape[y].length; x++) {
              if (
                  currentPiece.shape[y][x] !== 0 &&
                  (board[currentPiece.row + y] &&
                      board[currentPiece.row + y][currentPiece.col + x]) !== 0
              ) {
                  return true;
              }
          }
      }
      return false;
  }

  function lockPiece() {
      currentPiece.shape.forEach((row, y) => {
          row.forEach((value, x) => {
              if (value !== 0) {
                  board[currentPiece.row + y][currentPiece.col + x] = value;
              }
          });
      });
  }

  function clearRows() {
      for (let row = 0; row < ROWS; row++) {
          if (board[row].every(cell => cell !== 0)) {
              board.splice(row, 1);
              board.unshift(Array(COLUMNS).fill(0));
              score += 100; // Tambahkan skor
              document.getElementById('score').textContent = score;
          }
      }
  }

  function resetPiece() {
      currentPiece.shape = tetrominoes[Math.floor(Math.random() * tetrominoes.length)];
      currentPiece.row = 0;
      currentPiece.col = Math.floor(COLUMNS / 2) - 1;

      if (collision()) {
          alert(`Game Over! Your score: ${score}`);
          window.location.reload();
      }
  }

  function movePiece(dir) {
      currentPiece.col += dir;
      if (collision()) {
          currentPiece.col -= dir;
      }
      drawBoard();
  }

  function rotatePiece() {
      const rotated = currentPiece.shape[0].map((_, index) =>
          currentPiece.shape.map(row => row[index]).reverse()
      );
      const original = currentPiece.shape;
      currentPiece.shape = rotated;
      if (collision()) {
          currentPiece.shape = original;
      }
      drawBoard();
  }

  // Event listener untuk keyboard
  document.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft') movePiece(-1);
      if (event.key === 'ArrowRight') movePiece(1);
      if (event.key === 'ArrowDown') movePieceDown();
      if (event.key === 'ArrowUp') rotatePiece();
  });

  // Event listener untuk tombol mobile
  document.getElementById('left-btn').addEventListener('click', () => movePiece(-1));
  document.getElementById('right-btn').addEventListener('click', () => movePiece(1));
  document.getElementById('down-btn').addEventListener('click', () => movePieceDown());
  document.getElementById('rotate-btn').addEventListener('click', () => rotatePiece());

  // Interval untuk menggerakkan potongan ke bawah
  setInterval(movePieceDown, 1000);
}

