#! /usr/bin/env node
// bin/cli.js

const program = require('commander')
const chalk = require('chalk')
const figlet = require('figlet')

// 配置 create 命令
program
    // 定义命令和参数
    .command('create <app-name>')
    .description('create a new project')
    .option('-f, --force', 'overwrite target directory if it exist')
    .action((name, options) => {
        console.log('name:', name, 'options:', options)

        // 在 create.js 中执行创建任务
        require('../lib/create.js')(name, options)
    })

// 配置 config 命令
program
    .command('config [value]')
    .description('inspect and modify the config')
    .option('-g, --get <path>', 'get value from option')
    .option('-s --set <path> <value>')
    .option('-d, --delete <path>', 'delete option from config')
    .action((value, options) => {
        console.log(value, options)
    })

// 配置 ui 命令
program
    .command('ui')
    .description('start add open roc-cli ui')
    .option('-p, --port <port>', 'Port used for the UI Server')
    .action((value, options) => {
        console.log(value, options)
    })

program
    .version(`v${require('../package.json').version}`)
    .usage('<command> [option]')

program
    // 监听 --help 执行
    .on('--help', () => {
        console.log(`\r\nRun ${chalk.cyan(`zr <command> --help`)} for detailed usage of given command\r\n`)
    })
    .on('--help', () => {
        // 使用 figlet 绘制 logo
        console.log('\r\n')
        console.log(figlet.textSync('zhurong', {
            font: 'Ghost',
            horizontalLayoutL: 'default',
            verticalLayout: 'default',
            width: 80,
            whitespaceBreak: true
        }))
        // 新增说明信息
        console.log(`\r\nRun ${chalk.cyan(`roc <command> --help`)} show details\r\n`)
    })

program.parse(process.argv)