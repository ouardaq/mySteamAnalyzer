const gameListElement = document.getElementById('game-list');
        const loadingElement = document.getElementById('loading');
        const chartCanvas = document.getElementById('playtimeChart').getContext('2d');

        
        const apiUrl = 'http://127.0.0.1:5000/api/owned-games';

        async function fetchGames() {
            try {
                const response = await fetch(apiUrl);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                
                
                if (loadingElement) {
                  loadingElement.remove();
                }

                if (data.games && data.games.length > 0) {
                    
                    const sortedGames = data.games.sort((a, b) => b.playtime_forever - a.playtime_forever);

                    
                    const top10Games = sortedGames.slice(0, 10);
                    const gameNames = top10Games.map(game => game.name);
                    const playtimeData = top10Games.map(game => (game.playtime_forever / 60).toFixed(2));

                    
                    new Chart(chartCanvas, {
                        type: 'bar',
                        data: {
                            labels: gameNames,
                            datasets: [{
                                label: 'Playtime (in hours)',
                                data: playtimeData,
                                backgroundColor: '#728FCE', 
                                borderColor: '#5C4B5C', 
                                borderWidth: 2
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    display: false
                                }
                            },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    ticks: {
                                        color: '#5C4B5C',
                                        font: {
                                            family: 'Press Start 2P'
                                        }
                                    },
                                    grid: {
                                        color: 'rgba(92, 75, 92, 0.2)'
                                    }
                                },
                                x: {
                                    ticks: {
                                        color: '#5C4B5C',
                                        font: {
                                            family: 'Press Start 2P'
                                        }
                                    },
                                    grid: {
                                        color: 'rgba(92, 75, 92, 0.2)'
                                    }
                                }
                            }
                        }
                    });

                    
                    sortedGames.forEach(game => {
                        const gameCard = document.createElement('div');
                        gameCard.className = "p-5 bg-card-color shadow-md border-2 border-solid border-slate-900 pixel-shadow";
                        
                        const playtimeInHours = (game.playtime_forever / 60).toFixed(2);
                        const headerImageUrl = `https://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/header.jpg`;

                        gameCard.innerHTML = `
                            
                            <img src="${headerImageUrl}" onerror="this.onerror=null; this.src='https://placehold.co/600x300/B6E6E6/5C4B5C?text=No+Image';" alt="${game.name} Header Image" class="w-full mb-4 border-2 border-solid border-slate-900">
                            <h2 class="text-xl mb-2">${game.name}</h2>
                            <p class="text-sm">Playtime: <span class="font-bold">${playtimeInHours}</span> hours</p>
                        `;

                        gameListElement.appendChild(gameCard);
                    });
                } else {
                    gameListElement.innerHTML = '<p class="col-span-full text-center">No games found or the API returned an error.</p>';
                }

            } catch (error) {
                console.error("Failed to fetch games:", error);
                if (loadingElement) {
                    loadingElement.textContent = "Error loading games. Please ensure the Python backend is running.";
                    loadingElement.className = "col-span-full text-center";
                }
            }
        }

        document.addEventListener('DOMContentLoaded', fetchGames);
  