<script>
  import {onMount} from 'svelte';
  import Chart from 'chart.js/auto';

  let element;

  onMount(() => {
    new Chart(element, {
      type: 'line',
      data: {
        labels: data.entities.map(e => new Date(e.time).toLocaleString()),
        datasets: [{
          label: '# graczy online',
          data: data.entities.map(e => e.amount),
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  });

  export let data;
</script>
<style>
    .chart {
        width: 500px;
        height: 500px;
    }
</style>
<div>
    <canvas class="chart" bind:this={element}></canvas>
</div>
