let currentIndex = 0;

function showSlide(index) {
    const wrapImg = document.querySelector(".hero__wrap-img");
    const images = document.querySelectorAll(".hero__img");
    const dots = document.querySelectorAll(".hero__dot");
    currentIndex = index;
    wrapImg.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, dotIndex) => {
        dot.classList.toggle("hero__dot--active", dotIndex === currentIndex);
    });
}

function automaticSlide() {
    const images = document.querySelectorAll(".hero__img");
    currentIndex = (currentIndex + 1) % images.length;

    showSlide(currentIndex);

    setTimeout(automaticSlide, 5000);
}
document.querySelectorAll(".hero__dot").forEach((dot, index) => {
    dot.addEventListener("click", () => showSlide(index));
});
automaticSlide();

// Copy
let copy = document.querySelector(".client-container").cloneNode(true);
document.querySelector(".client").appendChild(copy);

// Open chat
function openChat() {
    const chatIcon = document.querySelector("#iconChat");
}
