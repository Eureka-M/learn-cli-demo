// lib/create.js

const path = require('path')
const fs = require('fs-extra')
const inquirer = require('inquirer')
const Generator = require('./generator')

module.exports = async function (name, options) {
    // 执行创建命令

    // 当前命令行选择的目录
    const cwd = process.cwd()
    // 需要创建的目录地址
    const targetDir = path.join(cwd, name)
    
    // 目录是否已经存在
    if (fs.existsSync(targetDir)) {

        // 是否为强制创建
        if (options.force) {
            await fs.remove(targetDir)
        } else {
            // 询问用户是否确认覆盖
            let { action } = await inquirer.prompt([
                {
                    name: 'action',
                    type: 'list',
                    message: 'Target directory already exists Pick an action:',
                    choices: [
                        {
                            name: 'Overwrite',
                            value: 'overwrite'
                        },
                        {
                            name: 'Cancel',
                            value: false
                        }
                    ]
                }
            ])

            if (!action) {
                return
            } else if (action === 'overwrite') {
                console.log(`\r\nRemoving...`)
                await fs.remove(targetDir)
            }
        }
    }

    // 创建项目
    const generator = new Generator(name, targetDir)
    // 开始创建项目
    generator.create()
}