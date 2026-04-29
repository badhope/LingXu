module.exports = {
  apps: [{
    name: 'lingxu',
    script: './node_modules/next/dist/bin/next',
    args: 'start -p 3000',
    cwd: './',
    instances: 2,
    autorestart: true,
    watch: false,
    max_memory_restart: '512M',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }],

  deploy: {
    production: {
      user: 'root',
      host: ['你的服务器IP'],
      ref: 'origin/main',
      repo: 'git@github.com:你的用户名/LingXu.git',
      path: '/www/lingxu',
      'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.js --env production'
    }
  }
}
