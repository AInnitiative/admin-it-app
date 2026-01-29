const modules = [
    {
        category: "📂 Handling Information",
        tasks: [
            { id: "h1", title: "Saving Documents", goal: "Open Word and save a file.", walkthrough: "Open Word > Type 'Meeting Notes' > File > Save As > Name it 'Practice'.", practice: "Save a Word doc named 'Meeting Notes - Practice'." },
            { id: "h2", title: "Folder Organization", goal: "Keep files tidy.", walkthrough: "Right-click Desktop > New > Folder > Name it 'Admin Work'.", practice: "Create an 'Admin Work' folder on your desktop." }
        ]
    },
    {
        category: "💬 Communicating",
        tasks: [
            { id: "c1", title: "Professional Email", goal: "Reply to an email.", walkthrough: "Open Email > Click Reply > Type 'Hi, Thursday at 2pm is fine. Regards' > Send.", practice: "Reply to a practice email or send one to yourself." },
            { id: "c2", title: "Teams & Messaging", goal: "Send a chat message.", walkthrough: "Open Teams > Find a colleague > Type 'I am available now' > Press Enter.", practice: "Send a message in Teams or a chat app." }
        ]
    },
    {
        category: "📄 Creating & Editing",
        tasks: [
            { id: "cc1", title: "Copy and Paste", goal: "Move text between apps.", walkthrough: "Highlight text > Right-click 'Copy' > Go to Word > Right-click 'Paste'.", practice: "Copy a name from an email and paste it into a Word doc." },
            { id: "cc2", title: "Excel Data Entry", goal: "Fill in a simple table.", walkthrough: "Open Excel > Create columns: Name, Date, Phone > Fill in 3 rows.", practice: "Create a 3-person contact list in Excel." }
        ]
    },
    {
        category: "🔒 Online Safety",
        tasks: [
            { id: "s1", title: "Strong Passwords", goal: "Protect your accounts.", walkthrough: "Use 3 random words (e.g., PurpleTableMountain!) instead of easy names.", practice: "Think of a new secure password using the 3-word rule." }
        ]
    }
];

let completedTasks = JSON.parse(localStorage.getItem('itProgress')) || [];

function renderDashboard() {
    const app = document.getElementById('app');
    const total = modules.flatMap(m => m.tasks).length;
    const percent = Math.round((completedTasks.length / total) * 100);

    let html = `<h2>My Learning Path</h2>`;
    
    if (percent === 100) {
        html += `
            <div class="module-card" style="border: 2px solid gold; text-align: center;">
                <h2>🏆 Course Complete!</h2>
                <button onclick="generateCertificate()" style="background:goldenrod">🎓 Claim Your Certificate</button>
            </div>`;
    }

    modules.forEach(mod => {
        html += `
            <div class="module-card">
                <h3>${mod.category}</h3>
                <ul>
                    ${mod.tasks.map(t => `
                        <li class="${completedTasks.includes(t.id) ? 'done' : ''}" onclick="showTask('${t.id}')">
                            <span style="margin-right:10px">${completedTasks.includes(t.id) ? '✅' : '⚪'}</span>
                            ${t.title}
                        </li>
                    `).join('')}
                </ul>
            </div>`;
    });
    
    app.innerHTML = html;
    document.getElementById('stats').innerText = `Progress: ${percent}%`;
}

function showTask(taskId) {
    const task = modules.flatMap(m => m.tasks).find(t => t.id === taskId);
    const app = document.getElementById('app');
    
    app.innerHTML = `
        <div class="task-view">
            <button class="back-btn" onclick="renderDashboard()">← Back</button>
            <h2>${task.title}</h2>
            <div class="guide"><strong>Guide:</strong> ${task.walkthrough}</div>
            <div class="practice"><strong>Task:</strong> ${task.practice}</div>
            <button class="done-btn" onclick="completeTask('${task.id}')">
                ${completedTasks.includes(task.id) ? 'Completed!' : 'Mark as Done'}
            </button>
        </div>
    `;
    window.scrollTo(0,0);
}

function completeTask(id) {
    if(!completedTasks.includes(id)) {
        completedTasks.push(id);
        localStorage.setItem('itProgress', JSON.stringify(completedTasks));
    }
    renderDashboard();
}

function generateCertificate() {
    const name = prompt("Enter your name for the certificate:");
    if (!name) return;
    const win = window.open('', '_blank');
    win.document.write(`
        <div style="text-align:center; border:10px solid #4f46e5; padding:50px; font-family:sans-serif;">
            <h1>Certificate of Completion</h1>
            <p>This certifies that</p>
            <h2 style="text-decoration:underline">${name}</h2>
            <p>has mastered the IT Basics & Admin Essentials Bootcamp.</p>
            <p>Date: ${new Date().toLocaleDateString()}</p>
        </div>
    `);
    win.print();
}

renderDashboard();
g
