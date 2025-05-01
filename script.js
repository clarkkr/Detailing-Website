document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.getElementById("mainNavbar");
    let lastScrollTop = window.scrollY;
    let scrollThreshold = 100; // Adjust this value as needed
  
    window.addEventListener("scroll", function () {
      const currentScroll = window.scrollY;
  
      if (Math.abs(currentScroll - lastScrollTop) > scrollThreshold) {
        if (currentScroll > lastScrollTop) {
          // Scrolling down beyond threshold
          navbar.style.top = "-100px";
        } else {
          // Scrolling up beyond threshold
          navbar.style.top = "0";
        }
        lastScrollTop = currentScroll;
      }
    });
  });
  