let money = 0;
let autoClickers = 0;
const autoClickerCost = 10;
let clickCount = 0;

const moneyDisplay = document.getElementById("money");
const earnButton = document.getElementById("earnBtn");
const autoButton = document.getElementById("autoBtn");

// Manual click
earnButton.addEventListener("click", () => {
    money += 1;
    clickCount++;
    updateDisplay();
});

// Buy auto-clicker
autoButton.addEventListener("click", () => {
    if (money >= autoClickerCost) {
        money -= autoClickerCost;
        autoClickers += 1;
        updateDisplay();
    } else {
        alert("Not enough money!");
    }
});

// Auto-clicker adds money every second
setInterval(() => {
    if (autoClickers > 0) {
        money += autoClickers;
        updateDisplay();
    }
}, 1000);

// Update money display and button text
function updateDisplay() {
    moneyDisplay.textContent = "Money: " + money;
    autoButton.textContent = "Buy Auto-Clicker (Cost: 10) Owned: " + autoClickers;
}

// Floating/runaway button after 25 clicks (stays on screen)
earnButton.addEventListener("mousemove", (e) => {
    if (clickCount >= 25) {
        const buttonWidth = earnButton.offsetWidth;
        const buttonHeight = earnButton.offsetHeight;

        const maxX = window.innerWidth - buttonWidth;   // max allowed left
        const maxY = window.innerHeight - buttonHeight; // max allowed top

        const rect = earnButton.getBoundingClientRect();
        const buttonX = rect.left + buttonWidth / 2;
        const buttonY = rect.top + buttonHeight / 2;

        const distanceX = e.clientX - buttonX;
        const distanceY = e.clientY - buttonY;
        const distance = Math.sqrt(distanceX**2 + distanceY**2);

        if (distance < 100) { // only move when cursor is close
            let moveX = -distanceX / 2 + (Math.random() * 20 - 10); // small random jitter
            let moveY = -distanceY / 2 + (Math.random() * 20 - 10);

            let newLeft = rect.left + moveX;
            let newTop = rect.top + moveY;

            // Keep button inside the viewport
            newLeft = Math.min(Math.max(newLeft, 0), maxX);
            newTop = Math.min(Math.max(newTop, 0), maxY);

            earnButton.style.position = 'absolute';
            earnButton.style.left = newLeft + 'px';
            earnButton.style.top = newTop + 'px';
        }
    }
});
