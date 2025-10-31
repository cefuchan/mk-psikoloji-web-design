// Mobile Navigation Toggle
const navToggle = document.getElementById("nav-toggle")
const navMenu = document.getElementById("nav-menu")

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active")
  navToggle.classList.toggle("active")
})

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll(".nav-link")
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
    navToggle.classList.remove("active")
  })
})

// Active Navigation Link on Scroll
const sections = document.querySelectorAll("section[id]")

function scrollActive() {
  const scrollY = window.pageYOffset

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight
    const sectionTop = current.offsetTop - 100
    const sectionId = current.getAttribute("id")
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`)

    if (navLink) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLink.classList.add("active")
      } else {
        navLink.classList.remove("active")
      }
    }
  })
}

window.addEventListener("scroll", scrollActive)

// Header Shadow on Scroll
const header = document.getElementById("header")

function scrollHeader() {
  if (window.scrollY >= 50) {
    header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
  } else {
    header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.05)"
  }
}

window.addEventListener("scroll", scrollHeader)

// Scroll to Top Button
const scrollTop = document.getElementById("scroll-top")

function toggleScrollTop() {
  if (window.scrollY >= 400) {
    scrollTop.classList.add("visible")
  } else {
    scrollTop.classList.remove("visible")
  }
}

window.addEventListener("scroll", toggleScrollTop)

scrollTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// Contact Form Handling
const contactForm = document.getElementById("contact-form")

contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Get form data
  const formData = new FormData(contactForm)
  const data = Object.fromEntries(formData)

  // Basic validation
  if (!data.name || !data.phone) {
    alert("Lütfen zorunlu alanları doldurun.")
    return
  }

  // Phone validation (Turkish format)
  const phoneRegex = /^(05)([0-9]{2})\s?([0-9]{3})\s?([0-9]{2})\s?([0-9]{2})$/
  if (!phoneRegex.test(data.phone.replace(/\s/g, ""))) {
    alert("Lütfen geçerli bir telefon numarası girin (05XX XXX XX XX)")
    return
  }

  // Email validation if provided
  if (data.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      alert("Lütfen geçerli bir e-posta adresi girin.")
      return
    }
  }

  // Simulate form submission
  console.log("Form Data:", data)

  // Show success message
  alert("Randevu talebiniz alındı! En kısa sürede sizinle iletişime geçeceğiz.")

  // Reset form
  contactForm.reset()

  // In a real application, you would send this data to a server
  // Example:
  // fetch('/api/contact', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(data)
  // })
  // .then(response => response.json())
  // .then(result => {
  //     alert('Randevu talebiniz alındı!');
  //     contactForm.reset();
  // })
  // .catch(error => {
  //     alert('Bir hata oluştu. Lütfen tekrar deneyin.');
  // });
})

// Smooth Scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const headerHeight = header.offsetHeight
      const targetPosition = target.offsetTop - headerHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  })
})

// Intersection Observer for Fade-in Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe elements for animation
const animateElements = document.querySelectorAll(".service-card, .why-card, .info-card")
animateElements.forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(30px)"
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(el)
})

// Phone number formatting
const phoneInput = document.getElementById("phone")
if (phoneInput) {
  phoneInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "")

    if (value.length > 0) {
      if (value.length <= 4) {
        value = value
      } else if (value.length <= 7) {
        value = value.slice(0, 4) + " " + value.slice(4)
      } else if (value.length <= 9) {
        value = value.slice(0, 4) + " " + value.slice(4, 7) + " " + value.slice(7)
      } else {
        value = value.slice(0, 4) + " " + value.slice(4, 7) + " " + value.slice(7, 9) + " " + value.slice(9, 11)
      }
    }

    e.target.value = value
  })
}

// Add loading state to form button
const formButton = contactForm.querySelector('button[type="submit"]')
const originalButtonText = formButton.textContent

contactForm.addEventListener("submit", () => {
  formButton.textContent = "Gönderiliyor..."
  formButton.disabled = true

  // Re-enable after 2 seconds (simulating API call)
  setTimeout(() => {
    formButton.textContent = originalButtonText
    formButton.disabled = false
  }, 2000)
})
