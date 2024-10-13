import { defineStore } from 'pinia';
import axios from 'axios';
import { toRaw } from 'vue';

export const useGymLeaderboardStore = defineStore({
	id: 'gymLeaderboardStore',
	state: () => ({
		sheetId: '1Zfk-3eZ1Lpls1WG0ijq2KnP5sLFEFOwXULKphFkRq3g',
		apiKey: 'AIzaSyB6p49AiMgUkTU4bqydkhXfGjvRp4M_Te0',
		range: 'A2:K11',
		exercises: [
			{ name: 'Rinnalt surumine MAX (Mehed)' },
			{ name: 'Rinnalt surumine MAX (Naised)' },
			{ name: 'Cooperi-test (Mehed)' },
			{ name: 'Cooperi-test (Naised)' },
			{ name: 'Rinnalt surumine 50kg (Mehed)' },
			{ name: 'Rinnalt surumine 50kg (Naised)' },
			{ name: 'Kükk MAX (Mehed)' },
			{ name: 'Kükk MAX (Naised)' },
		],
		leaderboardData: {}, // This holds the leaderboard data for each sheet
		loading: false,
		inProgress: false, // Flag to prevent multiple concurrent fetches
	}),
	actions: {
		// Function to compare new and old data
		isDataEqual(newData, oldData) {
			const rawOldData = toRaw(oldData); // Unwrap the reactive proxy
			return JSON.stringify(newData) === JSON.stringify(rawOldData);
		},

		// Fetch leaderboard data from all sheets at once and populate the leaderboard
		async fetchAllLeaderboardData() {
			if (this.inProgress) {
				console.log('Another request is already in progress. Skipping this request.');
				return;
			}

			this.inProgress = true;
			this.loading = true;
			console.log('Fetching leaderboard data for all sheets...');

			try {
				// Fetch data from all sheets in parallel
				const requests = this.exercises.map((exercise) => {
					const encodedSheetName = encodeURIComponent(exercise.name);
					return axios.get(
						`https://sheets.googleapis.com/v4/spreadsheets/${this.sheetId}/values/${encodedSheetName}!${this.range}?key=${this.apiKey}`
					);
				});

				const results = await Promise.all(requests); // Fetch all sheets simultaneously
				const newLeaderboardData = {};

				// Process the results
				results.forEach((result, index) => {
					if (result.data && result.data.values) {
						const leaderboardList = result.data['values']
							.filter((el) => el.length > 1 && el[1].trim().length > 0)
							.map((el) => el);

						const sheetName = this.exercises[index].name;
						newLeaderboardData[sheetName] = leaderboardList;
					}
				});

				// Compare new data with the existing data
				let dataChanged = false;
				for (const sheet in newLeaderboardData) {
					if (!this.isDataEqual(newLeaderboardData[sheet], this.leaderboardData[sheet])) {
						dataChanged = true;
						break;
					}
				}

				// Only update the state if the data has changed
				if (dataChanged) {
					console.log('Leaderboard data updated.');
					this.leaderboardData = newLeaderboardData; // Update the leaderboard data in the store
				} else {
					console.log('Leaderboard data is the same. No update needed.');
				}
			} catch (err) {
				console.error('Error fetching leaderboard data:', err);
			} finally {
				this.inProgress = false;
				this.loading = false;
			}
		},

		// Start the periodic refetching
		startAutoRefetch(interval = 1200000) {
			this.fetchAllLeaderboardData(); // Initial fetch

			// Set up the refetch interval
			setInterval(async () => {
				await this.fetchAllLeaderboardData(); // Refetch every interval
			}, interval);
		},
	},
});
