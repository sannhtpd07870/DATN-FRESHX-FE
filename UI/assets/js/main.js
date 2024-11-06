// Mở và đóng drop
// Hàm chung để mở và đóng dropdown
function toggleDropdown(buttonId, dropId, inputId) {
    const button = document.getElementById(buttonId);
    const dropdown = document.getElementById(dropId);
    const input = document.getElementById(inputId);

    button.addEventListener("click", () => {
        dropdown.classList.toggle("active");
    });

    dropdown.querySelectorAll(".form-drop__text").forEach((option) => {
        option.addEventListener("click", () => {
            input.value = option.textContent.trim();
            dropdown.classList.remove("active");
        });
    });
}

// Áp dụng cho từng phần tử
toggleDropdown("facilityBtn", "facilityDrop", "facilityInput");
toggleDropdown("specialtyBtn", "specialtyDrop", "specialtyInput");
toggleDropdown("doctorBtn", "doctorDrop", "doctorInput");

// Kiểm tra số điện thoại nếu là số điện thoại Việt Nam thì không cần nhập email
document.addEventListener("DOMContentLoaded", function () {
    const phoneInput = document.getElementById("phone");
    const emailInput = document.getElementById("email");
    const phoneError = document.getElementById("phoneError");
    const emailError = document.getElementById("emailError");

    // Hàm kiểm tra số điện thoại Việt Nam
    function isValidVietnamPhoneNumber(phone) {
        const vietnamPhoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
        return vietnamPhoneRegex.test(phone);
    }

    // Xử lý sự kiện khi người dùng nhập số điện thoại
    phoneInput.addEventListener("blur", function () {
        const phoneValue = phoneInput.value;

        if (!isValidVietnamPhoneNumber(phoneValue)) {
            phoneError.style.display = "block"; // Hiển thị thông báo lỗi
            emailError.style.display = "block"; // Hiển thị yêu cầu nhập email
        } else {
            phoneError.style.display = "none"; // Ẩn thông báo lỗi
            emailError.style.display = "none"; // Ẩn yêu cầu nhập email
        }
    });

    // Xử lý khi người dùng nhập email
    emailInput.addEventListener("blur", function () {
        const emailValue = emailInput.value;

        if (
            phoneInput.value &&
            !isValidVietnamPhoneNumber(phoneInput.value) &&
            emailValue === ""
        ) {
            emailError.style.display = "block"; // Hiển thị thông báo email là bắt buộc
        } else {
            emailError.style.display = "none"; // Ẩn thông báo
        }
    });
});

// ------------------------------------------------------ //

// Chat Box
// Mở và đóng chatBox
const iconChat = document.getElementById("iconChat");
const chatBox = document.getElementById("chatBox");
const close = document.getElementById("close");

iconChat.addEventListener("click", () => {
    chatBox.style.display =
        chatBox.style.display === "none" || chatBox.style.display === ""
            ? "block"
            : "none";
});

close.addEventListener("click", () => {
    chatBox.style.display = "none";
});

// Gửi tin nhắn từ input vào client-chat
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatBody = document.getElementById("chatBody");

chatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const userMessage = chatInput.value.trim();
    if (userMessage) {
        const clientChat = document.createElement("div");
        clientChat.classList.add("chat-body__wrap", "chat-body__wrap--client");

        const userName = document.createElement("p");
        userName.classList.add("chat-body__name", "button-large");
        userName.textContent = "U";

        const clientMessage = document.createElement("p");
        clientMessage.classList.add("chat-body__client-chat", "desc2");
        clientMessage.textContent = userMessage;

        clientChat.appendChild(userName);
        clientChat.appendChild(clientMessage);
        chatBody.appendChild(clientChat);
        chatInput.value = ""; // Clear input after sending
    }
});

// Chụp ảnh từ webcam
const cameraButton = document.getElementById("camera");
const cameraModal = document.getElementById("cameraModal");
const video = document.getElementById("video");
const captureButton = document.getElementById("captureButton");

cameraButton.addEventListener("click", () => {
    cameraModal.style.display = "block";
    navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
            video.srcObject = stream;
        })
        .catch((error) => {
            console.error("Không thể truy cập vào webcam", error);
        });
});

captureButton.addEventListener("click", () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL("image/png");

    // Bạn có thể sử dụng `imageData` để hiển thị ảnh hoặc lưu trữ
    console.log(imageData);
    cameraModal.style.display = "none"; // Đóng modal sau khi chụp
});

// Tải ảnh lên
const imageButton = document.getElementById("image");

