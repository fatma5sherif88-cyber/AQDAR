// ========================================
// AQDAR - أقدر
// منصة لدعم الأشخاص ذوي الإعاقة الذهنية
// ========================================


// ========================================
// DATA
// ========================================

const activities = [
    {
        id: "memory",
        title: "اختبار الذاكرة",
        icon: "🧠",
        level: "سهل",
        description: "حاول تذكر المعلومة واختار الإجابة الصحيحة.",
        type: "quiz",
        question: "لو عندك 3 تفاحات وأكلت واحدة، كام تفاحة يتبقى؟",
        options: ["1", "2", "3"],
        answer: "2"
    },

    {
        id: "attention",
        title: "اختبار التركيز",
        icon: "🎯",
        level: "سهل",
        description: "ركز في السؤال واختار الإجابة المختلفة.",
        type: "quiz",
        question: "أي كلمة مختلفة؟",
        options: ["قلم", "قلم", "كتاب", "قلم"],
        answer: "كتاب"
    },

    {
        id: "logic",
        title: "فكر وحل",
        icon: "💡",
        level: "متوسط",
        description: "نشاط بسيط للتفكير وحل المشكلات.",
        type: "quiz",
        question: "ما الرقم التالي؟ 2 - 4 - 6 - ؟",
        options: ["7", "8", "10"],
        answer: "8"
    },

    {
        id: "colors",
        title: "الألوان",
        icon: "🎨",
        level: "سهل",
        description: "تعرف على الألوان واختر الإجابة الصحيحة.",
        type: "quiz",
        question: "ما لون العشب غالبًا؟",
        options: ["أزرق", "أخضر", "أحمر"],
        answer: "أخضر"
    },

    {
        id: "daily",
        title: "ترتيب اليوم",
        icon: "☀️",
        level: "متوسط",
        description: "فكر في خطوات بداية اليوم.",
        type: "quiz",
        question: "ماذا نفعل عادةً بعد الاستيقاظ؟",
        options: [
            "نغسل وجهنا",
            "ننام مرة أخرى",
            "نذهب للنوم"
        ],
        answer: "نغسل وجهنا"
    },

    {
        id: "words",
        title: "الكلمات",
        icon: "🔤",
        level: "متوسط",
        description: "اختار الكلمة المناسبة.",
        type: "quiz",
        question: "أي كلمة تدل على مكان نتعلم فيه؟",
        options: [
            "مدرسة",
            "كرة",
            "تفاحة"
        ],
        answer: "مدرسة"
    },

    {
        id: "planning",
        title: "حل المشكلة",
        icon: "🧩",
        level: "متقدم",
        description: "فكر في أفضل تصرف للموقف.",
        type: "quiz",
        question: "لو نسيت موعدًا مهمًا، ما الأفضل؟",
        options: [
            "أتجاهله",
            "أستخدم منبهًا أو تذكيرًا",
            "أنسى الموضوع"
        ],
        answer: "أستخدم منبهًا أو تذكيرًا"
    },

    {
        id: "writing",
        title: "اكتب فكرتك",
        icon: "✍️",
        level: "متوسط",
        description: "اكتب جملة بسيطة عن شيء تحبه.",
        type: "writing"
    },

    {
        id: "drawing",
        title: "ارسم على الورق",
        icon: "🖍️",
        level: "سهل",
        description: "ارسم على ورقة ثم صور الرسم وارفع الصورة.",
        type: "drawing"
    }
];


// ========================================
// STORAGE
// ========================================

const STORAGE_KEY = "aqdarPlatformData";

let data;

try {
    data = JSON.parse(localStorage.getItem(STORAGE_KEY));
} catch (error) {
    data = null;
}

if (!data || typeof data !== "object") {
    data = {
        users: [],
        posts: [],
        currentUser: null
    };
}

if (!Array.isArray(data.users)) {
    data.users = [];
}

if (!Array.isArray(data.posts)) {
    data.posts = [];
}

if (data.currentUser === undefined) {
    data.currentUser = null;
}


// ========================================
// VARIABLES
// ========================================

let currentActivity = null;
let selectedImage = null;


// ========================================
// ELEMENTS
// ========================================

const authSection = document.getElementById("authSection");
const app = document.getElementById("app");

const loginBox = document.getElementById("loginBox");
const registerBox = document.getElementById("registerBox");

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const toast = document.getElementById("toast");


// ========================================
// SAVE DATA
// ========================================

