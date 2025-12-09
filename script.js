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

// Floating/runaway button after 25 clicks (stays ~1 inch from edges)
earnButton.addEventListener("mousemove", (e) => {
    if (clickCount >= 25) {
        const buffer = 96; // ~1 inch from edges
        const buttonWidth = earnButton.offsetWidth;
        const buttonHeight = earnButton.offsetHeight;

        // Maximum allowed positions
        const maxX = window.innerWidth - buttonWidth - buffer;
        const maxY = window.innerHeight - buttonHeight - buffer;

        const rect = earnButton.getBoundingClientRect();
        const buttonX = rect.left + buttonWidth / 2;
        const buttonY = rect.top + buttonHeight / 2;

        const distanceX = e.clientX - buttonX;
        const distanceY = e.clientY - buttonY;
        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

        if (distance < 100) { // move only when cursor is close
            let moveX = -distanceX / 2 + (Math.random() * 20 - 10);
            let moveY = -distanceY / 2 + (Math.random() * 20 - 10);

            let newLeft = rect.left + moveX;
            let newTop = rect.top + moveY;

            // Clamp so button stays inside buffer
            newLeft = Math.max(buffer, Math.min(newLeft, maxX));
            newTop = Math.max(buffer, Math.min(newTop, maxY));

            earnButton.style.position = 'absolute';
            earnButton.style.left = newLeft + 'px';
            earnButton.style.top = newTop + 'px';
        }
    }
});
