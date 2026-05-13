checkAuth();

let careerId = null;

// Check if editing existing career
window.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    careerId = urlParams.get('id');
    
    if (careerId) {
        document.getElementById('page-title').textContent = 'Edit Career';
        loadCareer(careerId);
    }
});

async function loadCareer(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/admin/careers/${id}`);
        const career = await response.json();
        
        document.getElementById('career-title').value = career.title;
        document.getElementById('career-location').value = career.location;
        document.getElementById('career-work-type').value = career.workType;
        document.getElementById('career-department').value = career.department;
        document.getElementById('career-linkedin').value = career.linkedinUrl;
        document.getElementById('career-status').value = career.status;
    } catch (error) {
        console.error('Error loading career:', error);
        alert('Failed to load career');
    }
}

async function saveCareer(status) {
    const title = document.getElementById('career-title').value.trim();
    const location = document.getElementById('career-location').value.trim();
    const workType = document.getElementById('career-work-type').value;
    const department = document.getElementById('career-department').value;
    const linkedinUrl = document.getElementById('career-linkedin').value.trim();
    
    // Validation
    if (!title || !location || !workType || !department || !linkedinUrl) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Validate LinkedIn URL
    if (!linkedinUrl.startsWith('http')) {
        alert('Please enter a valid LinkedIn URL starting with http:// or https://');
        return;
    }
    
    const careerData = {
        title,
        location,
        workType,
        department,
        linkedinUrl,
        status
    };
    
    // Disable buttons
    document.getElementById('save-btn').disabled = true;
    document.getElementById('publish-btn').disabled = true;
    
    try {
        const method = careerId ? 'PUT' : 'POST';
        const url = careerId 
            ? `${API_BASE_URL}/api/admin/careers/${careerId}` 
            : `${API_BASE_URL}/api/admin/careers`;
        
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(careerData)
        });
        
        if (response.ok) {
            alert(`Career ${status === 'ACTIVE' ? 'published' : 'saved as inactive'} successfully!`);
            window.location.href = 'careers.html';
        } else {
            alert('Failed to save career');
        }
    } catch (error) {
        console.error('Error saving career:', error);
        alert('Failed to save career');
    } finally {
        document.getElementById('save-btn').disabled = false;
        document.getElementById('publish-btn').disabled = false;
    }
}
