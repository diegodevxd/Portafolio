const translations = {
    es: {
        nav_about: "Acerca de",
        nav_projects: "Proyectos",
        nav_contact: "Contacto",
        hero_role: "Desarrollador & Estudiante de Ing. en Sistemas (5/12 Semestres)",
        hero_desc: "Construyendo el futuro digital. Experiencia en freelance, desarrollo web y creación de experiencias interactivas.",
        hero_cta: "INICIAR SECUENCIA_",
        about_text1: "Soy estudiante de 5to semestre (de 12) de Ingeniería en Sistemas. Apasionado por la tecnología, la estética cyberpunk y la creación de arquitecturas limpias y eficientes.",
        about_text2: "Trabajo freelance apoyando a pequeños negocios locales a digitalizarse. Creo portafolios únicos, páginas para empresas y he participado en el desarrollo algorítmico de videojuegos estilo novela visual.",
        proj_mevek_desc: "Sitio web comercial para tienda de electrónica local. Diseño adaptable y moderno para exhibición de productos tecnológicos.",
        proj_art_title: "Portafolio Artístico",
        proj_art_desc: "Portafolio estilo SO creado para un artista, simulando una interfaz de sistema operativo interactiva para visualizar sus obras.",
        proj_cherry_desc: "Sitio en desarrollo para una agencia constructora de páginas web en crecimiento, enfocada en la conversión y la estética limpia.",
        proj_game_title: "Juego Novela Visual",
        proj_game_desc: "Proyecto colaborativo para una clase de arte. Encargado de toda la programación y lógica. Arte diseñado por Demian.",
        nav_certifications: "Certificaciones",
        cert_cecati_desc: "Certificación en Mantenimiento Preventivo y Correctivo de Computadoras. Sólidos fundamentos en hardware y diagnóstico de sistemas.",
        cert_meta_desc: "Certificación en Programación en Java. Conocimientos en desarrollo estructurado, Programación Orientada a Objetos y lógica de software empresarial.",
    },
    en: {
        nav_about: "About",
        nav_projects: "Projects",
        nav_contact: "Contact",
        hero_role: "Developer & Systems Engineering Student (5/12 Semesters)",
        hero_desc: "Building the digital future. Experience in freelance, web development, and creating interactive experiences.",
        hero_cta: "INITIATE SEQUENCE_",
        about_text1: "I am a 5th-semester (out of 12) Systems Engineering student. Passionate about technology, cyberpunk aesthetics, and building clean, efficient architectures.",
        about_text2: "I work freelance helping local small businesses digitize. I create unique portfolios, company websites, and have participated in algorithmic development for visual novel games.",
        proj_mevek_desc: "Commercial website for a local electronics store. Responsive and modern design for showcasing tech products.",
        proj_art_title: "Artistic Portfolio",
        proj_art_desc: "OS-style portfolio created for an artist, simulating an interactive operating system interface to display art pieces.",
        proj_cherry_desc: "Website in development for a growing web development agency, focused on conversion and clean aesthetics.",
        proj_game_title: "Visual Novel Game",
        proj_game_desc: "Collaborative project for an art class. In charge of all programming and logic. Art designed by Demian.",
        nav_certifications: "Certifications",
        cert_cecati_desc: "Certification in Preventive and Corrective Computer Maintenance. Solid fundamentals in hardware and system diagnostics.",
        cert_meta_desc: "Certification in Java Programming. Knowledge in structured development, Object-Oriented Programming, and enterprise software logic.",
    }
};

let currentLang = 'es';

document.addEventListener('DOMContentLoaded', () => {
    const langToggleBtn = document.getElementById('lang-toggle');
    const glitchTitle = document.querySelector('h1.glitch');

    langToggleBtn.addEventListener('click', () => {
        currentLang = currentLang === 'es' ? 'en' : 'es';

        // Update regular text
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[currentLang][key]) {
                element.textContent = translations[currentLang][key];
            }
        });

        // Update main glitch title manually since it uses data-text attribute for the pseudo-elements
        const newTitle = currentLang === 'es' ? "HOLA, MUNDO //" : "HELLO, WORLD //";
        glitchTitle.textContent = newTitle;
        glitchTitle.setAttribute('data-text', newTitle);

        const profileTitle = document.querySelector('#about h2.glitch');
        const projTitle = document.querySelector('#projects h2.glitch');
        const certTitle = document.querySelector('#certifications h2.glitch');
        const contactTitle = document.querySelector('#contact h2.glitch');

        if (currentLang === 'en') {
            profileTitle.textContent = ">PROFILE_";
            profileTitle.setAttribute('data-text', ">PROFILE_");
            projTitle.textContent = ">PROJECTS_DATABASE_";
            projTitle.setAttribute('data-text', ">PROJECTS_DATABASE_");
            if (certTitle) {
                certTitle.textContent = ">CERTIFICATIONS_";
                certTitle.setAttribute('data-text', ">CERTIFICATIONS_");
            }
            contactTitle.textContent = ">ESTABLISH_CONNECTION_";
            contactTitle.setAttribute('data-text', ">ESTABLISH_CONNECTION_");
        } else {
            profileTitle.textContent = ">PERFIL_";
            profileTitle.setAttribute('data-text', ">PERFIL_");
            projTitle.textContent = ">BASE_DE_DATOS_PROYECTOS_";
            projTitle.setAttribute('data-text', ">BASE_DE_DATOS_PROYECTOS_");
            if (certTitle) {
                certTitle.textContent = ">CERTIFICACIONES_";
                certTitle.setAttribute('data-text', ">CERTIFICACIONES_");
            }
            contactTitle.textContent = ">ESTABLECER_CONEXIÓN_";
            contactTitle.setAttribute('data-text', ">ESTABLECER_CONEXIÓN_");
        }
    });
});
