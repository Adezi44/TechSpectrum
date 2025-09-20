// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize interactive features
    initializeInteractiveBlocks();
    initializeModal();
    initializeDemoButton();
    initializeKeyboardDemo();
    initializeMouseDemo();
    
    // Add entrance animations
    animateElementsOnLoad();
});

// Initialize interactive block functionality
function initializeInteractiveBlocks() {
    const interactiveBlocks = document.querySelectorAll('.interactive-block');
    
    interactiveBlocks.forEach(block => {
        block.addEventListener('click', function() {
            handleBlockClick(this);
        });
        
        // Add hover sound effects (visual feedback)
        block.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.1)';
        });
        
        block.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(1)';
        });
    });
}

// Handle block click events
function handleBlockClick(block) {
    // Add click animation
    block.classList.add('clicked');
    setTimeout(() => {
        block.classList.remove('clicked');
    }, 600);
    
    // Handle different block types
    const result = block.getAttribute('data-result');
    const sound = block.getAttribute('data-sound');
    const demo = block.getAttribute('data-demo');
    
    if (result) {
        showResult(result);
    } else if (sound) {
        playSound(sound);
    } else if (demo) {
        runDemo(demo, block);
    }
}

// Show result in modal
function showResult(result) {
    const modal = document.getElementById('result-modal');
    const resultText = document.getElementById('result-text');
    
    resultText.textContent = result;
    modal.style.display = 'block';
    
    // Auto-close after 3 seconds
    setTimeout(() => {
        modal.style.display = 'none';
    }, 3000);
}

// Simulate sound playing with visual feedback
function playSound(soundType) {
    const messages = {
        'pop': '🔊 Pop sound played!',
        'meow': '🐱 Meow sound played!',
        'think': '💭 Thinking sound played!'
    };
    
    showResult(messages[soundType] || '🔊 Sound played!');
}

// Run interactive demos
function runDemo(demoType, block) {
    switch(demoType) {
        case 'repeat':
            runRepeatDemo(block);
            break;
        case 'forever':
            runForeverDemo(block);
            break;
        case 'until':
            runUntilDemo(block);
            break;
        case 'if-space':
            showResult('Press SPACEBAR to test this condition!');
            break;
        case 'if-else':
            showResult('Move your mouse over blocks to test this condition!');
            break;
        case 'game':
            runGameDemo(block);
            break;
    }
}

// Demo functions
function runRepeatDemo(block) {
    let count = 0;
    const originalText = block.innerHTML;
    
    const interval = setInterval(() => {
        count++;
        block.innerHTML = `repeat <span class="input-field">${count}/10</span>`;
        block.style.transform = `translateX(${count * 2}px)`;
        
        if (count >= 10) {
            clearInterval(interval);
            setTimeout(() => {
                block.innerHTML = originalText;
                block.style.transform = 'translateX(0)';
            }, 1000);
        }
    }, 200);
}

function runForeverDemo(block) {
    let isRunning = false;
    if (block.classList.contains('demo-active')) {
        block.classList.remove('demo-active');
        return;
    }
    
    block.classList.add('demo-active');
    showResult('Forever loop started! Click again to stop.');
    
    // Stop after 5 seconds for demo purposes
    setTimeout(() => {
        block.classList.remove('demo-active');
    }, 5000);
}

function runUntilDemo(block) {
    let position = 0;
    const maxPosition = 100;
    
    const interval = setInterval(() => {
        position += 10;
        block.style.transform = `translateX(${position}px)`;
        
        if (position >= maxPosition) {
            clearInterval(interval);
            showResult('Reached the edge! Loop stopped.');
            setTimeout(() => {
                block.style.transform = 'translateX(0)';
            }, 1000);
        }
    }, 300);
}

function runGameDemo(block) {
    let score = 0;
    const maxScore = 5;
    
    const gameInterval = setInterval(() => {
        score++;
        showResult(`🎮 Score: ${score} - Point scored!`);
        
        if (score >= maxScore) {
            clearInterval(gameInterval);
            setTimeout(() => {
                showResult('🏆 Game Over! Final Score: ' + score);
            }, 1000);
        }
    }, 1000);
}

