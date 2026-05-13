checkAuth();

let allCareers = [];
let currentFilter = 'all';
let currentDepartment = 'all';

// Load careers on page load
window.addEventListener('DOMContentLoaded', loadCareers);

async function loadCareers() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/admin/careers`);
        allCareers = await response.json();
        updateCounts();
        displayCareers();
    } catch (error) {
        console.error('Error loading careers:', error);
        document.getElementById('loading').textContent = 'Error loading careers';
    }
}

function updateCounts() {
    const all = allCareers.length;
    const active = allCareers.filter(c => c.status === 'ACTIVE').length;
    const inactive = allCareers.filter(c => c.status === 'INACTIVE').length;
    
    document.getElementById('count-all').textContent = all;
    document.getElementById('count-active').textContent = active;
    document.getElementById('count-inactive').textContent = inactive;
}

function filterByStatus(status) {
    currentFilter = status;
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    displayCareers();
}

function filterByDepartment() {
    currentDepartment = document.getElementById('department-filter').value;
    displayCareers();
}

function displayCareers() {
    let filteredCareers = allCareers;
    
    // Filter by status
    if (currentFilter !== 'all') {
        filteredCareers = filteredCareers.filter(c => c.status === currentFilter);
    }
    
    // Filter by department
    if (currentDepartment !== 'all') {
        filteredCareers = filteredCareers.filter(c => c.department === currentDepartment);
    }
    
    const loading = document.getElementById('loading');
    const noCareers = document.getElementById('no-careers');
    const tableContainer = document.getElementById('career-table-container');
    const tableBody = document.getElementById('career-table-body');
    
    loading.style.display = 'none';
    
    if (filteredCareers.length === 0) {
        noCareers.style.display = 'block';
        tableContainer.style.display = 'none';
    } else {
        noCareers.style.display = 'none';
        tableContainer.style.display = 'block';
        
        tableBody.innerHTML = filteredCareers.map(career => `
            <tr>
                <td><strong>${career.title}</strong></td>
                <td>${career.location}</td>
                <td>${career.workType}</td>
                <td><span class="category-badge">${career.department}</span></td>
                <td><span class="status-badge status-${career.status}">${career.status}</span></td>
                <td>${formatDate(career.createdAt)}</td>
                <td>
                    <a href="career-editor.html?id=${career.id}" class="action-link">Edit</a>
                    <a href="#" onclick="deleteCareer(${career.id}, '${career.title.replace(/'/g, "\\'")}'); return false;" class="action-link action-delete">Delete</a>
                    <a href="${career.linkedinUrl}" target="_blank" class="action-link" style="color: #0077B5;">LinkedIn</a>
                </td>
            </tr>
        `).join('');
    }
}

async function deleteCareer(id, title) {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
        return;
    }
    
    try {
        await fetch(`${API_BASE_URL}/api/admin/careers/${id}`, {
            method: 'DELETE'
        });
        alert('Career deleted successfully');
        loadCareers();
    } catch (error) {
        console.error('Error deleting career:', error);
        alert('Failed to delete career');
    }
}