function saveData() {
    try {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(data)
        );
    } catch (error) {
        showToast("حصلت مشكلة في حفظ البيانات.");
        console.error(error);
    }
}


// ========================================
// TOAST MESSAGE
// ========================================

function showToast(message) {

    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2800);
}


// ========================================
// LOADING SCREEN
// ========================================

window.addEventListener("load", () => {

    setTimeout(() => {

        const loadingScreen =
            document.getElementById("loadingScreen");

        if (loadingScreen) {
            loadingScreen.style.display = "none";
        }

        if (data.currentUser !== null) {
            const user = getCurrentUser();

            if (user) {
                openApp();
            } else {
                data.currentUser = null;
                saveData();
            }
        }

    }, 700);
});


// ========================================
// SHOW REGISTER
// ========================================

const showRegisterButton =
    document.getElementById("showRegister");

if (showRegisterButton) {

    showRegisterButton.addEventListener("click", () => {

        loginBox.classList.add("hidden");

        registerBox.classList.remove("hidden");

    });
}


// ========================================
// SHOW LOGIN
// ========================================

const showLoginButton =
    document.getElementById("showLogin");

if (showLoginButton) {

    showLoginButton.addEventListener("click", () => {

        registerBox.classList.add("hidden");

        loginBox.classList.remove("hidden");

    });
}


// ========================================
// REGISTER
// ========================================

if (registerForm) {

    registerForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const name =
            document
                .getElementById("registerName")
                .value
                .trim();

        const phone =
            document
                .getElementById("registerPhone")
                .value
                .trim();

        const age =
            document
                .getElementById("registerAge")
                .value;

        const password =
            document
                .getElementById("registerPassword")
                .value;

        if (!name || !phone || !age || !password) {

            showToast("من فضلك املأ كل البيانات.");

            return;
        }

        if (password.length < 4) {

            showToast(
                "كلمة المرور لازم تكون 4 أحرف على الأقل."
            );

            return;
        }

        const existingUser =
            data.users.find(
                user => user.phone === phone
            );

        if (existingUser) {

            showToast(
                "الرقم ده مسجل بالفعل."
            );

            return;
        }

        const newUser = {

            id: Date.now(),

            name: name,

            phone: phone,

            age: age,

            password: password,

            points: 0,

            completed: [],

            history: []

        };

        data.users.push(newUser);

        data.currentUser = newUser.id;

        saveData();

        showToast(
            "تم إنشاء الحساب بنجاح 💜"
        );

        openApp();

    });
}


// ========================================
// LOGIN
// ========================================

if (loginForm) {

    loginForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const phone =
            document
                .getElementById("loginPhone")
                .value
                .trim();

        const password =
            document
                .getElementById("loginPassword")
                .value;

        const user =
            data.users.find(
                item =>
                    item.phone === phone &&
                    item.password === password
            );

        if (!user) {

            showToast(
                "رقم ولي الأمر أو كلمة المرور غير صحيحة."
            );

            return;
        }

        data.currentUser = user.id;

        saveData();

        openApp();

    });
}


// ========================================
// DEMO LOGIN
// ========================================

const demoLoginButton =
    document.getElementById("demoLogin");

if (demoLoginButton) {

    demoLoginButton.addEventListener("click", () => {

        let demoUser =
            data.users.find(
                user => user.phone === "00000000000"
            );

        if (!demoUser) {

            demoUser = {

                id: Date.now(),

                name: "مستخدم تجريبي",

                phone: "00000000000",

                age: 16,

                password: "1234",

                points: 0,

                completed: [],

                history: []

            };

            data.users.push(demoUser);
        }

        data.currentUser = demoUser.id;

        saveData();

        openApp();

        showToast(
            "دخلنا النسخة التجريبية 💜"
        );

    });
}


// ========================================
// GET CURRENT USER
// ========================================

function getCurrentUser() {

    return data.users.find(
        user => user.id === data.currentUser
    );
}


// ========================================
// OPEN APP
// ========================================

function openApp() {

    if (!getCurrentUser()) {
        return;
    }

    authSection.classList.add("hidden");

    app.classList.remove("hidden");

    renderUser();

    renderActivities();

    renderPosts();

    renderSupport();

    showPage("home");
}


// ========================================
// RENDER USER
// ========================================

