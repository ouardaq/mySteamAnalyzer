import requests
import json
from flask import Flask, jsonify
from flask_cors import CORS 
from dotenv import load_dotenv
import os

load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

STEAM_API_KEY = os.getenv("STEAM_API_KEY")
STEAM_ID = os.getenv("STEAM_ID")
app = Flask(__name__)
CORS(app) 


api_key = "YOUR_STEAM_API_KEY"  # Replace with your actual Steam API key


steam_id = "YOUR_STEAM_ID"  # Replace with your actual Steam ID 


base_url = "https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/"

@app.route("/api/owned-games")
def get_owned_games():
    """
    Fetches the list of owned games from the Steam Web API and returns it as JSON.
    """
    params = {
        "key": api_key,
        "steamid": steam_id,
        "include_appinfo": 1,
        "format": "json"
    }

    try:
        response = requests.get(base_url, params=params)
        response.raise_for_status() 

        data = response.json()

       
        if "games" in data["response"]:
            games = data["response"]["games"]
           
            return jsonify({"games": games})
        else:
            return jsonify({"error": "Could not retrieve game data."}), 404

    except requests.exceptions.RequestException as e:
        print(f"An error occurred while fetching data: {e}")
        return jsonify({"error": "Failed to fetch data from Steam API."}), 500

if __name__ == "__main__":
    
    app.run(debug=True)
