        const fragrances = [
            { name: 'Lavender', emoji: '💜' },
            { name: 'Vanilla', emoji: '🤍' },
            { name: 'Rose', emoji: '🌹' },
            { name: 'Sandalwood', emoji: '🪵' },
            { name: 'Jasmine', emoji: '🌸' },
            { name: 'Cinnamon', emoji: '🍂' },
            { name: 'Ocean', emoji: '🌊' },
            { name: 'Eucalyptus', emoji: '🌿' },
            { name: 'Lemon', emoji: '🍋' },
            { name: 'Mint', emoji: '🌱' },
            { name: 'Amber', emoji: '🧡' },
            { name: 'Cedar', emoji: '🌲' }
        ];

        const products = [
            {
                name: 'Flower Bouquet',
                badge: 'Popular',
                image: 'images/Flowers.jpeg',
                emoji: false
            },
            {
                name: 'Sheep herd',
                badge: 'Best Seller',
                image: 'images/Sheeps.jpeg',
                emoji: false
            },
            {
                name: 'Teddy Friends',
                badge: 'Gift Idea',
                image: 'images/Teddy.jpeg',
                emoji: false
            },
            {
                name: 'Say Cheese Jerry!',
                badge: 'New',
                image: 'images/Mouse.jpeg',
                emoji: false
            },
            {
                name: 'Love',
                badge: 'New',
                image: 'images/Heart.jpeg',
                emoji: false
            },
            {
                name: 'Newborn Joy',
                badge: 'New',
                image: 'images/Baby Feet.jpeg',
                emoji: false
            }
        ];

        // Tab Switching
        function switchTab(tabName) {
            // Hide all tabs
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.remove('active');
            });

            // Remove active from all buttons
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });

            // Show selected tab
            document.getElementById(tabName + '-tab').classList.add('active');

            // Add active to clicked button
            event.target.classList.add('active');

            // Scroll to top smoothly
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function generateProducts() {
            const grid = document.getElementById('productsGrid');

            products.forEach((product, index) => {
                const card = document.createElement('div');
                card.className = 'product-card';

                const imageContent = product.emoji
                    ? product.image
                    : `<img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;">`;

                card.innerHTML = `
                    <div class="product-badge">${product.badge}</div>
                    <div class="product-image">${imageContent}</div>
                    <h3 class="product-name">${product.name}</h3>
                    <!--<div class="product-price">${product.price}</div>-->

                    <div class="fragrance-section">
                        <div class="fragrance-title">🌸 Pick Your Scent</div>
                        <div class="fragrance-pills">
                            ${fragrances.map(f => `
                                <button class="fragrance-pill" data-fragrance="${f.name}">
                                    ${f.emoji} ${f.name}
                                </button>
                            `).join('')}
                        </div>
                        <div class="selection-display" id="selected-${index}"></div>
                    </div>

                    <div class="order-section">
                        <a href="#" class="btn btn-whatsapp" id="whatsapp-${index}">
                            📱 WhatsApp
                        </a>
                        <a href="#" class="btn btn-email" id="email-${index}">
                            ✉️ Email
                        </a>
                    </div>
                `;

                grid.appendChild(card);

                // Fragrance selection
                const fragrancePills = card.querySelectorAll('.fragrance-pill');
                const selectedDisplay = card.querySelector(`#selected-${index}`);
                const whatsappBtn = card.querySelector(`#whatsapp-${index}`);
                const emailBtn = card.querySelector(`#email-${index}`);

                let selectedFragrance = '';

                fragrancePills.forEach(pill => {
                    pill.addEventListener('click', function() {
                        fragrancePills.forEach(p => p.classList.remove('selected'));
                        this.classList.add('selected');
                        selectedFragrance = this.dataset.fragrance;
                        selectedDisplay.textContent = `✨ ${selectedFragrance} chosen!`;
                        updateOrderLinks();
                    });
                });

                function updateOrderLinks() {
                    const fragText = selectedFragrance ? ` - ${selectedFragrance} scent` : '';

                    const whatsappMessage = encodeURIComponent(
                        `Hi! 👋 I'd love to order:\n\n${product.name}${fragText}\n\nCan you confirm availability? 🕯️`
                    );

                    const emailSubject = encodeURIComponent(`Order: ${product.name}`);
                    const emailBody = encodeURIComponent(
                        `Hello!\n\nI'd like to order:\n\nProduct: ${product.name}${fragText}\n\nPlease let me know about availability and shipping.\n\nThank you! 🕯️`
                    );

                    whatsappBtn.href = `https://wa.me/${atob(CONFIG.whatsappNumber)}?text=${whatsappMessage}`;
                    emailBtn.href = `mailto:${CONFIG.email}?subject=${emailSubject}&body=${emailBody}`;
                }

                updateOrderLinks();
            });
        }

        document.getElementById('footerWhatsApp').href = `https://wa.me/${atob(CONFIG.whatsappNumber)}`;
        document.getElementById('footerEmail').href = `mailto:${CONFIG.email}`;

        generateProducts();