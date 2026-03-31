# My Steam Analyzer 🎮

A simple web application that uses the Steam Web API to fetch and display my owned games in Steam library. 
It includes a visual chart of my most played games and a list of my entire game library. 



### ✨ Features

* Steam API Integration: Fetches real-time data from the Steam Web API.
* Top 10 Chart: Visualizes the top 10 most played games using Chart.js.
* Game List: Displays a complete list of the user's owned games.
* Responsive Design: The app is fully responsive and works on both desktop and mobile devices.


### ⚙️ Technologies Used

* HTML5: Structure of the web application.
* CSS3: Styling and responsive design.
* JavaScript : Core logic, DOM manipulation and data vizualisation
* Python : Flask, Requests, and Flask-CORS



### 📦 Setup and Installation

Prerequisites
* Python 3.x
* `pip` (Python package installer)

1. Clone the repository:

`git clone https://github.com/ouardaq/mySteamAnalyzer.git`


2. Set up environment variables:

Create a `.env` file in the project root:
```
STEAM_API_KEY=your_steam_api_key_here
STEAM_ID=your_64bit_steam_id_here
```

- To get your Steam API key, visit [steamcommunity.com/dev/apikey](https://steamcommunity.com/dev/apikey)
- To find your 64-bit Steam ID, use [steamid.io](https://steamid.io)

3. Run the Backend Server

```bash
cd backend
pip install -r ../requirements.txt
python app.py
```

The server will start on http://127.0.0.1:5000.

4. Open the frontend:

Open `frontend/index.html` in your browser.

  
### 🖼️  Demo


<img width="1920" height="4720" alt="full website screen" src="https://github.com/user-attachments/assets/b1ceb492-3493-4a0d-ab80-bca52dc8a6c7" />



📄 **Feel free to explore, fork, and contribute!**
