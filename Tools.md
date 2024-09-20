## outils en relation avec le service

# grafana
grafana-server -v : Version 11.2.0 (commit: c57667e4481563f5e6cf945b03bc0626caa4dbeb, branch: HEAD)
PORT=3000


# prometheus
prometheus : prometheus-2.47.0.linux-amd64
PORT=9090

./prometheus.yml

scrape_configs:

  - job_name: "nodejs"

    static_configs:
      - targets: ["localhost:3016"]

  - job_name: 'nodejs_bdd_api'  # Nom du job (modifiable)

    static_configs:
      - targets: ['localhost:3005']  # Port où ton service expose /metrics