imageButton.addEventListener("click", () => {
    const inputFile = document.createElement("input");
    inputFile.type = "file";
    inputFile.accept = "image/*";
    inputFile.click();

    inputFile.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const img = new Image();
                img.src = reader.result;
                // Bạn có thể hiển thị hình ảnh vào chat hoặc xử lý theo yêu cầu
                console.log(reader.result);
            };
            reader.readAsDataURL(file);
        }
    });
});

// Thu âm và chuyển thành văn bản
const micButton = document.getElementById("mic");

micButton.addEventListener("click", () => {
    const recognition = new window.SpeechRecognition();
    recognition.lang = "vi-VN";
    recognition.start();

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        chatInput.value = transcript; // Hiển thị văn bản nhận diện được vào input
    };

    recognition.onerror = (error) => {
        console.error("Error recognizing speech: ", error);
    };
});

// Component
import { data } from "./db.js";

//New
function news(dataNew) {
    return `
        <a href="${dataNew.link}" class="new-container__item">
            <div class="new-container__wrap">
                <img
                    src="${dataNew.image}"
                    alt=""
                    class="new-container__thumb"
                />
                <button class="new-container__btn button-small">
                    Đọc thêm
                </button>
            </div>
            <div class="new-container__tags">
                ${dataNew.tags
                    .map(
                        (tag) =>
                            `<p class="new-container__tag button-small">${tag}</p>`
                    )
                    .join("")}
            </div>
            <h3 class="new-container__title heading4">
                ${dataNew.title}
            </h3>
            <p class="desc2">
                ${dataNew.desc}
            </p>
        </a>
    `;
}

function renderNews() {
    const newContainer = document.getElementById("new");
    newContainer.innerHTML = data.new.map(news).join("");
}
renderNews();

//Blog
function blogs(dataBlog, index) {
    // Kiểm tra nếu là bài blog thứ 2 thì sẽ thay đổi vị trí hình ảnh
    const isSecondBlog = index === 1;

    return `
    <article class="blog-container__item">
        ${
            isSecondBlog
                ? ""
                : `<img src=${dataBlog.image} alt="" class="blog-container__thumb" />`
        }
        <section class="blog-container__content">
            <h3 class="heading4">${dataBlog.title}</h3>
            <p class="blog-container__desc desc2">${dataBlog.desc}</p>
            <button class="btn blog-container__btn">Tìm hiểu thêm</button>
        </section>
        ${
            isSecondBlog
                ? `<img src=${dataBlog.image} alt="" class="blog-container__thumb" />`
                : ""
        }
    </article>
    `;
}

function renderBlogs() {
    const newContainer = document.getElementById("blog");
    newContainer.innerHTML = data.blog.map(blogs).join("");
}
renderBlogs();

function clients(dataClient) {
    return `
        <a href="${dataClient.link}" class="new-container__item">
            <img src="${dataClient.image}" alt="" />
        </a>
    `;
}

function renderClient() {
    const newContainer = document.getElementById("client");
    newContainer.innerHTML = data.client.map(clients).join("");
}
renderClient();

let copy = document.querySelector(".client-container").cloneNode(true);
document.querySelector(".client").appendChild(copy);

// Feedback
let index = 0; // Chỉ số của feedback hiện tại

