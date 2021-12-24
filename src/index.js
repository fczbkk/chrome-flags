const https = require('https')
const { readFile, writeFile } = require('fs').promises
const path = require('path')

const sourceUrl = 'https://raw.githubusercontent.com/chromium/chromium/main/chrome/common/chrome_switches.cc'

const readmePath = path.resolve(__dirname, '../README.md')

function getBlankBlock () {
  return {
    comment: [],
    note: [],
    flag: []
  }
}

const KNOWN_OS = {
  'WIN': {icon: 'os-windows.svg', name: 'Windows'},
  'LINUX': {icon: 'os-linux.svg', name: 'Linux'},
  'MAC': {icon: 'os-mac.svg', name: 'Mac'},
  'ANDROID': {icon: 'os-android.svg', name: 'Android'},
  'CHROMEOS': {icon: 'os-chrome.svg', name: 'Chrome OS'}
}

async function getSourceContent (url = sourceUrl) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      const { statusCode, statusMessage } = response
      if (statusCode === 200) {
        response.setEncoding('utf8')
        let responseContent = ''
        response.on('data', (data) => {
          responseContent += data
        })
        response.on('end', () => {
          resolve(responseContent)
        })
      } else {
        reject(`FAIL: Request returned status ${statusCode} with message "${statusMessage}".`)
      }
    }).on('error', (error) => {
      reject(`FAIL: Request failed with message "${error.message}".`)
    })

  })
}

const conditionStartRe = /^\#if\s+/

function isConditionStartLine (content) {
  return content.match(conditionStartRe)
}

const conditionEndRe = /^\#endif/

function isConditionEndLine (content) {
  return content.match(conditionEndRe)
}

function parseConditionStart (content) {
  return content.replace(conditionStartRe, '')
}

const flagLineRe = /^const char \w+\[\]\s+=/

function isFlagLine (content) {
  return content.match(flagLineRe)
}

function parseFlagName (content) {
  const matches = /"(.+)"/.exec(content)
  return matches ? matches[1] : ''
}

const commentLineRe = /^\/\/\s+/

function isCommentLine (content) {
  return content.match(commentLineRe)
}

function parseCommentLine (content) {
  return content.replace(commentLineRe, '')
}

function parseSource (content = '') {
  const flags = []

  let block = getBlankBlock()
  let parseAsFlagLine = false
  let currentCondition = ''

  function evaluateBlock () {
    const flagName = parseFlagName(block.flag.join(''))
    if (flagName !== '') {
      flags.push({
        flag: flagName,
        comment: block.comment.join(' '),
        note: block.note.join(' '),
        condition: currentCondition
      })
    }
  }

  const lines = content.split('\n')
  lines.forEach((line) => {
    // TODO multi line condition parsing
    if (line === '') {
      evaluateBlock()
      parseAsFlagLine = false
      block = getBlankBlock()
    } else if (isConditionStartLine(line)) {
      currentCondition = parseConditionStart(line)
    } else if (isConditionEndLine(line)) {
      evaluateBlock()
      parseAsFlagLine = false
      block = getBlankBlock()
      currentCondition = ''
    } else if (isCommentLine(line)) {
      parseAsFlagLine = false
      if (block.flag.length === 0) {
        // comments before flag definition
        block.comment.push(parseCommentLine(line))
      } else {
        // comments after flag definition
        block.note.push(parseCommentLine(line))
      }
    } else if (isFlagLine(line)) {
      if (parseAsFlagLine) {
        evaluateBlock()
        parseAsFlagLine = false
        block = getBlankBlock()
      }
      parseAsFlagLine = true
      block.flag.push(line)
    } else if (parseAsFlagLine) {
      block.flag.push(line)
    }
  })
  evaluateBlock()

  return flags
}

function getOsIcons (conditions = '') {
  const osMatchRe = /(?:^|[^\!])defined\(OS_(\w+)\)/g
  let result = ''
  let match = null
  while (match = osMatchRe.exec(conditions)) {
    const osId = match[1]
    if (KNOWN_OS[osId]) {
      const {icon, name} = KNOWN_OS[osId]
      result += `<img src="./images/${icon}" width="16" height="16" alt="name">`
    }
  }
  return result
}

function flagsToMarkdown (flags = []) {
  const result = []

  flags.forEach(flag => {
    const condition = flag.condition ? `<p>CONDITION: <code>${flag.condition}</code></p>` : ''
    const comment = flag.comment ? `<p>${flag.comment}</p>` : ''
    const note = flag.note ? `<p class="note">${flag.note}</p>` : ''
    result.push(`<details><summary><code>${flag.flag}</code> ${getOsIcons(flag.condition)}</summary><div>${comment}${condition}${note}</div></details>`)
  })

  return result.join('\n')
}

const flagsSectionTitle = '## Flags';

(async () => {
  try {
    const flags = parseSource(await getSourceContent())
    const readmeContent = await readFile(readmePath, 'utf8')
    const originalContent = readmeContent.split(flagsSectionTitle)[0]
    const newContent = [
      originalContent,
      flagsSectionTitle,
      '\n\n',
      `Last updated: ${new Date(Date.now()).toLocaleString('en')}`,
      '\n\n',
      flagsToMarkdown(flags),
      '\n'
    ].join('')

    await writeFile(readmePath, newContent, 'utf8')

  } catch (error) {
    console.error(error)
  }
})()
