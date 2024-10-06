import { defineStore } from 'pinia';
import axios from 'axios';

export const useGymLeaderboardStore = defineStore({
	id: 'gymLeaderboardStore',
	state: () => ({
		sheetId: '1Zfk-3eZ1Lpls1WG0ijq2KnP5sLFEFOwXULKphFkRq3g', // Google Sheets ID for the gym leaderboard
		apiKey: 'AIzaSyB6p49AiMgUkTU4bqydkhXfGjvRp4M_Te0', // Google API key
		sheet: 'TOP Rinnalt surumine MAX', // Name of the sheet in Google Sheets
		range: 'A2:K11', // Data range to fetch
		leaderboardData: [], // Holds the full leaderboard data
		loading: false, // Loading state
		notice: 'Tulge kõik sõõma' // Notice message
	}),
	actions: {
		async fetchLeaderboardData() {
			this.loading = true;
			console.log('Fetching leaderboard data...'); // Log before starting
			const leaderboardList = [];
			try {
				const result = await axios.get(
					`https://sheets.googleapis.com/v4/spreadsheets/${this.sheetId}/values/${this.sheet}!${this.range}?key=${this.apiKey}`
			);
				console.log('Data fetched from Google Sheets:', result.data); // Log data fetched from API

				if (result.data && result.data.values) {
					result.data['values']
						.filter((el) => el.length > 1 && el[1].trim().length > 0)
						.forEach((el) => leaderboardList.push(el));
				}
			} catch (err) {
				console.error('Error fetching leaderboard data:', err); // Log any errors during the fetch
				this.leaderboardData = [];
			} finally {
				this.leaderboardData = leaderboardList;
				console.log('Leaderboard data processed:', this.leaderboardData); // Log processed leaderboard data
				this.loading = false;
			}
		}
	}
});