function feedbacks(dataFeedback) {
    return `
        <img src="${dataFeedback.image}" alt="" class="feedback__img"/>
        <section class="feedback-content">
            <h2 class="heading2">Đánh giá của khách hàng</h2>
            <blockquote class="feedback-content__quote blog-quote">
                “${dataFeedback.quote}”
            </blockquote>
            <h3 class="feedback-content__name heading5">${
                dataFeedback.name
            }</h3>
            <p class="feedback-content__position desc1">${
                dataFeedback.position
            }</p>
            <div class="feedback-content__wrap">
                <div class="feedback-content__box">
                    <span class="feedback-content__separate"></span>
                    <span class="feedback-content__separate--short" style="left: ${calculateSeparateShortLeft()}%;"></span>
                </div>
                <div class="feedback-content__action">
                    <div class="feedback-content__left">
                        <!-- Icon Left Arrow -->
                        <svg class="feedback-content__icon" xmlns="http://www.w3.org/2000/svg" width="18" height="14" viewBox="0 0 18 14" fill="none">
                        <path d="M6.63439 0.364401C6.81928 0.364401 7.00418 0.432523 7.15016 0.578496C7.43237 0.860709 7.43237 1.32782 7.15016 1.61004L1.7589 7.0013L7.15016 12.3925C7.43237 12.6748 7.43237 13.1419 7.15016 13.4241C6.86794 13.7063 6.40083 13.7063 6.11862 13.4241L0.211587 7.51707C-0.0706272 7.23485 -0.0706272 6.76774 0.211587 6.48553L6.11862 0.578496C6.26459 0.432523 6.44949 0.364401 6.63439 0.364401Z" fill="#1E90D2"/>
                        <path d="M0.892001 6.27221L17.2701 6.27221C17.6691 6.27221 18 6.60308 18 7.00207C18 7.40106 17.6691 7.73193 17.2701 7.73193L0.892001 7.73193C0.493009 7.73193 0.162137 7.40106 0.162137 7.00207C0.162137 6.60308 0.493009 6.27221 0.892001 6.27221Z" fill="#1E90D2"/>
                        </svg>
                    </div>
                    <div class="feedback-content__right">
                        <!-- Icon Right Arrow -->
                        <svg class="feedback-content__icon" xmlns="http://www.w3.org/2000/svg" width="18" height="14" viewBox="0 0 18 14" fill="none">
                        <path d="M6.63439 0.364401C6.81928 0.364401 7.00418 0.432523 7.15016 0.578496C7.43237 0.860709 7.43237 1.32782 7.15016 1.61004L1.7589 7.0013L7.15016 12.3925C7.43237 12.6748 7.43237 13.1419 7.15016 13.4241C6.86794 13.7063 6.40083 13.7063 6.11862 13.4241L0.211587 7.51707C-0.0706272 7.23485 -0.0706272 6.76774 0.211587 6.48553L6.11862 0.578496C6.26459 0.432523 6.44949 0.364401 6.63439 0.364401Z" fill="#1E90D2"/>
                        <path d="M0.892001 6.27221L17.2701 6.27221C17.6691 6.27221 18 6.60308 18 7.00207C18 7.40106 17.6691 7.73193 17.2701 7.73193L0.892001 7.73193C0.493009 7.73193 0.162137 7.40106 0.162137 7.00207C0.162137 6.60308 0.493009 6.27221 0.892001 6.27221Z" fill="#1E90D2"/>
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    `;
}

// Render feedback
function renderFeedback() {
    const newContainer = document.getElementById("feedback");
    newContainer.innerHTML = feedbacks(data.feedback[index]);

    // Gắn sự kiện cho các nút điều hướng sau khi render
    document
        .querySelector(".feedback-content__left")
        .addEventListener("click", showPreviousFeedback);
    document
        .querySelector(".feedback-content__right")
        .addEventListener("click", showNextFeedback);
}

// Hàm chuyển sang feedback tiếp theo
function showNextFeedback() {
    index = (index + 1) % data.feedback.length; // Tăng index và quay lại nếu vượt quá số lượng feedback
    renderFeedback();
}

// Hàm chuyển sang feedback trước đó
function showPreviousFeedback() {
    index = (index - 1 + data.feedback.length) % data.feedback.length; // Giảm index và quay lại nếu index < 0
    renderFeedback();
}

// Hàm tính toán vị trí thanh separate--short
function calculateSeparateShortLeft() {
    return (index / data.feedback.length) * 100; // Vị trí của thanh short
}
renderFeedback();

//Doctor
function doctor(dataDoctor) {
    return `
    <article class="doctor-container">
    <div>
        <img
            src="${dataDoctor.avatar}"
            alt=""
            class="doctor-container__avt"
        />
        <button class="doctor-container__btn button-small">
            <img src="./assets/icons/calendar.svg" alt="" />
            Đăng ký khám
        </button>
    </div>

    <div>
        <h3 class="doctor-container__name heading5">
        ${dataDoctor.name}
        </h3>
        <div class="doctor-container__box">
            <img
                src="./assets/icons/academicTitle.svg"
                alt=""
            />
            <p class="desc2">${dataDoctor.specialty}</p>
        </div>
        <div class="doctor-container__box">
            <img
                src="./assets/icons/searchDoctor.svg"
                alt=""
            />
            <p class="desc2">${dataDoctor.specialized}</p>
        </div>
        <div class="doctor-container__box">
            <img src="./assets/icons/home.svg" alt="" />
            <p class="desc2">
            ${dataDoctor.part}
            </p>
        </div>
    </div>
</article>
    `;
}

function renderDoctor() {
    const newContainer = document.getElementById("doctor");
    newContainer.innerHTML = data.new.map(doctor).join("");
}
renderDoctor();

// Auto slide
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
