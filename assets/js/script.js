$(document).ready(function () {

    // ===== Navbar toggle =====
    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    // ===== On scroll and load =====
    $(window).on('scroll load', function () {
        // Reset nav toggle on scroll/load
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        // Scroll to top button toggle
        if (window.scrollY > 60) {
            $('#scroll-top').addClass('active');
        } else {
            $('#scroll-top').removeClass('active');
        }

        // Scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // ===== Smooth scrolling for anchor links =====
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear');
    });

    // ===== EmailJS integration for contact form =====
    emailjs.init("IAtSahRGiiwU60JzS"); // Your Public Key

    $("#contact-form").submit(function (event) {
        event.preventDefault();

        emailjs.sendForm('service_rcx9s9y', 'template_lgbbnjh', '#contact-form')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                $("#contact-form")[0].reset();
                alert("Form Submitted Successfully");
            }, function (error) {
                console.log('FAILED...', error);
                alert("Form Submission Failed! Try Again");
            });
    });

    // ===== Document visibility change for title and favicon =====
    document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === "visible") {
            document.title = "Portfolio | Jigar Sable";
            $("#favicon").attr("href", "assets/images/favicon.png");
        } else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "assets/images/favhand.png");
        }
    });

    // ===== Typed.js effect =====
    var typed = new Typed(".typing-text", {
        strings: ["DevOps Engineer", "Cloud Engineer", "Automation Enthusiast"],
        loop: true,
        typeSpeed: 50,
        backSpeed: 25,
        backDelay: 500,
    });

    // ===== Fetch data helper =====
    async function fetchData(type = "skills") {
        let url = type === "skills" ? "skills.json" : "./projects/projects.json";
        let response = await fetch(url);
        let data = await response.json();
        return data;
    }

    // ===== Render skills =====
    function showSkills(skills) {
        let skillsContainer = $("#skillsContainer");
        let skillHTML = "";
        skills.forEach(skill => {
            skillHTML += `
            <div class="bar">
                <div class="info">
                    <img src="${skill.icon}" alt="skill" />
                    <span>${skill.name}</span>
                </div>
            </div>`;
        });
        skillsContainer.html(skillHTML);
    }

    // ===== Render projects =====
    function showProjects(projects) {
        let projectsContainer = $("#work .box-container");
        // Filter first, then slice
        let filteredProjects = projects.filter(p => p.category !== "android").slice(0, 10);
        let projectHTML = "";
        filteredProjects.forEach(project => {
            projectHTML += `
            <div class="box tilt">
                <img draggable="false" src="/assets/images/projects/${project.image}.png" alt="project" />
                <div class="content">
                    <div class="tag">
                        <h3>${project.name}</h3>
                    </div>
                    <div class="desc">
                        <p>${project.desc}</p>
                        <div class="btns">
                            <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
                            <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
                        </div>
                    </div>
                </div>
            </div>`;
        });
        projectsContainer.html(projectHTML);

        // Initialize tilt effect once
        VanillaTilt.init(document.querySelectorAll(".tilt"), {
            max: 15,
        });

        // Scroll reveal for projects
        ScrollReveal().reveal('.work .box', { interval: 200 });
    }

    // ===== Fetch and show data =====
    fetchData("skills").then(showSkills);
    fetchData("projects").then(showProjects);

    // ===== ScrollReveal base config =====
    const srtop = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 1000,
        reset: true,
    });

    // ScrollReveal for other sections
    srtop.reveal('.home .content h3, .home .content p, .home .content .btn', { delay: 200 });
    srtop.reveal('.home .image', { delay: 400 });
    srtop.reveal('.home .linkedin', { interval: 600 });
    srtop.reveal('.home .github', { interval: 800 });
    srtop.reveal('.home .twitter', { interval: 1000 });
    srtop.reveal('.home .telegram, .home .instagram, .home .dev', { interval: 600 });

    srtop.reveal('.about .content h3, .about .content .tag, .about .content p, .about .content .box-container, .about .content .resumebtn', { delay: 200 });
    srtop.reveal('.skills .container', { interval: 200 });
    srtop.reveal('.skills .container .bar', { delay: 400 });
    srtop.reveal('.education .box', { interval: 200 });
    srtop.reveal('.experience .timeline', { delay: 400 });
    srtop.reveal('.experience .timeline .container', { interval: 400 });
    srtop.reveal('.contact .container, .contact .container .form-group', { delay: 400 });

    // ===== Disable developer tools shortcuts (basic) =====
    $(document).on('keydown', function (e) {
        if (e.keyCode === 123 || // F12
            (e.ctrlKey && e.shiftKey && ['I', 'C', 'J'].includes(String.fromCharCode(e.keyCode))) || // Ctrl+Shift+I/C/J
            (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0)) // Ctrl+U
        ) {
            e.preventDefault();
            return false;
        }
    });

    // ===== Tawk.to live chat embed =====
    (function () {
        var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
        s1.async = true;
        s1.src = 'https://embed.tawk.to/60df10bf7f4b000ac03ab6a8/1f9jlirg6';
        s1.charset = 'UTF-8';
        s1.setAttribute('crossorigin', '*');
        s0.parentNode.insertBefore(s1, s0);
    })();

});
