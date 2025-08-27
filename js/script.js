// Store current product for modal
        let currentProduct = null;

        // Add event listeners when page loads
        document.addEventListener('DOMContentLoaded', function() {
            // Add click listeners to all add-to-cart buttons
            document.querySelectorAll(".add-to-cart").forEach(btn => {
                btn.addEventListener("click", (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    let item = btn.closest(".product-item");
                    openModal(
                        item.dataset.img,
                        item.dataset.title,
                        item.dataset.price,
                        item.dataset.desc,
                        item.dataset.productId
                    );
                });
            });

            // Add click listeners to product items for full modal
            document.querySelectorAll(".product-item").forEach(item => {
                item.addEventListener("click", (e) => {
                    // Don't open modal if clicking the add-to-cart button
                    if (e.target.closest('.add-to-cart')) {
                        return;
                    }
                    
                    openModal(
                        item.dataset.img,
                        item.dataset.title,
                        item.dataset.price,
                        item.dataset.desc,
                        item.dataset.productId
                    );
                });
            });

            // Close modal when clicking outside
            document.getElementById('productModal').addEventListener('click', function(e) {
                if (e.target === this) {
                    closeModal();
                }
            });

            // Close modal with escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    closeModal();
                }
            });
        });

        function openModal(img, title, price, desc, productId) {
            const modal = document.getElementById("productModal");
            
            // Store current product data
            currentProduct = {
                id: productId,
                img: img,
                title: title,
                price: price,
                desc: desc
            };

            // Update modal content
            document.getElementById("modalImg").src = img;
            document.getElementById("modalTitle").innerText = title;
            document.getElementById("modalPrice").innerText = price;
            document.getElementById("modalDesc").innerText = desc;

            // Reset form
            document.querySelectorAll(".options button").forEach(b => b.classList.remove("active"));
            document.getElementById("sizeSelect").selectedIndex = 0;

            // Show modal
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            const modal = document.getElementById("productModal");
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
            currentProduct = null;
        }

        function selectColor(btn) {
            document.querySelectorAll(".options button").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
        }

        function addToCart() {
            if (!currentProduct) return;

            const selectedColor = document.querySelector('.options button.active');
            const selectedSize = document.getElementById('sizeSelect');

            if (!selectedColor) {
                alert('Please select a color');
                return;
            }

            if (selectedSize.selectedIndex === 0) {
                alert('Please select a size');
                return;
            }

            // Simulate adding to cart
            const cartItem = {
                id: currentProduct.id,
                title: currentProduct.title,
                price: currentProduct.price,
                color: selectedColor.textContent,
                size: selectedSize.value,
                image: currentProduct.img
            };

            console.log('Added to cart:', cartItem);
            alert(`✅ Added to cart!\n\n${cartItem.title}\nColor: ${cartItem.color}\nSize: ${cartItem.size}\nPrice: ${cartItem.price}`);
            
            closeModal();
        }