function renderUser() {

    const user = getCurrentUser();

    if (!user) return;

    const welcomeText =
        document.getElementById("welcomeText");

    const points =
        document.getElementById("points");

    const homePoints =
        document.getElementById("homePoints");

    const completedCount =
        document.getElementById("completedCount");

    const supportUserName =
        document.getElementById("supportUserName");

    const supportPhone =
        document.getElementById("supportPhone");

    if (welcomeText) {

        welcomeText.textContent =
            `أهلاً يا ${user.name} 👋`;

    }

    if (points) {
        points.textContent = user.points;
    }

    if (homePoints) {
        homePoints.textContent = user.points;
    }

    if (completedCount) {
        completedCount.textContent =
            user.completed.length;
    }

    if (supportUserName) {
        supportUserName.textContent =
            user.name;
    }

    if (supportPhone) {
        supportPhone.textContent =
            user.phone;
    }
}


// ========================================
// NAVIGATION
// ========================================

document.querySelectorAll(".nav-btn")
    .forEach(button => {

        button.addEventListener("click", () => {

            showPage(
                button.dataset.page
            );

        });

    });


// ========================================
// QUICK BUTTONS
// ========================================

document.querySelectorAll("[data-go]")
    .forEach(button => {

        button.addEventListener("click", () => {

            showPage(
                button.dataset.go
            );

        });

    });


// ========================================
// SHOW PAGE
// ========================================

function showPage(pageName) {

    document.querySelectorAll(".page")
        .forEach(page => {

            page.classList.remove(
                "active-page"
            );

        });

    const page =
        document.getElementById(
            pageName + "Page"
        );

    if (page) {

        page.classList.add(
            "active-page"
        );

    }

    document.querySelectorAll(".nav-btn")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.page === pageName
            );

        });

    const titles = {

        home: "الرئيسية",

        activities: "الأنشطة",

        community: "المجتمع",

        information: "معلومات ودعم",

        support: "ولي الأمر"

    };

    const pageTitle =
        document.getElementById("pageTitle");

    if (pageTitle) {

        pageTitle.textContent =
            titles[pageName] || "أقدر";

    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ========================================
// RENDER ACTIVITIES
// ========================================

function renderActivities() {

    const container =
        document.getElementById(
            "activitiesContainer"
        );

    const user = getCurrentUser();

    if (!container || !user) return;

    container.innerHTML = "";

    activities.forEach(activity => {

        const completed =
            user.completed.includes(
                activity.id
            );

        const card =
            document.createElement("article");

        card.className =
            "activity-card";

        card.innerHTML = `

            <div class="activity-icon">
                ${activity.icon}
            </div>

            <span class="activity-level">
                ${activity.level}
            </span>

            <h3>
                ${activity.title}
            </h3>

            <p>
                ${activity.description}
            </p>

            <button
                class="primary-btn"
                data-activity="${activity.id}"
            >
                ${
                    completed
                        ? "إعادة النشاط"
                        : "ابدأ النشاط"
                }
            </button>

        `;

        container.appendChild(card);

    });

    container
        .querySelectorAll("[data-activity]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    openActivity(
                        button.dataset.activity
                    );

                }
            );

        });
}


// ========================================
// OPEN ACTIVITY
// ========================================

