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

// Floating/runaway button after 25 clicks
earnButton.addEventListener("mousemove", (e) => {
    if (clickCount >= 25) {
        const maxX = window.innerWidth - earnButton.offsetWidth;
        const maxY = window.innerHeight - earnButton.offsetHeight;

        // Current button center
        const rect = earnButton.getBoundingClientRect();
        const buttonX = rect.left + rect.width / 2;
        const buttonY = rect.top + rect.height / 2;

        const distanceX = e.clientX - buttonX;
        const distanceY = e.clientY - buttonY;
        const distance = Math.sqrt(distanceX**2 + distanceY**2);

        // Only move if cursor is close
        if (distance < 100) {
            // Move button away from cursor proportionally
            let moveX = -distanceX / 2 + (Math.random() * 30 - 15); // random jitter
            let moveY = -distanceY / 2 + (Math.random() * 30 - 15);

            let newLeft = Math.min(Math.max(rect.left + moveX, 0), maxX);
            let newTop = Math.min(Math.max(rect.top + moveY, 0), maxY);

            earnButton.style.position = 'absolute';
            earnButton.style.left = newLeft + 'px';
            earnButton.style.top = newTop + 'px';
        }
    }
});
