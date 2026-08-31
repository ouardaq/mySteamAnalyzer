import os

import requests
from dotenv import load_dotenv
from flask import Flask, jsonify
from flask_cors import CORS

load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

STEAM_API_KEY = os.getenv("STEAM_API_KEY")
STEAM_ID = os.getenv("STEAM_ID")

app = Flask(__name__)
CORS(app)

BASE_URL = "https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/"


@app.route("/api/owned-games")
def get_owned_games():
    """
    Fetches the list of owned games from the Steam Web API and returns it as JSON.
    """
    # Fail loudly here rather than sending a request that Steam rejects with a
    # 403 the frontend can only report as "failed to fetch".
    if not STEAM_API_KEY or not STEAM_ID:
        return jsonify({
            "error": "STEAM_API_KEY and STEAM_ID must be set in .env. "
                     "See .env.example."
        }), 500

    params = {
        "key": STEAM_API_KEY,
        "steamid": STEAM_ID,
        "include_appinfo": 1,
        "format": "json",
    }

    try:
        response = requests.get(BASE_URL, params=params, timeout=10)
        response.raise_for_status()

        data = response.json()

        if "games" in data.get("response", {}):
            return jsonify({"games": data["response"]["games"]})

        # An empty response object is what Steam returns for a private
        # profile, which is a different problem from a failed request.
        return jsonify({
            "error": "No games returned. Check that the profile's game "
                     "details are public."
        }), 404

    except requests.exceptions.RequestException as e:
        print(f"An error occurred while fetching data: {e}")
        return jsonify({"error": "Failed to fetch data from Steam API."}), 500


if __name__ == "__main__":
    app.run(debug=True)