function openActivity(id) {

    const activity =
        activities.find(
            item => item.id === id
        );

    if (!activity) return;

    currentActivity = activity;

    const modal =
        document.getElementById(
            "activityModal"
        );

    const content =
        document.getElementById(
            "activityContent"
        );

    if (!modal || !content) return;

    modal.classList.add("show");


    // Quiz activity

    if (activity.type === "quiz") {

        content.innerHTML = `

            <div class="game-box">

                <div class="activity-icon">
                    ${activity.icon}
                </div>

                <h2>
                    ${activity.title}
                </h2>

                <p>
                    ${activity.description}
                </p>

                <div class="game-question">
                    ${activity.question}
                </div>

                <div class="game-options">

                    ${activity.options
                        .map(option => `

                            <button
                                class="game-option"
                                data-answer="${escapeHTML(option)}"
                            >
                                ${escapeHTML(option)}
                            </button>

                        `)
                        .join("")}

                </div>

            </div>

        `;

        content
            .querySelectorAll(
                "[data-answer]"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        checkAnswer(
                            button.dataset.answer
                        );

                    }
                );

            });

    }


    // Writing activity

    if (activity.type === "writing") {

        content.innerHTML = `

            <div class="game-box">

                <div class="activity-icon">
                    ✍️
                </div>

                <h2>
                    اكتب فكرتك
                </h2>

                <p>
                    اكتب جملة أو أكثر عن شيء بتحبه.
                </p>

                <textarea
                    id="writingAnswer"
                    rows="7"
                    placeholder="أنا أحب..."
                ></textarea>

                <button
                    id="submitWriting"
                    class="primary-btn"
                    style="margin-top:15px;"
                >
                    إتمام النشاط
                </button>

            </div>

        `;

        const submitWriting =
            document.getElementById(
                "submitWriting"
            );

        submitWriting.addEventListener(
            "click",
            () => {

                const answer =
                    document
                        .getElementById(
                            "writingAnswer"
                        )
                        .value
                        .trim();

                if (answer.length < 3) {

                    showToast(
                        "اكتب حاجة بسيطة الأول ✍️"
                    );

                    return;
                }

                completeActivity(
                    activity.id
                );

            }
        );

    }


    // Drawing activity

    if (activity.type === "drawing") {

        content.innerHTML = `

            <div class="game-box">

                <div class="activity-icon">
                    🖍️
                </div>

                <h2>
                    ارسم على الورق
                </h2>

                <div class="game-question">
                    ارسم بيتًا صغيرًا
                    وبجانبه شجرة
                    وشمس في السماء ☀️
                </div>

                <p>
                    ارسم باستخدام ورقة وقلم.
                    وبعد ما تخلص صوّر الرسم
                    وارفع الصورة هنا.
                </p>

                <label class="upload-box">

                    📷

                    <strong>
                        تصوير / اختيار صورة الرسم
                    </strong>

                    <input
                        type="file"
                        id="drawingImage"
                        accept="image/*"
                        capture="environment"
                    >

                </label>

                <div id="drawingPreview"></div>

                <button
                    id="submitDrawing"
                    class="primary-btn"
                    style="margin-top:15px;"
                >
                    تسليم الرسم
                </button>

            </div>

        `;

        const drawingInput =
            document.getElementById(
                "drawingImage"
            );

        drawingInput.addEventListener(
            "change",
            event => {

                const file =
                    event.target.files[0];

                if (!file) return;

                if (
                    file.size >
                    5 * 1024 * 1024
                ) {

                    showToast(
                        "الصورة كبيرة جدًا. اختار صورة أقل من 5MB."
                    );

                    event.target.value = "";

                    return;
                }

                const reader =
                    new FileReader();

                reader.onload = event => {

                    const preview =
                        document.getElementById(
                            "drawingPreview"
                        );

                    preview.innerHTML = `

                        <img
                            src="${event.target.result}"
                            alt="صورة الرسم"
                            style="
                                width:100%;
                                max-height:350px;
                                object-fit:contain;
                                margin-top:15px;
                                border-radius:15px;
                            "
                        >

                    `;

                };

                reader.readAsDataURL(file);

            }
        );


        const submitDrawing =
            document.getElementById(
                "submitDrawing"
            );

        submitDrawing.addEventListener(
            "click",
            () => {

                if (!drawingInput.files.length) {

                    showToast(
                        "ارفع صورة الرسم الأول 📷"
                    );

                    return;
                }

                completeActivity(
                    activity.id
                );

            }
        );

    }
}


// ========================================
// CHECK ANSWER
// ========================================

function checkAnswer(answer) {

    if (!currentActivity) return;

    if (
        answer === currentActivity.answer
    ) {

        completeActivity(
            currentActivity.id
        );

    } else {

        showToast(
            "جرب مرة تانية 💜"
        );

    }
}


// ========================================
// COMPLETE ACTIVITY
// ========================================

function completeActivity(id) {

    const user = getCurrentUser();

    if (!user) return;

    if (!Array.isArray(user.completed)) {
        user.completed = [];
    }

    if (!Array.isArray(user.history)) {
        user.history = [];
    }

    const alreadyCompleted =
        user.completed.includes(id);

    if (!alreadyCompleted) {

        user.completed.push(id);

        user.points += 10;

        const activity =
            activities.find(
                item => item.id === id
            );

        if (activity) {

            user.history.unshift({

                title: activity.title,

                date:
                    new Date()
                        .toLocaleDateString(
                            "ar-EG"
                        )

            });

        }

        saveData();

        renderUser();

        renderActivities();

        renderSupport();

        showToast(
            "ممتاز! حصلت على 10 نقاط ⭐"
        );

    } else {

        showToast(
            "أنت خلصت النشاط ده قبل كده 💜"
        );

    }

    const modal =
        document.getElementById(
            "activityModal"
        );

    if (modal) {
        modal.classList.remove("show");
    }
}


