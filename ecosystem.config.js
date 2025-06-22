module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [
        {
            name: 'crm',
            script: 'dist/main.js',
            env: {
                NODE_ENV: 'development',
                PORT: 3001,
            },
            env_production: {
                NODE_ENV: 'production',
                PORT: 3001,
            },
        },
    ],

    /**
     * Deployment section
     * http://pm2.keymetrics.io/docs/usage/deployment/
     */
    // deploy: {
    //     production: {
    //         user: TARGET_SERVER_USER,
    //         host: TARGET_SERVER_HOST,
    //         ref: 'origin/main',
    //         repo: REPO,
    //         ssh_options: 'StrictHostKeyChecking=no',
    //         path: TARGET_SERVER_APP_PATH,
    //         'post-deploy':
    //             'npm install --production' +
    //             ' && pm2 startOrRestart ecosystem.config.js --env=production' +
    //             ' && pm2 save',
    //     },
    // },
};
