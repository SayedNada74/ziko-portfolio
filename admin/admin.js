document.addEventListener('DOMContentLoaded', () => {
    
    // --- Elements ---
    const photoGrid = document.getElementById('photoGrid');
    const loadingState = document.getElementById('loadingState');
    
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const uploadModal = document.getElementById('uploadModal');
    
    const uploadForm = document.getElementById('uploadForm');
    const submitUploadBtn = document.getElementById('submitUploadBtn');
    
    const photoFile = document.getElementById('photoFile');
    const imagePreview = document.getElementById('imagePreview');
    const previewIcon = document.getElementById('previewIcon');
    const fileLabel = document.getElementById('fileLabel');
    
    const publishBtn = document.getElementById('publishBtn');
    
    // --- State ---
    let photosData = [];

    // --- Toast Notification ---
    function showToast(message, isError = false) {
        const toast = document.getElementById('toast');
        const toastMsg = document.getElementById('toastMsg');
        const toastIcon = document.getElementById('toastIcon');
        
        toastMsg.textContent = message;
        
        if (isError) {
            toastIcon.className = "fa-solid fa-circle-exclamation text-red-500 text-xl";
            toast.classList.replace('border-gray-700', 'border-red-800');
        } else {
            toastIcon.className = "fa-solid fa-check-circle text-green-500 text-xl";
            toast.classList.replace('border-red-800', 'border-gray-700');
        }
        
        toast.classList.remove('translate-y-20', 'opacity-0');
        
        setTimeout(() => {
            toast.classList.add('translate-y-20', 'opacity-0');
        }, 3000);
    }

    // --- Fetch & Render Data ---
    async function loadData() {
        try {
            const res = await fetch('/api/data');
            if (!res.ok) throw new Error("Failed to fetch data");
            const data = await res.json();
            
            photosData = data.photos || [];
            renderPhotos(photosData);
        } catch (error) {
            console.error(error);
            showToast("Error loading photos!", true);
            loadingState.innerHTML = '<p class="text-red-400">Failed to load data. Ensure server is running.</p>';
        }
    }

    function renderPhotos(photos) {
        photoGrid.innerHTML = ''; // clear grid
        if (photos.length === 0) {
            photoGrid.innerHTML = '<div class="col-span-full text-center text-gray-500 py-10">No photos found. Upload some!</div>';
            return;
        }

        photos.forEach(photo => {
            const card = document.createElement('div');
            card.className = "bg-card border border-gray-800 rounded-lg overflow-hidden group relative hover:border-gray-600 transition duration-300 shadow-lg";
            
            card.innerHTML = `
                <div class="h-48 w-full bg-gray-900 overflow-hidden relative">
                    <img src="/${photo.url}" alt="${photo.title}" class="w-full h-full object-cover transition duration-500 group-hover:scale-105 group-hover:opacity-60">
                    <button class="delete-btn absolute top-3 right-3 w-8 h-8 bg-red-600/90 text-white rounded flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-500 transition shadow-lg" data-url="${photo.url}" title="Delete Photo">
                        <i class="fa-solid fa-trash-can text-sm"></i>
                    </button>
                    <div class="absolute top-3 left-3 bg-black/70 backdrop-blur text-xs px-2 py-1 rounded text-gold uppercase tracking-widest border border-gray-700 font-medium">
                        ${photo.category}
                    </div>
                </div>
                <div class="p-4">
                    <h4 class="font-serif text-lg font-bold text-white mb-1 truncate" title="${photo.title}">${photo.title}</h4>
                    <p class="text-xs text-gray-400 mb-2"><i class="fa-solid fa-location-dot text-gold/70 mr-1"></i> ${photo.location}</p>
                    <div class="flex flex-wrap gap-2 text-[10px] text-gray-500 mt-2 pt-2 border-t border-gray-800">
                        <span title="Gear"><i class="fa-solid fa-camera mr-1"></i>${photo.exif.gear || '-'}</span>
                        <span title="Settings"><i class="fa-solid fa-sliders mr-1"></i>${photo.exif.aperture} | ${photo.exif.shutter}</span>
                    </div>
                </div>
            `;
            photoGrid.appendChild(card);
        });

        // Attach delete events
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const url = e.currentTarget.getAttribute('data-url');
                if (confirm("Are you sure you want to delete this photo? This cannot be undone locally.")) {
                    deletePhoto(url);
                }
            });
        });
    }

    // --- Delete Photo ---
    async function deletePhoto(url) {
        try {
            const res = await fetch('/api/photo', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url })
            });
            
            const result = await res.json();
            if (result.success) {
                showToast("Photo deleted successfully!");
                loadData(); // reload
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            console.error(error);
            showToast("Failed to delete photo", true);
        }
    }

    // --- Modal Logic ---
    function openModal() {
        uploadForm.reset();
        imagePreview.src = '';
        imagePreview.classList.add('hidden');
        previewIcon.classList.remove('hidden');
        fileLabel.textContent = "Click to browse or drag and drop";
        uploadModal.classList.remove('hidden');
    }

    function closeModal() {
        uploadModal.classList.add('hidden');
    }

    openModalBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal();
    });

    // Handle File Preview
    photoFile.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imagePreview.src = e.target.result;
                imagePreview.classList.remove('hidden');
                previewIcon.classList.add('hidden');
                fileLabel.textContent = file.name;
            };
            reader.readAsDataURL(file);
        }
    });

    // --- Upload Form Submit ---
    uploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!photoFile.files[0]) {
            showToast("Please select an image file", true);
            return;
        }

        const formData = new FormData(uploadForm);
        
        // Show loading on button
        const originalText = submitUploadBtn.innerHTML;
        submitUploadBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Uploading...';
        submitUploadBtn.disabled = true;

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData // multipart/form-data
            });
            
            const result = await res.json();
            if (result.success) {
                showToast("Photo uploaded and saved to portfolio!");
                closeModal();
                loadData();
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            console.error(error);
            showToast(error.message || "Failed to upload photo", true);
        } finally {
            submitUploadBtn.innerHTML = originalText;
            submitUploadBtn.disabled = false;
        }
    });

    // --- Publish to GitHub / Vercel ---
    publishBtn.addEventListener('click', async () => {
        if (!confirm("This will upload your changes to GitHub and publish them to your live Vercel website. Continue?")) return;
        
        const originalHtml = publishBtn.innerHTML;
        publishBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Publishing...';
        publishBtn.disabled = true;
        publishBtn.classList.add('opacity-75', 'cursor-not-allowed');

        try {
            const res = await fetch('/api/publish', { method: 'POST' });
            const result = await res.json();
            
            if (result.success) {
                showToast("Successfully published to live site!");
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            console.error(error);
            showToast("Error publishing: " + error.message, true);
        } finally {
            publishBtn.innerHTML = originalHtml;
            publishBtn.disabled = false;
            publishBtn.classList.remove('opacity-75', 'cursor-not-allowed');
        }
    });

    // --- Filtering (Admin UI visual only) ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => {
                b.classList.remove('active', 'bg-white', 'text-black');
                b.classList.add('border', 'border-gray-700', 'text-gray-300');
            });
            btn.classList.remove('border', 'border-gray-700', 'text-gray-300');
            btn.classList.add('active', 'bg-white', 'text-black');
            
            const filter = btn.getAttribute('data-filter');
            
            if (filter === 'all') {
                renderPhotos(photosData);
            } else {
                const filtered = photosData.filter(p => p.category === filter);
                renderPhotos(filtered);
            }
        });
    });

    // Initial Load
    loadData();
});
