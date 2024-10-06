import { defineStore } from 'pinia';
import axios from 'axios';

export const useGymLeaderboardStore = defineStore({
	id: 'gymLeaderboardStore',
	state: () => ({
		sheetId: '1Zfk-3eZ1Lpls1WG0ijq2KnP5sLFEFOwXULKphFkRq3g', // Google Sheets ID for the gym leaderboard
		apiKey: 'AIzaSyB6p49AiMgUkTU4bqydkhXfGjvRp4M_Te0', // Google API key
		sheet: '', // Sheet name (dynamic)
		range: 'A2:K11', // Data range to fetch
		leaderboardData: {}, // Holds the full leaderboard data for each sheet
		loading: false // Loading state
	}),
	actions: {
		// Set the active sheet name (e.g., exercise name)
		setSheet(sheetName) {
			this.sheet = sheetName;
		},
		// Fetch the data for the active sheet
		async fetchLeaderboardData() {
			if (!this.sheet) {
				console.error('Sheet name is not set. Please set a valid sheet name before fetching data.');
				return;
			}

			this.loading = true;
			console.log(`Fetching leaderboard data for sheet: ${this.sheet}...`); // Log before starting

			try {
				const result = await axios.get(
					`https://sheets.googleapis.com/v4/spreadsheets/${this.sheetId}/values/${this.sheet}!${this.range}?key=${this.apiKey}`
				);
				console.log('Data fetched from Google Sheets:', result.data); // Log data fetched from API

				if (result.data && result.data.values) {
					// Process the fetched data and save it for this sheet
					const leaderboardList = result.data['values']
						.filter((el) => el.length > 1 && el[1].trim().length > 0)
						.map((el) => el);

					// Store the data in the leaderboardData state object using the sheet name as the key
					this.leaderboardData = {
						...this.leaderboardData, // Retain existing data
						[this.sheet]: leaderboardList // Add/overwrite data for the current sheet
					};
				}
			} catch (err) {
				console.error('Error fetching leaderboard data:', err); // Log any errors during the fetch
				this.leaderboardData = {
					...this.leaderboardData, // Retain existing data
					[this.sheet]: [] // Set the current sheet's data as empty in case of an error
				};
			} finally {
				console.log('Updated leaderboard data:', this.leaderboardData); // Log the updated leaderboard data
				this.loading = false;
			}
		}
	}
});
