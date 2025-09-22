import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions, ChartConfiguration, ChartData, ChartEvent } from 'chart.js';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-page-statistiques',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './page-statistiques.html',
  styleUrl: './page-statistiques.scss'
})
export class PageStatistiques implements OnInit {

  // === Données des métriques ===
  totalVentes = 125000;
  totalCommandes = 1247;
  totalProduits = 89;
  totalClients = 342;

  // === Données pour la légende du pie chart ===
  legendItems = [
    { label: 'Produit A', color: '#1cc88a' },
    { label: 'Produit B', color: '#36b9cc' },
    { label: 'Produit C', color: '#f6c23e' },
    { label: 'Produit D', color: '#e74a3b' }
  ];

  ngOnInit() {
    // Animation des métriques au chargement
    this.animateMetrics();
  }

  animateMetrics() {
    // Simulation d'animation des chiffres
    setTimeout(() => {
      this.totalVentes = 125000;
      this.totalCommandes = 1247;
      this.totalProduits = 89;
      this.totalClients = 342;
    }, 500);
  }

  changeChartPeriod(period: string) {
    console.log('Changement de période:', period);
    // Logique pour changer les données selon la période
  }

  onFilterChange(event: any) {
    console.log('Filtre changé:', event.target.value);
    // Logique pour filtrer les données
  }

  // === Options pour Bar Chart ===
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart'
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#4e73df',
        borderWidth: 1,
        cornerRadius: 8
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#6c757d',
          font: { size: 12, family: 'Poppins' }
        }
      },
      y: {
        grid: {
          color: 'rgba(0,0,0,0.05)'
        },
        ticks: {
          color: '#6c757d',
          font: { size: 12, family: 'Poppins' }
        }
      }
    }
  };

  // === Options pour Pie Chart ===
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart'
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#1cc88a',
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed;
            return `${label}: ${value}`;
          }
        }
      }
    }
  };

  // === Options pour Line Chart ===
  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart'
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#ff6384',
        borderWidth: 1,
        cornerRadius: 8,
        mode: 'index',
        intersect: false
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#6c757d',
          font: { size: 12, family: 'Poppins' }
        }
      },
      y: {
        grid: {
          color: 'rgba(0,0,0,0.05)'
        },
        ticks: {
          color: '#6c757d',
          font: { size: 12, family: 'Poppins' },
          callback: function(value) {
            return '€' + value.toLocaleString();
          }
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    }
  };

  // === Données Bar Chart ===
  public ventesParMois: ChartData<'bar'> = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    datasets: [
      { 
        data: [30, 50, 70, 40, 90, 110], 
        label: 'Ventes', 
        backgroundColor: [
          'rgba(78, 115, 223, 0.8)',
          'rgba(78, 115, 223, 0.8)',
          'rgba(78, 115, 223, 0.8)',
          'rgba(78, 115, 223, 0.8)',
          'rgba(78, 115, 223, 0.8)',
          'rgba(78, 115, 223, 0.8)'
        ],
        borderColor: '#4e73df',
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false
      }
    ]
  };
  public barChartType: ChartType = 'bar';

  // === Données Pie Chart ===
  public produitsPlusVendus: ChartData<'pie'> = {
    labels: ['Produit A', 'Produit B', 'Produit C', 'Produit D'],
    datasets: [
      {
        data: [120, 80, 60, 40],
        backgroundColor: [
          'rgba(28, 200, 138, 0.8)',
          'rgba(54, 185, 204, 0.8)',
          'rgba(246, 194, 62, 0.8)',
          'rgba(231, 74, 59, 0.8)'
        ],
        borderColor: ['#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b'],
        borderWidth: 3,
        hoverOffset: 10
      }
    ]
  };
  public pieChartType: ChartType = 'pie';

  // === Données Line Chart (CA) ===
  public chiffreAffaires: ChartData<'line'> = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    datasets: [
      {
        data: [5000, 8000, 6000, 9000, 12000, 15000],
        label: 'Chiffre d\'Affaires',
        fill: true,
        borderColor: '#ff6384',
        backgroundColor: 'rgba(255, 99, 132, 0.1)',
        tension: 0.4,
        pointBackgroundColor: '#ff6384',
        pointBorderColor: '#fff',
        pointBorderWidth: 3,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: '#ff6384',
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 3
      }
    ]
  };
  public lineChartType: ChartType = 'line';
}