// Initialize modal functionality
function initializeModal() {
    const modal = document.getElementById('result-modal');
    const closeBtn = document.querySelector('.close');
    
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Initialize demo button
function initializeDemoButton() {
    const demoButton = document.getElementById('demo-button');
    let demoRunning = false;
    
    demoButton.addEventListener('click', function() {
        if (!demoRunning) {
            startFullDemo();
            demoRunning = true;
            this.textContent = '⏹️ Stop Demo';
        } else {
            stopFullDemo();
            demoRunning = false;
            this.textContent = '🎬 Start Interactive Demo';
        }
    });
}

// Full demo sequence
function startFullDemo() {
    showResult('🎬 Interactive demo started! Click on blocks to see them in action!');
    
    // Highlight blocks in sequence
    const blocks = document.querySelectorAll('.interactive-block');
    let currentIndex = 0;
    
    const highlightInterval = setInterval(() => {
        // Remove previous highlight
        blocks.forEach(block => block.style.boxShadow = '');
        
        // Highlight current block
        if (currentIndex < blocks.length) {
            blocks[currentIndex].style.boxShadow = '0 0 20px #FFD700';
            currentIndex++;
        } else {
            clearInterval(highlightInterval);
            // Remove all highlights
            blocks.forEach(block => block.style.boxShadow = '');
        }
    }, 1500);
}

function stopFullDemo() {
    // Remove all highlights and stop animations
    const blocks = document.querySelectorAll('.interactive-block');
    blocks.forEach(block => {
        block.style.boxShadow = '';
        block.classList.remove('demo-active');
        block.style.transform = '';
    });
    
    showResult('Demo stopped!');
}

// Keyboard demo for spacebar
function initializeKeyboardDemo() {
    document.addEventListener('keydown', function(event) {
        if (event.code === 'Space') {
            event.preventDefault();
            showResult('🚀 SPACEBAR pressed! Condition is TRUE!');
            
            // Highlight the spacebar condition block
            const spaceBlock = document.querySelector('[data-demo="if-space"]');
            if (spaceBlock) {
                spaceBlock.style.boxShadow = '0 0 15px #00FF00';
                setTimeout(() => {
                    spaceBlock.style.boxShadow = '';
                }, 1000);
            }
        }
    });
}

// Mouse demo for hover effects
function initializeMouseDemo() {
    const mouseBlocks = document.querySelectorAll('.interactive-block');
    
    mouseBlocks.forEach(block => {
        if (block.getAttribute('data-demo') === 'if-else') {
            block.addEventListener('mouseenter', function() {
                showResult('🖱️ Mouse touching block! Condition is TRUE!');
                this.style.transform = 'scale(1.1)';
            });
            
            block.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        }
    });
}

// Animate elements on page load
function animateElementsOnLoad() {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            section.style.transition = 'all 0.6s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Utility function to create sparkle effect
function createSparkleEffect(element) {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.position = 'absolute';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.fontSize = '20px';
    sparkle.style.zIndex = '1000';
    
    const rect = element.getBoundingClientRect();
    sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
    sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
    
    document.body.appendChild(sparkle);
    
    // Animate sparkle
    let opacity = 1;
    let yPos = parseInt(sparkle.style.top);
    
    const sparkleInterval = setInterval(() => {
        opacity -= 0.1;
        yPos -= 5;
        
        sparkle.style.opacity = opacity;
        sparkle.style.top = yPos + 'px';
        
        if (opacity <= 0) {
            clearInterval(sparkleInterval);
            document.body.removeChild(sparkle);
        }
    }, 50);
}

// Add sparkle effect to clicked blocks
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('interactive-block')) {
        createSparkleEffect(event.target);
    }
});

// Add fun facts about programming
const programmingFacts = [
    "🤓 Did you know? The first computer programmer was Ada Lovelace in 1843!",
    "🐛 The term 'bug' in programming comes from an actual moth found in a computer!",
    "🎮 Scratch was created at MIT to help kids learn programming!",
    "🌟 There are over 700 programming languages in the world!",
    "🤖 The word 'robot' comes from the Czech word 'robota' meaning 'work'!",
    "💡 The first computer weighed 30 tons and filled an entire room!"
];

// Show random programming facts
function showRandomFact() {
    const randomFact = programmingFacts[Math.floor(Math.random() * programmingFacts.length)];
    showResult(randomFact);
}

// Add fact button functionality (could be added to HTML if desired)
setInterval(() => {
    // Occasionally show a fun fact when user is idle
    if (Math.random() < 0.1) { // 10% chance every 10 seconds
        setTimeout(showRandomFact, 10000);
    }
}, 10000);