// ========================================
// RENDER SUPPORT
// ========================================

function renderSupport() {

    const user = getCurrentUser();

    if (!user) return;

    const total =
        activities.length;

    const completed =
        user.completed.length;

    const percentage =
        total === 0
            ? 0
            : Math.min(
                100,
                (completed / total) * 100
            );

    const progressFill =
        document.getElementById(
            "progressFill"
        );

    const progressText =
        document.getElementById(
            "progressText"
        );

    const historyContainer =
        document.getElementById(
            "historyContainer"
        );

    if (progressFill) {

        progressFill.style.width =
            percentage + "%";

    }

    if (progressText) {

        progressText.textContent =
            `${completed} من ${total} أنشطة مكتملة`;

    }

    if (!historyContainer) return;

    if (!user.history.length) {

        historyContainer.innerHTML = `

            <div class="history-item">
                لسه مفيش أنشطة مكتملة.
            </div>

        `;

        return;
    }

    historyContainer.innerHTML =
        user.history
            .slice(0, 10)
            .map(item => `

                <div class="history-item">

                    🎯
                    ${escapeHTML(item.title)}

                    <small>
                        — ${escapeHTML(item.date)}
                    </small>

                </div>

            `)
            .join("");
}


// ========================================
// OPEN POST MODAL
// ========================================

const openPostButton =
    document.getElementById(
        "openPostBtn"
    );

if (openPostButton) {

    openPostButton.addEventListener(
        "click",
        () => {

            selectedImage = null;

            const postText =
                document.getElementById(
                    "postText"
                );

            const postImage =
                document.getElementById(
                    "postImage"
                );

            const imagePreview =
                document.getElementById(
                    "imagePreview"
                );

            if (postText) {
                postText.value = "";
            }

            if (postImage) {
                postImage.value = "";
            }

            if (imagePreview) {
                imagePreview.innerHTML = "";
            }

            const modal =
                document.getElementById(
                    "postModal"
                );

            if (modal) {
                modal.classList.add("show");
            }

        }
    );
}


// ========================================
// POST IMAGE
// ========================================

const postImageInput =
    document.getElementById(
        "postImage"
    );

if (postImageInput) {

    postImageInput.addEventListener(
        "change",
        event => {

            const file =
                event.target.files[0];

            if (!file) return;

            if (
                file.size >
                5 * 1024 * 1024
            ) {

                showToast(
                    "الصورة كبيرة جدًا. الحد الأقصى 5MB."
                );

                event.target.value = "";

                return;
            }

            const reader =
                new FileReader();

            reader.onload = event => {

                selectedImage =
                    event.target.result;

                const imagePreview =
                    document.getElementById(
                        "imagePreview"
                    );

                if (imagePreview) {

                    imagePreview.innerHTML = `

                        <img
                            src="${selectedImage}"
                            alt="معاينة الصورة"
                            style="
                                width:100%;
                                max-height:300px;
                                object-fit:contain;
                                margin:15px 0;
                                border-radius:15px;
                            "
                        >

                    `;

                }

            };

            reader.readAsDataURL(file);

        }
    );
}


// ========================================
// PUBLISH POST
// ========================================

const publishPostButton =
    document.getElementById(
        "publishPostBtn"
    );

if (publishPostButton) {

    publishPostButton.addEventListener(
        "click",
        () => {

            const user =
                getCurrentUser();

            if (!user) return;

            const postText =
                document.getElementById(
                    "postText"
                );

            const text =
                postText
                    ? postText.value.trim()
                    : "";

            if (!text && !selectedImage) {

                showToast(
                    "اكتب حاجة أو أضف صورة."
                );

                return;
            }

            const post = {

                id: Date.now(),

                userId: user.id,

                userName: user.name,

                text: text,

                image: selectedImage,

                likes: 0,

                comments: [],

                date:
                    new Date()
                        .toLocaleString(
                            "ar-EG"
                        )

            };

            data.posts.unshift(post);

            saveData();

            renderPosts();

            const modal =
                document.getElementById(
                    "postModal"
                );

            if (modal) {
                modal.classList.remove("show");
            }

            showToast(
                "تم نشر المنشور 💜"
            );

        }
    );
}


// ========================================
// RENDER POSTS
// ========================================

