document.addEventListener("DOMContentLoaded", () => {
    // -----------------------------------------
    // 1. Floating Hearts Background Generator
    // -----------------------------------------
    const heartsContainer = document.getElementById("particles-js");

    const createHeart = () => {
        const heart = document.createElement("div");
        heart.classList.add("heart");
        // Random horizontal start position
        heart.style.left = Math.random() * 100 + "vw";
        // Random falling duration between 6s and 12s
        heart.style.animationDuration = Math.random() * 6 + 6 + "s";
        // Random opacity for depth
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        // Random scaling for size variations
        heart.style.transform = `scale(${Math.random() * 0.6 + 0.4}) rotate(-45deg)`;

        heartsContainer.appendChild(heart);

        // Remove from DOM when animation finishes to clean up memory
        setTimeout(() => {
            heart.remove();
        }, 12000);
    };

    // Keep generating hearts continuously
    let heartGeneratorInterval = setInterval(createHeart, 350);

    // -----------------------------------------
    // 2. Typing Effect for the Apology Message
    // -----------------------------------------
    const textToType = "I am so incredibly sorry for acting like a fool. I just missed seeing my beautiful princess, but getting upset over a picture was completely wrong. Your silence is tearing me apart. Please message me and send your picture, you can even delete it right after if you want, just so we can start talking again because I simply cannot live without you... Please come back to me, my love. I promise I won't upset you like that again.";

    const typedTextElement = document.getElementById("typed-text");
    let i = 0;

    // A simulated cursor block
    const cursorNode = document.createElement('span');
    cursorNode.className = 'cursor';

    function typeWriter() {
        if (i < textToType.length) {
            typedTextElement.textContent += textToType.charAt(i);
            typedTextElement.appendChild(cursorNode);
            i++;

            // Randomize typing speed slightly for a more natural human feel
            const speed = Math.random() * 30 + 30;
            setTimeout(typeWriter, speed);
        } else {
            // Typing done -> Keep blinking cursor, show Action Section
            setTimeout(() => {
                const actionSection = document.getElementById("action-section");
                actionSection.classList.remove("hidden");
                actionSection.classList.add("fade-in");
            }, 800); // short pause before showing buttons
        }
    }

    // Start typing after initial delay
    setTimeout(typeWriter, 1200);

    // -----------------------------------------
    // 3. Interactions for Yes and No Buttons
    // -----------------------------------------
    const btnNo = document.getElementById("btn-no");
    const btnYes = document.getElementById("btn-yes");
    const actionSection = document.getElementById("action-section");
    const successSection = document.getElementById("success-section");

    let isMoving = false;

    // Move 'btn-no' away when mouse pointer is near it
    const moveNoButton = (e) => {
        // Prevent normal click
        if (e.type === 'touchstart') e.preventDefault();

        if (!isMoving) {
            isMoving = true;

            // Break out of the flexbox and any CSS transform containment by appending to document body
            if (btnNo.parentElement !== document.body) {
                // Ensure the button width/height stay identical to what they were
                btnNo.style.width = btnNo.offsetWidth + 'px';
                btnNo.style.height = btnNo.offsetHeight + 'px';
                document.body.appendChild(btnNo);
            }

            btnNo.style.position = 'fixed';
            btnNo.style.zIndex = '9999';

            // Get viewport boundaries minus button sizes to prevent it going off-screen
            const maxX = window.innerWidth - btnNo.offsetWidth - 20;
            const maxY = window.innerHeight - btnNo.offsetHeight - 20;

            const randomX = Math.max(20, Math.random() * maxX);
            const randomY = Math.max(20, Math.random() * maxY);

            btnNo.style.left = `${randomX}px`;
            btnNo.style.top = `${randomY}px`;

            // Allows the button to move again once transition is visually settling
            setTimeout(() => {
                isMoving = false;
            }, 200);
        }
    };

    btnNo.addEventListener("mouseover", moveNoButton);
    btnNo.addEventListener("touchstart", moveNoButton);

    // Success event when 'Yes' is clicked
    btnYes.addEventListener("click", () => {
        // Hide the pleading parts
        actionSection.classList.add("hidden");
        document.querySelector(".title").classList.add("hidden");
        document.querySelector(".subtitle").classList.add("hidden");
        document.querySelector(".message-container").classList.add("hidden");

        // Show Success Part with a cute GIF
        successSection.classList.remove("hidden");
        successSection.classList.add("fade-in");

        // Intensify hearts for a celebratory feeling!
        clearInterval(heartGeneratorInterval);
        setInterval(createHeart, 100);
    });
});
