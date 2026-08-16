// Gelin Home — contact form client-side validation

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const params = new URLSearchParams(window.location.search);
  const propertyId = params.get("property");
  if (propertyId) {
    const property = typeof getProperty === "function" ? getProperty(propertyId) : null;
    const messageField = form.querySelector("[name=message]");
    if (property && messageField && !messageField.value) {
      messageField.value = `Hi, I'd like to schedule a tour of ${property.title} (${property.address}, ${property.city}).`;
    }
  }

  const status = document.getElementById("form-status");

  const validators = {
    name: (v) => v.trim().length >= 2 || "Please enter your full name.",
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || "Enter a valid email address.",
    phone: (v) => v.trim() === "" || /^[\d\s()+.-]{7,}$/.test(v.trim()) || "Enter a valid phone number.",
    message: (v) => v.trim().length >= 10 || "Message should be at least 10 characters.",
  };

  function validateField(field) {
    const rule = validators[field.name];
    if (!rule) return true;
    const result = rule(field.value);
    const wrapper = field.closest(".field");
    const errorEl = wrapper.querySelector(".error-text");
    if (result === true) {
      wrapper.classList.remove("invalid");
      return true;
    }
    wrapper.classList.add("invalid");
    if (errorEl) errorEl.textContent = result;
    return false;
  }

  form.querySelectorAll("input, textarea").forEach((field) => {
    if (!validators[field.name]) return;
    field.addEventListener("blur", () => validateField(field));
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let isValid = true;
    form.querySelectorAll("input, textarea").forEach((field) => {
      if (validators[field.name] && !validateField(field)) isValid = false;
    });

    status.classList.remove("success", "error", "show");

    if (!isValid) {
      status.textContent = "Please fix the highlighted fields and try again.";
      status.classList.add("error", "show");
      return;
    }

    status.textContent = "Thanks — your message has been sent. A Gelin Home agent will be in touch within one business day.";
    status.classList.add("success", "show");
    form.reset();
  });
});