function renderPosts() {

    const container =
        document.getElementById(
            "postsContainer"
        );

    if (!container) return;

    if (!data.posts.length) {

        container.innerHTML = `

            <div class="post-card">

                <h3>
                    لسه مفيش منشورات 💜
                </h3>

                <p>
                    كن أول شخص يشارك حاجة في المجتمع.
                </p>

            </div>

        `;

        return;
    }

    container.innerHTML =
        data.posts
            .map(post => {

                const comments =
                    Array.isArray(
                        post.comments
                    )
                        ? post.comments
                        : [];

                return `

                    <article class="post-card">

                        <div class="post-header">

                            <div class="post-user">
                                👤
                                ${escapeHTML(
                                    post.userName
                                )}
                            </div>

                            <div class="post-date">
                                ${escapeHTML(
                                    post.date
                                )}
                            </div>

                        </div>

                        ${
                            post.text
                                ? `
                                    <div class="post-text">
                                        ${escapeHTML(
                                            post.text
                                        )}
                                    </div>
                                `
                                : ""
                        }

                        ${
                            post.image
                                ? `
                                    <img
                                        class="post-media"
                                        src="${post.image}"
                                        alt="صورة المنشور"
                                    >
                                `
                                : ""
                        }

                        <div class="post-actions">

                            <button
                                data-like="${post.id}"
                            >
                                ❤️ ${post.likes}
                            </button>

                            <button
                                data-comment="${post.id}"
                            >
                                💬 ${comments.length}
                            </button>

                        </div>

                        ${
                            comments.length
                                ? `
                                    <div
                                        style="
                                            margin-top:15px;
                                        "
                                    >

                                        ${
                                            comments
                                                .map(
                                                    comment => `

                                                        <div
                                                            style="
                                                                background:#faf9ff;
                                                                padding:10px;
                                                                border-radius:10px;
                                                                margin-top:7px;
                                                            "
                                                        >
                                                            💬
                                                            ${escapeHTML(
                                                                comment
                                                            )}
                                                        </div>

                                                    `
                                                )
                                                .join("")
                                        }

                                    </div>
                                `
                                : ""
                        }

                    </article>

                `;

            })
            .join("");


    // Like buttons

    container
        .querySelectorAll("[data-like]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const post =
                        data.posts.find(
                            item =>
                                item.id ==
                                button.dataset.like
                        );

                    if (!post) return;

                    post.likes++;

                    saveData();

                    renderPosts();

                }
            );

        });


    // Comment buttons

    container
        .querySelectorAll(
            "[data-comment]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const comment =
                        prompt(
                            "اكتب تعليقك:"
                        );

                    if (
                        !comment ||
                        !comment.trim()
                    ) {
                        return;
                    }

                    const post =
                        data.posts.find(
                            item =>
                                item.id ==
                                button.dataset.comment
                        );

                    if (!post) return;

                    if (
                        !Array.isArray(
                            post.comments
                        )
                    ) {
                        post.comments = [];
                    }

                    post.comments.push(
                        comment.trim()
                    );

                    saveData();

                    renderPosts();

                }
            );

        });
}


// ========================================
// CLOSE MODALS
// ========================================

document
    .querySelectorAll("[data-close]")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const modal =
                    document.getElementById(
                        button.dataset.close
                    );

                if (modal) {
                    modal.classList.remove(
                        "show"
                    );
                }

            }
        );

    });


// ========================================
// CLOSE MODAL WHEN CLICK OUTSIDE
// ========================================

document
    .querySelectorAll(".modal")
    .forEach(modal => {

        modal.addEventListener(
            "click",
            event => {

                if (
                    event.target === modal
                ) {

                    modal.classList.remove(
                        "show"
                    );

                }

            }
        );

    });


// ========================================
// LOGOUT
// ========================================

const logoutButton =
    document.getElementById(
        "logoutBtn"
    );

if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        () => {

            data.currentUser = null;

            saveData();

            app.classList.add("hidden");

            authSection.classList.remove(
                "hidden"
            );

            if (loginForm) {
                loginForm.reset();
            }

            showToast(
                "تم تسجيل الخروج."
            );

        }
    );
}


// ========================================
// ESCAPE HTML
// ========================================

function escapeHTML(value) {

    return String(value)

        .replaceAll(
            "&",
            "&amp;"
        )

        .replaceAll(
            "<",
            "&lt;"
        )

        .replaceAll(
            ">",
            "&gt;"
        )

        .replaceAll(
            '"',
            "&quot;"
        )

        .replaceAll(
            "'",
            "&#039;"
        );
}