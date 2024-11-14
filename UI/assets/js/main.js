// Import dữ liệu
import { data } from "./db.js";

// Tạo HTML cho từng mục
const doctorTemplate = (dataDoctor) => `
    <article class="doctor-container">
        <div>
            <img src="${dataDoctor.avatar}" alt="${dataDoctor.name}" class="doctor-container__avt" />
            <button class="doctor-container__btn button-small">
                <img src="./assets/icons/calendar.svg" alt="Đăng ký khám" /> Đăng ký khám
            </button>
        </div>
        <div>
            <h3 class="doctor-container__name heading5">${dataDoctor.name}</h3>
            <div class="doctor-container__box">
                <img src="./assets/icons/academicTitle.svg" alt="Chuyên khoa" />
                <p class="desc2">${dataDoctor.specialty}</p>
            </div>
            <div class="doctor-container__box">
                <img src="./assets/icons/searchDoctor.svg" alt="Chuyên môn" />
                <p class="desc2">${dataDoctor.specialized}</p>
            </div>
            <div class="doctor-container__box">
                <img src="./assets/icons/home.svg" alt="Khoa" />
                <p class="desc2">${dataDoctor.part}</p>
            </div>
        </div>
    </article>
`;

const doctorMedical = (dataDoctorMedical) => `
<article class="doctor-medical__item">
<img
    src="${dataDoctorMedical.avatar}"
    alt=""
    class="doctor-medical__avt"
/>
<section class="doctor-medical__content">
    <h4 class="doctor-medical__name button-large">
    ${dataDoctorMedical.name}
    </h4>
    <div class="doctor-container__box">
        <img
            src="./assets/icons/academicTitle-white.svg"
            alt="Chuyên khoa"
        />
        <p class="desc2">${dataDoctorMedical.specialty}</p>
    </div>
    <div class="doctor-container__box">
        <img
            src="./assets/icons/searchDoctor-white.svg"
            alt="Chuyên môn"
        />
        <p class="desc2">
            ${dataDoctorMedical.specialized}
        </p>
    </div>
    <div class="doctor-container__box">
        <img
            src="./assets/icons/home-white.svg"
            alt="Khoa"
        />
        <p class="desc2">${dataDoctorMedical.part}</p>
    </div>
</section>
</article>
`;

const medicine = (dataMedicine) => `
<a
href="${dataMedicine.link}"
class="medicine-list__item button-large"
>${dataMedicine.name}</a
>
`;

const newsTemplate = (dataNew) => `
    <a href="${dataNew.link}" class="new-container__item">
        <div class="new-container__wrap">
            <img src="${dataNew.image}" alt="" class="new-container__thumb" />
            <button class="new-container__btn button-small">Đọc thêm</button>
        </div>
        <div class="new-container__tags">
            ${dataNew.tags
                .map(
                    (tag) =>
                        `<p class="new-container__tag button-small">${tag}</p>`
                )
                .join("")}
        </div>
        <h3 class="new-container__title heading4">${dataNew.title}</h3>
        <p class="desc2">${dataNew.desc}</p>
    </a>
`;

const blogTemplate = (dataBlog, index) => `
    <article class="blog-container__item">
        ${
            index !== 1
                ? `<img src="${dataBlog.image}" alt="" class="blog-container__thumb" />`
                : ""
        }
        <section class="blog-container__content">
            <h3 class="heading4">${dataBlog.title}</h3>
            <p class="blog-container__desc desc2">${dataBlog.desc}</p>
            <a href=${
                dataBlog.link
            } class="btn blog-container__btn">Tìm hiểu thêm</a>
        </section>
        ${
            index === 1
                ? `<img src="${dataBlog.image}" alt="" class="blog-container__thumb" />`
                : ""
        }
    </article>
`;

const clientTemplate = (dataClient) => `
    <a href="${dataClient.link}" class="new-container__item">
        <img src="${dataClient.image}" alt="" />
    </a>
`;

