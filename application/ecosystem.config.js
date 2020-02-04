module.exports = {
    apps: [{
      name: 'team10_app',
      script: './src/index.js'
    }],
    deploy: {
      production: {
        user: 'ec2-user',
        host: 'ec2-3-15-155-182.us-east-2.compute.amazonaws.com',
        key: '~/.ssh/launchkey.pem',
        ref: 'origin/master',
        repo: 'git@github.com:CSC-648-SFSU/csc648-fall2019-Team10.git',
        path: '/home/ubuntu/src',
        'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
      }
    }
  }