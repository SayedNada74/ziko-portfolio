const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const app = express();
app.use(cors());
app.use(express.json());

// Serve the admin UI
app.use('/admin', express.static(path.join(__dirname, 'admin')));

// Serve the workspace statically to preview images
app.use(express.static(__dirname));

// Multer storage for uploaded images - Save temporarily first
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Save to a temporary location because req.body is not fully parsed yet
        const tempDir = path.join(__dirname, 'categorys', 'temp');
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }
        cb(null, tempDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, uniqueSuffix + ext);
    }
});

const upload = multer({ storage: storage });

// Helper to read and parse the JS data file
function getPortfolioData() {
    try {
        const filePath = path.join(__dirname, 'portfolio_data.js');
        if (!fs.existsSync(filePath)) return null;
        
        // Mock window object to capture the data
        global.window = {};
        
        // Read file content and evaluate it in the current context
        const content = fs.readFileSync(filePath, 'utf8');
        eval(content);
        
        return global.window.PORTFOLIO_DATA;
    } catch (e) {
        console.error("Failed to parse portfolio_data.js", e);
        return null;
    }
}

// Helper to write the data back
function savePortfolioData(data) {
    const filePath = path.join(__dirname, 'portfolio_data.js');
    const header = `// Portfolio Content Database for Zakaria Yahia\n// This file structures all the images and metadata for the website.\n\nconst PORTFOLIO_DATA = `;
    const footer = `\n\n// Exporting to make it available in the browser window\nwindow.PORTFOLIO_DATA = PORTFOLIO_DATA;\n`;
    const jsonStr = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, header + jsonStr + ';' + footer, 'utf8');
}

// --- API Endpoints ---

// Get current data
app.get('/api/data', (req, res) => {
    // Add cache control headers to prevent browser from caching the JSON
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    const data = getPortfolioData();
    if (data) {
        res.json(data);
    } else {
        res.status(500).json({ error: "Could not read portfolio_data.js" });
    }
});

// Upload a new photo
app.post('/api/upload', upload.single('photo'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        
        const data = getPortfolioData();
        if (!data) return res.status(500).json({ error: "Cannot parse data" });
        
        // Now req.body is fully parsed
        const category = req.body.category || 'street';
        
        // Create the final category directory
        const finalDir = path.join(__dirname, 'categorys', category);
        if (!fs.existsSync(finalDir)) {
            fs.mkdirSync(finalDir, { recursive: true });
        }
        
        // Move the file from temp to final directory
        const finalPath = path.join(finalDir, req.file.filename);
        fs.renameSync(req.file.path, finalPath);
        
        // Relative path for the front-end to use
        const relativeUrl = `categorys/${category}/${req.file.filename}`.replace(/\\/g, '/');
        
        const newPhoto = {
            url: relativeUrl,
            category: category,
            title: req.body.title || 'Untitled',
            location: req.body.location || 'Unknown',
            exif: {
                gear: req.body.gear || "",
                focal: req.body.focal || "",
                aperture: req.body.aperture || "",
                shutter: req.body.shutter || "",
                iso: req.body.iso || ""
            }
        };
        
        // Ensure photos array exists
        if (!data.photos) data.photos = [];
        data.photos.unshift(newPhoto); // Add to top
        
        savePortfolioData(data);
        
        res.json({ success: true, photo: newPhoto });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Delete a photo
app.delete('/api/photo', (req, res) => {
    try {
        const { url } = req.body;
        if (!url) return res.status(400).json({ error: "Missing url" });
        
        const data = getPortfolioData();
        if (!data) return res.status(500).json({ error: "Cannot parse data" });
        
        const initialLength = data.photos.length;
        data.photos = data.photos.filter(p => p.url !== url);
        
        if (data.photos.length === initialLength) {
            return res.status(404).json({ error: "Photo not found in data" });
        }
        
        savePortfolioData(data);
        
        // Optional: Delete the physical file
        const filePath = path.join(__dirname, url);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Publish to GitHub (which triggers Vercel)
app.post('/api/publish', (req, res) => {
    exec('git add . && git commit -m "update: content from local admin panel" && git push', (error, stdout, stderr) => {
        if (error) {
            if (stdout.includes('nothing to commit') || stderr.includes('nothing to commit')) {
                exec('git push', (pushErr) => {
                    if (pushErr) return res.status(500).json({ error: pushErr.message });
                    return res.json({ success: true, message: "Pushed existing changes to live site." });
                });
            } else {
                console.error(`Git error: ${error.message}`);
                return res.status(500).json({ error: error.message });
            }
        } else {
            res.json({ success: true, message: "Published successfully to live site!" });
        }
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Admin server running on http://localhost:${PORT}/admin`);
});