const feedbackTemplate = (dataFeedback) => `
    <img src="${dataFeedback.image}" alt="" class="feedback__img"/>
    <section class="feedback-content">
        <h2 class="heading2">Đánh giá của khách hàng</h2>
        <blockquote class="feedback-content__quote blog-quote">“${
            dataFeedback.quote
        }”</blockquote>
        <h3 class="feedback-content__name heading5">${dataFeedback.name}</h3>
        <p class="feedback-content__position desc1">${dataFeedback.position}</p>
        <div class="feedback-content__wrap">
            <div class="feedback-content__box">
                <span class="feedback-content__separate"></span>
                <span class="feedback-content__separate--short" style="left: ${calculateSeparateShortLeft()}%;"></span>
            </div>
            <div class="feedback-content__action">
            <div class="feedback-content__left">
                <svg class="feedback-content__icon" xmlns="http://www.w3.org/2000/svg" width="18" height="14" viewBox="0 0 18 14" fill="none">
      <path d="M6.63439 0.364401C6.81928 0.364401 7.00418 0.432523 7.15016 0.578496C7.43237 0.860709 7.43237 1.32782 7.15016 1.61004L1.7589 7.0013L7.15016 12.3925C7.43237 12.6748 7.43237 13.1419 7.15016 13.4241C6.86794 13.7063 6.40083 13.7063 6.11862 13.4241L0.211587 7.51707C-0.0706272 7.23485 -0.0706272 6.76774 0.211587 6.48553L6.11862 0.578496C6.26459 0.432523 6.44949 0.364401 6.63439 0.364401Z" fill="#1E90D2"/>
      <path d="M0.892001 6.27221L17.2701 6.27221C17.6691 6.27221 18 6.60308 18 7.00207C18 7.40106 17.6691 7.73193 17.2701 7.73193L0.892001 7.73193C0.493009 7.73193 0.162137 7.40106 0.162137 7.00207C0.162137 6.60308 0.493009 6.27221 0.892001 6.27221Z" fill="#1E90D2"/>
    </svg>
            </div>
<div class="feedback-content__right">
    <svg class="feedback-content__icon" xmlns="http://www.w3.org/2000/svg" width="18" height="14" viewBox="0 0 18 14" fill="none">
    <path d="M6.63439 0.364401C6.81928 0.364401 7.00418 0.432523 7.15016 0.578496C7.43237 0.860709 7.43237 1.32782 7.15016 1.61004L1.7589 7.0013L7.15016 12.3925C7.43237 12.6748 7.43237 13.1419 7.15016 13.4241C6.86794 13.7063 6.40083 13.7063 6.11862 13.4241L0.211587 7.51707C-0.0706272 7.23485 -0.0706272 6.76774 0.211587 6.48553L6.11862 0.578496C6.26459 0.432523 6.44949 0.364401 6.63439 0.364401Z" fill="#1E90D2"/>
    <path d="M0.892001 6.27221L17.2701 6.27221C17.6691 6.27221 18 6.60308 18 7.00207C18 7.40106 17.6691 7.73193 17.2701 7.73193L0.892001 7.73193C0.493009 7.73193 0.162137 7.40106 0.162137 7.00207C0.162137 6.60308 0.493009 6.27221 0.892001 6.27221Z" fill="#1E90D2"/>
    </svg>
</div>
            </div>
        </div>
    </section>
`;

const speciTemplate = (dataSpeci, index) => `
<article class="speci-container">
    <img src="${dataSpeci.image}" alt="" class="speci-container__img" />
    <section class="speci-container__content">
        <div>
            <h3 class="speci-container__title">${dataSpeci.title}</h3>
            <p class="desc2">${dataSpeci.desc}</p>
        </div>
        <button class="speci-container__btn button-small" data-id="${index}">
            Tìm hiểu thêm
        </button>
    </section>
</article>`;

const renderSpeci = (containerId, items, template) => {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = `
        <section>
            <h2 class="heading2">Chuyên khoa của chúng tôi</h2>
            <p class="desc1 speci__desc">
                Fresh-X cung cấp đa dạng các dịch vụ và chuyên khoa
                lâm sàng toàn diện, kết hợp chuyên môn y khoa với
                công nghệ tiên tiến để mang lại dịch vụ chăm sóc
                chất lượng cao nhất cho bệnh nhân.
            </p>
        </section>
        ${items.map((item, index) => template(item, index)).join("")}
        `;

        // Thêm sự kiện cho các nút "Tìm hiểu thêm"
        const buttons = container.querySelectorAll(".speci-container__btn");
        buttons.forEach((button) => {
            button.addEventListener("click", (event) => {
                const index = event.target.getAttribute("data-id");
                openSpeciModal(index);
            });
        });
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const modalContainer = document.querySelector(".modal");

    if (modalContainer) {
        // Đóng modal khi nhấn vào nút close hoặc overlay
        modalContainer.addEventListener("click", (event) => {
            if (event.target.classList.contains("modal-close")) {
                modalContainer.classList.remove("active");
            }
        });
    }
});

