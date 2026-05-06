document.addEventListener("DOMContentLoaded", () => {
    const app = createEcoChicApp();
    app.init();
});

function createEcoChicApp() {
    const storageKeys = {
        contactDraft: "ecochic-contact-draft",
        newsletterState: "ecochic-newsletter-state",
        progressState: "ecochic-progress-state",
        favoriteTip: "ecochic-saved-tip",
        favoriteProducts: "ecochic-favorite-products",
        calculatorState: "ecochic-calculator-state",
        quizResult: "ecochic-style-quiz-result"
    };

    const ecoTips = [
        {
            label: "Quick Win",
            text: "Carry a reusable water bottle to cut down on single-use plastic during the week."
        },
        {
            label: "Wardrobe",
            text: "Plan one outfit around pieces you already own before buying anything new."
        },
        {
            label: "Home Energy",
            text: "Air-dry one laundry load this week to reduce energy use and protect your clothes."
        },
        {
            label: "Fabric Care",
            text: "Wash clothes in cold water when possible to lower your fashion footprint."
        }
    ];

    const productCatalog = [
        {
            id: "organic-tee",
            name: "Organic Cotton Tee",
            category: "Basics",
            material: "Organic cotton",
            price: 32,
            score: 88,
            impact: "Low water use and easier to rewear across seasons.",
            description: "A versatile staple that supports lower-impact cotton farming."
        },
        {
            id: "repair-kit",
            name: "Repair and Care Kit",
            category: "Care",
            material: "Metal tools and cotton thread",
            price: 18,
            score: 94,
            impact: "Extends the life of clothes you already own.",
            description: "A simple kit for mending buttons, hems, and small tears instead of replacing items."
        },
        {
            id: "linen-shirt",
            name: "Linen Button Shirt",
            category: "Workwear",
            material: "European flax linen",
            price: 58,
            score: 84,
            impact: "Breathable fabric with lower irrigation needs than many conventional materials.",
            description: "A polished shirt built for repeat wear, layering, and easy care."
        },
        {
            id: "recycled-tote",
            name: "Recycled Fiber Tote",
            category: "Accessories",
            material: "Recycled canvas",
            price: 24,
            score: 79,
            impact: "Helps replace disposable shopping bags.",
            description: "A durable carry-all for errands, classes, or market runs."
        },
        {
            id: "second-hand-denim",
            name: "Second-Hand Denim",
            category: "Second-Hand",
            material: "Pre-owned cotton denim",
            price: 42,
            score: 96,
            impact: "Avoids the footprint of producing new denim.",
            description: "A high-impact choice if you want durable style with lower waste."
        },
        {
            id: "capsule-dress",
            name: "Capsule Midi Dress",
            category: "Occasionwear",
            material: "Tencel blend",
            price: 64,
            score: 82,
            impact: "Designed for multiple styling options instead of one-time wear.",
            description: "A dress that can be layered, belted, or dressed down for repeat use."
        }
    ];

    const resourceLibrary = [
        {
            title: "Why Fashion Needs to Be More Sustainable",
            topic: "Fashion Systems",
            level: "Beginner",
            minutes: 6,
            url: "https://news.climate.columbia.edu/2021/06/10/why-fashion-needs-to-be-more-sustainable/",
            description: "A concise overview of the fashion industry's environmental pressure points."
        },
        {
            title: "Environmental Sustainability in the Fashion Industry",
            topic: "Materials",
            level: "Intermediate",
            minutes: 8,
            url: "https://www.genevaenvironmentnetwork.org/resources/updates/sustainable-fashion/",
            description: "A broader summary of sustainable fashion policy, supply chains, and material choices."
        },
        {
            title: "How to Build a Capsule Wardrobe",
            topic: "Personal Habits",
            level: "Beginner",
            minutes: 5,
            url: "https://www.goodhousekeeping.com/clothing/a35422818/how-to-build-capsule-wardrobe/",
            description: "A practical guide to buying less and wearing more of what you own."
        },
        {
            title: "What Makes Fabric More Sustainable?",
            topic: "Materials",
            level: "Beginner",
            minutes: 7,
            url: "https://goodonyou.eco/material-guide-how-sustainable-is-linen/",
            description: "A simple way to compare common textile choices before you shop."
        }
    ];

    function init() {
        initScrollToTop();
        initMobileMenu();
        initActiveNavigation();
        initHeroTips();
        initMissionToggle();
        initNewsletterPopup();
        initContactForm();
        initProgressTracker();
        initImpactCalculator();
        initProductExplorer();
        initResourceLibrary();
        initStyleQuiz();
        initRevealAnimations();
    }

    function query(selector, scope = document) {
        return scope.querySelector(selector);
    }

    function queryAll(selector, scope = document) {
        return Array.from(scope.querySelectorAll(selector));
    }

    function createElement(tagName, className, textContent) {
        const element = document.createElement(tagName);
        if (className) {
            element.className = className;
        }
        if (typeof textContent === "string") {
            element.textContent = textContent;
        }
        return element;
    }

    function readStoredJson(key, fallbackValue) {
        try {
            const rawValue = localStorage.getItem(key);
            return rawValue ? JSON.parse(rawValue) : fallbackValue;
        } catch (error) {
            console.warn(`Could not read localStorage key: ${key}`, error);
            return fallbackValue;
        }
    }

    function writeStoredJson(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    function initScrollToTop() {
        const scrollToTopButton = createElement("button", "scroll-to-top", "Top");
        scrollToTopButton.type = "button";
        scrollToTopButton.setAttribute("aria-label", "Scroll back to the top of the page");
        document.body.appendChild(scrollToTopButton);

        const syncVisibility = () => {
            scrollToTopButton.classList.toggle("is-visible", window.scrollY > 300);
        };

        window.addEventListener("scroll", syncVisibility);
        scrollToTopButton.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
        syncVisibility();
    }

    function initMobileMenu() {
        const menuOpenButton = query("#menu-open-button");
        const menuCloseButton = query("#menu-close-button");
        const navLinks = queryAll(".nav-menu .nav-link");

        if (!menuOpenButton || !menuCloseButton) {
            return;
        }

        const closeMenu = () => {
            document.body.classList.remove("show-mobile-menu");
        };

        menuOpenButton.addEventListener("click", () => {
            document.body.classList.add("show-mobile-menu");
        });
        menuCloseButton.addEventListener("click", closeMenu);
        navLinks.forEach((link) => link.addEventListener("click", closeMenu));

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMenu();
            }
        });
    }

    function initActiveNavigation() {
        const currentPage = window.location.pathname.split("/").pop() || "index.html";
        queryAll(".nav-link").forEach((link) => {
            if (link.getAttribute("href") === currentPage) {
                link.classList.add("is-active");
                link.setAttribute("aria-current", "page");
            }
        });
    }

    function initHeroTips() {
        const ecoTipsElement = document.getElementById("eco-tips");
        if (!ecoTipsElement) {
            return;
        }

        let currentTip = 0;
        let tipIntervalId;

        ecoTipsElement.innerHTML = `
            <div class="tip-card" data-reveal>
                <p class="tip-label"></p>
                <p class="tip-text"></p>
                <div class="tip-controls">
                    <button type="button" class="tip-button" data-tip-action="previous">Previous</button>
                    <button type="button" class="tip-button" data-tip-action="save">Save Tip</button>
                    <button type="button" class="tip-button" data-tip-action="next">Next</button>
                </div>
                <p class="tip-meta" aria-live="polite"></p>
            </div>
        `;

        const labelElement = query(".tip-label", ecoTipsElement);
        const textElement = query(".tip-text", ecoTipsElement);
        const metaElement = query(".tip-meta", ecoTipsElement);
        const previousButton = query('[data-tip-action="previous"]', ecoTipsElement);
        const nextButton = query('[data-tip-action="next"]', ecoTipsElement);
        const saveButton = query('[data-tip-action="save"]', ecoTipsElement);

        function renderTip(index) {
            const favoriteTip = localStorage.getItem(storageKeys.favoriteTip);
            const tip = ecoTips[index];
            labelElement.textContent = tip.label;
            textElement.textContent = tip.text;

            const counterText = `Tip ${index + 1} of ${ecoTips.length}`;
            metaElement.textContent = favoriteTip === tip.text
                ? `${counterText} - Saved as your favorite tip`
                : counterText;
        }

        function setTip(index) {
            currentTip = (index + ecoTips.length) % ecoTips.length;
            renderTip(currentTip);
        }

        function startRotation() {
            stopRotation();
            tipIntervalId = window.setInterval(() => {
                setTip(currentTip + 1);
            }, 7000);
        }

        function stopRotation() {
            if (tipIntervalId) {
                window.clearInterval(tipIntervalId);
            }
        }

        previousButton.addEventListener("click", () => {
            setTip(currentTip - 1);
            startRotation();
        });

        nextButton.addEventListener("click", () => {
            setTip(currentTip + 1);
            startRotation();
        });

        saveButton.addEventListener("click", () => {
            localStorage.setItem(storageKeys.favoriteTip, ecoTips[currentTip].text);
            renderTip(currentTip);
        });

        ecoTipsElement.addEventListener("mouseenter", stopRotation);
        ecoTipsElement.addEventListener("mouseleave", startRotation);

        setTip(0);
        startRotation();
    }

    function initMissionToggle() {
        const detailsContainer = query(".mission-section .p3-details");
        if (!detailsContainer) {
            return;
        }

        const toggleButton = createElement("button", "read-more-button", "Read More About Our Approach");
        toggleButton.type = "button";
        toggleButton.setAttribute("aria-expanded", "false");

        const extraContent = createElement("div", "extra-content");
        extraContent.hidden = true;
        extraContent.innerHTML = `
            <p>
                EcoChic focuses on realistic sustainability. We highlight changes people can keep up with,
                not perfection. That makes the project easier to trust, easier to use, and easier to explain.
            </p>
            <ul class="extra-content-list">
                <li>We turn environmental topics into small, practical habits.</li>
                <li>We encourage progress tracking instead of all-or-nothing goals.</li>
                <li>We combine information, motivation, and community support in one place.</li>
            </ul>
        `;

        detailsContainer.append(toggleButton, extraContent);

        toggleButton.addEventListener("click", () => {
            const isExpanded = toggleButton.getAttribute("aria-expanded") === "true";
            toggleButton.setAttribute("aria-expanded", String(!isExpanded));
            toggleButton.textContent = isExpanded ? "Read More About Our Approach" : "Show Less";
            extraContent.hidden = isExpanded;
        });
    }

    function initNewsletterPopup() {
        const newsletterState = localStorage.getItem(storageKeys.newsletterState);
        if (newsletterState === "dismissed" || newsletterState === "subscribed") {
            return;
        }

        const newsletterPopup = createElement("div", "newsletter-popup");
        newsletterPopup.innerHTML = `
            <div class="popup-content" role="dialog" aria-modal="false" aria-labelledby="newsletter-title">
                <button type="button" class="popup-close-button" id="close-popup" aria-label="Close newsletter signup">x</button>
                <h3 id="newsletter-title">Subscribe to Our Newsletter</h3>
                <p>Get one short round-up of eco-friendly ideas, practical habits, and new resources.</p>
                <form class="newsletter-form" novalidate>
                    <input type="email" id="newsletter-email" placeholder="Enter your email">
                    <button type="submit" id="sub-but">Subscribe</button>
                </form>
                <p class="newsletter-feedback" aria-live="polite"></p>
            </div>
        `;

        document.body.appendChild(newsletterPopup);

        const closeButton = query("#close-popup", newsletterPopup);
        const form = query(".newsletter-form", newsletterPopup);
        const emailInput = query("#newsletter-email", newsletterPopup);
        const feedback = query(".newsletter-feedback", newsletterPopup);

        const showPopupTimeout = window.setTimeout(() => {
            newsletterPopup.classList.add("is-visible");
        }, 2200);

        function closePopup(state) {
            window.clearTimeout(showPopupTimeout);
            if (state) {
                localStorage.setItem(storageKeys.newsletterState, state);
            }
            newsletterPopup.remove();
        }

        closeButton.addEventListener("click", () => closePopup("dismissed"));

        form.addEventListener("submit", (event) => {
            event.preventDefault();

            if (!isValidEmail(emailInput.value)) {
                feedback.textContent = "Enter a valid email address before subscribing.";
                return;
            }

            localStorage.setItem(storageKeys.newsletterState, "subscribed");
            feedback.textContent = "Thanks for subscribing. You are on the EcoChic list.";
            window.setTimeout(() => closePopup("subscribed"), 900);
        });
    }

    function initContactForm() {
        const form = document.getElementById("contact-form");
        const successMessage = document.getElementById("success-message");
        if (!form || !successMessage) {
            return;
        }

        const fields = {
            name: document.getElementById("name"),
            email: document.getElementById("email"),
            number: document.getElementById("number"),
            subject: document.getElementById("subject"),
            message: document.getElementById("message"),
            terms: document.getElementById("terms-checkbox")
        };

        const errorFields = {
            name: document.getElementById("name-error"),
            email: document.getElementById("email-error"),
            number: document.getElementById("number-error"),
            message: document.getElementById("message-error"),
            terms: document.getElementById("terms-error")
        };

        const messageCount = document.getElementById("message-count");
        const formStatus = document.getElementById("form-status");
        const submitButton = query(".submit-button", form);

        loadContactDraft(fields);
        updateMessageCount(fields.message, messageCount);

        Object.entries(fields).forEach(([key, field]) => {
            if (!field) {
                return;
            }

            const eventName = field.type === "checkbox" ? "change" : "input";
            field.addEventListener(eventName, () => {
                if (key === "message") {
                    updateMessageCount(fields.message, messageCount);
                }
                validateContactField(key, fields, errorFields);
                saveContactDraft(fields);
            });
        });

        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const fieldNames = ["name", "email", "number", "message", "terms"];
            const isFormValid = fieldNames.every((fieldName) => validateContactField(fieldName, fields, errorFields));

            if (!isFormValid) {
                formStatus.textContent = "Please fix the highlighted fields before submitting.";
                return;
            }

            formStatus.textContent = "Sending your message...";
            submitButton.disabled = true;
            submitButton.textContent = "Sending...";

            window.setTimeout(() => {
                const firstName = fields.name.value.trim().split(" ")[0];
                successMessage.textContent = `Thanks, ${firstName || "friend"}! Your ${fields.subject.value.toLowerCase()} message has been received.`;
                successMessage.classList.add("is-visible");
                form.reset();
                clearFieldErrors(errorFields);
                formStatus.textContent = "You can send another message whenever you are ready.";
                updateMessageCount(fields.message, messageCount);
                localStorage.removeItem(storageKeys.contactDraft);
                submitButton.disabled = false;
                submitButton.textContent = "Submit";
            }, 700);
        });
    }

    function loadContactDraft(fields) {
        const draft = readStoredJson(storageKeys.contactDraft, null);
        if (!draft) {
            return;
        }

        Object.entries(draft).forEach(([key, value]) => {
            if (!fields[key]) {
                return;
            }

            if (fields[key].type === "checkbox") {
                fields[key].checked = Boolean(value);
            } else {
                fields[key].value = value;
            }
        });
    }

    function saveContactDraft(fields) {
        writeStoredJson(storageKeys.contactDraft, {
            name: fields.name.value.trim(),
            email: fields.email.value.trim(),
            number: fields.number.value.trim(),
            subject: fields.subject.value,
            message: fields.message.value.trim(),
            terms: fields.terms.checked
        });
    }

    function validateContactField(fieldName, fields, errorFields) {
        const field = fields[fieldName];
        const errorElement = errorFields[fieldName];
        if (!field || !errorElement) {
            return true;
        }

        let message = "";

        switch (fieldName) {
            case "name":
                if (field.value.trim().length < 2) {
                    message = "Please enter your full name.";
                }
                break;
            case "email":
                if (!isValidEmail(field.value)) {
                    message = "Please enter a valid email address.";
                }
                break;
            case "number":
                if (field.value.trim() && !/^[\d\s()+-]{10,}$/.test(field.value.trim())) {
                    message = "Please enter a valid phone number or leave it blank.";
                }
                break;
            case "message":
                if (field.value.trim().length < 20) {
                    message = "Your message should be at least 20 characters long.";
                }
                break;
            case "terms":
                if (!field.checked) {
                    message = "Please agree to the terms before submitting.";
                }
                break;
            default:
                break;
        }

        errorElement.textContent = message;
        field.classList.toggle("input-error", Boolean(message) && field.type !== "checkbox");
        return message === "";
    }

    function clearFieldErrors(errorFields) {
        Object.values(errorFields).forEach((field) => {
            if (field) {
                field.textContent = "";
            }
        });

        queryAll(".input-error").forEach((field) => {
            field.classList.remove("input-error");
        });
    }

    function updateMessageCount(messageField, counterElement) {
        if (!messageField || !counterElement) {
            return;
        }

        counterElement.textContent = `${messageField.value.trim().length}/300 characters`;
    }

    function initProgressTracker() {
        const progressSection = document.getElementById("progress-tracker");
        if (!progressSection) {
            return;
        }

        const checklist = queryAll(".progress-checklist input[type='checkbox']", progressSection);
        const completedCount = document.getElementById("completed-count");
        const completionMessage = document.getElementById("completion-message");
        const progressBar = document.getElementById("progress-bar-fill");
        const notesField = document.getElementById("progress-notes");
        const resetButton = document.getElementById("reset-progress");

        loadProgressState(checklist, notesField);
        updateProgressSummary(checklist, completedCount, completionMessage, progressBar);

        checklist.forEach((item) => {
            item.addEventListener("change", () => {
                saveProgressState(checklist, notesField);
                updateProgressSummary(checklist, completedCount, completionMessage, progressBar);
            });
        });

        if (notesField) {
            notesField.addEventListener("input", () => saveProgressState(checklist, notesField));
        }

        if (resetButton) {
            resetButton.addEventListener("click", () => {
                checklist.forEach((item) => {
                    item.checked = false;
                });
                if (notesField) {
                    notesField.value = "";
                }
                localStorage.removeItem(storageKeys.progressState);
                updateProgressSummary(checklist, completedCount, completionMessage, progressBar);
            });
        }
    }

    function loadProgressState(checklist, notesField) {
        const savedState = readStoredJson(storageKeys.progressState, null);
        if (!savedState) {
            return;
        }

        checklist.forEach((item) => {
            item.checked = Boolean(savedState.completed?.includes(item.value));
        });

        if (notesField) {
            notesField.value = savedState.notes || "";
        }
    }

    function saveProgressState(checklist, notesField) {
        writeStoredJson(storageKeys.progressState, {
            completed: checklist.filter((item) => item.checked).map((item) => item.value),
            notes: notesField ? notesField.value.trim() : ""
        });
    }

    function updateProgressSummary(checklist, countElement, messageElement, progressBar) {
        const completed = checklist.filter((item) => item.checked).length;
        const total = checklist.length;
        const percentage = total ? Math.round((completed / total) * 100) : 0;

        if (countElement) {
            countElement.textContent = `${completed}/${total}`;
        }
        if (progressBar) {
            progressBar.style.width = `${percentage}%`;
        }
        if (messageElement) {
            if (percentage === 0) {
                messageElement.textContent = "Start with one action today. Small wins still count.";
            } else if (percentage < 50) {
                messageElement.textContent = "You are building momentum. Keep stacking practical habits.";
            } else if (percentage < 100) {
                messageElement.textContent = "Strong progress. You are turning good intentions into a routine.";
            } else {
                messageElement.textContent = "Excellent work. You completed every action in this tracker.";
            }
        }
    }

    function initImpactCalculator() {
        const calculatorForm = document.getElementById("impact-calculator-form");
        if (!calculatorForm) {
            return;
        }

        const resultCard = document.getElementById("calculator-result");
        const scoreElement = document.getElementById("calculator-score");
        const summaryElement = document.getElementById("calculator-summary");
        const adviceList = document.getElementById("calculator-advice");
        const savedState = readStoredJson(storageKeys.calculatorState, null);

        if (savedState) {
            Object.entries(savedState).forEach(([key, value]) => {
                const field = calculatorForm.elements.namedItem(key);
                if (field) {
                    field.value = value;
                }
            });
            renderCalculatorResult(savedState);
        }

        calculatorForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const state = {
                newItems: Number(calculatorForm.newItems.value),
                secondHandItems: Number(calculatorForm.secondHandItems.value),
                laundryMode: calculatorForm.laundryMode.value,
                repairs: Number(calculatorForm.repairs.value)
            };

            writeStoredJson(storageKeys.calculatorState, state);
            renderCalculatorResult(state);
        });

        function renderCalculatorResult(state) {
            const score = calculateSustainabilityScore(state);
            const advice = buildCalculatorAdvice(state);

            resultCard.classList.add("is-visible");
            scoreElement.textContent = `${score}/100`;
            summaryElement.textContent = getCalculatorSummary(score);
            adviceList.innerHTML = advice.map((item) => `<li>${item}</li>`).join("");
        }
    }

    function calculateSustainabilityScore(state) {
        let score = 60;
        score -= state.newItems * 6;
        score += state.secondHandItems * 7;
        score += state.repairs * 5;

        if (state.laundryMode === "cold") {
            score += 10;
        } else if (state.laundryMode === "mixed") {
            score += 4;
        } else {
            score -= 6;
        }

        return Math.max(10, Math.min(100, score));
    }

    function buildCalculatorAdvice(state) {
        const advice = [];

        // These suggestions are intentionally derived from the user's inputs
        // so the calculator feels practical instead of generic.
        if (state.newItems > 3) {
            advice.push("Try a one-in, one-out rule before adding more new pieces this month.");
        }
        if (state.secondHandItems === 0) {
            advice.push("Consider one second-hand or clothing-swap purchase to lower your fashion footprint.");
        }
        if (state.repairs < 1) {
            advice.push("Repairing or tailoring one item can extend its lifespan by months or even years.");
        }
        if (state.laundryMode === "hot") {
            advice.push("Switching more loads to cold water is one of the easiest low-effort improvements.");
        }
        if (!advice.length) {
            advice.push("You already have strong habits. Focus on wearing favorite pieces longer and shopping less often.");
        }

        return advice;
    }

    function getCalculatorSummary(score) {
        if (score < 45) {
            return "Your current routine has room for improvement, but a few practical changes would raise your score quickly.";
        }
        if (score < 75) {
            return "You already have a solid foundation. Small upgrades in shopping and garment care can move you much further.";
        }
        return "Your routine is tracking well. You are combining lower-impact shopping habits with better clothing care.";
    }

    function initProductExplorer() {
        const explorer = document.getElementById("product-explorer");
        if (!explorer) {
            return;
        }

        const searchInput = document.getElementById("product-search");
        const categorySelect = document.getElementById("product-category");
        const sortSelect = document.getElementById("product-sort");
        const favoritesToggle = document.getElementById("favorites-only");
        const resultsCount = document.getElementById("product-results-count");
        const grid = document.getElementById("product-grid");
        const favoriteIds = new Set(readStoredJson(storageKeys.favoriteProducts, []));

        const categories = [...new Set(productCatalog.map((product) => product.category))];
        categorySelect.innerHTML += categories
            .map((category) => `<option value="${category}">${category}</option>`)
            .join("");

        function saveFavorites() {
            writeStoredJson(storageKeys.favoriteProducts, [...favoriteIds]);
        }

        function getFilteredProducts() {
            let products = [...productCatalog];
            const queryValue = searchInput.value.trim().toLowerCase();

            if (queryValue) {
                products = products.filter((product) => {
                    return [
                        product.name,
                        product.category,
                        product.material,
                        product.description
                    ].some((field) => field.toLowerCase().includes(queryValue));
                });
            }

            if (categorySelect.value !== "all") {
                products = products.filter((product) => product.category === categorySelect.value);
            }

            if (favoritesToggle.checked) {
                products = products.filter((product) => favoriteIds.has(product.id));
            }

            products.sort((first, second) => {
                switch (sortSelect.value) {
                    case "name-asc":
                        return first.name.localeCompare(second.name);
                    case "price-asc":
                        return first.price - second.price;
                    case "price-desc":
                        return second.price - first.price;
                    case "score-desc":
                    default:
                        return second.score - first.score;
                }
            });

            return products;
        }

        function renderProducts() {
            const products = getFilteredProducts();
            resultsCount.textContent = `${products.length} item${products.length === 1 ? "" : "s"} shown`;

            if (!products.length) {
                grid.innerHTML = `<div class="empty-state">No products matched this search. Try a different category or clear favorites-only mode.</div>`;
                return;
            }

            grid.innerHTML = products.map((product) => {
                const isFavorite = favoriteIds.has(product.id);
                return `
                    <article class="product-card">
                        <div class="product-card-top">
                            <div>
                                <p class="mini-label">${product.category}</p>
                                <h3>${product.name}</h3>
                            </div>
                            <button type="button" class="favorite-button ${isFavorite ? "is-favorite" : ""}" data-favorite-id="${product.id}">
                                ${isFavorite ? "Saved" : "Save"}
                            </button>
                        </div>
                        <p class="product-description">${product.description}</p>
                        <div class="product-meta">
                            <span>Material: ${product.material}</span>
                            <span>Price: $${product.price}</span>
                        </div>
                        <p class="product-impact">${product.impact}</p>
                        <p class="product-score">Eco score: ${product.score}/100</p>
                    </article>
                `;
            }).join("");
        }

        explorer.addEventListener("click", (event) => {
            const button = event.target.closest("[data-favorite-id]");
            if (!button) {
                return;
            }

            const productId = button.getAttribute("data-favorite-id");
            if (favoriteIds.has(productId)) {
                favoriteIds.delete(productId);
            } else {
                favoriteIds.add(productId);
            }

            saveFavorites();
            renderProducts();
        });

        [searchInput, categorySelect, sortSelect, favoritesToggle].forEach((field) => {
            field.addEventListener("input", renderProducts);
            field.addEventListener("change", renderProducts);
        });

        renderProducts();
    }

    function initResourceLibrary() {
        const library = document.getElementById("resource-library");
        if (!library) {
            return;
        }

        const searchInput = document.getElementById("resource-search");
        const topicSelect = document.getElementById("resource-topic");
        const sortSelect = document.getElementById("resource-sort");
        const grid = document.getElementById("resource-grid");

        const topics = [...new Set(resourceLibrary.map((resource) => resource.topic))];
        topicSelect.innerHTML += topics
            .map((topic) => `<option value="${topic}">${topic}</option>`)
            .join("");

        function getVisibleResources() {
            let resources = [...resourceLibrary];
            const queryValue = searchInput.value.trim().toLowerCase();

            if (queryValue) {
                resources = resources.filter((resource) => {
                    return [
                        resource.title,
                        resource.topic,
                        resource.level,
                        resource.description
                    ].some((field) => field.toLowerCase().includes(queryValue));
                });
            }

            if (topicSelect.value !== "all") {
                resources = resources.filter((resource) => resource.topic === topicSelect.value);
            }

            resources.sort((first, second) => {
                switch (sortSelect.value) {
                    case "time-asc":
                        return first.minutes - second.minutes;
                    case "title-asc":
                    default:
                        return first.title.localeCompare(second.title);
                }
            });

            return resources;
        }

        function renderResources() {
            const resources = getVisibleResources();

            if (!resources.length) {
                grid.innerHTML = `<div class="empty-state">No resources matched your current search.</div>`;
                return;
            }

            grid.innerHTML = resources.map((resource) => `
                <article class="resource-card">
                    <p class="mini-label">${resource.topic}</p>
                    <h3>${resource.title}</h3>
                    <p>${resource.description}</p>
                    <div class="resource-meta">
                        <span>${resource.level}</span>
                        <span>${resource.minutes} min read</span>
                    </div>
                    <a href="${resource.url}" target="_blank" rel="noopener noreferrer" class="resource-link">Read resource</a>
                </article>
            `).join("");
        }

        [searchInput, topicSelect, sortSelect].forEach((field) => {
            field.addEventListener("input", renderResources);
            field.addEventListener("change", renderResources);
        });

        renderResources();
    }

    function initStyleQuiz() {
        const quizForm = document.getElementById("style-quiz-form");
        if (!quizForm) {
            return;
        }

        const resultCard = document.getElementById("quiz-result");
        const titleElement = document.getElementById("quiz-result-title");
        const textElement = document.getElementById("quiz-result-text");
        const listElement = document.getElementById("quiz-result-list");
        const savedResult = readStoredJson(storageKeys.quizResult, null);

        if (savedResult) {
            renderQuizResult(savedResult);
        }

        quizForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const answers = {
                shoppingGoal: quizForm.shoppingGoal.value,
                budget: quizForm.budget.value,
                priority: quizForm.priority.value,
                careHabit: quizForm.careHabit.value
            };

            const recommendation = getStyleRecommendation(answers);
            writeStoredJson(storageKeys.quizResult, recommendation);
            renderQuizResult(recommendation);
        });

        function renderQuizResult(recommendation) {
            resultCard.classList.add("is-visible");
            titleElement.textContent = recommendation.title;
            textElement.textContent = recommendation.summary;
            listElement.innerHTML = recommendation.steps.map((step) => `<li>${step}</li>`).join("");
        }
    }

    function getStyleRecommendation(answers) {
        if (answers.shoppingGoal === "replace-less" || answers.priority === "waste") {
            return {
                title: "Recommendation: Build a Repeat-Wear Wardrobe",
                summary: "You will likely get the most value from versatile basics, repair habits, and slower shopping decisions.",
                steps: [
                    "Start with a small capsule of pieces that work across school, work, and casual settings.",
                    "Choose second-hand or organic cotton basics before trend-led purchases.",
                    "Set a 48-hour pause before each new fashion purchase."
                ]
            };
        }

        if (answers.budget === "tight" || answers.shoppingGoal === "refresh") {
            return {
                title: "Recommendation: Try Second-Hand First",
                summary: "A thrift-first strategy matches your budget while still letting you refresh your style.",
                steps: [
                    "Look for high-quality denim, outerwear, and bags second-hand before shopping new.",
                    "Set a shortlist so you only buy items that fill a real wardrobe gap.",
                    "Use tailoring or small repairs to improve second-hand finds."
                ]
            };
        }

        return {
            title: "Recommendation: Invest in Fewer, Better Pieces",
            summary: "You are a strong fit for thoughtful investment items that last longer and work hard in your wardrobe.",
            steps: [
                "Prioritize durable fabrics like linen, organic cotton, and well-made recycled blends.",
                "Choose one new item only if it can be worn in at least three different outfits.",
                "Keep your score high by washing gently and repairing early."
            ]
        };
    }

    function initRevealAnimations() {
        const revealElements = queryAll("[data-reveal]");
        if (!revealElements.length || !("IntersectionObserver" in window)) {
            revealElements.forEach((element) => element.classList.add("is-visible"));
            return;
        }

        const observer = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observerInstance.unobserve(entry.target);
                }
            });
        }, { threshold: 0.18 });

        revealElements.forEach((element) => observer.observe(element));
    }

    function isValidEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
    }

    return { init };
}
