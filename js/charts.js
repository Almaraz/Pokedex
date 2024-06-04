const ctx = document.getElementById('stats').getContext('2d')

export function createChart(stats) {
	return new Chart(ctx, {
		type: 'radar',
		data: {
			labels: [
				'HP',
				'Attack',
				'Defense',
				['Special', 'Attack'],
                //Línea doble
				['Special', 'Defense'],
				'Speed',
			],
			datasets: [
				{
					data: stats,
					backgroundColor: 'rgba(255, 122, 0, 0.61)', //'#C67460'
				},
			],
		},
		options: {
			maintainAspectRatio: false,
			plugins: {
				legend: {
					display: false,
				},
			},
			scales: {
				r: {
					grid: {
						color: 'white',
					},
					pointLabels: {
						color: 'white',
					},
					angleLines: {
						color: 'white',
					},
				},
			},
		},
	})
}
