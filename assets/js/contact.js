document.addEventListener("DOMContentLoaded", () => {

    const contactForm = document.getElementById("contact-form");

    if (!contactForm) return;

    contactForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const message = document.getElementById("message").value.trim();

        const whatsappMessage =
`Bonjour Univers Ceramic,

Nom : ${name}
Téléphone : ${phone}
Email : ${email}

Message :
${message}`;

        const whatsappURL =
            `https://wa.me/221768360818?text=${encodeURIComponent(whatsappMessage)}`;

        window.open(whatsappURL, "_blank");

        contactForm.reset();

    });

});