const openSpeciModal = (index) => {
    const speci = data.speci[index];
    const modalContainer = document.querySelector(".modal");

    if (modalContainer) {
        // Cập nhật nội dung cho modal
        const modalContent = `
            <div class="modal-speci">
                <img src="./assets/icons/close2.svg" alt="" class="modal-speci__close modal-close" />
                <h3 class="modal-speci__title">${speci.title}</h3>
                <p class="modal-speci__desc desc1">${speci.explain}</p>
                <button class="btn">Đặt lịch hẹn</button>
            </div>
        `;
        const modalOverlay = `<div class="modal__overlay modal-close"></div>`;

        // Gán nội dung cho modal
        modalContainer.innerHTML = modalContent + modalOverlay;

        // Hiển thị modal
        modalContainer.classList.add("active");
    }
};

const medicalTemplate = (dataMedical) => `
<a href="${dataMedical.link}" class="medical-container__item">
<img
    src=${dataMedical.image}
    alt=""
    class="medical-container__img"
/>
<section class="medical-container__content">
    <h3
        class="heading4 medical-container__heading"
    >
    ${dataMedical.title}
    </h3>
    <p class="medical-container__desc desc2">
    ${dataMedical.desc}
    </p>
</section>
</a>
`;

const physicalTemplate = (dataPhysical) => `
<a href="${dataPhysical.link}" class="medical-container__item">
<img
    src=${dataPhysical.image}
    alt=""
    class="medical-container__img"
/>
<section class="medical-container__content">
    <h3
        class="heading4 medical-container__heading"
    >
    ${dataPhysical.title}
    </h3>
    <p class="medical-container__desc desc2">
    ${dataPhysical.desc}
    </p>
</section>
</a>
`;

// Render các mục vào HTML
const render = (containerId, items, template) => {
    const container = document.getElementById(containerId);
    if (container) container.innerHTML = items.map(template).join("");
};

// Render từng phần của trang
render("doctor", data.doctor, doctorTemplate);
render("new", data.new, newsTemplate);
render("blog", data.blog, blogTemplate);
render("client", data.client, clientTemplate);
renderSpeci("speci", data.speci, speciTemplate);
render("physical", data.physical, physicalTemplate);
render("maternity", data.maternity, medicalTemplate);
render("doctor-medical", data.doctor, doctorMedical);
render("medicine-list", data.medicine, medicine);

// Copy phần tử client-container
const clientContainer = document.querySelector(".client-container");
if (clientContainer) {
    const copy = clientContainer.cloneNode(true);
    document.querySelector(".client").appendChild(copy);
}

// Feedback
let feedbackIndex = 0;
const updateFeedback = () => {
    const feedbackContainer = document.getElementById("feedback");
    if (feedbackContainer) {
        feedbackContainer.innerHTML = feedbackTemplate(
            data.feedback[feedbackIndex]
        );
        setupFeedbackNavigation();
    }
};

// Tính toán vị trí thanh separate--short
const calculateSeparateShortLeft = () =>
    (feedbackIndex / data.feedback.length) * 100;

// Hàm điều hướng feedback
const setupFeedbackNavigation = () => {
    document
        .querySelector(".feedback-content__left")
        .addEventListener("click", showPreviousFeedback);
    document
        .querySelector(".feedback-content__right")
        .addEventListener("click", showNextFeedback);
};

const showNextFeedback = () => {
    feedbackIndex = (feedbackIndex + 1) % data.feedback.length;
    updateFeedback();
};

const showPreviousFeedback = () => {
    feedbackIndex =
        (feedbackIndex - 1 + data.feedback.length) % data.feedback.length;
    updateFeedback();
};
updateFeedback();

// ----------------------------------------------------------------------------------- //

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

