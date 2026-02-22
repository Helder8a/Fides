(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Fixed Navbar
    $(window).scroll(function () {
        if ($(window).width() < 992) {
            if ($(this).scrollTop() > 45) {
                $('.fixed-top').addClass('bg-dark shadow');
            } else {
                $('.fixed-top').removeClass('bg-dark shadow');
            }
        } else {
            if ($(this).scrollTop() > 45) {
                $('.fixed-top').addClass('bg-dark shadow').css('top', -45);
            } else {
                $('.fixed-top').removeClass('bg-dark shadow').css('top', 0);
            }
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Causes progress
    $('.causes-progress').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: false,
        smartSpeed: 1000,
        center: true,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            }
        }
    });

    $(document).ready(function () {
    // Lógica del Chatbot
    $('#ai-chat-toggle').click(function() {
        $('#ai-chat-box').fadeToggle();
    });

    $('#close-chat').click(function() {
        $('#ai-chat-box').fadeOut();
    });

    // Simulación de respuesta de IA (Aquí conectarás tu API)
    $('#ai-input').keypress(function (e) {
        if (e.which == 13) {
            let userMsg = $(this).val();
            $('#chat-body').append(`<p class="text-end small"><b>Tú:</b> ${userMsg}</p>`);
            $(this).val('');
            
            setTimeout(() => {
                $('#chat-body').append(`<p class="text-start small text-primary"><b>IA:</b> Consultando proyectos de FIDES sobre "${userMsg}"...</p>`);
            }, 500);
        }
    });

    // Lógica de Traducción Inteligente
    $('#language-picker').change(function() {
        let lang = $(this).val();
        if(lang !== 'es') {
            alert("Iniciando traducción neuronal a: " + lang + ". (Nota: Aquí se integra la API de Google/OpenAI Cloud)");
            // Aquí se dispara la lógica de reemplazo de texto vía API
        }
    });
});

async function consultarIA(mensajeUsuario) {
    // Aquí conectarías con tu API Key (OpenAI por ejemplo)
    // Por seguridad, esto debería pasar por un pequeño servidor (Backend)
    const respuesta = await fetch('https://tu-api-chatbot.com/v1/chat', {
        method: 'POST',
        body: JSON.stringify({ query: mensajeUsuario }),
        headers: {'Content-Type': 'application/json'}
    });
    const data = await respuesta.json();
    return data.fulfillmentText; // La respuesta de la IA
}

// Evento al escribir en el chat de la web
$('#ai-input').keypress(async function (e) {
    if (e.which == 13) {
        let texto = $(this).val();
        appendMessage("Tú", texto, "user");
        $(this).val('');

        let respuestaIA = await consultarIA(texto);
        appendMessage("IA FIDES", respuestaIA, "ai");
        
        // Si la duda es compleja, sugerimos WhatsApp
        if(respuestaIA.includes("contactar")) {
            $('#chat-body').append('<a href="https://wa.me/57..." class="btn btn-success btn-sm mt-2">Hablar con humano en WhatsApp</a>');
        }
    }
});
    
})(jQuery);

