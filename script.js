
        // Sistema de ventanas
        let activeWindows = [];
        let zIndexCounter = 100;
        let maximizedWindows = new Set();

        // Terminal commands
        const terminalCommands = {
            help: 'Comandos disponibles:\n- about: Información personal\n- projects: Lista proyectos\n- skills: Habilidades técnicas\n- contact: Información de contacto\n- clear: Limpiar terminal\n- neofetch: Info del sistema\n- ls: Listar archivos\n- whoami: Usuario actual\n- date: Fecha y hora actual\n- pwd: Directorio actual\n- github: Enlace a GitHub',
            about: 'Diego - 19 años\nEstudiante de Ingeniería en Sistemas\nDesarrollador Full Stack especializado en Web3 y criptomonedas\nApasionado por la IA y nuevas tecnologías',
            projects: 'Proyectos realizados:\n1. Cafetería Torogoz (León, GTO)\n2. Portafolios SmartFit (x2)\n3. Tienda Tecnológica\n4. Página Estructura de Datos\n\nEn desarrollo:\n- Tokens en Rust\n- Red Social Mexicana 🇲🇽',
            skills: 'Lenguajes:\n- Rust, Java, C#, C\n- HTML, CSS, JavaScript\n\nHerramientas:\n- Visual Studio, Cursor, NetBeans\n- Mantenimiento de Hardware\n\nCertificaciones:\n- Java (Metaphorce)\n- Mantenimiento Preventivo/Correctivo PC',
            contact: 'Contacto:\n📧 Email: diegomancera.dev@gmail.com\n💬 WhatsApp: 5645049448\n🐙 GitHub: https://github.com/diegodevxd',
            github: 'GitHub: https://github.com/diegodevxd\n¡Visita mi perfil para ver todos mis proyectos!',
            clear: 'CLEAR',
            neofetch: `     /\\         diego@diegoportfolio
    /  \\        ----------------
   /\\   \\       OS: DiegoOS Portfolio v1.0
  /  \\  /\\      Kernel: Linux 6.1.0-arch
 /    \\/  \\     Tiempo activo: 2 horas, 15 mins
/\\        /\\    Paquetes: 1337 (pacman)
\\/        \\/    Shell: bash 5.1.16
                DE: Portfolio Personalizado
                Lenguajes: Rust, Java, C#, C, JS
                Especialidad: Web3 & Blockchain
                Memoria: 2048MiB / 32768MiB`,
            ls: 'about.txt  projects/  skills.md  contact.info  portfolio.html  README.md  rust_tokens/  social_mx/',
            whoami: 'diego - Ingeniero en Sistemas & Full Stack Developer',
            date: new Date().toLocaleString('es-ES'),
            pwd: '/home/diego/portfolio'
        };

        // Función para abrir ventanas
        function openWindow(windowId) {
            const window = document.getElementById(windowId);
            if (!window) return;

            window.style.display = 'block';
            window.classList.add('active');
            window.style.zIndex = ++zIndexCounter;

            if (!activeWindows.includes(windowId)) {
                activeWindows.push(windowId);
                updateTaskbar();
            }

            // Hacer draggable
            makeWindowDraggable(window);
        }

        // Función para cerrar ventanas
        function closeWindow(windowId) {
            const window = document.getElementById(windowId);
            if (!window) return;

            window.style.display = 'none';
            window.classList.remove('active');
            
            const index = activeWindows.indexOf(windowId);
            if (index > -1) {
                activeWindows.splice(index, 1);
                updateTaskbar();
            }
        }

        // Función para minimizar ventanas
        function minimizeWindow(windowId) {
            const window = document.getElementById(windowId);
            if (!window) return;

            window.classList.add('minimized');
            updateTaskbar();
        }

        // Función para maximizar ventanas
        function maximizeWindow(windowId) {
            const window = document.getElementById(windowId);
            if (!window) return;

            if (maximizedWindows.has(windowId)) {
                // Restaurar
                window.style.width = '';
                window.style.height = '';
                window.style.top = '';
                window.style.left = '';
                maximizedWindows.delete(windowId);
            } else {
                // Maximizar
                window.style.width = 'calc(100vw - 40px)';
                window.style.height = 'calc(100vh - 90px)';
                window.style.top = '20px';
                window.style.left = '20px';
                maximizedWindows.add(windowId);
            }
        }

        // Función para hacer ventanas draggables
        function makeWindowDraggable(windowElement) {
            const header = windowElement.querySelector('.window-header');
            let isDragging = false;
            let currentX;
            let currentY;
            let initialX;
            let initialY;
            let xOffset = 0;
            let yOffset = 0;

            header.addEventListener('mousedown', dragStart);
            document.addEventListener('mousemove', drag);
            document.addEventListener('mouseup', dragEnd);

            function dragStart(e) {
                initialX = e.clientX - xOffset;
                initialY = e.clientY - yOffset;

                if (e.target === header || header.contains(e.target)) {
                    isDragging = true;
                }
            }

            function drag(e) {
                if (isDragging) {
                    e.preventDefault();
                    currentX = e.clientX - initialX;
                    currentY = e.clientY - initialY;

                    xOffset = currentX;
                    yOffset = currentY;

                    windowElement.style.transform = `translate(${currentX}px, ${currentY}px)`;
                }
            }

            function dragEnd(e) {
                initialX = currentX;
                initialY = currentY;
                isDragging = false;
            }
        }

        // Función para actualizar la barra de tareas
        function updateTaskbar() {
            const taskbarApps = document.getElementById('taskbar-apps');
            taskbarApps.innerHTML = '';

            activeWindows.forEach(windowId => {
                const window = document.getElementById(windowId);
                const title = window.querySelector('.window-title').textContent;
                const isMinimized = window.classList.contains('minimized');

                const taskbarApp = document.createElement('div');
                taskbarApp.className = `taskbar-app ${isMinimized ? '' : 'active'}`;
                taskbarApp.innerHTML = `
                    <span class="taskbar-app-icon">${getWindowIcon(windowId)}</span>
                    <span class="taskbar-app-title">${title}</span>
                `;
                
                taskbarApp.addEventListener('click', () => {
                    if (isMinimized) {
                        window.classList.remove('minimized');
                        window.style.zIndex = ++zIndexCounter;
                    } else {
                        window.classList.add('minimized');
                    }
                    updateTaskbar();
                });

                taskbarApps.appendChild(taskbarApp);
            });
        }

        // Función para obtener el icono de la ventana
        function getWindowIcon(windowId) {
            const icons = {
                'about-window': '📋',
                'projects-window': '🛠️',
                'future-window': '🚀',
                'terminal-window': '💻',
                'chat-window': '🤖',
                'testimonials-window': '⭐',
                'cv-window': '📄',
                'contact-window': '📞'
            };
            return icons[windowId] || '🪟';
        }

        // Función para toggle del menú de inicio
        function toggleStartMenu() {
            const startMenu = document.getElementById('start-menu');
            startMenu.classList.toggle('active');
        }

        // Cerrar menú de inicio al hacer clic fuera
        document.addEventListener('click', (e) => {
            const startMenu = document.getElementById('start-menu');
            const archLogo = document.querySelector('.taskbar div');
            
            if (!startMenu.contains(e.target) && !archLogo.contains(e.target)) {
                startMenu.classList.remove('active');
            }
        });

        // Terminal functionality
        document.getElementById('terminal-input').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const command = this.value.trim().toLowerCase();
                const terminal = document.getElementById('terminal');
                
                // Mostrar el comando ingresado
                const commandLine = document.createElement('div');
                commandLine.className = 'terminal-line';
                commandLine.innerHTML = `<span class="prompt">[diego@portfolio ~]$ </span>${command}`;
                terminal.insertBefore(commandLine, terminal.lastElementChild);
                
                // Procesar el comando
                const output = document.createElement('div');
                output.className = 'terminal-line';
                
                if (command === 'clear') {
                    // Limpiar terminal
                    const lines = terminal.querySelectorAll('.terminal-line');
                    lines.forEach((line, index) => {
                        if (index < lines.length - 1) {
                            line.remove();
                        }
                    });
                } else if (terminalCommands[command]) {
                    output.textContent = terminalCommands[command];
                    terminal.insertBefore(output, terminal.lastElementChild);
                } else if (command) {
                    output.textContent = `bash: ${command}: command not found`;
                    terminal.insertBefore(output, terminal.lastElementChild);
                }
                
                // Limpiar input
                this.value = '';
                
                // Scroll al final
                terminal.scrollTop = terminal.scrollHeight;
            }
        });

        // Actualizar reloj
        function updateTime() {
            const now = new Date();
            const timeString = now.toLocaleTimeString('es-ES', { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
            document.getElementById('current-time').textContent = timeString;
        }

        // AI Chat functionality
        const aiResponses = {
            'hola': '¡Hola! 👋 Soy el asistente IA de Diego. ¿En qué puedo ayudarte?',
            'proyectos': 'Diego ha trabajado en varios proyectos: Cafetería Torogoz, portafolios para SmartFit, y páginas para artistas. ¡Todos con excelentes resultados! 🚀',
            'tecnologias': 'Diego domina Rust 🦀, Java ☕, C# 🔷, C ⚡, y tecnologías web como HTML/CSS/JS. También tiene experiencia en Web3 y blockchain.',
            'precios': 'Los precios van desde $800 MXN para páginas básicas hasta $3,500 MXN para proyectos premium. ¡Hay descuentos para estudiantes! 💰',
            'contacto': 'Puedes contactar a Diego por:\n📧 Email: diegomancera.dev@gmail.com\n💬 WhatsApp: 5645049448\n🐙 GitHub: CryptoCapi',
            'experiencia': 'Diego tiene experiencia como desarrollador web freelance desde 2023, y también como técnico en mantenimiento de hardware. Está estudiando Ingeniería en Sistemas.',
            'web3': 'Diego está muy interesado en Web3 y blockchain. Actualmente desarrolla tokens en Rust y explora aplicaciones descentralizadas. 🌐',
            'rust': 'Rust es uno de los lenguajes favoritos de Diego. Lo usa para desarrollo de tokens de criptomonedas y proyectos blockchain. ¡Es el futuro! 🦀',
            'cv': 'Puedes ver el CV completo de Diego haciendo clic en el icono "Mi CV" del escritorio, o descargarlo directamente desde Google Drive. 📄',
            'testimonios': 'Los clientes de Diego están muy satisfechos: Alejandra, Luis Macías, Demian y Lilian han dado testimonios de 5 estrellas. ⭐',
            'default': 'Interesante pregunta. Te recomiendo contactar directamente a Diego para obtener información más específica. Él responde rápido por WhatsApp o email. 😊'
        };

        document.getElementById('chat-input').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const message = this.value.trim();
                if (!message) return;

                const chatMessages = document.getElementById('chat-messages');
                
                // Agregar mensaje del usuario
                const userMessage = document.createElement('div');
                userMessage.className = 'message user-message';
                userMessage.textContent = message;
                chatMessages.appendChild(userMessage);
                
                // Generar respuesta del bot
                setTimeout(() => {
                    const botMessage = document.createElement('div');
                    botMessage.className = 'message bot-message';
                    
                    const lowerMessage = message.toLowerCase();
                    let response = aiResponses.default;
                    
                    for (const [key, value] of Object.entries(aiResponses)) {
                        if (lowerMessage.includes(key)) {
                            response = value;
                            break;
                        }
                    }
                    
                    botMessage.textContent = response;
                    chatMessages.appendChild(botMessage);
                    
                    // Scroll al final
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }, 1000);
                
                // Limpiar input
                this.value = '';
                
                // Scroll al final
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
        });

        // Mobile Functions
        function showMobileContent(contentId) {
            // Ocultar navegación móvil
            document.getElementById('mobile-nav').style.display = 'none';
            
            // Ocultar todos los contenidos móviles
            const contents = document.querySelectorAll('.mobile-content');
            contents.forEach(content => content.classList.remove('active'));
            
            // Mostrar el contenido seleccionado
            document.getElementById(contentId).classList.add('active');
        }

        function showMobileNav() {
            // Mostrar navegación móvil
            document.getElementById('mobile-nav').style.display = 'grid';
            
            // Ocultar todos los contenidos móviles
            const contents = document.querySelectorAll('.mobile-content');
            contents.forEach(content => content.classList.remove('active'));
        }

        // Mobile Terminal functionality
        document.addEventListener('DOMContentLoaded', function() {
            const mobileTerminalInput = document.getElementById('mobile-terminal-input');
            if (mobileTerminalInput) {
                mobileTerminalInput.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        const command = this.value.trim().toLowerCase();
                        const terminal = document.getElementById('mobile-terminal-content');
                        
                        // Mostrar el comando ingresado
                        const commandLine = document.createElement('div');
                        commandLine.className = 'terminal-line';
                        commandLine.innerHTML = `<span class="prompt">[diego@portfolio ~]$ </span>${command}`;
                        terminal.insertBefore(commandLine, terminal.lastElementChild);
                        
                        // Procesar el comando
                        const output = document.createElement('div');
                        output.className = 'terminal-line';
                        
                        if (command === 'clear') {
                            // Limpiar terminal
                            const lines = terminal.querySelectorAll('.terminal-line');
                            lines.forEach((line, index) => {
                                if (index < lines.length - 1) {
                                    line.remove();
                                }
                            });
                        } else if (terminalCommands[command]) {
                            output.textContent = terminalCommands[command];
                            terminal.insertBefore(output, terminal.lastElementChild);
                        } else if (command) {
                            output.textContent = `bash: ${command}: command not found`;
                            terminal.insertBefore(output, terminal.lastElementChild);
                        }
                        
                        // Limpiar input
                        this.value = '';
                        
                        // Scroll al final
                        terminal.scrollTop = terminal.scrollHeight;
                    }
                });
            }
        });

        // Mobile Chat functionality
        document.addEventListener('DOMContentLoaded', function() {
            const mobileChatInput = document.getElementById('mobile-chat-input');
            if (mobileChatInput) {
                mobileChatInput.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        const message = this.value.trim();
                        if (!message) return;

                        const chatMessages = document.getElementById('mobile-chat-messages');
                        
                        // Agregar mensaje del usuario
                        const userMessage = document.createElement('div');
                        userMessage.className = 'message user-message';
                        userMessage.textContent = message;
                        chatMessages.appendChild(userMessage);
                        
                        // Generar respuesta del bot
                        setTimeout(() => {
                            const botMessage = document.createElement('div');
                            botMessage.className = 'message bot-message';
                            
                            const lowerMessage = message.toLowerCase();
                            let response = aiResponses.default;
                            
                            for (const [key, value] of Object.entries(aiResponses)) {
                                if (lowerMessage.includes(key)) {
                                    response = value;
                                    break;
                                }
                            }
                            
                            botMessage.textContent = response;
                            chatMessages.appendChild(botMessage);
                            
                            // Scroll al final
                            chatMessages.scrollTop = chatMessages.scrollHeight;
                        }, 1000);
                        
                        // Limpiar input
                        this.value = '';
                        
                        // Scroll al final
                        chatMessages.scrollTop = chatMessages.scrollHeight;
                    }
                });
            }
        });

        // Inicializar
        document.addEventListener('DOMContentLoaded', function() {
            updateTime();
            setInterval(updateTime, 1000);
            
            // Abrir ventana de bienvenida automáticamente solo en desktop
            if (window.innerWidth > 768) {
                setTimeout(() => {
                    openWindow('about-window');
                }, 1000);
            }
        });

    