// Lấy các phần tử từ class
const chatButton = document.querySelector(".chat");
const chatBox = document.querySelector(".chat-box");
const close = document.querySelector(".close");
const chatForm = document.querySelector(".chat-footer__form");
const chatInput = document.querySelector(".chat-footer__input");
const chatBody = document.querySelector(".chat-body");
const cameraButton = document.querySelector(".camera");
const cameraModal = document.querySelector(".camera-modal");
const video = document.querySelector(".video");
const captureButton = document.querySelector(".capture-button");
const imageButton = document.querySelector(".image");
const micButton = document.querySelector(".mic");

// Mở và đóng hộp chat
chatButton.addEventListener("click", () => {
    chatBox.style.display =
        chatBox.style.display === "block" ? "none" : "block";
});

close.addEventListener("click", () => (chatBox.style.display = "none"));

// Gửi tin nhắn
chatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const userMessage = chatInput.value.trim();
    if (userMessage) {
        chatBody.innerHTML += `
            <div class="chat-body__wrap chat-body__wrap--client">
                <p class="chat-body__name button-large">U</p>
                <p class="chat-body__client-chat desc2">${userMessage}</p>
            </div>`;
        chatInput.value = "";
    }
});

// Chụp ảnh từ webcam
cameraButton.addEventListener("click", () => {
    cameraModal.style.display = "block";
    navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
            video.srcObject = stream;
        })
        .catch((error) =>
            console.error("Không thể truy cập vào webcam", error)
        );
});

captureButton.addEventListener("click", () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL("image/png");
    console.log(imageData);
    cameraModal.style.display = "none";
});

// Tải ảnh lên
imageButton.addEventListener("click", () => {
    const inputFile = document.createElement("input");
    inputFile.type = "file";
    inputFile.accept = "image/*";
    inputFile.click();

    inputFile.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => console.log(reader.result);
            reader.readAsDataURL(file);
        }
    });
});

// Thu âm và chuyển thành văn bản
micButton.addEventListener("click", () => {
    const recognition = new window.SpeechRecognition();
    recognition.lang = "vi-VN";
    recognition.start();

    recognition.onresult = (event) => {
        chatInput.value = event.results[0][0].transcript;
    };

    recognition.onerror = (error) =>
        console.error("Error recognizing speech: ", error);
});

// Hàm mở và đóng dropdown
function toggleDropdown() {
    document.querySelectorAll("[data-drop-button]").forEach((button) => {
        const dropId = button.dataset.dropButton;
        const dropdown = document.querySelector(`[data-drop="${dropId}"]`);
        const input = document.querySelector(`[data-input="${dropId}"]`);

        if (dropdown && input) {
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
    });
}
toggleDropdown();

// Overlay
document.addEventListener("DOMContentLoaded", function () {
    // Chọn tất cả các nút mở modal
    const openModalButtons = document.querySelectorAll(".open-modal");
    // Chọn tất cả các modal
    const modals = document.querySelectorAll(".modal");

    openModalButtons.forEach((button) => {
        button.addEventListener("click", function () {
            // Lấy ID của modal từ thuộc tính data-target
            const modalId = button.getAttribute("data-target");
            const modal = document.querySelector(modalId);

            if (modal) {
                modal.classList.add("active");
            }
        });
    });

    // Thiết lập sự kiện cho nút đóng và overlay của mỗi modal
    modals.forEach((modal) => {
        const closeModalButton = modal.querySelector(".modal-close");
        const closeModalOverlay = modal.querySelector(".modal__overlay");

        if (closeModalButton) {
            closeModalButton.addEventListener("click", function () {
                modal.classList.remove("active");
            });
        }

        if (closeModalOverlay) {
            closeModalOverlay.addEventListener("click", function () {
                modal.classList.remove("active");
            });
        }
    });
});

// Auto slide
let currentIndex = 0;
const wrapImg = document.querySelector(".hero__wrap-img");
const images = document.querySelectorAll(".hero__img");
const dots = document.querySelectorAll(".hero__dot");

function showSlide(index) {
    currentIndex = index;
    wrapImg.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, dotIndex) => {
        dot.classList.toggle("hero__dot--active", dotIndex === currentIndex);
    });
}

function automaticSlide() {
    currentIndex = (currentIndex + 1) % images.length;
    showSlide(currentIndex);
    setTimeout(automaticSlide, 5000); // Thời gian chuyển ảnh
}

// Xử lý khi nhấn vào các dot
dots.forEach((dot, index) => {
    dot.addEventListener("click", () => showSlide(index));
});

automaticSlide();
