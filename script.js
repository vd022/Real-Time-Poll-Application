let votes = JSON.parse(localStorage.getItem("votes")) || {
    HTML: 0,
    CSS: 0,
    JavaScript: 0
};

let chart;

document.getElementById("htmlBtn").onclick = () => vote("HTML");
document.getElementById("cssBtn").onclick = () => vote("CSS");
document.getElementById("jsBtn").onclick = () => vote("JavaScript");
document.getElementById("resetBtn").onclick = reset;

function vote(type) {
    votes[type]++;
    save();
    update();
}

function reset() {
    votes = { HTML: 0, CSS: 0, JavaScript: 0 };
    save();
    update();
}

function save() {
    localStorage.setItem("votes", JSON.stringify(votes));
}

function update() {
    updateStats();
    updateTotal();
    updateChart();
}

function updateStats() {
    document.getElementById("h").innerText = votes.HTML;
    document.getElementById("c").innerText = votes.CSS;
    document.getElementById("j").innerText = votes.JavaScript;
}

function updateTotal() {
    document.getElementById("total").innerText =
        votes.HTML + votes.CSS + votes.JavaScript;
}

function updateChart() {
    const ctx = document.getElementById("chart").getContext("2d");

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["HTML", "CSS", "JavaScript"],
            datasets: [{
                data: [votes.HTML, votes.CSS, votes.JavaScript],
                backgroundColor: ["#ff6b1a", "#1e90ff", "#f7d000"],
                borderWidth: 0
            }]
        },
        options: {
            cutout: "65%",
            plugins: {
                legend: { display: false }
            }
        }
    });
}

update();