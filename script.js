/* =========================================
   GOLD BUYER WEBSITE HEADER
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const header = document.getElementById("siteHeader");

    const menuToggle =
        document.getElementById("menuToggle");

    const mobileMenu =
        document.getElementById("mobileMenu");


    /* =========================================
       HEADER SCROLL EFFECT
    ========================================= */

    function updateHeader() {

        if (window.scrollY > 35) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    updateHeader();


    /* =========================================
       MOBILE MENU
    ========================================= */

    menuToggle.addEventListener("click", () => {

        const isOpen =
            mobileMenu.classList.toggle("open");


        menuToggle.classList.toggle(
            "active",
            isOpen
        );


        menuToggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );


    });


    /* =========================================
       CLOSE MENU WHEN LINK CLICKED
    ========================================= */

    const mobileLinks =
        mobileMenu.querySelectorAll("a");


    mobileLinks.forEach((link) => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("open");

            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });


    /* =========================================
       CLOSE MENU WHEN CLICKING OUTSIDE
    ========================================= */

    document.addEventListener("click", (event) => {

        const clickedInsideHeader =
            header.contains(event.target);


        if (!clickedInsideHeader) {

            mobileMenu.classList.remove("open");

            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });


    /* =========================================
       ESC KEY CLOSE
    ========================================= */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            mobileMenu.classList.remove("open");

            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });


    /* =========================================
       ACTIVE NAVIGATION
    ========================================= */

    const navLinks =
        document.querySelectorAll(".nav-link");


    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            navLinks.forEach((item) => {

                item.classList.remove("active");

            });

            link.classList.add("active");

        });

    });

});






// =========================================
// GOLD VALUE PURITY SELECTOR
// =========================================

const purityButtons =
    document.querySelectorAll(".purity-option");

purityButtons.forEach((button) => {

    button.addEventListener("click", () => {

        purityButtons.forEach((item) => {
            item.classList.remove("active");
        });

        button.classList.add("active");

    });

});






// =========================================
// LIVE GOLD VALUATOR
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    const weightInput =
        document.getElementById("goldWeight");

    const rateInput =
        document.getElementById("goldRate");

    const purityButtons =
        document.querySelectorAll(".purity-option");

    const estimatedValue =
        document.getElementById("estimatedValue");

    const summaryWeight =
        document.getElementById("summaryWeight");

    const summaryPurity =
        document.getElementById("summaryPurity");

    const summaryPureGold =
        document.getElementById("summaryPureGold");

    const whatsappButton =
        document.getElementById("valuationWhatsApp");


    if (
        !weightInput ||
        !rateInput ||
        !estimatedValue ||
        !whatsappButton
    ) {
        return;
    }


    let selectedPurity = 22;


    // =========================================
    // FORMAT RUPEE
    // =========================================

    function formatCurrency(value) {

        return new Intl.NumberFormat(
            "en-IN",
            {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0
            }
        ).format(value);

    }


    // =========================================
    // CALCULATE
    // =========================================

    function calculateGoldValue() {

        const weight =
            parseFloat(weightInput.value) || 0;

        const rate =
            parseFloat(rateInput.value) || 0;


        /*
         * Pure gold equivalent:
         *
         * weight × purity / 24
         */

        const pureGoldWeight =
            weight * (selectedPurity / 24);


        /*
         * Estimated value:
         *
         * pure gold weight × 24K rate
         */

        const value =
            pureGoldWeight * rate;


        // Update result

        estimatedValue.textContent =
            formatCurrency(value);


        // Update summary

        summaryWeight.textContent =
            `${weight.toFixed(2)} g`;


        summaryPurity.textContent =
            `${selectedPurity}K`;


        summaryPureGold.textContent =
            `${pureGoldWeight.toFixed(2)} g`;

    }


    // =========================================
    // WEIGHT CHANGE
    // =========================================

    weightInput.addEventListener(
        "input",
        calculateGoldValue
    );


    // =========================================
    // RATE CHANGE
    // =========================================

    rateInput.addEventListener(
        "input",
        calculateGoldValue
    );


    // =========================================
    // PURITY BUTTONS
    // =========================================

    purityButtons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                purityButtons.forEach((item) => {

                    item.classList.remove("active");

                });


                button.classList.add("active");


                selectedPurity =
                    parseFloat(
                        button.dataset.purity
                    );


                calculateGoldValue();

            }
        );

    });


    // =========================================
    // WHATSAPP
    // =========================================

    whatsappButton.addEventListener(
        "click",
        () => {

            const weight =
                parseFloat(weightInput.value) || 0;

            const rate =
                parseFloat(rateInput.value) || 0;

            const pureGoldWeight =
                weight *
                (selectedPurity / 24);

            const value =
                pureGoldWeight * rate;


            const formattedValue =
                formatCurrency(value);


            const whatsappNumber =
                "91XXXXXXXXXX";


            const message =
`Hello, I would like to know the exact value of my gold.

Approx. Weight: ${weight.toFixed(2)} g
Purity: ${selectedPurity}K
24K Rate Used: ₹${rate.toLocaleString("en-IN")} / g
Estimated Value: ${formattedValue}

I would like to get an exact valuation.`;


            const whatsappURL =
                `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;


            window.open(
                whatsappURL,
                "_blank",
                "noopener,noreferrer"
            );

        }
    );


    // Initial calculation

    calculateGoldValue();

});

















// =========================================
// FAQ ACCORDION
// =========================================

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {

    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {

        const isActive = item.classList.contains("active");

        // Close all
        faqItems.forEach((faq) => {
            faq.classList.remove("active");
        });

        // Open clicked item
        if (!isActive) {
            item.classList.add("active");
        }

    });

});



// =========================================
// GOLD ENQUIRY FORM → WHATSAPP
// =========================================

const goldForm = document.getElementById("goldForm");

if (goldForm) {

    goldForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name =
            document.getElementById("name").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const service =
            document.getElementById("service").value;

        const message =
            document.getElementById("message").value.trim();


        const serviceNames = {
            "old-gold": "Selling Old Gold",
            "gold-value": "Gold Value",
            "purity": "Gold Purity",
            "pledged-gold": "Pledged Gold",
            "other": "Other"
        };


        const whatsappMessage =
            `Hello, I would like to make a gold enquiry.

Name: ${name}
Phone: ${phone}
Enquiry: ${serviceNames[service]}
Message: ${message || "No additional message."}`;


        const whatsappNumber =
            "91XXXXXXXXXX";


        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;


        window.open(
            whatsappURL,
            "_blank",
            "noopener,noreferrer"
        );

    });

}